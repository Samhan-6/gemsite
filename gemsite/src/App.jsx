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
import men_banner from './assets/banner_mens.png'
import women_banner from './assets/banner_women.png'
import kid_banner from './assets/banner_kids.png'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Nav />

        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/precious' element={<ShopCategory banner={men_banner} category='precious' />} />
          <Route path='/semi' element={<ShopCategory banner={women_banner} category='semi' />} />
          <Route path='/unique' element={<ShopCategory banner={kid_banner} category='unique' />} />
          <Route path='/product' element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>
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
