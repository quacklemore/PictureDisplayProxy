const express = require('express');
const morgan = require('morgan');
const {createProxyMiddleware} = require('http-proxy-middleware');
const axios = require('axios');


const app = express();
const port = 4004;
const host = 'localhost';


app.use(express.static(__dirname + '/public/'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/reviews', createProxyMiddleware({
  target: 'http://localhost:4003'
}));

app.get('/api/pictures/:hotel', createProxyMiddleware({
  target: 'http://localhost:4000'
}));

app.get('/api/trips/:id', createProxyMiddleware({
  target: 'http://localhost:4002'
}));

app.get('/api/low-days/:id', createProxyMiddleware({
  target: 'http://localhost:4002'
}));

app.post('/api/trips/', createProxyMiddleware({
  target: 'http://localhost:4003'
}));

app.get('/api/hotel/:hotelId', createProxyMiddleware({
  target: 'http://localhost:4001'
}));

app.listen(port, function() {
  console.log(`listening on port: ${port}`);
});