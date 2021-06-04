import { Button, Col, InputNumber, Row, Select, Slider } from 'antd';
import React from 'react';
import Chart from "./Chart/Chart";
import './App.css';
import { Header } from 'antd/lib/layout/layout';
import { IUserDataProvider } from '../Services/IUserDataProvider';
import { UserDataProvider } from '../Services/userDataProvider';
import { IUser, REGION_ } from '../Services/IUser';
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
      selectedGender: "None",
      selectedRegion: REGION_.none,
    };
    this.handleRegion = this.handleRegion.bind(this);
    this.onSliderChange = this.onSliderChange.bind(this);
    this.onGenderSelect = this.onGenderSelect.bind(this);
    this.calculateValues = this.calculateValues.bind(this);
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
    
    let genderFilter: boolean = this.state.selectedGender === "None";
    let regionFilter: boolean = this.state.selectedRegion === REGION_.none;

    this.users.map((user) => {
      if( !regionFilter ? user.region === this.state.selectedRegion : true && !genderFilter ? user.gender === this.state.selectedGender : true) {
        if (user.spend > this.state.cutoff){
          console.log(user.spend > this.state.cutoff)
          return rawMonths[user.birthday].push(user.spend);
        } 
      }
    
      return null;
    });

    let total = 0;
    Object.keys(rawMonths).forEach((month, index) => {
      let monthCost = rawMonths[month].length * 5;
      total += monthCost;
      monthTotals.push(monthCost);
      rollingTotals.push(total);
    });

    this.setState((prevState: IAppState) => {
      prevState.monthlyTotals = monthTotals;
      prevState.rollingTotals= rollingTotals;
      return prevState;
    })
  }

  private handleRegion(region: string): void {
    this.setState((prevState: IAppState) => {
      prevState.selectedRegion = region as REGION_;
      return prevState;
    }, () => {
      this.calculateValues();
    });
  }

  private onSliderChange(value: number): void {
    this.setState((prevState: IAppState) => {
      prevState.cutoff = value;
      return prevState;
    }, () => {
      this.calculateValues();
    });
  }

  private onGenderSelect(value: string): void {
    this.setState((prevState: IAppState) => {
      prevState.selectedGender = value;
      return prevState;
    }, () => {
      this.calculateValues();
    });
  }

  public render() {
    return (
      <div className="App">
        <>

          <Row>
            <Col span={24}>
              <Header>

              </Header>
            </Col>
          </Row>

          <Row justify="space-around" align="middle">
            <Col span={8}>
              <Slider
                min={0}
                max={5000}
                step={5}
                onChange={this.onSliderChange}
                value={typeof this.state.cutoff === 'number' ? this.state.cutoff : 0}
              />
            </Col>

            <Col span={2}>
              <InputNumber
                min={0}
                max={5000}
                style={{ margin: '0 16px' }}
                value={this.state.cutoff}
                step={5}
                onChange={this.onSliderChange}
              />
            </Col>
            <Col span={4}>
              <Select defaultValue="None" style={{ width: 120 }} onChange={this.onGenderSelect}>
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
                <Option value="None">None</Option>
              </Select>
            </Col>
            <Col span={4}>
              <Select defaultValue="None" style={{ width: 200 }} onChange={this.handleRegion}>
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
