import dotenv from 'dotenv'
import express from 'express'
import { ExpressServer } from './infrastructure/server'
import { db_connect } from './infrastructure/database/db'

dotenv.config()

const port = process.env.PORT ?? 8080

const app = express()

const server = new ExpressServer()

server.config(app)


server.startServer(app,port,() => db_connect(process.env.DB_CONNECTION_STRING ?? '') )
