import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRouter from "./routes/posts.js"
import userRouter from "./routes/user.js" 


const app = express();

// app.use(bodyParser.json({ limit: '30mb', extended: true }))
// app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(express.urlencoded({limit: '30mb', extended: true })); //Additional point when bodyParser is deprecated
app.use(express.json({ limit: '30mb', extended: true}));
app.use(cors());

app.use("/posts" , postRouter)
app.use('/users', userRouter) 


const CONNECTION_URL = 'mongodb+srv://IlkinNazarov:ilkin555@memories.8ahn5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }) //Making connection with mongo DB and if it is successful our server will start listening
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

