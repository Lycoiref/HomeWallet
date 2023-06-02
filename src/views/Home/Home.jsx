import './Home.less'
// 引入bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
// 引入bootstrap-icons
import 'bootstrap-icons/font/bootstrap-icons.css'
import { Link } from 'react-router-dom'

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
            </div>
        </div>
    )
}

const PreviewCard = () => {
    return (
        <div className="card">
            <div className="content">
                <div className="item">
                    <div className="item-title">本月支出</div>
                    <div className="item-value"></div>
                </div>
                <div className="item">
                    <div className="item-title"></div>
                    <div className="item-value"></div>
                </div>
                <div className="item">
                    <div className="item-title"></div>
                    <div className="item-value"></div>
                </div>
            </div>
            <div className="footer">
                <div className="content">
                    <Link className="link" to="/detail">
                        <i className="bi-bar-chart-steps"></i>详细查询
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home
