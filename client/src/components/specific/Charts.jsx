import React from 'react'
import { Line, Doughnut } from "react-chartjs-2";
import { CategoryScale, Chart as Chartjs, Tooltip, Filler, LinearScale, PointElement, LineElement, ArcElement, Legend, plugins, scales } from "chart.js";
Chartjs.register(
    CategoryScale, Tooltip, Filler, LinearScale, PointElement, LineElement, ArcElement, Legend
)
const lineChartOption = {
    responsive: true,
    plugins: {
        legend: {
            display: false
        }, title: {
            display: false
        }
    },
    scales: {
        x: { 
            grid:{
                display:false
            }
            //display: false 
        }, y: { 
            beginAtZero:true,
            grid:{
                display:false
            }
            // display: false
         }
    }
}
const LineChart = ({value=[]}) => {
    const data = {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        datasets: [
            {
            data:value,
            label:'Revenue',
            fill:true,
            backgroundColor:'#006769',
            borderColor:'#40A578'
        },
    ]

    }
    return (
        <Line data={data} options={lineChartOption} />
    )
}
const DoughnutChart = () => {
    return (
        <div>DoughnutChart</div>
    )
}

export { LineChart, DoughnutChart }