import Koa from 'koa'
import serve from 'koa-static'
import koaBody from "koa-body"
import Router from "koa-router"
import cors from '@koa/cors'
import { promises as fs } from 'fs'
import path from "path"

const DIR = "./local"

const app = new Koa();
const router = new Router()

router.post('/read', koaBody(), async ctx => {
    try {
        const { filename } = ctx.request.body
        ctx.body = await fs.readFile(path.join(DIR, filename), "utf-8")
    } catch (e) {
        console.log(e)
        ctx.status = 500
        ctx.body = JSON.stringify({ "status": "ng", "detail": e.message })
    }
})

router.post('/write', koaBody(), async ctx => {
    try {
        const { filename, text } = ctx.request.body
        await fs.writeFile(path.join(DIR, filename), text, "utf-8")
        ctx.body = JSON.stringify({ "status": "ok" })
    } catch (e) {
        console.log(e)
        ctx.status = 500
        ctx.body = JSON.stringify({ "status": "ng", "detail": e.message })
    }
})

router.post('/get', koaBody(), async ctx => {
    ctx.body = JSON.stringify(ctx.request.body)
})

router.post('/set', koaBody(), async ctx => {
    ctx.body = JSON.stringify(ctx.request.body)
})

app.use(serve('./build'));
app.use(cors());
app.use(router.routes())
app.listen(6549, () => process.stdout.write('Web server started at port 6549\n'))