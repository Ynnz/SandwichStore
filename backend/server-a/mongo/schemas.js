const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  id: String,
  quantity: Number,
});

const OrderSchema = new mongoose.Schema({
  id: String,
  sandwiches: [ItemSchema],
  status: String,
});

const ToppingSchema = new mongoose.Schema({
  id: String,
  name: String,
});

const SandwichSchema = new mongoose.Schema({
  id: String,
  name: String,
  toppings: [ToppingSchema],
  breadType: String,
});

module.exports = {
  Item: mongoose.model('Item', ItemSchema),
  Order: mongoose.model('Order', OrderSchema),
  Topping: mongoose.model('Topping', ToppingSchema),
  Sandwich: mongoose.model('Sandwich', SandwichSchema),
};
