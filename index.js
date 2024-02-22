import 'dotenv/config.js'
import express from 'express'

import { PostgresHelper } from './src/db/postgres/helper.js'

const app = express()
const PORT = 3000

app.get('/', async (req, res) => {
    const results = await PostgresHelper.query('SELECT * FROM users;')

    res.send(JSON.stringify(results))
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
