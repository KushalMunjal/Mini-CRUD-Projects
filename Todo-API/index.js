// // app.js
// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');

// const app = express();
// const port = 3000;

// app.use(bodyParser.json());

// // Connect to MongoDB (replace 'your_database_name' with your actual database name)
// mongoose.connect('mongodb+srv://kushalmunjal114005:nathidevopassword@cluster0.lpovjpr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => console.log('Connected to MongoDB'));

// // Define Todo schema and model
// const todoSchema = new mongoose.Schema({
//   name: String,
//   department:String,
//   completed: Boolean
// });

// const Todo = mongoose.model('Todo', todoSchema);

// // Routes
// app.get('/todos', async (req, res) => {
//   try {
//     const todos = await Todo.find();
//     res.json(todos);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.post('/todos', async (req, res) => {
//   const { title, completed } = req.body;

//   try {
//     const newTodo = await Todo.create({ title, completed });
//     res.status(201).json(newTodo);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.put('/todos/:id', async (req, res) => {
//   const { id } = req.params;
//   const { title, completed } = req.body;

//   try {
//     const updatedTodo = await Todo.findByIdAndUpdate(id, { title, completed }, { new: true });
//     if (!updatedTodo) {
//       return res.status(404).json({ error: 'Todo not found' });
//     }
//     res.json(updatedTodo);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// app.delete('/todos/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     const deletedTodo = await Todo.findByIdAndDelete(id);
//     if (!deletedTodo) {
//       return res.status(404).json({ error: 'Todo not found' });
//     }
//     res.json(deletedTodo);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

//routes

app.get('/', (req, res) => {
    res.send('Hello NODE API')
})

app.get('/blog', (req, res) => {
    res.send('Hello Blog, My name is Devtamin')
})

app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/products/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


app.post('/products', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// update a product
app.put('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// delete a product

app.delete('/products/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(product);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.set("strictQuery", false)
mongoose.
connect('mongodb+srv://kushalmunjal114005:nathidevopassword@cluster0.lpovjpr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(3000, ()=> {
        console.log(`Node API app is running on port 3000`)
    });
}).catch((error) => {
    console.log(error)
})