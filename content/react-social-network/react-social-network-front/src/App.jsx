import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux/es/exports";
import AuthComponent from "./components/content/auth/AuthComponent";
import MessengerComponent from "./components/content/messages/MessengerComponent";
import PostsComponent from "./components/content/posts/PostsComponent";
import NotFoundComponent from "./components/content/NotFoundComponent";
import ProfileComponent from "./components/content/profile/ProfileComponent";
import SettingsComponent from "./components/content/settings/SettingsComponent";
import HeaderComponent from "./components/header/HeaderComponent";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { checkUser } from "./features/profile/authSlice";
import UsersComponent from "./components/content/users/UsersComponent";
import { getAllPosts } from "./features/profile/postsSlice";

const App = () => {
  const { isAuth } = useSelector(state => state.auth)
  const { allPosts } = useSelector(state => state.posts)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(checkUser())
  }, [])
  
  useEffect(() => {
    if (!isAuth) {
      navigate('/')
    } else navigate('/profile')
  }, [isAuth])

  useEffect(() => {
    dispatch(getAllPosts())
  }, [allPosts])

  return (
    <div className="app">
      <HeaderComponent />
      <div className="content">
        <Routes>
          {isAuth ?
            <>
              <Route path="/profile" element={<ProfileComponent />} />
              <Route path="/messages/*" element={<MessengerComponent />} />
              <Route path="/posts" element={<PostsComponent />} />
              <Route path="/users" element={<UsersComponent />} />
              <Route path="/settings" element={<SettingsComponent />} />
            </>
            :
            <>
              <Route path="/" element={<AuthComponent />} />
            </>
          }
          <Route path="*" element={<NotFoundComponent />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
