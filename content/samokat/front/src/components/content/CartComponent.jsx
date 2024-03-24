import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { useParams } from 'react-router-dom';
import { chatSliceActions, getChats, getMessages } from "../../features/chatSlice";
import InputComponent from "../inputs/InputComponent";

const CartComponent = () => {

  let { chatId } = useParams()
  const dispatch = useDispatch()
  const { userData } = useSelector(state => state.authSlice)
  const { chats, onlineUsers, messages } = useSelector(state => state.chatSlice)
  const [isAdressFilled, setIsAdressFilled] = useState(false)
  const [adressData, setAdressData] = useState({ 'city': '', 'street': '', 'building': '' })
  const handleSetAdress = ({ name, value }) => setAdressData({ ...adressData, [name]: value })

  return (
    <div className={`cart w-[400px] bg-white rounded padded`}>
      {isAdressFilled ?
        <div></div>
        :
        <div>
          <h3>Добавить адрес</h3>
          <div className={``}>
            <div className="mb-4">
              <InputComponent classStyles={''} type={'text'} name={'city'} placeholder={'Город'} setValue={handleSetAdress} value={adressData.city} />
              <div className="flex">
                <InputComponent classStyles={'flex-2'} type={'text'} name={'street'} placeholder={'Улица'} setValue={handleSetAdress} value={adressData.street} />
                <InputComponent classStyles={'flex-1 ml-3'} type={'text'} name={'building'} placeholder={'Дом'} setValue={handleSetAdress} value={adressData.building} />
              </div>
            </div>
            <div className={`redBtn ${!adressData.city || !adressData.street || !adressData.building ? 'disabledBtn' : ''} `}>
              Все верно
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default CartComponent;
