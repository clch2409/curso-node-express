const express = require('express');
const routerApi = require('./app/routes')

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

// app.get('/categories/:categoryId/products/:productId', (req, res) =>{
//   const { categoryId, productId } = req.params;
//   res.json(products.filter(product => product.category.id == categoryId && product.id == productId))
// })

app.listen(port, () =>{
  console.log('Servidor funcionado en el puerto ' + port);
})
