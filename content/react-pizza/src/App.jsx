import { useSelector } from 'react-redux';
import './index.scss';
import { qnas } from './store/store';
import { setQuestion } from './redux/slices/filterSlice';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router';
import MainPage from './pages/main/MainPage';
import HeaderComponent from './components/header/HeaderComponent';
import CartPage from './pages/cart/CartPage';

const App = () => {

  const dispatch = useDispatch()

  return (
    <div className={`app`}>
      <div className={`content`}>
        <HeaderComponent/>
        <Routes>
          <Route path='/' element={<MainPage/>}/>
          <Route path='/cart' element={<CartPage/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
