import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/login';
import Addsale from './pages/AddSale';
import Register from './pages/Register';
import Todayrevenue from './pages/Todayrevenue';
import Top5sales from './pages/top5sales';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          {/* <Route exact path="/" element={<Navbar />}></Route> */}
            {/* <Route exact index element={<Login />}/> */}
            <Route exact path='/Addsale' element={<ProtectedRoute Component={Addsale} />}/>
            <Route exact path='/register' element={<Register />}/>
            <Route exact path='/login' element={<Login />}/>
            

            <Route exact path='/todays_revenue' element={<ProtectedRoute Component={Todayrevenue} />}/>
            <Route exact path='/top5sales' element={<ProtectedRoute Component={Top5sales} />}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
