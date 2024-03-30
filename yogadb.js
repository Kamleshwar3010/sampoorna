const mongoose = require("mongoose");
require("dotenv").config()
mongoose.connect(process.env.mongodb_url).then(() => console.log("Sucessfull")).catch((err) => console.log(err));

const yogaschema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        length: 25
    },
    image: {
        type: Array
    },
    description: {
        type: String,
        required: true,
        length: 10000
    },
    categories: {
        type: String,
        required: true
    },
    Tags: {
        type: Array
    },
    benifits: {
        Type: String
    }
})
const yoga = new mongoose.model("yoga", yogaschema);
module.exports = yoga;
