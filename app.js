const express = require('express');
const bodyParser = require('body-parser')
const { WebhookClient } = require('dialogflow-fulfillment');
const { request } = require('express');
const { response } = require('express');
const app = express();
app.use(bodyParser.json())
const port = process.env.PORT || 3000

app.post('/dialogflow-fulfillment', (request, response) => {
    dialogflowFulfillment(request, response)
});
app.listen(port, async () => {
    console.log(`listening on ${port}`)

    // fetch("https://storage.googleapis.com/interactcx_public/public/OrderStatusAPI.postman_collection.json").then(function(response){
    //         return response.json()
    //     }).then(function(data){
    //         console.log(data.item[0].response)
    //     })


    

})

const dialogflowFulfillment = async (request, response) => {
    const agent = new WebhookClient({ request, response })
    const Order = agent.parameters.number

    const params = new URLSearchParams();
    params.append('orderId', Order);
    
    const response = await fetch('https://orderstatusapi-dot-organization-project-311520.uc.r.appspot.com/api/getOrderStatus', {method: 'POST', body: params});
    const data = await response.json();
    
    console.log(data.shipmentDate);
    function sayhello(agent) {
            agent.add("Your order " + Order+" will be shipped on "+data.shipmentDate)
    }
    let intentMap = new Map();
    intentMap.set("orderDetail", sayhello)
    agent.handleRequest(intentMap);
} 
