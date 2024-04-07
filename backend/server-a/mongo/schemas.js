const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  id: Number,
  quantity: Number,
});

const OrderSchema = new mongoose.Schema({
  id: Number,
  sandwiches: [ItemSchema],
  status: String,
});

const ToppingSchema = new mongoose.Schema({
  id: Number,
  name: String,
});

const SandwichSchema = new mongoose.Schema({
  id: Number,
  name: String,
  toppings: [ToppingSchema],
  breadType: String,
});

module.exports = {
  ItemSchema: mongoose.model('Item', ItemSchema),
  OrderSchema: mongoose.model('Order', OrderSchema),
  ToppingSchema: mongoose.model('Topping', ToppingSchema),
  SandwichSchema: mongoose.model('Sandwich', SandwichSchema),
};
