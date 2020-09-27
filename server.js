const express = require('express');
const connectDB = require('./config/db');
const app = express();
//connect db
//Ot7LfVJAOFKCLU4g
connectDB();
app.get('/',(req,res) => res.send('API Running'));
//init middleware
app.use(express.json({extended: false}));
//define routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/sell', require('./routes/api/sell'))
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));