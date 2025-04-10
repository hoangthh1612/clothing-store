import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import ProductPage from "Pages/Buyer/Product";
import ShoppingCart from "./Pages/Buyer/ShoppingCart";
import Checkout from "./Pages/Buyer/Checkout";
import Category from "./Pages/Buyer/Category";
import NotFound from "./Pages/Buyer/NotFounds";
import ProductDetail from "./Pages/Buyer/ProductDetail";
import Home from "./Pages/Buyer/Home";
import Chat from "./Pages/Buyer/Chat";
import Orders from "./Pages/Buyer/Orders";
import OrderDetail from "./Pages/Buyer/OrderDetail";
import Notifications from "./Pages/Buyer/Notifications";
import Account from "./Pages/Buyer/Account";
import SignIn from "./Pages/Buyer/SignIn";
import LogIn from "./Pages/Buyer/LogIn";
import StorePage from "./Pages/Buyer/Store";
import { AdminLayout, ClientLayout } from "./Layouts";

import CheckoutNew from "./Pages/Buyer/Checkout/indexNew";
import ProductDetailNew from "./Pages/Buyer/ProductDetail/indexNew";
import { useCookies } from "react-cookie";
import ShoppingCartNew from "./Pages/Buyer/ShoppingCart/indexNew";
import ReturnCheckout from "./Pages/Buyer/Checkout/components/ReturnCheckout";
import SearchPage from "./Pages/Buyer/Search";
const ProtectedRoute = ({children}) => {
  const user = localStorage.getItem("user");
  const [cookies, setCookies] = useCookies(["jwt"]);
  let location = useLocation();
  if(!user) {
    return <Navigate to="/login" state={{from: location}} replace />
  }
  return children;
} 

const App = () => {
  // const user = localStorage.getItem("user");
  // const [cookies, setCookie] = useCookies(["jwt"]);

  
  return (
    <Routes>
      <Route path="signin" element={<SignIn />} />
      <Route path="login" element={<LogIn />} />
      
      <Route path="/" element={<ClientLayout />}>
        <Route path="" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="product" element={<ProductPage />} />
        {/* <Route path="product_detail/:id?" element={<ProductDetail />} /> */}
        <Route path="product_detail/:id?" element={<ProductDetailNew />} />
        <Route path="category" element={<Category />} />
        <Route path="category/:id" element={<Category />} />
        {/* <Route path="shopping_cart" element={<ProtectedRoute><ShoppingCart /></ProtectedRoute>} /> */}
        <Route path="shopping_cart" element={<ProtectedRoute><ShoppingCartNew /></ProtectedRoute>} />
        
        <Route path="checkout" element={<Checkout />} />
        {/* <Route path="checkout" element={<CheckoutNew />} /> */}
        <Route path="chat" element={<Chat />} />
        <Route path="orders" element={<Orders />} />
        <Route path="order_detail/:id?" element={<OrderDetail />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="account" element={<Account />} />
        <Route path="store" element={<StorePage />} />
        {/* <Route path="test" element={<App />} /> */}
        <Route path="returncheckout" element={<ReturnCheckout />} />
        <Route path="search" element={<SearchPage />} />
      </Route>



    
      <Route path="*" element={<NotFound />} />
    </Routes>
  );


}

export default App;
