export const loadPageTimeOption = (arr1, arr2) => {
  let netState = ""
  let netStateColor = ""
  let avgTime = 0
  arr2.forEach((a) => {
    avgTime += a
  })
  avgTime = avgTime / arr2.length
  if (avgTime <= 3) {
    netState = "良好"
    netStateColor = "green"
  } else if (avgTime <= 5) {
    netState = "一般"
    netStateColor = "orange"
  } else if (avgTime <= 10) {
    netState = "较差"
    netStateColor = "#ed6161"
  } else {
    netState = "极差"
    netStateColor = "red"
  }
  return {
    color: [ "#3baecf" ],
    tooltip: {
      trigger: "axis",
      alwaysShowContent: false,
      // axisPointer: {
      //   type: 'cross',
      //   crossStyle: {
      //     color: '#666'
      //   }
      // },
      // enterable: true,
      // confine: true,
      position: ["12%", "10%"],
      hideDelay: 100
    },
    grid: {
      top: "18%",
      left: "3%",
      right: "4%",
      bottom: "1%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        data: arr1,
        axisLabel: {
          interval: 0,
          rotate: 50
        },
        axisPointer: {
          type: "shadow"
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#666",
            type: "dashed"
          }
        },
        axisTick: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        type: "value",
        name: "网络状态：" + netState,
        nameTextStyle: {
          color: netStateColor
        },
        min: 0,
        max: "dataMax",
        axisLabel: {
          formatter: function(value) {
            const time = value + "s"
            return time
          }
        },
        splitLine: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#666",
            type: "dashed"
          }
        },
        axisTick: {
          show: false
        }

      }
    ],
    series: [
      {
        name: "加载时间：",
        type: "bar",
        data: arr2,
      }
    ]
  }
}