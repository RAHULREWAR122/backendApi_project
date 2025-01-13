import express from 'express';
import dotenv  from 'dotenv';
import cors   from 'cors';
import {db} from "./mongoose/mongoose.js"
import router from './Routes/route.js';

dotenv.config();


const app = express();

app.use(express.json());
app.use(cors());

app.use(router)

const PORT =  5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
