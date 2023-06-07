import './Setting.less'

const Setting = () => {
    return (
        <>
            <div className="setting">
                <SettingBar />
                <div className="body">
                    <div className="user-avatar">
                        <div className="user-avatar-img">
                        </div>
                    </div >
                    <div className="setting-item">
                        <div className="setting-item-title">账号</div>
                        <div className="setting-item-content">
                            <div className="setting-item-content-text">123456789</div>
                        </div>
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

export default Setting
