import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import CatalogTreeCategoryComponent from "./CatalogTreeCategoryComponent";

const SidebarComponent = () => {

  const dispatch = useDispatch()
  const { userData } = useSelector(state => state.authSlice)

  return (
    <div className={`sidebar-wrapper min-w-[250px] `}>
      <div className={`sidebar bg-white min-w-[250px] max-w-[250px] rounded padded fixed`}>
        <div className={`catalogTree`}>{new Array(10).fill().map(el => <CatalogTreeCategoryComponent />)}</div>
      </div>
    </div>

  )
}

export default SidebarComponent;
