import './Tally.less'
import axios from 'axios'
import { useState } from "react"
import { Link } from "react-router-dom"
import { BsFillBackspaceFill } from 'react-icons/bs'
import { ExpendIconList, RevenueIconList } from '../IconList'


const Tally = () => {
    const [nav, setNav] = useState(1)
    const changeNav = (navId) => {
        return () => {
            setNav(navId)
        }
    }
    return (
        <div className="tally">
            <div className="top-bar">
                <div className="close-icon">
                    <Link to="/">
                        <i className="bi-x-lg no-style"></i>
                    </Link>
                </div>
                <div className="nav-bar">
                    <div className={`nav-item ${nav === 1 ? 'active-item' : ''}`} onClick={changeNav(1)}>
                        支出
                    </div>
                    <div className={`nav-item ${nav === 2 ? 'active-item' : ''}`} onClick={changeNav(2)}>
                        收入
                    </div>
                </div>
                <div className="add-item">
                    <Link to="/add_item">
                        <i className="bi-plus-square-fill no-style"></i>
                    </Link>
                </div>
            </div>
            <div className="body">
                {(nav === 1) && <ExpenditureList />}
                {(nav === 2) && <RevenueList />}
            </div>
            <div className="input-box">
                <UserKeyboard />
            </div>
        </div>
    )
}

const ExpenditureList = () => {
    const selectItem = (index) => {
        const itemList = document.querySelectorAll('.item')
        const activeItem = document.querySelector(`#item${index}`)
        itemList.forEach(item => {
            item.classList.remove('item-active')
        })
        activeItem.classList.add('item-active')
    }
    const expendItem = ExpendIconList.map((item, index) => {
        return (
            <div className={"item" + (index === 0 ? ' item-active' : '')} id={`item${index}`} key={item.title} onClick={() => selectItem(index)}>
                <div className="icon">
                    {item.icon}
                </div>
                <div className="title">{item.title}</div>
            </div>
        )
    })
    return (
        <>
            <div className="expenditure-list item-list">
                {expendItem}
            </div>
        </>
    )
}

const RevenueList = () => {
    const selectItem = (index) => {
        const itemList = document.querySelectorAll('.item')
        const activeItem = document.querySelector(`#item${index}`)
        itemList.forEach(item => {
            item.classList.remove('item-active')
        })
        activeItem.classList.add('item-active')
    }
    const revenueItem = RevenueIconList.map((item, index) => {
        return (
            <div className={"item" + (index === 0 ? ' item-active' : '')} id={`item${index}`} key={item.title} onClick={() => selectItem(index)}>
                <div className="icon">
                    {item.icon}
                </div>
                <div className="title">{item.title}</div>
            </div>
        )
    })
    return (
        <>
            <div className="revenue-list item-list">
                {revenueItem}
            </div>
        </>
    )
}

const UserKeyboard = () => {
    const [value, setValue] = useState(0)
    const submitRecord = async () => {
        const navItem = document.querySelector('.active-item')
        const remark = document.querySelector('.remark')
        const category = document.querySelector('.item-active > .title')
        const remarkValue = remark.value
        const categoryValue = category.innerText
        const recordType = navItem.innerText
        console.log(navItem)
        const data = {
            type: (recordType === '支出' ? 'expend' : 'income'),
            date: new Date().toISOString(),
            amount: value,
            description: remarkValue,
            category: categoryValue,
            user_id: 1
        }
        // console.log(data)
        await axios.post('http://localhost:3000/api/record', {
            data: data
        })
    }
    return (
        <>
            <div className="keyboard">
                <div className="value-row">
                    <input className="remark" type="text" placeholder="点击输入备注" />
                    <div className="value">{value.toFixed(1)}</div>
                </div>
                <div className="row">
                    <div className="col keyboard-button" onClick={() => setValue(value * 10 + 1)}>1</div>
                    <div className="col keyboard-button" onClick={() => setValue(value * 10 + 2)}>2</div>
                    <div className="col keyboard-button" onClick={() => setValue(value * 10 + 3)}>3</div>
                    <div className="col keyboard-button">
                        <BsFillBackspaceFill onClick={() => setValue(Math.floor(value / 10))} />
                    </div>
                </div>
                <div className="row">
                    <div className="col keyboard-button" onClick={() => setValue(value * 10 + 4)}>4</div>
                    <div className="col keyboard-button" onClick={() => setValue(value * 10 + 5)}>5</div>
                    <div className="col keyboard-button" onClick={() => setValue(value * 10 + 6)}>6</div>
                    <div className="col keyboard-button" onClick={() => setValue(-Math.abs(value))}>-</div>
                </div>
                <div className="row">
                    <div className="col keyboard-button" onClick={() => setValue(value * 10 + 7)}>7</div>
                    <div className="col keyboard-button" onClick={() => setValue(value * 10 + 8)}>8</div>
                    <div className="col keyboard-button" onClick={() => setValue(value * 10 + 9)}>9</div>
                    <div className="col keyboard-button" onClick={() => setValue(Math.abs(value))}>+</div>
                </div>
                <div className="row">
                    <div className="col keyboard-button" onClick={() => setValue(0)}>清除</div>
                    <div className="col keyboard-button" onClick={() => setValue(value * 10)}>0</div>
                    <div className="col keyboard-button">.</div>
                    <div className="col keyboard-button confirm-button" onClick={submitRecord}>确定</div>
                </div>
            </div>
        </>
    )
}


export default Tally
