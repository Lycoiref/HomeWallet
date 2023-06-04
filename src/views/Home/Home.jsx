import './Home.less'
// 引入bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
// 引入bootstrap-icons
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link } from 'react-router-dom'
// 引入echarts
import * as echarts from 'echarts'
import { useEffect } from 'react'


// 支出
let expend = 120
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
            </div>
        </div>
    )
}

const PreviewCard = () => {
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
                    top: '40%',
                    radius: ['40%', '70%'],
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
                    <div id="main" style={{ height: '250px' }}></div>
                </div>
            </div>
        </>
    )
}


export default Home
