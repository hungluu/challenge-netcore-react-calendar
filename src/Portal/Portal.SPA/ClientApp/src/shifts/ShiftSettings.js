import React, { Component } from 'react'
import { get, map, filter, assign, first } from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ShopService } from './config/lib'
import * as dispatchers from './config/dispatchers'
import ShiftSettingItem from './ShiftSettingItem'

import {
    Card,
    CardBody,
    Col,
    FormGroup,
    Input,
    Label,
    Row,
    Button
} from 'reactstrap'

class ShiftSettings extends Component {
    constructor() {
        super()

        this.state = {
            shopId: "",
            locationId: "",
            shops: [],
            locations: [],
            settings: []
        }
    }

    addNewShiftSetting() {
        const newSettings = this.state.settings.slice()

        newSettings.unshift({
            id: this.state.settings.length,
            isDeleted: false
        })

        this.setState({
            settings: newSettings
        })
    }

    removeShiftSetting(setting) {
        this.setState((state) => {
            return {
                settings: map(state.settings, st => st.id !== setting.id ? st : assign({}, st, { isDeleted : true }))
            }
        })
    }

    async selectShop(shopId) {
        const locations = await ShopService.getShopLocationsFromShop(shopId)

        this.setState({ shopId, locations, locationId: get(first(locations), 'id', "") })
    }

    async componentDidMount() {
        const shops = await ShopService.getShops()
        const firstShopId = get(first(shops), 'id')

        this.setState({ shops })

        if (firstShopId) {
            await this.selectShop(firstShopId)
        }
    }

    render () {
        return <div className="animated fadeIn">
            <Row>
                <Col xs="12">
                    <Card>
                        <CardBody>
                            <Row>
                                <Col xs="12" sm="6">
                                    <FormGroup>
                                        <Label htmlFor="shift-settings-shop-selection">Shop</Label>
                                        <Input type="select"
                                            name="select"
                                            id="shift-settings-shop-selection"
                                            className="form-control"
                                            disabled={!this.state.shops.length}
                                            value={this.state.shopId}
                                            onChange={(shopId) => this.selectShop(shopId)}>
                                            {map(this.state.shops, shop => {
                                                return <option value={shop.id} key={shop.id}>{shop.name}</option>
                                            })}
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col xs="12" sm="6">
                                    <FormGroup>
                                        <Label htmlFor="shift-settings-location-selection">Location</Label>
                                        <Input type="select" name="select" id="shift-settings-location-selection" className="form-control" disabled={!this.state.locations.length}>
                                            {map(this.state.locations, location => {
                                                return <option value={location.id} key={location.id}>{location.name}</option>
                                            })}
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button type="reset" color="primary"><i className="fa fa-check-circle-o"></i> Save</Button>
                                </Col>
                                <Col>
                                    <Button className="pull-right" type="reset" color="success" onClick={() => this.addNewShiftSetting()}><i className="fa fa-plus"></i> Add new</Button>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            {map(filter(this.state.settings, ['isDeleted', false]), setting => <ShiftSettingItem key={setting.id} setting={setting} onDelete={(setting) => this.removeShiftSetting(setting)} />)}
        </div>
    }
}

ShiftSettings.propTypes = {
    //message: PropTypes.string,
    //updateMessage: PropTypes.func
}

export const mapStateToProps = (state) => {
    return get(state, 'shifts', {})
}

export const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(dispatchers, dispatch)
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShiftSettings)