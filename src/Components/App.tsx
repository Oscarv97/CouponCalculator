import { Button, Col, Row } from 'antd';
import React from 'react';
import Chart from "./Chart/Chart";
import './App.css';
import { Header } from 'antd/lib/layout/layout';
import { IUserDataProvider } from '../Services/IUserDataProvider';
import { UserDataProvider } from '../Services/userDataProvider';
import { GENDER_, IUser, REGION_ } from '../Services/IUser';
import { IAppState } from '../IAppState';


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
      selectedRegion: REGION_.None,
    }
  }

  public componentDidMount(): void {
    this.userProvider.getAllUsers().then((users) => {
      this.users = users;
      this.sortMonthlyTotals();
    }).catch((error: Error) => {
      console.error("Failed to get users", error);
    });
  }


  private sortMonthlyTotals(): void {
    let rawMonths: any = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [], 11: [], 12: [], };
    let monthTotals: number[] = [];
    let rollingTotals: number[] = [];
    // dont need to call state repeatedly
    let cutoff = this.state.cutoff;
    let genderFilter: boolean = this.state.selectedGender === "Male";
    let regionFilter: boolean = this.state.selectedRegion === 0;

    this.users.map((user) => {
      if (user.spend > cutoff ) {
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
            <Col span={20}>
              <Chart monthlyTotals={this.state.monthlyTotals} rollingTotal={this.state.rollingTotals} title="Test" labels={["", ""]} data={[12, 50]}></Chart>
            </Col>
          </Row>

        </>
      </div>
    );
  }
}
