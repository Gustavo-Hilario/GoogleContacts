const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
// serve the JS file 
app.use('/js', express.static(__dirname + '/js'));

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/gContacts.html'));
  //__dirname : It will resolve to your project folder.
});

//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');
