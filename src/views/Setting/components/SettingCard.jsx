const getSettingCard = () => {
    const baseInfoArray = [
        {
            title: '昵称',
            content: 'Lycoiref'
        }, {
            title: '性别',
            content: '男'
        }, {
            title: '账号',
            content: '123456789'
        }, {
            title: '手机号',
            content: '10000000000'
        }, {
            title: '邮箱',
            content: '1808347356@qq.com'
        }
    ]
    const privacyInfoArray = [
        {
            title: '身份证号',
            content: '123456789012345678'
        }, {
            title: '教育程度',
            content: '本科'
        }, {
            title: '生日',
            content: '2000-01-01'
        }, {
            title: '职业',
            content: '学生'
        }, {
            title: '婚姻状况',
            content: '未婚'
        }, {
            title: '房贷',
            content: '无'
        }
    ]
    const baseInfo = baseInfoArray.map((item, index) => {
        return (
            <div className="flex-row" key={index}>
                <div className="flex-col">
                    <div className="setting-title">{item.title}</div>
                </div>
                <div className="flex-col">
                    <div className="setting-content">
                        <div className="text">{item.content}</div>
                        <i className="bi-chevron-right"></i>
                    </div>
                </div>
            </div>
        )
    })
    const privacyInfo = privacyInfoArray.map((item, index) => {
        return (
            <div className="flex-row" key={index}>
                <div className="flex-col">
                    <div className="setting-title">{item.title}</div>
                </div>
                <div className="flex-col">
                    <div className="setting-content">
                        <div className="text">{item.content}</div>
                        <i className="bi-chevron-right"></i>
                    </div>
                </div>
            </div>
        )
    })
    return { baseInfo, privacyInfo }
}

export default getSettingCard
