export default function setOption(quantity_arr,version_arr) {
    const option = {
        
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            },
            
        },
        grid: {
            left: '3%',
            right: '4%',
            top:'10%',
            bottom: '30%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: version_arr,
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                show:false,
            },
           
        ],
        dataZoom: [ {
            type: 'slider',
            height: '15',
            bottom: '20%',
        }],
        series: [
            {
                name:'访问次数',
                type:'bar',
                data:quantity_arr,
                yAxisIndex:0,
                itemStyle:{
                    color:'#5f6bdd'
                }
            },
        ]
    };
    
        return option;
    }