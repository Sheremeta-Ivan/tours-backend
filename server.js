const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const app = require('./app');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

mongoose.set('strictQuery', true);

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

const port = process.env.PORT || 3000;

mongoose
  .connect(DB)
  .then(
    app.listen(3000, () => {
      console.log(`Server running on port ${port}...`);
    }),
    console.log('DB connection successful!')
  )
  .catch((err) => {
    console.log(err.name, err.message);
    process.exit(1);
  });



