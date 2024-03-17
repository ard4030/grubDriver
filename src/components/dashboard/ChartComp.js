import { BarChart, BarPlot, ChartContainer } from '@mui/x-charts'
import { AgChartsReact } from 'ag-charts-react';
import { useState } from 'react';
import styles from './chartcomp.module.css'

const ChartComp = ({data}) => {
    const getTimeToTimeStamp = (strDate) => {
        // const dateStr = "2023-02-24 13:38";
        const [datePart, timePart] = strDate.split(" ");
        const [year, month, day] = datePart.split("-");
        const [hour, minute] = timePart.split(":");
        
        // تبدیل تاریخ به تایم‌استمپ
        const timestamp = new Date(year, month - 1, day, hour, minute).getTime();
        return timestamp
        
    }
    let a;
    let b =[];
    let x=[];
    let c = [];

    if(data && data !==""){
        a = Object.values(data).sort(function(a,b){
            return  getTimeToTimeStamp(a.fromdt) < getTimeToTimeStamp(b.fromdt) ?-1:1;
        });
        a.map(item => {
            c.push({date:item.fromdt.substr(0,7),sum:parseInt(item.sum)})
        })
        // x = a.map(function(i){return i.fromdt.substr(0,7)})
        // b = a.map(function(i){return parseInt(i.sum)})
        // c.push({date:i.fromdt.substr(0,7),sum:i.sum})

    }



    // Theme
    var myTheme = {
        baseTheme: 'ag-default',
        palette: {
            fills: ['#0a99ff'],
            strokes: ['green'],
        },
        overrides: {
            common: {
                title: {
                    fontSize:24,
                },
            },
            bar: {
                series: {
                    label: {
                        enabled: false,
                        color: 'red',
                    },
                },
            },
        },
    };

    let chartOptions = {
        autoSize :false,
        width:540,
        height:400,
        data: c,
        series: [{
             type: 'bar', xKey: 'date', yKey: 'sum' ,
        }],
        theme:myTheme,

        
    }



  return (
    <div className={styles.chartMe}>
        <AgChartsReact options={chartOptions} />
    </div>
  )
}

export default ChartComp