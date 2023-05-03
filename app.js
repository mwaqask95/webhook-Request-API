const express = require('express');
const bodyParser = require('body-parser')
const { WebhookClient } = require('dialogflow-fulfillment');
const { request } = require('express');
const { response } = require('express');
const axios = require("axios");
const app = express();
app.use(bodyParser.json())
const port = process.env.PORT || 3000

app.post('/dialogflow-fulfillment', (request, response) => {
    dialogflowFulfillment(request, response)
});
app.listen(port, async() => {
    console.log(`listening on ${port}`)

    // fetch("https://storage.googleapis.com/interactcx_public/public/OrderStatusAPI.postman_collection.json").then(function(response){
    //         return response.json()
    //     }).then(function(data){
    //         console.log(data.item[0].response)
    //     })




})

const dialogflowFulfillment = async(request, response) => {
    const agent = new WebhookClient({ request, response })
    const product = agent.parameters.product
    const size = agent.parameters.Size
    const location = agent.parameters.location["street-address"]

    console.log("Order Received");

    var reply = `Your order of ${product} of Size ${size} has been successfully placed. The Product will be Delivered by 7-May-2023 on your address: ${location}`;
    // const setResponse = await fetch(, {
    //     method: 'POST',
    //     headers: {
    //         Authorization: "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjp7ImxlZ2FjeUlkIjoiQWRtaW5pc3RyYXRvciIsImlkIjoiMTFlYjAzNDUtZmRhZS1hNTAwLTgyMjktMDI0MmFjMTEwMDAyIiwibGFzdFVwZGF0ZVRpbWUiOjE2ODE0MTI2NjIwMDAsInNlY29uZGFyeVJvbGVzIjpbXX0sInZpZXdzIjp7fSwiaWNBZ2VudElkIjoiMzAxNDYxNzIiLCJpY1NQSWQiOiI4ODIiLCJzdWIiOiJ1c2VyOjExZWM4YTc3LTgyMzMtZDhlMC04ZWQwLTAyNDJhYzExMDAwMiIsImlzcyI6Imh0dHBzOi8vYXV0aC5uaWNlLWluY29udGFjdC5jb20iLCJnaXZlbl9uYW1lIjoiV2FxcWFzIiwiYXVkIjoiRGV2ZWxvcGVyUG9ydGFsQE5JQ0VpbkNvbnRhY3QgSW5jLiIsImljQlVJZCI6NDU5OTMyMCwibmFtZSI6IndhcXFhcy5raGFuYjMyQGludGVyYWN0Y3guY29tIiwidGVuYW50SWQiOiIxMWVhYzc2OC1hYmRlLWU4MjAtYjM3Ny0wMjQyYWMxMTAwMDMiLCJmYW1pbHlfbmFtZSI6IktoYW4iLCJ0ZW5hbnQiOiJpbnRlcmFjdF9zZXJ2aWNlc19sbGNfYjMyX2Rldm9uZTY4OTU4MzEyIiwiaWNDbHVzdGVySWQiOiJCMzIiLCJpYXQiOjE2ODMxNDE1NTQsImV4cCI6MTY4MzE0NTE1NH0.TwnNGolMtSVTBh2JdBdetcTv9kmSLDrqP7gHyM9cCOIpBFLFIRVqqozzbmPJsk07rf5J9_GW03sx9Ads1VqIMj6zS_w037homB9R3fu9IVYr7ZxLnvLb96j0DBHp9dsgAXRhtf63GSb0tDOAgbNv0dqznpkgoj2TnOqu_uNEwE0"
    //     }
    // });

    const url = 'https://api-b32.nice-incontact.com/incontactapi/services/v26.0/scripts/169311871/start?skillId=10574130&parameters=' + reply;
    let config = {
        headers: {
            "Authorization": `bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjp7ImxlZ2FjeUlkIjoiQWRtaW5pc3RyYXRvciIsImlkIjoiMTFlYjAzNDUtZmRhZS1hNTAwLTgyMjktMDI0MmFjMTEwMDAyIiwibGFzdFVwZGF0ZVRpbWUiOjE2ODE0MTI2NjIwMDAsInNlY29uZGFyeVJvbGVzIjpbXX0sInZpZXdzIjp7fSwiaWNBZ2VudElkIjoiMzQ2MTU0OTQiLCJpY1NQSWQiOiI4ODIiLCJzdWIiOiJ1c2VyOjExZWQ0ZGY4LTcwOTAtMGJmMC04YzFlLTAyNDJhYzExMDAwNCIsImlzcyI6Imh0dHBzOi8vYXV0aC5uaWNlLWluY29udGFjdC5jb20iLCJnaXZlbl9uYW1lIjoiSGFzYW4iLCJhdWQiOiJEZXZlbG9wZXJQb3J0YWxATklDRWluQ29udGFjdCBJbmMuIiwiaWNCVUlkIjo0NTk5MzIwLCJuYW1lIjoiaGFzYW4uc2hlaHplYmIzMkBpbnRlcmFjdGN4LmNvbSIsInRlbmFudElkIjoiMTFlYWM3NjgtYWJkZS1lODIwLWIzNzctMDI0MmFjMTEwMDAzIiwiZmFtaWx5X25hbWUiOiJTaGVoemViIiwidGVuYW50IjoiaW50ZXJhY3Rfc2VydmljZXNfbGxjX2IzMl9kZXZvbmU2ODk1ODMxMiIsImljQ2x1c3RlcklkIjoiQjMyIiwiaWF0IjoxNjgzMTQxNDIxLCJleHAiOjE2ODMxNDUwMjF9.J3tsOO0WIhckBnHNhbTNZvipps1ZFbi9Dx4Pmfn4fMnoFWwvXGz-CcFtiziqs0DVLj_54ozRKIf0yX0j01V4_73qL0hySIhGzSloBR3D8EinkxoWgsc_19r5b4lmNwNLguJEM3YPdhIHpubDx_QGU3oHmVfrLXR8vQQPruhpocg`
        }
    }

    const setResponse = await axios.post(url, {}, config);


    function sayhello(agent) {
        agent.add(reply)
    }
    let intentMap = new Map();
    intentMap.set("ShippingAddress", sayhello)
    agent.handleRequest(intentMap);
}