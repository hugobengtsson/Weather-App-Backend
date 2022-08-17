import fetch from 'node-fetch';


export default async function makeRequest(url) {

    let response = await fetch(url);
    let result = await response.json();

    return result;

}