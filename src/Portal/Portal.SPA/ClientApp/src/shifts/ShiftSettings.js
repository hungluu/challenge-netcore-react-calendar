import React from 'react'
import { get } from 'lodash'
import * as PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

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
} from 'reactstrap'

const TestPage = () => {
    return <div className="animated fadeIn">
        <Row>
            <Col xs="12">
                <Card>
                    <CardBody>
                        <Row>
                            <Col xs="12" sm="6">
                                <FormGroup>
                                    <Label htmlFor="select1">Shop</Label>
                                    <Input type="select" name="select" id="select1" className="form-control">
                                        <option value="0">Please select</option>
                                        <option value="1">Option #1</option>
                                        <option value="2">Option #2</option>
                                        <option value="3">Option #3</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col xs="12" sm="6">
                                <FormGroup>
                                    <Label htmlFor="select1">Location</Label>
                                    <Input type="select" name="select" id="select1" className="form-control">
                                        <option value="0">Please select</option>
                                        <option value="1">Option #1</option>
                                        <option value="2">Option #2</option>
                                        <option value="3">Option #3</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Col>
        </Row>
        <ShiftSettingItem />
    </div>
}

TestPage.propTypes = {
    message: PropTypes.string,
    updateMessage: PropTypes.func
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
)(TestPage)