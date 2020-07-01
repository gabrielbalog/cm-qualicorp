const path = require('path');
const asyncHandler = require('../middleware/async');
const Customer = require('../models/Customer');


exports.getCustomers = asyncHandler(async (req, res, next) => {
  const results = await Customer.find({});

  res.status(200).json({
    success: true,
    count: results.length,
    data: results
  });
});


exports.getCustomer = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    return res.status(404).json({
      success: false,
      error: `Customer not found with id of ${req.params.id}`
    });
  }

  res.status(200).json({ success: true, data: customer });
});


exports.createCustomer = asyncHandler(async (req, res, next) => {
  try {
    const customer = await Customer.create(req.body);

    res.status(201).json({
      success: true,
      data: customer
    });
  } catch (err) {
    console.log(err);
    
    // Mongoose duplicate key
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Duplicate field value entered'
      });
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: message.join()
      });
    }

    return res.status(500).json({
      success: false,
      error: 'An error has occurred'
    });
  }

});


exports.updateCustomer = asyncHandler(async (req, res, next) => {
  let customer = await Customer.findById(req.params.id);

  if (!customer) {
    return res.status(404).json({
      success: false,
      error: `Customer not found with id of ${req.params.id}`
    });
  }

  customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: customer });
});

exports.deleteCustomer = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    return res.status(404).json({
      success: false,
      error: `Customer not found with id of ${req.params.id}`
    });
  }
  await customer.remove();

  res.status(200).json({ success: true, data: {} });
});
