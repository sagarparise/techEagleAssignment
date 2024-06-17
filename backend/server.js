const dotenv = require('dotenv')
const path = require('path')
dotenv.config()
const express = require('express')
const app = express();
const cors = require('cors');
const connectionDb = require('./config/db');
const userRouter = require('./routes/authRoute');
const todoRouter = require('./routes/todoRoute');
const port = process.env.PORT || 3000
// middleware
//lTwebSbMUhsMGDE9
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  app.use(express.static(path.resolve(__dirname, "frontend", "dist" )));
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
})

//end points
app.use('/api/auth', userRouter)
app.use('/api/todo', todoRouter)

app.listen(port, () => {
  console.log(`server listening on port ${port}`)
  connectionDb()
})