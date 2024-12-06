require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Parse JSON bodies
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('common'));

// Start the server
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

app.get("/", (req, res) => {
    res.send("MPESA CALLBACK URL WORKING!!");
});

app.post("/api/mpesa/callback", (req, res) => {
    const callbackData = req.body;

    console.log("Callback Received:", callbackData);

    // Handle payment success or failure
    if (callbackData.Body.stkCallback.ResultCode === 0) {
        console.log("Payment Successful:", callbackData.Body.stkCallback.CallbackMetadata);
    } else {
        console.log("Payment Failed:", callbackData.Body.stkCallback.ResultDesc);
    }

    // Send a 200 response to MPESA to acknowledge the callback
    res.status(200).send("Callback received");
});