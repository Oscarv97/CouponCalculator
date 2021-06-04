import { Col, Row } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import React from 'react';
import { IAppState } from '../IAppState';
import { IUser, REGION_ } from '../Services/IUser';
import { IUserDataProvider } from '../Services/IUserDataProvider';
import { UserDataProvider } from '../Services/userDataProvider';
import './App.css';
import Chart from "./Chart/Chart";
import ControlBar from './ControlBar/ControlBar';


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
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.onSliderChange = this.onSliderChange.bind(this);
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
      if (!regionFilter ? user.region === this.state.selectedRegion : true && !genderFilter ? user.gender === this.state.selectedGender : true) {
        if (user.spend > this.state.cutoff) {
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
      prevState.rollingTotals = rollingTotals;
      return prevState;
    })
  }

  private handleSelectChange(key: string, value: string): void {
    this.setState((prevState: IAppState) => {
      key === "gender" ?
        prevState.selectedGender = value
        :
        prevState.selectedRegion = value as REGION_
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

  public render() {
    return (
      <div className="App">
        <>

          <Row>
            <Col span={24}>
              <Header >
              </Header>
            </Col>
          </Row>
          <ControlBar cutoff={this.state.cutoff} region={this.state.selectedRegion} gender={this.state.selectedGender} liftUpCutoff={this.onSliderChange} liftUpState={this.handleSelectChange}  ></ControlBar>

          <Row justify="space-around" align="middle">
            <Col span={20}>
              <Chart monthlyTotals={this.state.monthlyTotals} rollingTotal={this.state.rollingTotals}></Chart>
            </Col>
          </Row>

        </>
      </div >
    );
  }
}
