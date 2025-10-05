const dotenv = require('dotenv');
dotenv.config();

module.exports = {     
  BASE_API_URL: process.env.BASE_API_URL?process.env.BASE_API_URL:'http://45.77.247.183:10800/',  
}

