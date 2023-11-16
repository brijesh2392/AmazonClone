import "./App.css";
import Header from "./components/header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Home from "./Pages/Home.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import { productsData } from "./api/api";
import SignIn from "./Pages/SignIn.jsx";
import Registration from "./Pages/Registration.jsx";
import Checkout from "./Pages/Checkout.jsx";
import Cart from "./Pages/Cart.jsx";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} loader={productsData}></Route>
          <Route path="/cart" element={<Cart />}></Route>
        </Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/registration" element={<Registration />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
      </Route>
    )
  );

  return (
    <div className="font-bodyFont bg-gray-100">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
