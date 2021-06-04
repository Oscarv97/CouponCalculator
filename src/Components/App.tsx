import { Button, Col, InputNumber, Row, Select, Slider } from 'antd';
import React from 'react';
import Chart from "./Chart/Chart";
import './App.css';
import { Header } from 'antd/lib/layout/layout';
import { IUserDataProvider } from '../Services/IUserDataProvider';
import { UserDataProvider } from '../Services/userDataProvider';
import { GENDER_, IUser, REGION_ } from '../Services/IUser';
import { IAppState } from '../IAppState';
const { Option } = Select;

export default class App extends React.Component<{}, IAppState> {
  private userProvider: IUserDataProvider;
  private users: IUser[] = [];

  constructor(props: any) {
    super(props);
    this.userProvider = new UserDataProvider();

    this.state = {
      filterActive: false,
      monthlyTotals: [],
      cutoff: 0,
      rollingTotals: [],
      selectedGender: "Female",
      selectedRegion: REGION_.none,
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSliderChange = this.onSliderChange.bind(this);
  }

  public componentDidMount(): void {
    this.userProvider.getAllUsers().then((users) => {
      this.users = users;
      this.calculateValues();
    }).catch((error: Error) => {
      console.error("Failed to get users", error);
    });
  }


  private calculateValues(): void {
    let rawMonths: any = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [], 11: [], 12: [], };
    let monthTotals: number[] = [];
    let rollingTotals: number[] = [];
    // dont need to call state repeatedly
    let cutoff = this.state.cutoff;
    let genderFilter: boolean = this.state.selectedGender === "Male";
    let regionFilter: boolean = this.state.selectedRegion === REGION_.none;
    console.log(regionFilter)

    this.users.map((user) => {
    if (user.spend >= cutoff && !regionFilter ? user.region === this.state.selectedRegion: true) {
        console.log(user.region)
        console.log(this.state.selectedRegion)
        return rawMonths[user.birthday].push(user.spend)
      }
    });

    let total = 0;
    Object.keys(rawMonths).forEach((month, index) => {
      let monthCost = rawMonths[month].length * 5;
      total += monthCost;
      monthTotals.push(monthCost);
      rollingTotals.push(total);
    });

    this.setState({ monthlyTotals: monthTotals, rollingTotals: rollingTotals });
  }

  private handleChange(e: string): void {
    this.setState({ selectedRegion: e as REGION_ });
    this.calculateValues();
  }

  private onSliderChange(value: number): void {
    this.setState({ cutoff: value });
    this.calculateValues();
  }

  public render() {
    return (
      <div className="App">
        <>

          <Row>
            <Col span={24}>
              <Header>



                <Button>Hello</Button>
                {/* <Dropdown ></Dropdown> */}
              </Header>
            </Col>
          </Row>

          <Row justify="space-around" align="middle">
            <Col span={8}>
              <Slider
                min={1}
                max={5000}
                onChange={this.onSliderChange}
                value={typeof this.state.cutoff === 'number' ? this.state.cutoff : 0}
              />
            </Col>

            <Col span={2}>
              <InputNumber
                min={1}
                max={20}
                style={{ margin: '0 16px' }}
                value={this.state.cutoff}
                onChange={this.onSliderChange}
              />
            </Col>
            <Col span={4}>
              <Select defaultValue="None" style={{ width: 120 }} onChange={this.handleChange}>
                <Option value="United States">United States</Option>
                <Option value="Europe">Europe</Option>
                <Option value="APAC">APAC</Option>
                <Option value="Latin America">Latin America</Option>
                <Option value="None">None</Option>
              </Select>
            </Col>
          </Row>

          <Row justify="space-around" align="middle">
            <Col span={20}>
              <Chart monthlyTotals={this.state.monthlyTotals} rollingTotal={this.state.rollingTotals} title="Test" labels={["", ""]} data={[12, 50]}></Chart>
            </Col>
          </Row>

        </>
      </div >
    );
  }
}
