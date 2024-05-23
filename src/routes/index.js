const productsRouter = require('./product');
const producttypesRouter = require('./productType');
const usersRouter = require('./user');
const ordersRouter = require('./order');
const orderItemRouter = require('./orderitem');
const { checkUserJWT, checkUserPermission } = require('../middleware/JWTAction');

function route(app) {
    app.use('/orderItem', orderItemRouter);
    app.use('/order', ordersRouter);
    app.use('/user', usersRouter);
    app.use('/producttypes', producttypesRouter);
    app.use('/products', productsRouter);
}

module.exports = route;
