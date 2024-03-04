import { useSelector } from "react-redux";
import ava from '../../media/img/ava.png'
import { Link } from "react-router-dom";

const SidebarComponent = () => {

  const pathname = window.location.pathname
  const { userData } = useSelector(state => state.authSlice)

  return (
    <div className={`sidebar`}>
      <div className={`sidebar-header flex justify-center items-center flex-col`}>
        <img src={ava} alt="ava" className="w-[85px] rounded-[50%] border-2 border-[#ffffff] mb-2" />
        <span>{userData.name} {userData.surname}</span>
      </div>
      <div className={`sidebar-nav flex flex-col mt-10`}>
        <Link to={'/'} className={`sidebar-nav__item ${(pathname === '/' || pathname.includes(`/chats`)) && 'sidebar-nav__item-Active'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-right" viewBox="0 0 16 16">
            <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z" />
          </svg>
          <span>Диалоги</span>
        </Link>
        <Link to={'/profile'} className={`sidebar-nav__item ${pathname === '/profile' && 'sidebar-nav__item-Active'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
          </svg>
          <span>Профиль</span>
        </Link>
        <Link to={'/friends'} className={`sidebar-nav__item ${pathname === '/friends' && 'sidebar-nav__item-Active'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people" viewBox="0 0 16 16">
            <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
          </svg>
          <span>Друзья</span>
        </Link>
      </div>
    </div>
  )
}

export default SidebarComponent;
