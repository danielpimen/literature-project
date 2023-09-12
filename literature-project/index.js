const { Sequelize, DataTypes } = require("sequelize");

const express = require("express")
const app = express()

const db = require('./models')

const { Citation } = require("./models")
const password = require('./password.js')

//Set up sequelize instance 
const sequelize = new Sequelize(
    'citation',
    'root',
    password,
     {
       host: 'localhost',
       dialect: 'mysql'
     }
   );


///Test Var to test routes 
let search = "au"

//Pull all citations that match the citeID 
app.get('/select_id', (req, res) => {
    Citation.findAll({
        where: {
            citeID: 1
        }
    })
    .then((citations)=>{
        res.send(citations)
    })
    .catch((err) =>{
        console.log(err)
    });
});

//Keyword Test Search 
app.get('/keyword', (req, res) => {
    Citation.findAll({
        where: {
            full_citation: sequelize.where(sequelize.col('full_citation'), 'LIKE', '%' + search + '%')

        }
    })
    .then((citations)=>{
        res.json(citations)
    })
    .catch((err) =>{
        console.log(err)
    });
});

//Replace ! to quotes 
app.get('/syntax', (req, res) => {
    Citation.findAll({

    })
    .then((citations)=>{

        citationArray = []
        for(var i = 0; i < citations.length; i++){
            let obj = {}
    
            console.log(citations[i].citeID)
            console.log(citations[i].full_citation)
            let updated_citations = citations[i].full_citation.replace('!', '\"')
            // citations[i].full_citation.replace('!What', '"')
            obj["title"] = citations[i].citeID
            obj["author"] = updated_citations
            citationArray.push(obj)
        }

        res.json(citationArray)
    })
    .catch((err) =>{
        console.log(err)
    });
});


//Create URL Route that uses URL param as search keyword 
app.get('/search/:tagId', function(req, res) {
    res.send("tagId is set to " + req.params.tagId);
  });

app.get('/keyword/:search_word', (req, res) => {
    Citation.findAll({
        where: {
            full_citation: sequelize.where(sequelize.col('full_citation'), 'LIKE', '%' + req.params.search_word + '%')

        }
    })
    .then((citations)=>{
        citationArray = []
        for(var i = 0; i < citations.length; i++){
            let obj = {}
    
            console.log(citations[i].citeID)
            console.log(citations[i].full_citation)
            let updated_citations = citations[i].full_citation.replace('!', '\"')
            // citations[i].full_citation.replace('!What', '"')
            obj["title"] = citations[i].citeID
            obj["author"] = updated_citations
            citationArray.push(obj)
        }

        res.json(citationArray)
    })
    .catch((err) =>{
        console.log(err)
    });
});

//Create record in MySQL db 
app.get('/post', (req, res) => {
    Citation.create({
        citeID: 5, 
        full_citation: "test",
    }).catch(err=>{
        console.log(err)
    })

});

db.sequelize.sync().then((req) =>{
app.listen(3001, () => {
    console.log("server running")
})
});