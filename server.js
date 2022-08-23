import express from "express";
import { router as cityRouter } from "./routers/cityRouter.js"
import { router as weatherRouter } from "./routers/weatherRouter.js"

const app = express();
const port = 3000;



app.use(express.json());

app.use("/api/city", cityRouter);

app.use("/api/weather", weatherRouter);


app.listen( port, () => {
    console.log("Server is running on port: " + port)
})