module.exports = (app) => {
    app.use('/users', require('./user.routes'))
    app.use('/products', require('./product.routes'))
};