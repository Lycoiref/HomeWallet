import Koa from 'koa'
import cors from '@koa/cors'
import Router from 'koa-router'
import React from 'react'
import ReactDomServer from 'react-dom/server'
import { PrismaClient } from '@prisma/client'

const app = new Koa()
const router = new Router()
const prisma = new PrismaClient()

router.post('/test', (ctx) => {
    const element = React.createElement('div', null, 'Hello World')
    ctx.body = ReactDomServer.renderToString(element)
})

router.get('/test', (ctx) => {
    const element = React.createElement('div', null, 'Hello World')
    ctx.body = ReactDomServer.renderToString(element)
})

/* Record 数据库模型
*  model record {
*      id          Int      @id @default(autoincrement())
*      type        String
*      amount      Decimal  @db.Decimal
*      date        DateTime
*      description String?
*      category    category @relation(fields: [category_id], references: [id])
*      category_id Int
*      user        user     @relation(fields: [user_id], references: [id])
*      user_id     Int
*  }
*/
router.get('/api/main', async (ctx) => {
    // 从数据库中取出Record数据
    let records = await prisma.record.findMany({
        include: {
            category: true,
        },
    })
    // 去除非本月的数据
    let recordThisMonth = records.filter((record) => {
        return (record.date.getMonth() === new Date().getMonth() && record.date.getFullYear() === new Date().getFullYear())
    })
    // 按照时间顺序排序
    recordThisMonth.sort((a, b) => {
        return b.date - a.date
    })
    // 取出最近三次的数据
    const recentRecords = recordThisMonth.slice(0, 20)
    // 按照类别分类
    const categoryList = []
    recordThisMonth.forEach((record) => {
        if (categoryList[record.category.name] === undefined) {
            categoryList[record.category.name] = []
        }
        categoryList[record.category.name].push(record)
    })
    // 计算每个类别的收入和支出
    const categoryIncome = []
    const categoryExpend = []
    for (const category in categoryList) {
        let income, expend
        income = expend = 0
        categoryList[category].forEach((record) => {
            if (record.type === 'income') {
                income += Number(record.amount)
            } else {
                expend += Number(record.amount)
            }
        })
        categoryIncome.push({
            name: category,
            value: income,
        })
        categoryExpend.push({
            name: category,
            value: expend,
        })
    }
    // 将categoryIncome和categoryExpend按照value排序
    categoryIncome.sort((a, b) => {
        return b.value - a.value
    })
    categoryExpend.sort((a, b) => {
        return b.value - a.value
    })
    const categoryExpendTop5 = categoryExpend.slice(0, 5)
    // 计算本月收入和支出
    let income, expend
    income = expend = 0
    recordThisMonth.forEach((record) => {
        if (record.type === 'income') {
            income += Number(record.amount)
        } else {
            expend += Number(record.amount)
        }
    })
    expend = expend.toFixed(2)
    income = income.toFixed(2)
    console.log(recentRecords)
    ctx.body = { expend, income, categoryExpendTop5, recentRecords }
})

app.use(cors())
app.use(router.routes())

app.listen(3000, () => {
    console.log('Server listening on port 3000')
})
