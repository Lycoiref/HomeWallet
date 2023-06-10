import { PrismaClient } from "@prisma/client"

const RevenueIconList = [{
    title: '工资'
}, {
    title: '生活费'
}, {
    title: '红包'
}, {
    title: '外快'
}, {
    title: '理财'
}, {
    title: '其他'
}]

const prisma = new PrismaClient()

async function main() {
    for (const icon of RevenueIconList) {
        await prisma.category.create({
            data: {
                name: icon.title,
                type: 'income',
            },
        })
    }
}

main()
