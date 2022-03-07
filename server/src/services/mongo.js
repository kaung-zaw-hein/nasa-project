const mongoose = require('mongoose');

// Update below to match your own MongoDB connection string.
const MONGO_URL = 'mongodb+srv://kzh:kaungzawhein1963@nasacluster.gsndy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
  });
  
  mongoose.connection.on('error', (err) => {
    console.error(err);
    console.log('error tat naydl')
  });

  async function mogoConnect(){
    await mongoose.connect(MONGO_URL);
  }

  async function mongoDisconnect(){
      await mongoose.disconnect();
  }

  module.exports = {
    mogoConnect,
    mongoDisconnect
  }