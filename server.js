import Express from "express";
import fetch from 'node-fetch';
import { geoNamesUserName } from "./apiKeys.js"
import makeRequest from "./request.js";

const app = Express();
const port = 3000;


app.get("/", (req, res) => {


    res.send("Hello värld")

})


app.get("/api/city/:city", async (req, res) => {

    try {

        let response = await makeRequest(`http://api.geonames.org/searchJSON?username=${geoNamesUserName}&featureClass=P&country=SE&maxRows=5&name_startsWith=${req.params.city}`)

        res.json(response)

    } catch(e) {
        console.error(e)
    }

})

app.get("/api/weather/:long/:lat", async (req, res) => {

    try {

        let response = await makeRequest(`https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${req.params.long}/lat/${req.params.lat}/data.json`);

        res.json(response)

    } catch(e) {
        console.error(e)
    }

})




app.listen( port, () => {
    console.log("Server is running on port: " + port)
})