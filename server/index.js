import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import Connection from './database/db.js';
import Routes from './routes/Routes.js';


dotenv.config();
const app = express();

const PORT = 8000;

const username = process.env.vikram;
const password = process.env.vikramnaik;

Connection(username, password);

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
const corsOptions = {
    origin: 'https://frontend-b3d8kq6xy-phoenix043.vercel.app',
    optionsSuccessStatus: 200,
  };
  
  app.use(cors(corsOptions));
  
app.use('/', Routes);