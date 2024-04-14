import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { useParams } from 'react-router-dom';

const CatalogTreeCategoryComponent = () => {

  const dispatch = useDispatch()
  const { userData } = useSelector(state => state.authSlice)
  const [isHover, setIsHover] = useState(false)
  const [isOpened, setIsOpened] = useState(false)

  return (
    <div className={`catalogTree__category`}>
      <div onClick={() => setIsOpened(!isOpened)} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} className="flex items-center cursor-pointer">
        <div className={`catalogTree-img relative mr-2`}>
          <div className={`transition-all absolute rounded-[10px] w-full h-[40px] flex items-center justify-center ${isHover ? isOpened ? 'bg-[#ececec]' : 'bg-[#00000036]' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="#7c7c7c" className={`${isHover && isOpened ? 'opacity-100' : 'opacity-0'} transition-all bi bi-chevron-bar-up`} viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M3.646 11.854a.5.5 0 0 0 .708 0L8 8.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708M2.4 5.2c0 .22.18.4.4.4h10.4a.4.4 0 0 0 0-.8H2.8a.4.4 0 0 0-.4.4" />
            </svg>
          </div>
          <div className={`w-full h-[40px] bg-cover rounded-[10px] bg-bottom`} style={{ backgroundImage: `url(${process.env.PUBLIC_URL + 'media/img/catalogTree/ex.jpg'})` }}></div>
        </div>
        <span className={`font-semibold text-sm`}>От Самоката</span>
      </div>
      {isOpened && <div className={`subTree `}>
        {new Array(3).fill().map(el => <div className={`ml-12 text-sm cursor-pointer transition-all hover:text-slate-500 my-2`}>Молочное и сыр</div>)}
      </div>}
    </div>
  )
}

export default CatalogTreeCategoryComponent;
