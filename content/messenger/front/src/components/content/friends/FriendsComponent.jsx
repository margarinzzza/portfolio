import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MyFriendsComponent from "./MyFriendsComponent";
import FindFriendsComponent from "./FindFriendsComponent";
import FriendOffersComponent from "./FriendOffersComponent";
import { socket } from "../../../socket";
import { goToChat } from "../../../features/chatSlice";
import { authSliceActions } from "../../../features/authSlice";
import { useNavigate } from "react-router-dom";

const FriendsComponent = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [selectedOption, setSelectedOption] = useState(0)
  const { usersData, userData, friendsData } = useSelector(state => state.authSlice)
  useEffect(() => {
    socket.emit('joinToFriendsSection', { userId: userData._id })
  }, [])

  useEffect(()=>{
    socket.on('', (event) => {
      console.log(event)
    })
  }, [])

  const goToChatHandler = async (params) => {
    await dispatch(goToChat(params)).unwrap().then(r => {
      if (r.type === 'created') dispatch(authSliceActions.addChatId(r.chatRef))
      navigate(`/chats/${r.chatRef}`)
    })
  }

  return (
    <div className={`friends h-full`}>
      <h1>Друзья</h1>
      <div className={`flex flex-col mt-2 h-[90%]`}>
        <div className={`flex flex-wrap mb-2`}>
          <div onClick={() => setSelectedOption(0)} className={`${selectedOption === 0 && 'bg-[#dfc9f36b]'} mx-2 my-1 cursor-pointer hover:bg-[#dfc9f33b] transition-all shadow-md px-3 py-2 rounded-[5px]`}>Мои друзья</div>
          <div onClick={() => setSelectedOption(1)} className={`${selectedOption === 1 && 'bg-[#dfc9f36b]'} mx-2 my-1 cursor-pointer hover:bg-[#dfc9f33b] transition-all shadow-md px-3 py-2 rounded-[5px]`}>Найти друзей</div>
          <div onClick={() => setSelectedOption(2)} className={`${selectedOption === 2 && 'bg-[#dfc9f36b]'} mx-2 my-1 cursor-pointer hover:bg-[#dfc9f33b] transition-all shadow-md px-3 py-2 rounded-[5px]`}>Заявки в друзья</div>
        </div>
        <div className={`h-[90%]`}>
          {selectedOption === 0 && <MyFriendsComponent handlers={{goToChatHandler}} />}
          {selectedOption === 1 && <FindFriendsComponent handlers={{goToChatHandler}} />}
          {selectedOption === 2 && <FriendOffersComponent handlers={{goToChatHandler}} />}
        </div>
      </div>
    </div>
  )
}

export default FriendsComponent;
