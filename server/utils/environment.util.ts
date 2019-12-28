const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = !isDevelopment;

export = { isDevelopment, isProduction };
