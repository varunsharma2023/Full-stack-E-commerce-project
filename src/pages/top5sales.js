import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../src/config';

const Top5sales = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    // Fetch sales data from your backend API here
    // Replace with the actual API endpoint you'll use to fetch sales data
    axios.get(`${API_BASE_URL}/top-5`)
    .then(response => setSales(response.data));
  }, []);

  return (
    <div>
      <h2 className='text-center mt-4'>Top 5 Sales</h2>
      <div className='table-container'>
        <table className='centered-table'>
          <thead>
            <tr>
              <th scope='col'>Sale Id</th>
              <th scope='col'>Product Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Sale Amount</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{sale.product_name}</td>
                <td>{sale.quantity}</td>
                <td>{sale.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Top5sales;
