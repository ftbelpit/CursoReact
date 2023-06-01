const mongoose = require("mongoose");
const { Schema } = mongoose;
const moment = require('moment');

const washSchema = new Schema(
  {
    car: {
      fabricante: String,
      modelo: String,
    },
    washer: {
      name: String,
    },
    washerId: mongoose.ObjectId,
    userId: mongoose.ObjectId,
    userName: String,
    washerPrice: Number,
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

washSchema.methods.getFormattedDate = function () {
  return moment(this.date).format('DD/MM/YYYY');
};

const Wash = mongoose.model('Wash', washSchema);

module.exports = Wash;

