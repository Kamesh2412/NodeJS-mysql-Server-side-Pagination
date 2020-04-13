var mysql = require('mysql');
var con  = mysql.createPool({
  connectionLimit : 10,
  host            : 
  user            : 
  password        : 
  database        : 
});

for(i=1000;i<100000;i++){
    con.query('insert into Employee(firstname,lastname,email,laptopAvailable) values ("Kam","Bala","kameshbala0@gmail.com","no")',function(err,res){
        if (err) throw err;
        console.log(res)
    }) 
}
