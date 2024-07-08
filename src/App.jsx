import { Route, Routes } from 'react-router-dom';
import './App.css'
import Header from './components/Header/Header'
import Navbar from './components/Navbar/Navbar'
import ExpandCard from './components/ExpandCard/ExpandCard';
import Landing from './components/Landing/Landing';
import Footer from './components/Footer/Footer';


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
        <Route path='/showProduct' element={<ExpandCard />} />
      </Routes>
      <Footer/>
    </>
  )
}
export default App
