module.exports = (app) => {
    app.use('/invoice', require('./invoice.routes'))
};