import './Setting.less'
import getSettingCard from './components/SettingCard'
import axios from 'axios'
import { useEffect } from 'react'

const Setting = () => {
    useEffect(() => {
        (async () => {
            const res = await axios.post('http://localhost:3000/')
            console.log(res)
        })()
    })
    const { baseInfo, privacyInfo } = getSettingCard()
    return (
        <>
            <div className="setting">
                <SettingBar />
                <div className="body">
                    <div className="user-avatar">
                        <UserAvatar />
                    </div >
                    <div className="setting-card">
                        <div className="card-title">基本信息</div>
                        {baseInfo}
                    </div>
                    <div className="setting-card">
                        <div className="card-title">隐私信息</div>
                        {privacyInfo}
                    </div>
                </div >
            </div >
        </>
    )
}

const SettingBar = () => {
    return (
        <>
            <div className="top-bar">
                <div className="back-icon">
                    <i className="bi-arrow-left" onClick={() => window.history.back()}></i>
                </div>
                <div className="title">设置</div>
                <div className="save-icon">
                    <i className="bi-check2" onClick={() => window.history.back()}></i>
                </div>
            </div>
        </>
    )
}

const UserAvatar = () => {
    return (
        <>
            <div className="user-avatar-img">
                <i className="bi-person"></i>
            </div>
            <div className="username">Lycoiref</div>
        </>
    )
}

export default Setting
