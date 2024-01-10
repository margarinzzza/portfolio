import './index.css';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router';
import MainPage from './pages/MainPage';
import HeaderComponent from './components/header/HeaderComponent';
import CartPage from './pages/CartPage';
import NotFoundComponent from './components/NotFoundComponent'

const App = () => {

  return (
    <div className={`app`}>
      <div className={`content`}>
        <HeaderComponent/>
        <Routes>
          <Route path='/' element={<MainPage/>}/>
          <Route path='/cart' element={<CartPage/>}/>
          <Route path='*' element={<NotFoundComponent/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
