const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors')

connectToMongo();

const app = express();
const port = 5500;

app.use(express.json());
app.use(cors());

// Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, ()=>{
    console.log(`notro app backend listening at http://localhost:${port}`)
})
