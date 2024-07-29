import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Layouts/Header/Header';
import ExpandCard from './components/Product/Show/ExpandCard';
import Landing from './components/Landing/Landing';
import Footer from './components/Layouts/Footer/Footer';
import AllProducts from './components/AllProduct/AllProduct';
import Contact from './components/Contact/Contact';
import PublicRoute from './components/PrivateRoute/PublicRoute';
import Login from './components/user/Login/Login';
import Register from './components/user/Register/Register';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Dashboard from "./components/admin/Dashboard";
import CreateProduct from './components/Product/Create/CreateProduct';

function App() {
  return (
    <>
      <div className='topContent'>
        <Header />
      </div>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path="*" element={<Landing />} /> {/* route when page not found */}
        <Route path='/product/:id' element={<ExpandCard />} />
        <Route path='/products' element={<AllProducts />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<PublicRoute element={<Login />} />} />
        <Route path='/register' element={<PublicRoute element={<Register />} />} />
        <Route path='/dashboard' element={<PrivateRoute component={Dashboard} requiredRole='admin' />} />
        <Route path='/create-product' element={<PrivateRoute component={CreateProduct} requiredRole='admin'/>}/>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
