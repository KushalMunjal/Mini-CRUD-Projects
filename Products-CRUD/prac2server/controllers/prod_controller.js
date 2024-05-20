const express = require('express');
const router = express.Router();
const productService = require('../services/services.js');

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// GET a product by ID
router.get('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productService.getProductByIdd(productId);
    if (!product) {
      res.status(404).json({ message: `Product with id ${productId} not found` });
    } else {
      res.json(product);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching product' });
  }
});

// DELETE a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await productService.deleteProduct(productId);
    if (!deletedProduct) {
      res.status(404).json({ message: `Product with id ${productId} not found` });
    } else {
      res.json({ message: 'Product deleted successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting product' });
  }
});

// CREATE a new product
router.post('/', async (req, res) => {
  try {
    const { company,name, price } = req.body;
    const newProduct = await productService.createProduct(company, name, price);
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating product' });
  }
});

// UPDATE a product by ID
router.put('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const { company, name, price } = req.body;
    const updatedProduct = await productService.updateProduct(productId, company, name, price);
    if (!updatedProduct) {
      res.status(404).json({ message: `Product with id ${productId} not found` });
    } else {
      res.json({ message: 'Product updated successfully', product: updatedProduct });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating product' });
  }
});

module.exports = router;
