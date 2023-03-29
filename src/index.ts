import express from 'express';
import { heroeRoute } from './heroe/heroe.routes';
import { villianRoute } from './villian/villian.routes';
import { AppDataSource } from "../datasource";

const port = 3000;
const app = express();

app.use(express.json());

app.use('/heroe', heroeRoute);
app.use('/villian', villianRoute);

app.listen(port, () => {
    console.log(`The application is listening on port ${port}!`);
});// here you can start to work with your database
 