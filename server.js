const express = require('express')
const {router} = require('./route')
const bodyParser = require('body-parser')
var cors = require('cors');
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
app.use(cors())
app.use(cors({origin: 'http://localhost:4200'}));
app.use(router)

app.listen(3000, () => {
    console.log('App listening on port 3000');
  });

  module.exports = {app}