var geddy = require('geddy');

geddy.startCluster({
    hostname: '0.0.0.0',
    port: process.env.PORT || '3000',
    environment: process.env.NODE_ENV || 'development'
});
