const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Sale = mongoose.model('Sale');

const protectedRoute = require('../middleware/protectedResource');
//get post for all users
router.post('/add-sale', async (req, res) => {
    const { product_name, quantity, amount } = req.body;
  
    if (!product_name || !quantity || !amount) {
      return res.status(400).json({ msg: 'Product name, quantity, and amount are required' });
    }
  
    try {
      const sale = new Sale({ product_name, quantity, amount });
      await sale.save();
      res.status(201).json({ sale, msg: 'Sale added successfully' });
    } catch (error) {
      res.status(500).json({ msg: 'Error adding sale' });
    }
  });



  router.get('/today-revenue', async (req, res) => {
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();
    const startDate = new Date(year, month, date.getDate());
    const endDate = new Date(year, month, date.getDate() + 1);
  
    const filters = {
      createdAt: {
        $gte: startDate,
        $lt: endDate,
      },
    };
  
    try {
      const revenue = await Sale.aggregate([
        { $match: filters },
        { $group: { _id: null, sum_val: { $sum: '$amount' } } }
      ]);
  
      res.status(200).json({ revenue: revenue[0]?.sum_val || 0 });
    } catch (error) {
      res.status(500).json({ msg: 'Error fetching revenue' });
    }
  });

  router.get('/top-5', async (req, res) => {
    try {
      const topSales = await Sale.find().sort({ amount: -1 }).limit(5);
      res.status(200).json(topSales);
    } catch (error) {
      res.status(500).json({ msg: 'Error fetching top 5 sales' });
    }
  });
  
  



module.exports = router;

