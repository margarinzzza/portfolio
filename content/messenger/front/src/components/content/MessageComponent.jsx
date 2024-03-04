import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ava from '../../media/img/ava.png'

const MessageComponent = ({ data, selectMsg }) => {

  const [isSelected, setIsSelected] = useState(false)
  const { userData } = useSelector(state => state.authSlice)

  useEffect(() => {
    const candidate = selectMsg.selectedMsgs.find(el => el._id === data.el._id)
    if (candidate) return setIsSelected(true)
    return setIsSelected(false)
  }, [selectMsg.selectedMsgs])

  const returnUpdatedDate = (data) => {
    let msgDate = data.updatedAt.split(','), currentDate
    let date = new Date().toLocaleString().split(',')
    if (msgDate[0] === date[0]) currentDate = `в ${msgDate[1].slice(0, 6)}`
    if (msgDate[0] !== date[0]) currentDate = `${msgDate[0]} в ${msgDate[1].slice(0, 6)}`
    return currentDate
  }

  const isDeletedForMe = (data) => {
    const findMe = data.find(el => el === userData._id)
    if (findMe) return 'hidden'
    if (!findMe) return 'flex'
  }

  return (
    <div className={`${data.el.userId === userData._id && 'myMessage'} ${isDeletedForMe(data.el.deleteFor)} my-[5px] p-[15px] transition-all`}>
      <img src={ava} alt="ava" className="w-[50px] h-[50px] mr-[13px]" />
      <div onClick={() => selectMsg.selectMessage(data.el)} className={`${data.el.link === userData.link ? 'rounded-br-[0]' : 'rounded-bl-[0]'} message-text shadow-lg ${isSelected && 'selectedMessage'}`}>
        <div className={`flex items-center message-sender`}>
          <h4>{data.el.name}</h4>
          <span className="text-slate-500 ml-3 text-[14px]">{data.el.createdAt}</span>
        </div>
        <p>{data.el.text}</p>
        {data.el.isModified &&
          <div className="w-full flex justify-end">
            <span className="text-slate-500 text-xs">Изменено {returnUpdatedDate(data.el)}</span>
          </div>
        }
      </div>
    </div>
  )
}

export default MessageComponent;
