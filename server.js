const express = require('express');
const bodyParser = require('body-parser');
const app = express();


const port = process.env.PORT || 2222;

const {getAllBoats,getBoat,deleteBoat,search,addBoat} = require('./database.js');

let logger = (req,res,next) =>{
    console.log(`LOGGER: ${req.method} ${req.url}`);
    next();
}

app.use(logger);

app.use(express.static(__dirname + '/front'));

app.use( bodyParser.urlencoded({ extended: true }) );
app.use( bodyParser.json() );



app.get('/api/boats', (req,res)=>{
    getAllBoats(dataOrError =>{
      res.send(dataOrError)
    })
})

app.get('/api/boats', (req,res)=>{

  getBoat(req.query.id, dataOrError => {
    res.send(dataOrError)
  } )
 
})

app.delete('/api/deleteboat:_id', (req, res) => {
	console.log('DELETE / boat', req.params)
	deleteBoat(req.params, param => {
		console.log('deleteBoat param:', param)
		res.send(param)
  })
  

  app.get('/api/search?', (req, res) => {
    console.log('GET / SEARCH?')
    search(req.query, param => {
      res.send(param)
    })
  })
})

// POST 
app.post('/api/addBoat', (req, res)=>{

  addBoat(req.body, dataOrError =>{
      res.send(dataOrError)
  })
 
})





app.use( (error, req, res, next) => {
    console.log('Error handling', error);
    res.status(500).send('Internal server error');
})

app.listen(port, ()=>{
    console.log('Web server listening on port:' + port);
})