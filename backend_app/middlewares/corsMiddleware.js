const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:4200',
};

const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
