const Product = require('../models/product');

const ProductController = {
  async createProduct(req, res) {
    try {
      const product = new Product(null, req.body.name, req.body.description, req.body.price);
      await product.save();
      res.status(201).json({ message: 'Product created successfully', product });
    } catch (err) {
      res.status(500).json({ error: 'Error creating product', details: err.message });
    }
  },

  async getAllProducts(req, res) {
    try {
      const products = await Product.getAll();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching all products', details: err.message });
    }
  },

  async getProductById(req, res) {
    const { id } = req.params;
    try {
      const product = await Product.getById(id);
      if (!product) {
        res.status(404).json({ message: 'Product not found' });
      } else {
        res.status(200).json(product);
      }
    } catch (err) {
      res.status(500).json({ error: `Error fetching product with ID ${id}`, details: err.message });
    }
  },

  async updateProduct(req, res) {
    const { id } = req.params;
    try {
      const product = await Product.getById(id);
      if (!product) {
        res.status(404).json({ message: 'Product not found' });
      } else {
        product.name = req.body.name;
        product.description = req.body.description;
        product.price = req.body.price;
        await product.update();
        res.status(200).json({ message: 'Product updated successfully', product });
      }
    } catch (err) {
      res.status(500).json({ error: `Error updating product with ID ${id}`, details: err.message });
    }
  },

  async deleteProduct(req, res) {
    const { id } = req.params;
    try {
      const product = await Product.getById(id);
      if (!product) {
        res.status(404).json({ message: 'Product not found' });
      } else {
        await product.delete();
        res.status(200).json({ message: 'Product deleted successfully' });
      }
    } catch (err) {
      res.status(500).json({ error: `Error deleting product with ID ${id}`, details: err.message });
    }
  }
};

module.exports = ProductController;
