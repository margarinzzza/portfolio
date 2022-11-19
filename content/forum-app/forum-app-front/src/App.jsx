import HeaderComponent from "./components/header/HeaderComponent";
import "bootstrap-icons/font/bootstrap-icons.css"
import { Routes, Route, Navigate } from 'react-router-dom'
import NotFoundComponent from "./components/NotFoundComponent";
import IndexComponent from "./components/index/IndexComponent";
import BoardComponent from "./components/board/BoardComponent";
import { useSelector } from 'react-redux'
import ProfileComponent from "./components/profile/ProfileComponent";
import AuthComponent from "./components/auth/AuthComponent";
import ThreadComponent from "./components/thread/ThreadComponent";

function App() {

  const { isAuth } = useSelector((state) => state.auth)

  return (
    <div className="app">
      <HeaderComponent />
      <Routes>
        <Route path="/" element={<IndexComponent />} />
        <Route path="/boards/:boardName" element={<BoardComponent />} />
        <Route path="/boards/:boardName/:threadId" element={<ThreadComponent />} />
        <Route path="/boards" element={<Navigate to="/" />} />
        {isAuth ?
          <Route path="/profile" element={<ProfileComponent />} />
          :
          <Route path="/auth" element={<AuthComponent />} />
        }
        <Route path="*" element={<NotFoundComponent />} />
      </Routes>
    </div>
  );
}

export default App;
