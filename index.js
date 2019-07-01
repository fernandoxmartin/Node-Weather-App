require('dotenv').config();
const express = require('express');
const app = express()


app.set('port', (process.env.PORT || 8000));
app.use(express.static('public'));
app.set('view engine', 'ejs')


app.get('/', function (req, res) {
  res.render('index');
})

app.listen(app.get('port'), function () {
  console.log('Node running on port', app.get('port'));
})
