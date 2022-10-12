import { useState } from 'react'
import logo from '../media/img/logo.png'
import { cities } from '../store/store'
import { useSelector, useDispatch } from 'react-redux';
import { setThemeName } from '../redux/slices/themeSlice';
import { setCity } from '../redux/slices/citiesSlice';

const HeaderComponent = () => {
  const dispatch = useDispatch()
  const theme = useSelector((state)=>state.theme.themeName)
  const city = useSelector((state)=>state.city.city)
  const [cityPopup, setCityPopup] = useState(false)

  const changeTheme = () => {
    if (theme === 'light') {
      dispatch(setThemeName('dark'))
    } else {
      dispatch(setThemeName('light'))
    }

  }
  return (
    <div className="header row">
      <div className='col-md-7 col-2 d-flex align-items-center c-pointer'>
        <img src={logo} alt="logo" className='me-3' />
        <h3 className='d-sm-flex d-none text-uppercase fw-bold fc-blue'>React weather</h3>
      </div>
      <div className='col d-flex align-items-center justify-content-end'>
        <svg onClick={changeTheme} className='c-pointer' width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.6667 4.09792V24.7917C6.83958 24.7917 2.91667 20.9562 2.91667 16.2312C2.91667 13.9562 3.82083 11.8125 5.46875 10.1937L11.6667 4.09792ZM11.6667 0L3.42708 8.10833C1.3125 10.1937 0 13.0667 0 16.2312C0 22.575 5.22083 27.7083 11.6667 27.7083C18.1125 27.7083 23.3333 22.575 23.3333 16.2312C23.3333 13.0667 22.0208 10.1937 19.9062 8.10833L11.6667 0Z" fill="#4793FF" />
        </svg>
        <div onClick={()=>setCityPopup(!cityPopup)} className={`position-relative ${theme==='dark'?'gray-bg':'light-bg'} c-pointer change-city-selector py-2 px-3 rounded-pill ms-4`} >
          <span>{city.length===0?'Выберите город':city.name}</span>
          <svg className='ms-2' width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.85674 7.86232L12.853 1.84944C13.0493 1.65243 13.049 1.33348 12.852 1.1368C12.655 0.940281 12.3358 0.940788 12.1393 1.13782L6.49998 6.7928L0.860642 1.13762C0.66412 0.94061 0.345189 0.940102 0.148159 1.1366C0.0493898 1.23519 4.75199e-06 1.36435 4.74634e-06 1.49351C4.74071e-06 1.62235 0.0490589 1.751 0.147142 1.84941L6.14324 7.86232C6.23764 7.9572 6.36612 8.01045 6.49998 8.01045C6.63384 8.01045 6.76216 7.95705 6.85674 7.86232Z" fill={theme==='dark'?'white':'black'} />
          </svg>
          <div className={`${theme==='dark'?'gray-bg':'bg-white'} cities-list ${cityPopup?'d-flex':'d-none'}`}>
            {cities.map((e)=>{
              return <span onClick={()=>dispatch(setCity(e))} key={e.id}>{e.name}</span>
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderComponent;