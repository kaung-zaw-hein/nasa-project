const http = require('http');
const mongoose = require('mongoose');

const app = require('./app');

const { loadPlanetsData } = require('./models/planets.model');

const PORT = process.env.PORT || 8000;

// Update below to match your own MongoDB connection string.

const MONGO_URL = 'mongodb+srv://kzh:kaungzawhein1963@nasacluster.gsndy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const server = http.createServer(app)

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('error tat naydl')
});

async function startServer() {

    await mongoose.connect(MONGO_URL);
   
    await loadPlanetsData();
  
    server.listen(PORT, () => {
      console.log(`Listening on port ${PORT}...`);
    });
  }
  
  startServer();



