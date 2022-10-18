import { Routes, Route  } from 'react-router-dom';
import { Navigate } from 'react-router';
import FirstTaskPage from './components/firstTask/FirstTaskPage';
import MainPage from './components/MainPage';
import SecondTaskPage from './components/secondTask/SecondTaskPage';

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path='/first-task' element={<FirstTaskPage/>} />
        <Route path='/second-task' element={<SecondTaskPage/>} />
        <Route path='/' element={<MainPage/>} />
        <Route path='*' element={<Navigate to='/'/>} />
      </Routes>
    </div>
  );
}

export default App;
