const express = require("express");//express import
const mongoose = require("mongoose");
const dotenv= require("dotenv");
const mainRoute= require("./routes/index.js")
const cors = require('cors');
const logger = require("morgan");

const app = express();
const port = 5000 //port numarasını belirledik

dotenv.config();

const connet = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to mongoDb");
    } catch (error) {
        throw error;
    }
}

//middlewares
app.use(express.json());
app.use(cors());
app.use(logger("dev"));

app.use("/api",mainRoute)


app.listen(5000,()=>{
    connet();
    console.log(`Sunucu ${port} portunda  çalışıyor`);
})