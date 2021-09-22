const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const PORT = config.get('port') || 5000;

const app = express();

app.use(express.json());
app.use('/api/auth', require('./routers/authRouter'));
app.use('/api/todoList', require('./routers/todoListRouter'));
app.use('/api/todo', require('./routers/todoRouter'));

async function startServer(){
    try {
        await mongoose.connect(config.get('mongoUri'), {});
        app.listen(PORT, () => {
            console.log('\n----------App has been started on port ' + PORT + '\n');
        })
    } catch (error) {
        console.log("Server error: ", error.messege);
        process.exit(1);
    }
}

startServer();