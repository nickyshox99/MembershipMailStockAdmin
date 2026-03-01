const dotenv = require('dotenv');
dotenv.config();

module.exports = {     
  BASE_API_URL: process.env.BASE_API_URL?process.env.BASE_API_URL:'http://18.142.206.216:10600/',  
}

