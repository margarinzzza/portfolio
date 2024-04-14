import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { useParams } from 'react-router-dom';
import SidePopUp from "../popups/sidePopup/SidePopUp";
import { visibleStatesActions } from "../../features/visibleStates";

const HeaderComponent = () => {
  const inputRef = useRef(null);
  const { sidePopUp } = useSelector(state => state.visibleStates)
  const dispatch = useDispatch()

  return (
    <div className={`header rounded`}>
      <div className={`header__logo`}>
        <Link to={'/'}>
          <svg xmlns="http://www.w3.org/2000/svg" width="153" height="23" fill="none"><path fill="#FF335F" d="M25.05 12.34C24.9 5.552 19.354.108 12.532.108 5.614.108 0 5.717 0 12.628h5.01c0 5.526 4.489 10.01 10.02 10.01 5.436 0 9.87-4.333 10.02-9.736v-.562Zm-10.02 5.293a5 5 0 0 1-5.01-5.005 5 5 0 0 1 5.01-5.005 5 5 0 0 1 5.01 5.005 5 5 0 0 1-5.01 5.005ZM96.371 4.77c-4.365 0-7.92 3.525-7.92 7.844 0 4.402 3.473 7.844 7.92 7.844 4.434 0 7.92-3.442 7.92-7.844-.014-4.32-3.555-7.843-7.92-7.843Zm0 12.41c-2.333 0-4.035-2.083-4.035-4.552 0-2.468 1.688-4.553 4.035-4.553 2.279 0 3.994 2.126 3.994 4.553 0 2.469-1.688 4.553-3.994 4.553ZM61.575 5.113l-.013 1.742s-.179-.22-.33-.384c-.74-.891-2.182-1.687-4.282-1.687-3.885 0-7.056 3.524-7.056 7.844 0 4.333 3.171 7.844 7.056 7.844 2.114 0 3.541-.795 4.282-1.687.151-.178.33-.384.33-.384l.014 1.742h3.843V5.113h-3.843Zm.234 7.515c0 2.564-1.579 4.553-3.967 4.553s-4.063-1.989-4.063-4.553 1.675-4.553 4.063-4.553c2.388-.013 3.967 1.975 3.967 4.553 0-.014 0-.014 0 0ZM133.446 5.113l-.014 1.742s-.179-.22-.33-.384c-.741-.891-2.182-1.687-4.282-1.687-3.885 0-7.055 3.524-7.055 7.844 0 4.333 3.17 7.844 7.055 7.844 2.114 0 3.541-.795 4.282-1.687.151-.178.33-.384.33-.384l.014 1.742h3.843V5.113h-3.843Zm.233 7.515c0 2.564-1.579 4.553-3.967 4.553s-4.063-1.989-4.063-4.553 1.675-4.553 4.063-4.553c2.388-.013 3.967 1.975 3.967 4.553 0-.014 0-.014 0 0ZM44.116 10.626h3.885c-.948-3.675-3.748-5.855-7.522-5.855-4.516 0-7.92 3.373-7.92 7.843s3.404 7.844 7.92 7.844c3.774 0 6.574-2.18 7.522-5.855h-3.899c-.7 1.577-1.949 2.564-3.623 2.564-2.375 0-4.036-1.975-4.036-4.553 0-2.591 1.661-4.552 4.036-4.552 1.674 0 2.937.987 3.637 2.564ZM72.159 5.113H68.85V20.13h3.857V10.9l4.612 5.897 4.584-5.897v9.23h3.857V5.112h-3.308l-5.16 6.596-5.134-6.596ZM120.818 5.113h-4.544l-5.477 6.596V5.113h-3.857V20.13h3.857v-6.486l6.109 6.486h4.927l-7.275-7.624 6.26-7.392ZM144.441 20.13h3.857V8.35h4.543V5.113h-12.93V8.35h4.53v11.78Z" /></svg>
        </Link>
      </div>
      <div onClick={() => inputRef.current.focus()} className={`header__search bg-gray rounded flex items-center h-[55px] px-6 cursor-text`}>
        <svg className={`text-[#a6a6a6] mr-3`} width="22" height="22" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M11 7C11 9.20914 9.20914 11 7 11C4.79086 11 3 9.20914 3 7C3 4.79086 4.79086 3 7 3C9.20914 3 11 4.79086 11 7ZM11.0747 12.4889C10.7294 12.1436 10.1889 12.1068 9.75528 12.3314C8.93019 12.7586 7.99328 13 7 13C3.68629 13 1 10.3137 1 7C1 3.68629 3.68629 1 7 1C10.3137 1 13 3.68629 13 7C13 7.99328 12.7586 8.93019 12.3314 9.75528C12.1068 10.1889 12.1436 10.7294 12.4889 11.0747L14.7071 13.2929C15.0976 13.6834 15.0976 14.3166 14.7071 14.7071C14.3166 15.0976 13.6834 15.0976 13.2929 14.7071L11.0747 12.4889Z" fill="currentColor"></path>
        </svg>
        <input ref={inputRef} className={`font-semibold`} type="text" name="search" placeholder="Искать в Самокате" />
      </div>
      <div onClick={()=>dispatch(visibleStatesActions.showSidePopup({children: 'auth'}))} className={`header__checkin flex items-center bg-gray rounded h-[55px] px-6 cursor-pointer`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-person-fill mr-2" viewBox="0 0 16 16">
          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
        </svg>
        <h5>Войти</h5>
      </div>
    </div>
  )
}

export default HeaderComponent;
