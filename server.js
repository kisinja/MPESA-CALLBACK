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

    const { CheckoutRequestID, MerchantRequestID, ResultCode, ResultDesc, Amount } = callbackData;

    // Log the response to debug
    console.log("Callback received:", callbackData);

    if (ResultCode === 0) {
        // Handle successful payment
        console.log(`Payment successful for ${Amount} with CheckoutRequestID: ${CheckoutRequestID}`);
    } else {
        // Handle failed payment
        console.log(`Payment failed: ${ResultDesc}`);
    }

    // Respond with a 200 status to acknowledge receipt
    res.status(200).send("Accepted");
});