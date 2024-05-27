const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path'); // Import path module
const db = require('./models');
const cors = require('cors');
const swaggerSetup = require('./swagger'); // Import Swagger setup
const app = express();
const port = 3002;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Session middleware
app.use(session({
  secret: 'your_secret_key', // Replace with your secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set secure: true if using HTTPS
}));


// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Import routes
// const userRoutes = require('./routes/userRoutes');
const vendorRoutes = require('./routes/vendorRoutes');
const subBrandRoutes = require('./routes/subBrandsRoutes');
const clothSampleRoutes = require('./routes/clothSampleRoutes');
const defectRoutes = require('./routes/defectRoutes');
const qualityAssuranceRoutes = require('./routes/qualityAssuranceRoutes');
const qaDashboard = require('./routes/qaDashboardRoutes');
const qualityAssuranceDefectRoutes = require('./routes/qualityAssuranceDefectRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
app.use(cors());
// Use routes
// app.use('/users', userRoutes);
app.use('/vendors', vendorRoutes);
app.use('/subbrands', subBrandRoutes);
app.use('/clothsamples', clothSampleRoutes);
app.use('/defects', defectRoutes);
app.use('/qualityassurances', qualityAssuranceRoutes);
app.use('/qualityassurancedefects', qualityAssuranceDefectRoutes);
app.use('/qa-dashboard', qaDashboard);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);

// Set up Swagger
swaggerSetup(app);


// Serve the main HTML file for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});


// Sync the database and start the server
db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
