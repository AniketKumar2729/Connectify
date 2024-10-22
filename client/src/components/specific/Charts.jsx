import React from 'react'
import { Line, Doughnut } from "react-chartjs-2";
import { CategoryScale, Chart as Chartjs, Tooltip, Filler, LinearScale, PointElement, LineElement, ArcElement, Legend, plugins, scales } from "chart.js";
import { getLast7Days } from '../../lib/features';
Chartjs.register(
    CategoryScale, Tooltip, Filler, LinearScale, PointElement, LineElement, ArcElement, Legend
)
const labels=getLast7Days();
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
        labels: labels,
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
const doughnutChartOptions={
    responsive: true,
    plugins: {
        legend: {
            display: false
        }, title: {
            display: false
        }
    },
    cutout:100
}
const DoughnutChart = ({value=[],labels=[]}) => {
    const data = {
        labels: labels,
        datasets: [
            {
            data:value,
            fill:true,
            backgroundColor:['#7469B6','#AD88C6'],
            hoverBorderColor:['#4D869C','#7AB2B2'],
            borderColor:['#7469B6','#AD88C6'],
            offset:10
        },
    ]
    }
    return (
        <Doughnut style={{zIndex:10}} data={data} options={doughnutChartOptions}/>
    )
}

export { LineChart, DoughnutChart }