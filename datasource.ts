import "reflect-metadata";
import { DataSource } from "typeorm";
import { Heroe } from "./src/models/heroe.entity";
import { Villian } from "./src/models/villian.entity";

export const AppDataSource = new DataSource({
    type: "mssql",
    host: "localhost",
    port: 1433,
    username: "sa",
    password: "Sa123456",
    database: "backendalterna",
    entities: [Heroe, Villian],
    synchronize: false,
    logging: false,
    options: { encrypt: false },
})

AppDataSource.initialize()
    .then(() => {
        
    })
    .catch((error) => console.log(error))