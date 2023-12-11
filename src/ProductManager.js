class ProductManager {
    constructor() {
      this.products = [];
    }
  
    generateId() {
      return this.products.length + 1;
    }
  
    addProduct(product) {
      const id = this.generateId();
      product.id = id;
      this.products.push(product);
      this.saveProducts();
    }
  
    getProducts() {
      return this.products;
    }
  
    getProductById(id) {
      return this.products.find((product) => product.id === id);
    }
  
    updateProduct(id, field, value) {
      const product = this.getProductById(id);
      if (product) {
        product[field] = value;
        this.saveProducts();
      }
    }
  
    deleteProduct(id) {
      const index = this.products.findIndex((product) => product.id === id);
      if (index !== -1) {
        this.products.splice(index, 1);
        this.saveProducts();
      }
    }
  
    saveProducts() {
      const data = JSON.stringify(this.products);
      fs.writeFileSync(this.products, data);
    }
}

const productManager = new ProductManager("products.json");

const product = {
    title: "Producto 1",
    price: 100,
    thumbnail: "/images/producto1.jpg",
    code: "1234567890",
    stock: 10,
};
  
productManager.addProduct(product);

const products = productManager.getProducts();

const oneProduct = productManager.getProductById(1);

productManager.updateProduct(1, "price", 200);
productManager.updateProduct(1,"title", "producto x");

productManager.deleteProduct(1);