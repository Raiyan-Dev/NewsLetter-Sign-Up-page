const express = require("express");
const bodyParser = require("body-parser");
const {
    urlencoded
} = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function (req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const emailId = req.body.emailId;

    const data = {
        members: [{
            email_address: emailId,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us10.api.mailchimp.com/3.0/lists/a93eb0feb0"
    const options = {
        method: "POST",
        auth: "khanraiyan42@gmail.com:ec93f2113d8bbcdd44131ca31537f607-us10"
    }
    const request = https.request(url, options, function (response) {
        if (response.statusCode === 200){
            res.sendFile(__dirname + "/index1.html");
        } else{
            res.sendFile(__dirname + "/index2.html");
        }
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req, res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function (req, res) {
    console.log("Server is running on port: 3000!");
})

// API Key
// ec93f2113d8bbcdd44131ca31537f607-us10

// List ID
// a93eb0feb0