import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
//vercel
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
//css
import './App.css';

//components
import Header from './components/Layouts/Header/Header';
import Footer from './components/Layouts/Footer/Footer';
import Spinner from './components/Spinner/Spinner';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import PublicRoute from './components/PrivateRoute/PublicRoute';
import WhatsAppButton from './components/WhatsappButton/WhatsAppButton';

// Dynamically import components
const ExpandCard = lazy(() => import('./components/Product/Show/ExpandCard'));
const Landing = lazy(() => import('./components/Landing/Landing'));
const AllProducts = lazy(() => import('./components/AllProduct/AllProduct'));
const Contact = lazy(() => import('./components/Contact/Contact'));
const Login = lazy(() => import('./components/user/Login/Login'));
const Register = lazy(() => import('./components/user/Register/Register'));
const Dashboard = lazy(() => import('./components/admin/Dashboard'));
const CreateProduct = lazy(() => import('./components/Product/Create/CreateProduct'));


function App() {
  
  return (
    <>
      <div className='topContent'>
        <Header />
      </div>
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path="*" element={<Landing />} /> {/* route when page not found */}
          <Route path='/product/:id' element={<ExpandCard />} />
          <Route path='/products' element={<AllProducts />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/login' element={<PublicRoute element={<Login />} />} />
          <Route path='/register' element={<PublicRoute element={<Register />} />} />
          <Route path='/dashboard' element={<PrivateRoute component={Dashboard} requiredRole='admin' />} />
          <Route path='/create-product' element={<PrivateRoute component={CreateProduct} requiredRole='admin' />} />
        </Routes>
      </Suspense>
      <WhatsAppButton/>
      <Footer />
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default App;
