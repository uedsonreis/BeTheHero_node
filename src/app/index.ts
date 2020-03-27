import express from 'express'
import cors from 'cors'
import { errors } from 'celebrate'

import routes from './router'

const service = express()

service.use(cors())
service.use(express.json())
service.use('/', routes)
service.use(errors())

export default service