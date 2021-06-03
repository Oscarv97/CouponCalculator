import { Button, Col, Dropdown, Row } from 'antd';
import React from 'react';
import Chart from "./Chart/Chart";
import './App.css';
import { Header } from 'antd/lib/layout/layout';

function App() {
  return (
    <div className="App">

  <>
    <Row>
    </Row>
   
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
      <Chart title="Test" labels={["", ""]} data={[12, 50]}></Chart>
      </Col>
    </Row>

  </>
    </div>
  );
}

export default App;
