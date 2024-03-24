import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { useParams } from 'react-router-dom';

const FooterComponent = () => {

  const dispatch = useDispatch()

  return (
    <div className={`sidebar`}>
      FooterComponent
    </div>
  )
}

export default FooterComponent;
