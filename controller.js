const {con} = require('./db')
const stringify =require('csv-stringify')

const process=require('process')


exports.getData = (request,response)=>{
response.setHeader('Content-type','text/csv')
response.setHeader('Content-Disposition','attachment;filename=\"'+'download-'+Date.now()+'.csv\"')
   
        let Starttime=new Date();
    
        let sqlquery='select * from Employee';
        con.query(sqlquery).stream().
        pipe(stringify({
            header: true,
          }))
          .pipe(response)
          .on('finish',()=>{
              console.log((process.memoryUsage()))
              let endTime=new Date();
              console.log(endTime-Starttime)
              console.log('Finished')
          })
}

exports.pagination = (req,res)=>{
    
     let page 
     let numPerPage 
     var limitfirst
    //var numPerPage = 20;
    
 // Here we compute the LIMIT parameter for MySQL query

con.query('SELECT count(*) as numRows FROM Employee',function (err, result, fields) {
    if(err) {
        console.log("error: ", err);
        
    }else{
       var numRows = result[0].numRows;
       console.log(numRows)
        // var numPages = Math.ceil(numRows / numPerPage);
        // console.log(numPages)
        if(page == '' || numPerPage == ''){
              page = 0;
             numPerPage = 10;
              limitfirst = page
          }
          else{
             page = parseInt(req.body.page)
             numPerPage =parseInt(req.body.numPerPage)
            limitfirst = (page-1) * numPerPage; 
          }
        
        var limit = limitfirst + ',' + numPerPage;
        let sql ='SELECT * FROM Employee LIMIT ' + limit
        con.query(sql,function (err, rows, fields) {
            if(err) {
                console.log("error: ", err);
           
            }else{
                console.log(sql)
                console.log(numRows)
                res.send({rows,numRows})
               
            }
        });            
    }
});
}

exports.middleware= function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
      next();
    }