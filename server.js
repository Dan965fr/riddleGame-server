import express from 'express';
import riddleRoutes from './routs/riddlesRoutes.js'
import playersRoutes from "./routs/playersRoutes.js";
import userRoutes from './routs/userRoutes.js';
import {logger} from './middleware/logger.js'
import { config } from 'dotenv';
config();



const app = express();
const PORT = 3007;

app.use(express.json());
app.use(logger);


app.use('/riddles',riddleRoutes);
app.use('/players', playersRoutes);
app.use('/api/users',userRoutes)


// for bad routs
app.use((req,res)=>{
    res.status(404).json({error:`rout not found`})
})
    


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
