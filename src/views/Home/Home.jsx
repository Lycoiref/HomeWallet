import './Home.less'
// 引入bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
// 引入bootstrap-icons
import 'bootstrap-icons/font/bootstrap-icons.css'
// 引入echarts
import * as echarts from 'echarts'
import axios from 'axios'
// import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'


// 支出
let expend, setExpend
// 收入
let income = 2000

const Home = () => {
    return (
        <div className="home">
            <div className="top-bar">
                <div className="title">
                    家庭收支
                </div>
                <div className="setting-icon">
                    <Link to="/setting">
                        <i className="bi-gear"></i>
                    </Link>
                </div>
            </div>
            <div className="body">
                <div className="card-content">
                    <PreviewCard />
                </div>
                <div className="chart">
                    <ExpendChart />
                </div>
                <div className="record-content">
                    <RecordCard />
                    <RecordCard />
                    <RecordCard />
                </div>
            </div>
        </div>
    )
}

const PreviewCard = () => {
    [expend, setExpend] = useState(0)
    useEffect(() => {
        (async () => {
            const res = await axios.get('http://localhost:3000/api/main')
            // console.log(res)
            setExpend(res.data.monthTotalExpenses)
            income = res.data.monthTotalIncome
        })()
    })
    return (
        <div className="card">
            <div className="content">
                <div className="left upper-box">
                    <div className="item">
                        <div className="item-title text-content">本月支出</div>
                        <div className="item-value text-content">¥{expend.toFixed(2)}</div>
                    </div>
                    <div className="item">
                        <div className="item-title text-content">本月收入</div>
                        <div className="item-value text-content">¥{income.toFixed(2)}</div>
                    </div>
                </div>
                <div className="right upper-box">
                    <div className="item">
                        <div className="item-title text-content">结余</div>
                        <div className="item-value text-content">¥{(income - expend).toFixed(2)}</div>
                    </div>
                </div>
            </div>
            <div className="footer">
                <Link className="link" to="/detail">
                    <i className="bi-bar-chart-steps"></i> 详细查询
                </Link>
            </div>
        </div>
    )
}

const ExpendChart = () => {
    useEffect(() => {
        let chartDom = document.getElementById('main')
        // 防止重复渲染
        let myChart = echarts.getInstanceByDom(chartDom)

        if (!myChart) {
            // 基于准备好的dom，初始化echarts实例
            myChart = echarts.init(chartDom)
        }
        // 绘制图表
        myChart.setOption({
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '5%',
                left: 'center'
            },
            series: [
                {
                    name: '本月支出',
                    type: 'pie',
                    top: '10%',
                    radius: ['25%', '40%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 5,
                        borderColor: '#fff',
                        borderWidth: 1
                    },
                    label: {
                        show: true,
                        // position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                        }
                    },
                    labelLine: {
                        show: true
                    },
                    data: [
                        { value: 20, name: '吃饭' },
                        { value: 20, name: '342' },
                        { value: 20, name: 'q4qw' },
                        { value: 20, name: '541235' },
                        { value: 100, name: '住房' }
                    ]
                }
            ]
        })
    })
    return (
        <>
            <div className="expend-chart">
                <div className="title-line">
                    <div className="title">本月支出 ¥{expend.toFixed(2)} 收入 ¥{income.toFixed(2)}</div>
                </div>
                <div className="chart">
                    <div id="main" style={{ width: '100%', height: '250px' }}></div>
                </div>
            </div>
        </>
    )
}

const RecordCard = () => {
    // 记账卡片
    return (
        <>
            <div className="card record-card">
                <div className="card-left">
                    <div className="icon">
                        <i className="bi-cash"></i>
                    </div>
                </div>
                <div className="card-right">
                    <div className="text-line">
                        <div className="record-item">餐饮</div>
                        <div className="record-amount">¥{(100).toFixed(2)}</div>
                    </div>
                    <div className="text-line subtext">
                        <div className="record-remark">吃午饭</div>
                        <div className="record-time">今天 12:30</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
