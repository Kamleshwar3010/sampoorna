require("dotenv").config()
const express = require("express");
//const path = require("path")
const app = express();
require("./articledb")//importing mongoose file
require("./yogadb")
const articledb = require("./articledb");//importing model
const yogadb = require("./yogadb")

app.get('/', paginatedResults(articledb), async (req, res) =>
{

    //  let article_data = await articledb.find({}).lean();
    //console.log(article_data)
    //res.send('Successful response.');
    res.json(queryResults);
});

app.get('/yoga', paginatedResults(yogadb), async (req, res) =>
{

    // let yoga_data = await yogadb.find({}).lean();
    //console.log(article_data)
    //res.send('Successful response.');
    res.json(queryResults);
});
app.listen(3000, () => console.log('listening on port 3000.'));


//Middleware function
function paginatedResults(model)
{
    return async (req, res, next) =>
    {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        const count = model.countDocuments().exec()

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const results = {}
        results.summary = {
            totalres: await count,
            totalpage: Math.ceil(await count / limit),
        }
        const rem = (await count - (page * limit))
        if (endIndex < await model.countDocuments().exec())
        {

            results.next = {
                page: page + 1,
                limit: (rem < limit ? rem : limit)
            }
        }

        if (startIndex > 0)
        {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }
        try
        {
            results.results = await model.find().limit(limit).skip(startIndex).exec()
            queryResults = results
            next()
        } catch (e)
        {
            res.status(500).json({ message: e.message })
        }
    }
}
