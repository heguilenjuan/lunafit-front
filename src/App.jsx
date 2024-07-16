import { Route, Routes } from 'react-router-dom';
import './App.css'
import Header from './components/Layouts/Header/Header'
import Navbar from './components/Navbar/Navbar'
import ExpandCard from './components/Product/Show/ExpandCard';
import Landing from './components/Landing/Landing';

import Login from './components/Login/Login';
import CreateProduct from './components/Product/Create/CreateProduct';
import Footer from './components/Layouts/Footer/Footer';
import AllProducts from './components/AllProduct/AllProduct';
import Contact from './components/Contact/Contact';


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
        <Route path='/login' element={<Login />} />
        <Route path='/create-product' element={<CreateProduct />} />
      </Routes>
      <Footer />
    </>
  )
}
export default App
