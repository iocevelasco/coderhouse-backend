const express = require("express");
const PORT = process.env.PORT || 8080
const productsRoute = require('./routes/products')
const cartRoute = require('./routes/cart')
const bodyParser = require('body-parser');
const path = require('path')
const hbs = require("hbs");

// Server 
const { Server: HttpServer } = require("http");
const { Server: SocketServer } = require('socket.io')
const app = express();

app.use(express.json())
app.use(express.static('public'));

// setups hbs view path, where express will look for files
const viewPath = "public/views"
const partialForm = "public/views/partials/forms"
const partialList = "public/views/partials/list"

// VIEW ENGIE CONGIFURATION
hbs.registerPartials(partialForm);
hbs.registerPartials(partialList);
app.set("view engine", "hbs");
app.set("views", viewPath);

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));

const messages =  []
const products = []
// ROUTES
app.use('/api/products', productsRoute);
app.use('/api/cart', cartRoute);
app.get("/", (req, res) => {
  res.render("home.hbs", {messages, products})
});
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);

// IO CONFIG 
io.on('connection', (socket)=> {
  console.log('User connected')
  
  socket.emit('messages', messages)
  socket.emit('products', products)

  socket.on('create_product', (product)=>{
    products.push(product)
    io.sockets.emit('products', products)
  });
  
  socket.on('create_message', (message)=>{
    messages.push(message)
    io.sockets.emit('messages', messages)
  });

})

httpServer.listen(PORT, ()=> console.log(`Server runing ${PORT}`))

