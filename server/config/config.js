const env = process.env.NODE_ENV || 'development';

if (env === 'test' || env === 'development') {
    const config = require('./config.json');
    const envConfig = config[env];

    Reflect.ownKeys(envConfig).forEach(key => {
        process.env[key] = envConfig[key];
    });
};