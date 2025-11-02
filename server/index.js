import express from "express"
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import cookieParser from "cookie-parser"
import morgan from "morgan"
import helmet from "helmet"
import connectDB from "./src/config/db.js"
import authRoutes from './src/router/user.routes.js'
import categoryRouter from "./src/router/category.route.js"
import uploadRouter from "./src/router/upload.router.js"
import subCategoryRouter from "./src/router/subCategory.route.js"

const app = express()
process.setMaxListeners(15)

// Body parsing middleware first
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))

app.use(cookieParser())
app.use(morgan('combined'))
app.use(helmet({
    crossOriginResourcePolicy: false
}))

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.json({message : 'Hello World!'})
})

app.use('/api/user', authRoutes)
app.use('/api/category', categoryRouter)
app.use('/api/file',uploadRouter)
app.use('/api/subcategory', subCategoryRouter)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
})