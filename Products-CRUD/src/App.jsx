import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        company: '',
        name: '',
        price: ''
    });
    const [editingId, setEditingId] = useState(null); // Product edit state
    const [error, setError] = useState(null); // Error track state

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/products');
            setProducts(response.data);
            setError(null); // Reset error state
        } catch (error) {
            console.error('Error fetching products:', error.response ? error.response.data : error.message);
            setError('Error fetching products. Please try again later.'); // Set error state
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                // If editingId is set, update the product
                await axios.put(`http://localhost:3000/api/products/${editingId}`, formData);
            } else {
                // Otherwise, add a new product
                await axios.post('http://localhost:3000/api/products', formData);
            }
            fetchProducts();
            setFormData({ company: '', name: '', price: '' });
            setEditingId(null); // Reset editingId after submission
            setError(null); // Reset error state
        } catch (error) {
            console.error('Error adding/updating product:', error.response ? error.response.data : error.message);
            setError('Error adding/updating product. Please try again later.'); // Set error state
        }
    };

    const handleEdit = (product) => {
        // Set formData with the values of the product being edited
        setFormData({
            company: product.company,
            name: product.name,
            price: product.price
        });
        setEditingId(product.id);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/products/${id}`);
            fetchProducts();
            setError(null); 
        } catch (error) {
            console.error('Error deleting product:', error.response ? error.response.data : error.message);
            setError('Error deleting product. Please try again later.'); 
        }
    };

    const renderProducts = () => {
        return products.map((product) => (
            <div key={product.id}>
                <p>Company: {product.company}</p>
                <p>Name: {product.name}</p>
                <p>Price: ${product.price}</p>
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
            </div>
        ));
    };

    return (
        <div>
            <h1>Products</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company" />
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
                <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
                <button type="submit">{editingId ? 'Update Product' : 'Add Product'}</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {renderProducts()}
        </div>
    );
}

export default App;
