import { Suspense, lazy, useState, useEffect } from 'react';

//React router DOM
import { Route, Routes } from 'react-router-dom';

//vercel analytics
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

//components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Spinner from './components/Spinner/Spinner';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import PublicRoute from './components/PrivateRoute/PublicRoute'
import WhatsAppButton from './components/WhatsappButton/WhatsAppButton';
import ModalReutilizable from './components/ModalReutilizable/ModalReutilizable';
import PromoEdit from './assets/images/promoEdit.jpg';
import Cart from './components/pages/Cart/Cart';
import KnowUs from './components/pages/knowus/Knowus';
import ChangePolicy from './components/pages/ChangePolicy/ChangePolicy';
//COMPONETS CONNECT BACK
import ResetPassword from './components/pages/user/ResetPassword/ResetPassword';
import VerifyEmail from './components/pages/user/VerifyEmail/VerifyEmail';
import ForgotPassword from './components/pages/user/ForgotPassword/Forgot-password';
//IMPORTS DINAMICOS
const Landing = lazy(() => import('./components/pages/Landing/Landing'));
const ProductDetail = lazy(() => import('./components/pages/ProductDetail/ProductDetail'));
const AllProducts = lazy(() => import('./components/pages/AllProduct/AllProduct'));
const Login = lazy(() => import('./components/pages/user/Login/Login'));
const Register = lazy(() => import('./components/pages/user/Register/Register'));
const Dashboard = lazy(() => import('./components/pages/admin/Dashboard'));
const CreateProduct = lazy(() => import('./components/pages/CreateProduct/CreateProduct'));

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const isModalShown = sessionStorage.getItem('isModalShown');
    if (!isModalShown) {
      setIsModalOpen(true);
      sessionStorage.setItem('isModalShown', 'true');
    }
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header />
      {isModalOpen && (
        <ModalReutilizable
          imageUrl={PromoEdit}
          altText="Promocion de agosto"
          closeModal={closeModal}
        />
      )}
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path="*" element={<Landing />} /> {/* route when page not found */}
          <Route path='/product/:id' element={<ProductDetail />} />
          <Route path='/products' element={<AllProducts />} />
          <Route path='/login' element={<PublicRoute component={Login} />} />
          <Route path='/register' element={<PublicRoute component={Register} />} />
          <Route path='/dashboard' element={<PrivateRoute component={Dashboard} requiredRole='admin' />} />
          <Route path='/create-product' element={<PrivateRoute component={CreateProduct} requiredRole='admin' />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/conocenos' element={<KnowUs />} />
          <Route path='/change-policy' element={<ChangePolicy />} />
          <Route path='/cart/:cartId' element={<PrivateRoute component={Cart} />} />
          <Route path='/verify-email' element={<VerifyEmail />} />
        </Routes>
      </Suspense>
      <WhatsAppButton />
      <Footer />
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default App;
