import { Col, InputNumber, Row, Select, Slider } from "antd";
import React from "react";
import { IControlBarProps } from "./IControlBarProps";
const { Option } = Select;

export default class ControlBar extends React.Component<IControlBarProps> {

    private handleChange(key: string, value: string): void {
        this.props.liftUpState(key, value);
    }

    private handleCutoff( value:  number): void {
        this.props.liftUpCutoff(value)
    }

    public render(): React.ReactElement<IControlBarProps> {
        return (

            <Row className={"main-header container"} justify="space-around" >
                <Col span={8}>
                    <Slider
                        min={0}
                        max={5000}
                        step={5}
                        onChange={(e: number) => {this.handleCutoff(e)}}
                        value={typeof this.props.cutoff === 'number' ? this.props.cutoff : 0}
                    />
                </Col>

                <Col span={4}>
                    <label className="filter-label">Spend Cutoff</label>
                    <InputNumber
                        min={0}
                        max={5000}
                        style={{ margin: '0 16px' }}
                        value={this.props.cutoff}
                        step={5}
                        onChange={(e: number) => {this.handleCutoff(e)}}
                    />
                </Col>
                <Col span={4}>
                    <label className="filter-label">Gender Filter</label>
                    <Select defaultValue="None" style={{ width: 120 }}  onChange={(e: string) => {this.handleChange('gender', e)}}>
                        <Option value="Male">Male</Option>
                        <Option value="Female">Female</Option>
                        <Option value="None">None</Option>
                    </Select>
                </Col>
                <Col span={4}>
                    <label className="filter-label">Region Filter</label>
                    <Select defaultValue="None" style={{ width: 200 }}  onChange={(e: string) => {this.handleChange('region', e)}}>
                        <Option value="United States">United States</Option>
                        <Option value="Europe">Europe</Option>
                        <Option value="APAC">APAC</Option>
                        <Option value="Latin America">Latin America</Option>
                        <Option value="None">None</Option>
                    </Select>
                </Col>
            </Row>

        );

    }
}