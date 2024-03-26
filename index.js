const express = require('express');
const routerApi = require('./app/routes')
const { logErrors, errorHandler, isBoomHandler } = require('./app/middlewares/error.handler')

const app = express();
const port = 3000;

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hola, mi server en express');
});

app.get('/nueva', (req, res) => {
  res.send('Soy un nuevo endpoint');
});

routerApi(app);

app.use(isBoomHandler);
app.use(logErrors);
app.use(errorHandler);

// app.get('/categories/:categoryId/products/:productId', (req, res) =>{
//   const { categoryId, productId } = req.params;
//   res.json(products.filter(product => product.category.id == categoryId && product.id == productId))
// })

app.listen(port, () =>{
  console.log('Servidor funcionado en el puerto ' + port);
})
