import express from "express";
import { nanoid } from "nanoid";
import { geoNamesUserName } from "../apiKeys.js"
import makeRequest from "../request.js";



export const router = express.Router();


router.get("/getcity/:city", async (req, res) => {

    try {

        let response = await makeRequest(`http://api.geonames.org/searchJSON?username=${geoNamesUserName}&featureClass=P&country=SE&maxRows=5&name_startsWith=${req.params.city}`)

        let cityList = []

        response.geonames.map((city) => {

            let foundCity = cityList.find(cityFromList => cityFromList.name == city.toponymName);

            if(!foundCity) {
                let CityObject = {
                    cityName: city.toponymName,
                    region: city.adminName1,
                    long: city.lng,
                    lat: city.lat,
                };
                cityList.push(CityObject);
            }

        })

        res.json(cityList);

    } catch(err) {
        res.status(err.status).json(err.message);
    }

})

let savedCities = [];

router.get("/favorites/all", (req, res) => {

    try {

        if(savedCities.length == 0) {
            res.send(false)
        } else {
            res.json(savedCities)
        }

    } catch(err) {
        res.status(400).json(err.message)
    }

})

router.post("/savecity", (req, res) => {

    try {

        if(!req.body) {
            res.send(false)
        }

        let foundIndex = savedCities.findIndex(city => city.cityName === req.body.cityName)

        if(foundIndex != -1) {
            throw new Error(false)
        }

        let newCity = req.body;
        newCity.id = nanoid();

        savedCities.push(newCity)

        res.json(true)

    } catch(err) {
        res.status(400).json(err.message)
    }

})

router.put("/updatecity", (req, res) => {

    try {

        let foundIndex = savedCities.findIndex(city => city.id === req.body.id);

        if(foundIndex == -1) {
            res.send(false)
        }

        savedCities[foundIndex].name = req.body.name;

        res.json(true)

    } catch(err) {
        res.status(400).json(err.message)
    }

})

router.delete("/removecity", (req, res) => {
    console.log("hello")
    try {

        let foundIndex = savedCities.findIndex(city => city.id === req.body.id);

        if(foundIndex == -1) {
            res.send(false)
        } else {
            savedCities.splice(foundIndex, 1)
            res.json(true)
        }


    } catch(err) {
        res.status(400).json(err.message)
    }

})