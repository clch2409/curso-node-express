const express = require('express');
const routerApi = require('./app/routes');
const { logErrors, errorHandler, isBoomHandler } = require('./app/middlewares/error.handler');
const cors = require('cors')

const app = express();
const port = 3000;

const whileList = ['http://localhost:5500'];
const options = {
  origin: (origin, callback) =>{
    if (whileList.includes(origin)){
      callback(null, true);
    }
    else{
      callback(new Error('No permitido'))
    }
  }
}

app.use(cors(options))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hola, mi server en express');
});

app.get('/nueva', (req, res) => {
  res.send('Soy un nuevo endpoint');
});


app.use(isBoomHandler);
app.use(logErrors);
app.use(errorHandler);

routerApi(app);


// app.get('/categories/:categoryId/products/:productId', (req, res) =>{
//   const { categoryId, productId } = req.params;
//   res.json(products.filter(product => product.category.id == categoryId && product.id == productId))
// })

app.listen(port, () =>{
  console.log('Servidor funcionado en el puerto ' + port);
})
