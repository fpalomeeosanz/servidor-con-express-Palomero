import express from "express";
import { productManager } from  "./ProductManager"

const PORT = 8080;
const app = express();

app.listen(PORT, () => {
    console.log(`SERVIDOR FUNCIONANDO EN EL PUERTO: ${PORT}`);
});

app.get("/products", async (req, res) => {
  
  const products = await productManager.getProducts();
  const limit = req.query.limit || 0;
  const filteredProducts = products.slice(0, limit);
  res.send(filteredProducts);
});

app.get("/products/:pid", async (req, res) => {

  const pid = req.params.pid;
  const product = await productManager.getProductById(pid);
  if (!product) {
    res.status(404).send({ message: "Producto no encontrado" });
    return;
  }

  res.send(product);
});

