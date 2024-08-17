const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: String,
  createdAt: { type: Date, default: Date.now },
  ratings: [{
    ratedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: Number,
  }],
  averageRating: { type: Number, default: 0 }
});

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: String,
  email: { type: String, unique: true, required: true },
  signUpDate: { type: Date, default: Date.now },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }]
});

itemSchema.methods.calculateAvgRating = function() {
  if (this.ratings.length > 0) {
    const sum = this.ratings.reduce((acc, cur) => acc + cur.rating, 0);
    this.averageRating = sum / this.ratings.length;
  } else {
    this.averageRating = 0;
  }
  return this.save();
};

const Item = mongoose.model('Item', itemSchema);
const User = mongoose.model('User', userSchema);

module.exports = { Item, User };