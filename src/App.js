import logo from './logo.svg';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import Goods from './components/Goods';
import MyBag from './components/MyBag';
import Admin from './components/Admin';
import Good from './components/Good';
import Store from './components/Store';
import Order from './components/Order';

function App() {
  return (
    <div className="App">
      <div className="content">
        <div className="header">
          <Link to='/'>Shop</Link>
          <Link to='/my-bag'>Basket</Link>
          <Link to='/admin'>Admin</Link>
        </div>
        
        <div className="main">
          <Routes>
            <Route exact path='/' element={<Goods />} />
            <Route path='/goods/:name' element={<Good />} />
            <Route path='/my-bag' element={<MyBag />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/admin/:storeName' element={<Store />} />
            <Route path='/order/:orderName' element={<Order />} />
          </Routes>
        </div>

      </div>
    </div>
  );
}

export default App;
