import {connect} from "mongoose";
require('dotenv').config();

const { MONGO_URT, MONGO_DATABASE } = process.env;
const MONGO_BASE = `${MONGO_URT}/${MONGO_DATABASE}`;

(async () => {
    try{
        const db = await connect(MONGO_BASE);
        console.log("Db connected to", db.connection.name)
    } catch (error){
        console.log(error);
    }
})();

