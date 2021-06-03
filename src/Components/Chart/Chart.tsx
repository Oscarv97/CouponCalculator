import React from "react";
import { IChartProps } from "./IChartProps";
import {Bar, Line} from "react-chartjs-2";

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        type: 'line',
        label: 'Monthly Spend',
        data: [12, 19, 3, 5, 2, 3],
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
    },
    {
        type: 'line',
        label: 'Cumulative Spend',
        data: [1, 9, 4, 18, 24, 50],
        fill: false,
      
        backgroundColor: 'rgb(11, 62, 87)',
        borderColor: 'rgba(50, 129, 168)',
      },
    ],
  };
  
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
export default class Chart extends React.Component<IChartProps, any> {
    constructor(props: IChartProps) {
        super(props);
        this.state = {
            
        }
    }

    public render(): React.ReactElement<IChartProps> {
        return (
        <div>
             <Line options={options} data={data} type="Line"    />
        </div>
        );
    }
}