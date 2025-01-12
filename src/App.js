
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Footer from './components/Footer';
import Cart from './pages/Cart';
import CheckoutForm from './pages/CheckOut';
import Contact from './pages/Contact';
import Shop from './pages/Shop';
import ProductDetail from './components/ProductDetail';

function App() {
  return (
   
    <BrowserRouter>
    
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<CheckoutForm />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/shop' element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />

      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
