import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../src/config';

const Todayrevenue = () => {
  const [todayRevenue, setTodayRevenue] = useState(0);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/today-revenue`) // Using GET method to fetch data
      .then(response => {
        const revenue = response.data.revenue;
        setTodayRevenue(revenue);
      })
      .catch(error => {
        console.error('Error fetching today\'s revenue:', error);
      });
  }, []);

  return (
    <div className='mt-5'>
      <h2 className='text-center'>Today's Revenue is {todayRevenue}</h2>
    </div>
  );
}

export default Todayrevenue;
