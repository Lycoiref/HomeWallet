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
import { ExpendIconList, RevenueIconList } from '../IconList'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setExpend, setIncome, setCategoryExpendTop5, setRecentRecords } from '../../features/state'


const Home = () => {
    const preview = useSelector(state => state.preview)
    const dispatch = useDispatch()
    useEffect(() => {
        (async () => {
            const res = await axios.get('http://192.168.123.180:3000/api/main')
            dispatch(setExpend(Number(res.data.expend)))
            dispatch(setIncome(Number(res.data.income)))
            dispatch(setCategoryExpendTop5(res.data.categoryExpendTop5))
            dispatch(setRecentRecords(res.data.recentRecords))
        })()
    }, [])
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
                </div>
                <div className="add-record">
                    <Link to="/tally">
                        <i className="bi-bag-plus-fill"></i>
                    </Link>
                </div>
            </div>
        </div>
    )
}

const PreviewCard = () => {
    const preview = useSelector(state => state.preview)
    return (
        <div className="card">
            <div className="content">
                <div className="left upper-box">
                    <div className="item">
                        <div className="item-title text-content">本月支出</div>
                        <div className="item-value text-content">¥{Number(preview.value.expend).toFixed(2)}</div>
                    </div>
                    <div className="item">
                        <div className="item-title text-content">本月收入</div>
                        <div className="item-value text-content">¥{Number(preview.value.income).toFixed(2)}</div>
                    </div>
                </div>
                <div className="right upper-box">
                    <div className="item">
                        <div className="item-title text-content">结余</div>
                        <div className="item-value text-content">¥{Number(preview.value.income - preview.value.expend).toFixed(2)}</div>
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
    const preview = useSelector(state => state.preview)
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
                    data: preview.value.categoryExpendTop5
                }
            ]
        })
    })
    return (
        <>
            <div className="expend-chart">
                <div className="title-line">
                    <div className="title">本月支出 ¥{Number(preview.value.expend).toFixed(2)} 收入 ¥{Number(preview.value.income).toFixed(2)}</div>
                </div>
                <div className="chart">
                    <div id="main" style={{ width: '100%', height: '250px' }}></div>
                </div>
            </div>
        </>
    )
}

const RecordCard = () => {
    const preview = useSelector(state => state.preview)
    let cards = preview.value.recentRecords.map((item, index) => {
        let date = new Date(item.date)
        // YYYY-MM-DD
        let dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
        let RecordIcon
        if (item.category.type === 'expend') {
            RecordIcon = ExpendIconList.filter((icon) => {
                if (icon.title === item.category.name) {
                    return icon
                }
            })[0].icon
        } else {
            RecordIcon = RevenueIconList.filter((icon) => {
                if (icon.title === item.category.name) {
                    return icon
                }
            })[0].icon
        }
        console.log(item)
        return (
            <div className={"card record-card" + (item.type === 'expend' ? ' expend-card' : ' income-card')} key={index}>
                <div className="card-left">
                    <div className="icon">
                        {RecordIcon}
                    </div>
                </div>
                <div className="card-right">
                    <div className="text-line">
                        <div className="record-item">{item.category.name}</div>
                        <div className="record-amount">¥{Number(item.amount).toFixed(2)}</div>
                    </div>
                    <div className="text-line subtext">
                        <div className="record-remark">{item.description.length <= 10 ? item.description : item.description.slice(0, 10) + '...'}</div>
                        <div className="record-time">{dateStr}</div>
                    </div>
                </div>
            </div>
        )
    })
    // 记账卡片
    return (
        <>
            {cards}
        </>
    )
}

export default Home
