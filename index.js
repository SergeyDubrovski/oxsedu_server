//express 
//cors 
// pg pg-hstore  (DB Postgres)
//sequelize (ORM) 
//dotenv переменные окружения
require('dotenv').config();
const express = require('express')
const cors = require('cors');
const sequelize = require('./db.js')
const models = require('./models/models.js');
const router = require('./routers/router.js');
const errorHandlingMiddleware = require('./middleware/ErrorHandlingMiddleware.js');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);

app.use(errorHandlingMiddleware); //middleware обработки ошибок подключается последнм в цепочке
const start = async () => {
    try {
        await sequelize.authenticate(); 
        await sequelize.sync();  // подключение БД
        app.listen(PORT, () => {
            console.log(`Server started on ${PORT} port`);
        })
    } catch (error) {
        console.log(error);
    }
    
}
start();
