import { Route, Routes } from 'react-router-dom';
import './App.css'
import Header from './components/Layouts/Header/Header'
import Navbar from './components/Navbar/Navbar'
import ExpandCard from './components/Product/Show/ExpandCard';
import Landing from './components/Landing/Landing';

import CreateProduct from './components/Product/Create/CreateProduct';
import Footer from './components/Layouts/Footer/Footer';
import AllProducts from './components/AllProduct/AllProduct';
import Contact from './components/Contact/Contact';

import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import PublicRoute from './components/PrivateRoute/PublicRoute';

import Login from './components/User/Login/Login';
import Register from './components/User/Register/Register';
import Dashboard from './components/Admin/Dashboard';
function App() {
  return (
    <>
      <div className='topContent'>
        <Header />
        <Navbar />
      </div>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path="*" element={<Landing />} /> {/* route when page not found */}
        <Route path='/product/:id' element={<ExpandCard />} />
        <Route path='/products' element={<AllProducts />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<PublicRoute element={<Login />} />} />
        <Route path='/create-product' element={<PrivateRoute element={<CreateProduct />} requiredRole='admin' />} />
        <Route path='/register' element={<PublicRoute element={<Register />} />} />
        <Route path='/dashboard' element={<PrivateRoute element={<Dashboard />} requiredRole='admin' />} />
      </Routes>
      <Footer />
    </>
  )
}
export default App
