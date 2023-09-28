import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { API_BASE_URL } from '../../src/config';

const Addsale = () => {
  const [formData, setFormData] = useState({
    product_name: '',
    quantity: '',
    amount: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      await axios.post(`${API_BASE_URL}/add-sale`, formData); // Use the correct endpoint
      setLoading(false);
      Swal.fire({
        icon: 'success',
        title: 'Sale added successfully',
      });
      // Optionally, reset the form or navigate to another page.
    } catch (error) {
      console.error('Error adding sale', error);
      Swal.fire({
        icon: 'error',
        title: 'Error adding sale',
      });
    }
  };

  return (
    <div>
      <div className='login-form'>
        <div className='topp'>
          <form onSubmit={handleSubmit}>
            <h2 className='text-center'>Add Sales Entry</h2>

            { loading ?<div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div> : ''}
            <div className="mb-3">
              <label htmlFor="product_name" className="form-label">Product</label>
              <input
                type="text"
                className="form-control"
                id="product_name"
                name="product_name"
                value={formData.product_name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">Quantity</label>
              <input
                type="number"
                className="form-control"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">Amount</label>
              <input
                type="number"
                className="form-control"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="form-control btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addsale;
