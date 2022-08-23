import express from "express";
import makeRequest from "../request.js";
import { nanoid } from "nanoid";


export const router = express.Router();



router.get("/:long/:lat", async (req, res) => {

    try {

        let response = await makeRequest(`https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${req.params.long}/lat/${req.params.lat}/data.json`);

        let weatherList = [];

        response.timeSeries.map((timeStamp) => {

            let weatherObject = {}
            weatherObject.id = nanoid();

            let time = new Date(timeStamp.validTime)

            let hour = time.getHours()
            weatherObject.hour = hour

            let date = time.getDate()
            weatherObject.date = date

            timeStamp.parameters.map((parameter) => {
                
                
                if(parameter.name == "t") {
                    weatherObject.temp = parameter.values[0];
                } else if(parameter.name = "Wsymb2") {
                    weatherObject.symbol = parameter.values[0];
                }
            })

            weatherList.push(weatherObject)
        })

        res.json(weatherList)

    } catch(e) {
        console.error(e)
    }

})