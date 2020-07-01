const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
      maxlength: [50, 'Name can not be more than 50 characters']
    },
    phone: {
      type: String,
      required: [true, 'Please add a phone'],
      maxlength: [20, 'Phone number can not be longer than 20 characters']
    },
    email: {
      type: String,
      required: [true, 'Please add a email'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email'
      ]
    },
    cpf: {
      type: String,
      required: [true, 'Please add a CPF'],
      unique: true,
      match: [
        /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
        'Please add a valid CPF'
      ]
    }
  }
);


module.exports = mongoose.model('Customer', CustomerSchema);
