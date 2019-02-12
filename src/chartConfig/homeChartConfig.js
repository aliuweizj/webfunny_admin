/**
 * 首页的chart相关
 * 配置文件
 */

// 每天的日活量
export const customerGrowCountByMonth = (resArray) => {
  const categoryArray = []
  const valueArray = []
  for (let i = 0; i < resArray.length; i ++) {
    categoryArray.push(resArray[i].day)
    valueArray.push(resArray[i].count)
  }
  return {
    tooltip: {
      trigger: "axis",
      alwaysShowContent: false,
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: "shadow"        // 默认为直线，可选为："line" | "shadow"
      }
    },
    grid: {
      top: "5%",
      left: "3%",
      right: "4%",
      bottom: "1%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        data: categoryArray,
        boundaryGap: false,
        axisLine: {
          show: true,
          lineStyle: {
            color: "#666",
            type: "dashed"
          }
        },
        axisTick: {
          show: false
        },
      }
    ],
    yAxis: [
      {
        type: "value",
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: "#eaeaea",
            type: "dashed"
          }
        },
      }
    ],
    series: [
      {
        name: "用户总量",
        type: "bar",
        itemStyle: {
          normal: {
            color: "#7dde74"
          }
        },
        data: valueArray
      }
    ]
  }
}

// 当日页面的平均加载时间
export const loadPageTimeOption = (resArray) => {
  const categoryArray = []
  const valueArray = []
  for (let i = 0; i < resArray.length; i ++) {
    categoryArray.push(resArray[i].simpleUrl.replace(/https:\/\/.*\//g, "/"))
    valueArray.push((resArray[i].loadPage / 1000).toFixed(2))
  }
  return {
    color: [ "#3baecf" ],
    tooltip: {
      trigger: "axis",
      alwaysShowContent: false,
      position: ["12%", "10%"],
      hideDelay: 100
    },
    grid: {
      top: "10%",
      left: "3%",
      right: "4%",
      bottom: "1%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        data: categoryArray,
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
        data: valueArray,
      }
    ]
  }
}