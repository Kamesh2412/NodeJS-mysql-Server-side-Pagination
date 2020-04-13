
const controller = require('./controller')
var router = require('express').Router();

router.get('/getAll',controller.middleware,(req,res)=>controller.getData(req,res))

router.post('/pagination',controller.middleware,(req,res)=>controller.pagination(req,res))

module.exports = {router}