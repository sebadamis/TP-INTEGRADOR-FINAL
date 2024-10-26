import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Contact from "./pages/contact/Contact";
import Register from "./pages/register/Register";
import Header from "./layout/header/Header";
import Footer from "./layout/footer/Footer";
import AdminProduct from "./pages/admin-product/AdminProduct";
import Nosotros from "./pages/about-us/AboutUs";
import ProductDetail from "./pages/product-detail/ProductDetail";
import OrderDialog from "./components/order-dialog/OrderDialog";
import AdminUser from "./pages/admin-user/AdminUser";
import Login from "./pages/login/Login"
import AdminGuard from "./services/Guard/AdminGuard";

export default function App() {
  return (
    <>
      <OrderDialog />
      <Header/>

      <main className="main-container">
        
        <Routes>

          <Route path="/" element={ <Home />  } />

          <Route path="/contact" element={ <Contact/> } />

          <Route path="/nosotros" element={ <Nosotros/> }/>

          <Route path="/registro" element={ <Register/> }/>

          <Route path="/product-detail/:id" element={ <ProductDetail/> }/>

          <Route  path="/admin-product" element={ 
              <AdminGuard>
                  <AdminProduct/> 
              </AdminGuard>
            }/>

          <Route path="/admin-user" element={ 
              <AdminGuard>
                  <AdminUser/> 
              </AdminGuard>
            }/>

          <Route path="/login" element={ <Login/> }/>

        </Routes>
      </main>
      
      <Footer />
    </>
  )
}
