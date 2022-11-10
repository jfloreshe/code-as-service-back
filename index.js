const express = require('express');
const cors = require('cors');
const router = require('./routes');
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req,res) => {
    res.send('Welcome to code as a service');
})

router(app);

app.listen(4000);