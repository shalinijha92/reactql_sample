import Mongoose from 'mongoose';

Mongoose.connect('mongodb://localhost:27017/shoppingcart', (err) => {
  if (err) {
    console.error('Could not connect to MongoDB on port 27017');
  }
});


//Cart Schema
var cartSchema = Mongoose.Schema({
  "name": {type:String, required: true},
  "brand": {type:String, required: true},
  "imageUrl": {type:String, required: true},
  "price": {type:String, required: true},
  "discountPrice": String,
  "description": String
}, {collection : 'Cart'});

export default Mongoose.model('Cart', cartSchema);
