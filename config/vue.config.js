const dotenv = require('dotenv');
dotenv.config();

module.exports = {     
  BASE_API_URL: process.env.BASE_API_URL?process.env.BASE_API_URL:'http://localhost:10600/',  
}

