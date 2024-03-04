import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ava from '../../../media/img/ava.png'
import { acceptOfferFriendship, authSliceActions, cancelOfferFriendship, getUsers, getMyOffersData } from "../../../features/authSlice";
import { Link } from "react-router-dom";
import { goToChat } from "../../../features/chatSlice";

const FriendOffersComponent = ({ handlers }) => {

  const dispatch = useDispatch()
  const { offers, userData, friendsData } = useSelector(state => state.authSlice)

  useEffect(() => {
    dispatch(getMyOffersData(userData._id))
  }, [])

  return (
    <div className={`flex h-full`}>
      <div className={`h-full flex flex-col flex-1`}>
        <h4>Отправленные</h4>
        <div className={`h-full overflow-y-auto flex flex-col`}>
          {offers.sendedOffers.length > 0 ?
            offers.sendedOffers.map((el, idx) => {
              return <div key={idx} className={`friends-list_item findFriends-list__item hover:bg-[#dfc9f33b] shadow-lg`}>
                <img className={`rounded-[50%] border-2 border-[#ffffff] w-[60px] h-[60px] mr-3`} src={ava} alt="ava" />
                <div className={`findFriends-list__item-name flex flex-col flex-1`}>
                  <span>{el.name} {el.surname}</span>
                  <span className="text-slate-500 text-[13px]">@{el.link}</span>
                </div>
                <div className={`findFriends-list__item-actions flex mt-1`}>
                  <div onClick={() => handlers.goToChatHandler({ myId: userData._id, userId: el._id, type: 'personal', myChats: userData.chats })} className={`friends-list_item-actions_item findFriends-list__item-actions__item hover:bg-[#d7b7f5]`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat" viewBox="0 0 16 16">
                      <path d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105" />
                    </svg>
                  </div>
                  <div onClick={async () => await dispatch(cancelOfferFriendship({ inviterId: userData._id, invitedId: el._id })).unwrap().then(r => dispatch(getMyOffersData(userData._id))).catch(e => { })} className={`friends-list_item-actions_item findFriends-list__item-actions__item hover:bg-[#d7b7f5]`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-dash-fill" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M11 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5" />
                      <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                    </svg>
                  </div>
                </div>
              </div>
            }) : <span className="text-slate-500 text-sm">Ничего не найдено</span>}
        </div>
      </div>
      <div className={`h-full flex flex-col flex-1`}>
        <h4>Входящие</h4>
        <div className={`h-full overflow-y-auto flex flex-col`}>
          {offers.gettedOffers.length > 0 ?
            offers.gettedOffers.map((el, idx) => {
              return <div key={idx} className={`friends-list_item findFriends-list__item hover:bg-[#dfc9f33b] shadow-lg`}>
                <img className={`rounded-[50%] border-2 border-[#ffffff] w-[60px] h-[60px] mr-3`} src={ava} alt="ava" />
                <div className={`findFriends-list__item-name flex flex-col flex-1`}>
                  <span>{el.name} {el.surname}</span>
                  <span className="text-slate-500 text-[13px]">@{el.link}</span>
                </div>
                <div className={`findFriends-list__item-actions flex mt-1`}>
                  <div onClick={async () => await dispatch(cancelOfferFriendship({ inviterId: el._id, invitedId: userData._id })).unwrap().then(() => dispatch(getMyOffersData(userData._id)))} className={`friends-list_item-actions_item findFriends-list__item-actions__item hover:bg-[#d7b7f5]`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-dash-fill" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M11 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5" />
                      <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                    </svg>
                  </div>
                  <div onClick={async () => await dispatch(acceptOfferFriendship({ inviterId: el._id, invitedId: userData._id })).unwrap().then(() => dispatch(getMyOffersData(userData._id)))} className={`friends-list_item-actions_item findFriends-list__item-actions__item hover:bg-[#d7b7f5]`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
                      <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                      <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5" />
                    </svg>
                  </div>
                </div>
              </div>
            }) : <span className="text-slate-500 text-sm">Ничего не найдено</span>}
        </div>
      </div>
    </div>
  )
}

export default FriendOffersComponent;
