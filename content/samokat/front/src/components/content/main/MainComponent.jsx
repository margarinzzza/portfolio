import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { useParams } from 'react-router-dom';
import FooterComponent from "./FooterComponent";

const MainComponent = () => {

  const dispatch = useDispatch()

  return (
    <div className={`main flex flex-1 bg-white rounded padded mx-6`}>
      MainComponent
      <FooterComponent/>
    </div>
  )
}

export default MainComponent;
