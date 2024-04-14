import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { useParams } from 'react-router-dom';
import StoriesComponent from "./StoriesComponent";
import ProfitableShelfComponent from "./ProfitableShelfComponent";

const MainComponent = () => {

  const dispatch = useDispatch()

  return (
    <div className="main flex flex-1 mx-6 flex-col overflow-x-hidden">
      <div className={`bg-white rounded padded`}>
        <StoriesComponent/>
        <ProfitableShelfComponent/>
        <div className={`main-categories`}>
          <div className={`category`}>
            <h2>От Самоката</h2>
            <div className="subcategories flex">
              <div style={{ backgroundImage: `url("https://cm.samokat.ru/processed/category/c7f2b6e7-d1e7-4e84-8ecf-6e21506dba03.jpg")` }} className="subcategory">
                <span>Новое и популярное</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainComponent;
