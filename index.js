//express 
//cors 
// pg pg-hstore  (DB Postgres)
//sequelize (ORM) 
//dotenv переменные окружения
require('dotenv').config();
const express = require('express')
const cors = require('cors');
const sequelize = require('./db.js')
const models = require('./models/models.js')
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`Server started on ${PORT} port`);
        })
    } catch (error) {
        console.log(error);
    }
    
}
start();
