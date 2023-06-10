// generator client {
//     provider = "prisma-client-js"
// }

// datasource db {
//     provider = "postgresql"
//     url      = env("DATABASE_URL")
// }

// model settings {
//     id      Int      @id @default(autoincrement())
//     expend  Decimal? @default(0) @db.Decimal
//     income  Decimal? @default(0) @db.Decimal
//     user    user     @relation(fields: [user_id], references: [id])
//     user_id Int      @unique
// }

// model user {
//     id         Int       @id @default(autoincrement())
//     email      String    @unique
//     name       String?
//     password   String?
//     gender     String?
//     birthday   DateTime?
//     identity   String?
//     phone      String?
//     education  String?
//     job        String?
//     marriage   String?
//     house_loan Decimal?
//     settings   settings?
//     record     record[]
// }

// model category {
//     id     Int      @id @default(autoincrement())
//     name   String
//     type   String
//     icon   String?
//     record record[]
// }

// model record {
//     id          Int      @id @default(autoincrement())
//     type        String
//     amount      Decimal  @db.Decimal
//     date        DateTime
//     description String?
//     category    category @relation(fields: [category_id], references: [id])
//     category_id Int
//     user        user     @relation(fields: [user_id], references: [id])
//     user_id     Int
// }
// 根据上面的模型定义生成Mock的Record数据
import mockjs from "mockjs";
import { PrismaClient } from "@prisma/client";

const RecordList = mockjs.mock({
    "list|100": [{
        "id|+1": 1,
        "amount|1-1000.2": 1,
        "date": "@date",
        "description": "@cparagraph(1)",
        "category_id|1-17": 1,
        "user_id|1": 1
    }]
}).list;

const prisma = new PrismaClient();

async function main() {
    for (const record of RecordList) {
        // 根据category_id获取category的type
        const category = await prisma.category.findUnique({
            where: {
                id: record.category_id
            }
        });
        record.type = category.type;
        // 将date转换为Date类型
        record.date = new Date(record.date);
        await prisma.record.create({
            data: {
                type: record.type,
                amount: record.amount,
                date: record.date,
                description: record.description,
                category_id: record.category_id,
                user_id: record.user_id
            }
        });
    }
}

main()
