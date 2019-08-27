import React, { Component } from 'react'
import { get, map, filter, assign, first, find } from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as PropTypes from 'prop-types'
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
    constructor(props) {
        super(props)

        this.state = {
            shopId: '',
            locationId: '',
            locations: [],
            shiftSettings: []
        }
    }

    addNewShiftSetting() {
        const newSettings = this.state.shiftSettings.slice()

        newSettings.unshift({
            id: 'new-' + this.state.shiftSettings.length,
            isDeleted: false,
            locationId: this.state.locationId,
            isNew: true
        })

        this.setState({
            shiftSettings: newSettings
        })
    }

    removeShiftSetting(setting) {
        this.setState((state) => {
            if (setting.isNew) {
                return {
                    shiftSettings: filter(state.shiftSettings, { id : setting.id })
                }
            } else {
                return {
                    shiftSettings: map(state.shiftSettings, st => st.id !== setting.id ? st : assign({}, st, { isDeleted : true }))
                }
            }
        })
    }

    async selectShop(shopId) {
        if (!shopId) {
            return
        }

        const locations = await ShopService.getShopLocationsFromShop(shopId)
        const shiftSettings = await ShopService.getShiftSettingsFromShop(shopId)

        this.setState(() => {
            return {
                shopId,
                locations,
                shiftSettings
            }
        }, () => {
            this.selectLocation(get(first(locations), 'id', ''))
        })
    }

    async selectLocation(locationId) {
        if (!locationId) {
            return
        }

        this.setState(() => {
            return {
                locationId
            }
        })
    }

    componentDidMount() {
        this.props.loadShops()
    }

    updateShiftSetting(setting) {
        const newSettings = map(this.state.shiftSettings, (st) => {
            return st.id === setting.id ? setting : st
        })

        this.setState({
            shiftSettings: map(newSettings, ({ id, isDeleted, locationId, shopId, rule, isNew }) => {
                return {
                    shopId: shopId || this.state.shopId,
                    locationId: locationId || this.state.locationId,
                    id,
                    isDeleted,
                    rule,
                    isNew
                }
            })
        })
    }

    async saveShiftSettings() {
        this.props.saveShiftSettings(this.state.shopId, filter(this.state.shiftSettings, st => {
            return st.rule && st.locationId && st.shopId
        }))
    }

    render () {
        const { shops } = this.props

        return <div className="animated fadeIn">
            <Card className="text-white bg-primary">
                <CardBody>
                   <b>Disclaimer</b> : Validations and other effects haven't been applied.
                </CardBody>
            </Card>
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
                                    disabled={!shops.length}
                                    value={this.state.shopId}
                                    onChange={({ target: { value } }) => this.selectShop(parseInt(value))}>
                                    {map(shops, shop => {
                                        return <option value={shop.id} key={shop.id}>{shop.name}</option>
                                    })}
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col xs="12" sm="6">
                            <FormGroup>
                                <Label htmlFor="shift-settings-location-selection">Location</Label>
                                <Input type="select"
                                    name="select"
                                    id="shift-settings-location-selection"
                                    className="form-control"
                                    disabled={!this.state.locations.length}
                                    onChange={({ target: { value } }) => this.selectLocation(parseInt(value))}>
                                    {map(this.state.locations, location => {
                                        return <option value={location.id} key={location.id}>{location.name}</option>
                                    })}
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button type="reset" color="primary" onClick={() => this.addNewShiftSetting()} disabled={!!find(this.state.shiftSettings, st => !st.id && !st.isDeleted)}><i className="fa fa-plus"></i> Add new</Button>
                        </Col>
                        <Col>
                            <Button className="pull-right" type="reset" color="success" onClick={() => this.saveShiftSettings()}><i className="fa fa-check-circle-o"></i> Save</Button>
                        </Col>
                    </Row>
                </CardBody>
            </Card>

            {map(filter(this.state.shiftSettings, st => !st.isDeleted && (st.locationId === this.state.locationId || !st.id)), setting =>
                <ShiftSettingItem
                    key={setting.id}
                    data={setting}
                    onChange={setting => this.updateShiftSetting(setting)}
                    onDelete={setting => this.removeShiftSetting(setting)} />
            )}
        </div>
    }

    componentDidUpdate () {
        const firstShopId = get(first(this.props.shops), 'id', '')

        if (!this.state.shopId && firstShopId && firstShopId !== this.state.shopId) {
            this.selectShop(firstShopId)
        }
    }

    shouldComponentUpdate (nextProps, nextState) {
        return nextProps.shops !== this.props.shops ||
            nextState.shopId !== this.state.shopId ||
            nextState.locationId !== this.state.locationId ||
            nextProps.shiftSettings !== this.props.shiftSettings ||
            nextState.shiftSettings !== this.state.shiftSettings
    }
}

ShiftSettings.propTypes = {
    shops: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
    })),
    shiftSettings: PropTypes.arrayOf(PropTypes.object),
    loadShops: PropTypes.func,
    loadShiftSettings: PropTypes.func
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