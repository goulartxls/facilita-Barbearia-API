const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Import routes
const barberRoutes = require('./routes/barberRoutes');
const barberLoginRoutes = require('./routes/barberLoginRoutes');
const barberShopRoutes = require('./routes/barbershopRoutes');
const clientRoutes = require('./routes/clientRoutes');
const orderRoutes = require('./routes/orderRoutes');
const orderProductRoutes = require('./routes/orderProductRoutes');
const orderServiceRoutes = require('./routes/orderServiceRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const paymentMethodRoutes = require('./routes/paymentMethodRoutes');
const productRoutes = require('./routes/productRoutes');
const serviceRoutes = require('./routes/serviceRoutes'); // Verifique este caminho
const userRoutes = require('./routes/userRoutes');

// Use routes
app.use('/api', barberRoutes);
app.use('/api', barberLoginRoutes);
app.use('/api', barberShopRoutes);
app.use('/api', clientRoutes);
app.use('/api', orderRoutes);
app.use('/api', orderProductRoutes);
app.use('/api', orderServiceRoutes);
app.use('/api', paymentRoutes);
app.use('/api', paymentMethodRoutes);
app.use('/api', productRoutes);
app.use('/api', serviceRoutes); // Certifique-se de que este caminho está correto
app.use('/api', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
