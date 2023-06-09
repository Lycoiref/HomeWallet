import { FaTshirt, FaBus, FaPhoneAlt, FaBriefcaseMedical, FaToiletPaper, FaHouseUser, FaBars } from 'react-icons/fa'
import { AiOutlineMoneyCollect, AiFillRedEnvelope, AiFillCreditCard } from 'react-icons/ai'
import { MdFastfood, MdWaterDrop } from 'react-icons/md'
import { BiBookReader } from 'react-icons/bi'
import { RiMoneyCnyBoxFill } from 'react-icons/ri'
import { TbPigMoney } from 'react-icons/tb'

const ExpendIconList = [{
    icon: <i className="bi-egg-fried" />,
    title: '三餐'
}, {
    icon: <MdFastfood />,
    title: '零食'
}, {
    icon: <FaTshirt />,
    title: '衣服'
}, {
    icon: <FaBus />,
    title: '交通'
}, {
    icon: <FaPhoneAlt />,
    title: '话费网费'
}, {
    icon: <BiBookReader />,
    title: '学习'
}, {
    icon: <MdWaterDrop />,
    title: '水电煤'
}, {
    icon: <FaBriefcaseMedical />,
    title: '医疗'
}, {
    icon: <FaToiletPaper />,
    title: '日用品'
}, {
    icon: <FaHouseUser />,
    title: '住房'
}, {
    icon: <FaBars />,
    title: '其他'
}]

const RevenueIconList = [{
    icon: <AiOutlineMoneyCollect />,
    title: '工资'
}, {
    icon: <RiMoneyCnyBoxFill />,
    title: '生活费'
}, {
    icon: <AiFillRedEnvelope />,
    title: '红包'
}, {
    icon: <AiFillCreditCard />,
    title: '外快'
}, {
    icon: <TbPigMoney />,
    title: '理财'
}, {
    icon: <FaBars />,
    title: '其他'
}]

export { ExpendIconList, RevenueIconList }
