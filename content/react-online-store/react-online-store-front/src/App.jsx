import HeaderComponent from "./components/header/HeaderComponent";
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useSelector, useDispatch } from 'react-redux'
import AuthComponent from "./components/auth/AuthComponent";
import CatalogComponent from "./components/catalog/CatalogComponent";
import ProfileComponent from "./components/profile/ProfileComponent";
import CartComponent from "./components/cart/CartComponent";
import AdminPanelComponent from "./components/adminPanel/AdminPanelComponent";
import NotFoundComponent from "./components/notFound/NotFoundComponent";
import ItemPageComponent from "./components/itemPage/ItemPageComponent";
import { useLocation } from 'react-router-dom';
import { checkAuth } from "./features/auth/authSlice";
import { getCart } from "./features/auth/cartSlice";

const App = () => {
  const dispatch = useDispatch()
  let location = useLocation();
  useEffect(() => {
    let token = localStorage.getItem('token')
    dispatch(checkAuth({ token }))
  }, [])
  const { isAuth, userData } = useSelector(store => store.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuth) {
      navigate('/')
    } else if (isAuth && location.pathname == '/') {
      navigate('/catalog')
    }
  }, [isAuth])

  return (
    <div className="app">
      <HeaderComponent />
      <div className="content">
        <Routes>
          <Route path="/catalog" element={<CatalogComponent />} />
          <Route path="/catalog/:itemId" element={<ItemPageComponent />} />
          {isAuth ?
            <>
              <Route path="/profile" element={<ProfileComponent />} />
              <Route path="/cart" element={<CartComponent />} />
              {userData.role === 'ADMIN' &&
                <Route path="/admin_panel" element={<AdminPanelComponent />} />
              }
            </>
            :
            <Route path="/" element={<AuthComponent />} />
          }
          <Route path="*" element={<NotFoundComponent />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;