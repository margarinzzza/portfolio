import success_img from '../media/img/success.png'

const InvitePopupComponent = ({ setInvitePopup, setInvitedUsers }) => {

  return (
    <div className='success-popup'>
      <img src={success_img} alt="success" />
      <h5>Успешно!</h5>
      <span className='fs-default'>Всем пользователям отправлено приглашение</span>
      <div onClick={() => {setInvitePopup(false); setInvitedUsers([])}} className='button'>Назад</div>
    </div>
  );
}

export default InvitePopupComponent;
