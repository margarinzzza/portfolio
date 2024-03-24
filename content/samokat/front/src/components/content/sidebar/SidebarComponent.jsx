import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { useParams } from 'react-router-dom';
import { chatSliceActions, getChats, getMessages } from "../../../features/chatSlice";
import CatalogTreeCategoryComponent from "./CatalogTreeCategoryComponent";

const SidebarComponent = () => {

  let { chatId } = useParams()
  const dispatch = useDispatch()
  const { userData } = useSelector(state => state.authSlice)
  const { chats, onlineUsers, messages } = useSelector(state => state.chatSlice)
  const [findChatQuery, setFindChatQuery] = useState('')
  const [findMsgQuery, setFindMsgQuery] = useState('')

  return (
    <div className={`sidebar w-[250px] bg-white rounded padded`}>
      <div className={`catalogTree`}>{new Array(10).fill().map(el => <CatalogTreeCategoryComponent />)}</div>
    </div>
  )
}

export default SidebarComponent;
