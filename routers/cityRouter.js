import express from "express";
import { geoNamesUserName } from "../apiKeys.js"
import makeRequest from "../request.js";


export const router = express.Router();


router.get("/:city", async (req, res) => {

    try {

        let response = await makeRequest(`http://api.geonames.org/searchJSON?username=${geoNamesUserName}&featureClass=P&country=SE&maxRows=5&name_startsWith=${req.params.city}`)

        let cityList = []

        response.geonames.map((city) => {

            let foundCity = cityList.find(cityFromList => cityFromList.name == city.toponymName);

            if(!foundCity) {
                let CityObject = {
                    name: city.toponymName,
                    region: city.adminName1,
                    long: city.lng,
                    lat: city.lat,
                }
    
                cityList.push(CityObject)
            }

        })

        res.json(cityList)

    } catch(err) {
        console.error(err)
        res.status(err.status).json(err.message)
    }

})