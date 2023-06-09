import { PrismaClient } from "@prisma/client"

const ExpendIconList = [{
    title: '三餐'
}, {
    title: '零食'
}, {
    title: '衣服'
}, {
    title: '交通'
}, {
    title: '话费网费'
}, {
    title: '学习'
}, {
    title: '水电煤'
}, {
    title: '医疗'
}, {
    title: '日用品'
}, {
    title: '住房'
}, {
    title: '其他'
}]

const prisma = new PrismaClient()

async function main() {
    for (const icon of ExpendIconList) {
        await prisma.category.create({
            data: {
                name: icon.title,
                type: 'expend',
            },
        })
    }
}

main()
