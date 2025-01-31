import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import Nav from './Nav'
import About from './components/about/About'
import Services from './components/services/Services'
import Contact from './components/contact/Contact'
import Cart from './components/cart/Cart'
import NotFound from './components/notfound/NotFound'
import ShopCategory from './components/shopcategory/ShopCategory'
import Product from './components/product/Product'
import LoginSignup from './components/loginsignup/LoginSignup'
import Shop from './components/shop/Shop'
import Footer from './components/footer/Footer'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Nav />

        <Routes>
          <Route path='/' element={<Shop />} />
          <Route
            path='/precious'
            element={<ShopCategory category='precious' />}
          />
          <Route path='/semi' element={<ShopCategory category='semi' />} />
          <Route path='/unique' element={<ShopCategory category='unique' />} />

          <Route path='/product/:id' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LoginSignup />} />
          <Route path='/about' element={<About />} />
          <Route path='/services' element={<Services />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
