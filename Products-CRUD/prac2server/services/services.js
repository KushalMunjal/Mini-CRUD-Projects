const { Product } = require('../db');

async function createProduct(company, name, price) {
  try {
    const product = await Product.create({ company, name, price });
    return product;
  } catch (error) {
    console.error(error);
    throw new Error('Error creating product');
  }
}

async function getAllProducts() {
  try {
    const products = await Product.findAll();
    return products;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching products');
  }
}

async function getProductById(id) {
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching product');
  }
}

async function updateProduct(id, company, name, price) {
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error('Product not found');
    }
    product.company = company;
    product.name = name;
    product.price = price;
    await product.save();
    return product;
  } catch (error) {
    console.error(error);
    throw new Error('Error updating product');
  }
}

async function deleteProduct(id) {
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error('Product not found');
    }
    await product.destroy();
    return true;
  } catch (error) {
    console.error(error);
    throw new Error('Error deleting product');
  }
}

module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };
