import Koa from 'koa'
import cors from '@koa/cors'
import Router from 'koa-router'
import React from 'react'
import ReactDomServer from 'react-dom/server'

const app = new Koa()
const router = new Router()

router.post('/test', (ctx) => {
    const element = React.createElement('div', null, 'Hello World')
    ctx.body = ReactDomServer.renderToString(element)
})

router.get('/test', (ctx) => {
    const element = React.createElement('div', null, 'Hello World')
    ctx.body = ReactDomServer.renderToString(element)
})

router.get('/api/main', (ctx) => {
    ctx.body = {
        monthTotalExpenses: 120,
        monthTotalIncome: 2000,
    }
})

app.use(cors())
app.use(router.routes())

app.listen(3000, () => {
    console.log('Server listening on port 3000')
})
