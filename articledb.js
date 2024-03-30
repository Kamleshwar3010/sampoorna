const mongoose = require("mongoose");
require("dotenv").config()
mongoose.connect(process.env.mongodb_url).then(() => console.log("Sucessfull")).catch((err) => console.log(err));

const articleschema = new mongoose.Schema({
    title: {
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
        type: Array,
        required: true
    },
    Tags: {
        type: Array
    },
    links: {
        Type: Array
    }
})
const article = new mongoose.model("article", articleschema);
module.exports = article;
