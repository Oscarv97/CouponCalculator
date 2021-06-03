import React from "react";
import { Line } from "react-chartjs-2";
import { IChartProps } from "./IChartProps";

export default class Chart extends React.Component<IChartProps, any> {
    
    public render(): React.ReactElement<IChartProps> {
        let data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [
              {
                type: 'line',
                label: 'Monthly Spend',
                data: this.props.monthlyTotals,
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
            {
                type: 'line',
                label: 'Cumulative Spend',
                data: this.props.rollingTotal,
                fill: false,
              
                backgroundColor: 'rgb(11, 62, 87)',
                borderColor: 'rgba(50, 129, 168)',
              },
            ],
          };
          
          let options = {
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
        return (
        <div>
             <Line options={options} data={data} type="Line"    />
        </div>
        );
    }
}