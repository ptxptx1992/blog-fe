export default function setOption(date_arr, quantity_arr, cover_rate_arr) {

    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            },
            formatter: (params)=>{
                var relVal = params[0].name;
                let val='';
                for (var i = 0, l = params.length; i < l; i++) {
                    val=''
                    if(params[i].seriesName==='覆盖度'){
                        val=params[i].value+"%";
                    }else{
                        val=params[i].value;
                    }
                    relVal += '<br/>' + params[i].seriesName + ' : ' + val;
                }
                return relVal;
            }
            
        },
        grid: {
            top:'5%',
            bottom: '25%',
        },
        legend: {
            data: ['题量', '覆盖度'],
            bottom:20,
        },
        xAxis: [{
            type: 'category',
            data: date_arr,
            axisPointer: {
                type: 'shadow'
            }
        }],
        yAxis: [{
                type: 'value',
                axisLabel: {
                    formatter: '{value}'
                }
            },
            {
                type: 'value',
                axisLabel: {
                    formatter: '{value} %'
                }
            }
        ],
        series: [
            {
                name: '题量',
                type: 'bar',
                data: quantity_arr,
                itemStyle: {
                    normal: {
                        color: '#2d8cf0'
                    }
                },
                barWidth:50
            },
            {
                name: '覆盖度',
                type: 'line',
                yAxisIndex: 1,
                data: cover_rate_arr,
                itemStyle: {
                    normal: {
                        color: '#FF6347',
                        lineStyle: {
                            width: 3 
                        }
                    }
                }
            }
        ]
    };
    return option;
}