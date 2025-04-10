import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import ProductPage from "Pages/Buyer/Product";
import ShoppingCart from "../Pages/Buyer/ShoppingCart";
// import Checkout from "../Pages/Buyer/Checkout";
import Category from "../Pages/Buyer/Category";
import NotFound from "../Pages/Buyer/NotFounds";
import ProductDetail from "../Pages/Buyer/ProductDetail";
import Home from "../Pages/Buyer/Home";
import LivePage from "../Pages/Buyer/Live";
import Chat from "../Pages/Buyer/Chat";
import Orders from "../Pages/Buyer/Orders";
import OrderDetail from "../Pages/Buyer/OrderDetail";
import Notifications from "../Pages/Buyer/Notifications";
import Account from "../Pages/Buyer/Account";
import SignIn from "../Pages/Buyer/SignIn";
import LogIn from "../Pages/Buyer/LogIn";
import StorePage from "../Pages/Buyer/Store";
import App from "../App";
import { AdminLayout, ClientLayout } from "../Layouts";

import AdminDashboard from "Pages/Admin/AdminDashboard";
import AdminReport from "Pages/Admin/AdminReport";
import AdminBuyer from "Pages/Admin/AdminBuyer";
import AdminBuyerDetail from "Pages/Admin/AdminBuyerDetail";
import AdminSeller from "Pages/Admin/AdminSeller";
import AdminSellerDetail from "Pages/Admin/AdminSellerDetail";
import AdminFeedback from "Pages/Admin/AdminFeedback";
import AdminFeedbackDetail from "Pages/Admin/AdminFeedbackDetail";
import AdminLogIn from "Pages/Admin/AdminLogin"
import Room from "../Pages/Buyer/Live/Room";
import Checkout from "../Pages/Buyer/Checkout/indexNew";


import ProductDetailNew from "../Pages/Buyer/ProductDetail/indexNew";
import RoomNew from "../Pages/Buyer/Live/demoRoom";
import { useCookies } from "react-cookie";


const ProtectedRoute = ({children}) => {
  const user = localStorage.getItem("user");
  const [cookies, setCookies] = useCookies(["jwt"]);
  let location = useLocation();
  if(!user) {
    return <Navigate to="/login" state={{from: location}} replace />
  }
  return children;
} 

const AppRoute = () => {
  
  return (
    <Routes>
      <Route path="signin" element={<SignIn />} />
      <Route path="login" element={<LogIn />} />
      
      <Route path="/" element={<ClientLayout />}>
        <Route path="" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="live" element={<LivePage />} />
        <Route path="product" element={<ProductPage />} />
        {/* <Route path="product_detail/:id?" element={<ProductDetail />} /> */}
        <Route path="product_detail/:id?" element={<ProductDetailNew />} />
        <Route path="category" element={<Category />} />
        <Route path="shopping_cart" element={<ProtectedRoute><ShoppingCart /></ProtectedRoute>} />
        {/* <Route path="checkout" element={<Checkout />} /> */}
        <Route path="checkout" element={<Checkout />} />
        <Route path="chat" element={<Chat />} />
        <Route path="orders" element={<Orders />} />
        <Route path="order_detail/:id?" element={<OrderDetail />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="account" element={<Account />} />
        <Route path="store" element={<StorePage />} />
        <Route path="test" element={<App />} />
        <Route path="room" element={<Room />} />
        <Route path="room-new" element={<RoomNew />} />
      </Route>



      // admin
      <Route path="admin_login" element={<AdminLogIn />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />}></Route>
        <Route path="report" element={<AdminReport />}></Route>
        <Route path="buyer" element={<AdminBuyer />}></Route>
        <Route path="buyer_detail" element={<AdminBuyerDetail />}></Route>
        <Route path="seller" element={<AdminSeller />}></Route>
        <Route path="seller_detail" element={<AdminSellerDetail />}></Route>
        <Route path="feedback" element={<AdminFeedback />}></Route>
        <Route path="feedback_detail" element={<AdminFeedbackDetail />}></Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoute;
