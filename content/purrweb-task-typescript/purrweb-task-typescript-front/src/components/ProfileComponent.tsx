import productivity_img from '../media/img/productivity.png'
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

function ProfileComponent() {
  const userData = useSelector((state: any) => state.auth.data)
  return (
    <>
      <div className="profile-page__info d-flex flex-column">
        <div className="d-flex align-items-center flex-wrap">
          <h1>Мой профиль</h1>
          <Link to={'/redact_profile'}>
            <div className="d-flex align-items-center">
              <svg className="ms-4 me-1" width="1.7vh" height="1.7vh" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.2353 0.765302C14.7821 0.312767 14.1678 0.0585938 13.5273 0.0585938C12.8869 0.0585938 12.2726 0.312767 11.8193 0.765302L0.976677 11.608C0.666178 11.9167 0.419985 12.284 0.252342 12.6885C0.0846994 13.093 -0.00106532 13.5268 9.98748e-06 13.9646V15.3333C9.98748e-06 15.5101 0.0702479 15.6797 0.195272 15.8047C0.320296 15.9297 0.489866 16 0.666677 16H2.03534C2.47319 16.0012 2.90692 15.9156 3.31145 15.748C3.71597 15.5805 4.08325 15.3344 4.39201 15.024L15.2353 4.18064C15.6877 3.72743 15.9417 3.11328 15.9417 2.47297C15.9417 1.83266 15.6877 1.21851 15.2353 0.765302ZM3.44934 14.0813C3.07335 14.4548 2.56532 14.6651 2.03534 14.6666H1.33334V13.9646C1.33267 13.7019 1.38411 13.4416 1.4847 13.1989C1.58529 12.9562 1.73302 12.7359 1.91934 12.5506L10.148 4.32197L11.6813 5.8553L3.44934 14.0813ZM14.292 3.23797L12.6213 4.9093L11.088 3.3793L12.7593 1.70797C12.86 1.60751 12.9795 1.52786 13.111 1.47358C13.2424 1.41929 13.3833 1.39143 13.5255 1.39158C13.6678 1.39174 13.8086 1.41991 13.9399 1.47448C14.0712 1.52905 14.1905 1.60896 14.291 1.70964C14.3915 1.81032 14.4711 1.9298 14.5254 2.06126C14.5797 2.19272 14.6076 2.33359 14.6074 2.47581C14.6072 2.61804 14.5791 2.75885 14.5245 2.89019C14.4699 3.02153 14.39 3.14084 14.2893 3.2413L14.292 3.23797Z" fill="#466EFA" />
              </svg>
              <span className="href-text redact-href">
                Редактировать
              </span>
            </div>
          </Link>
        </div>
        <div className="d-flex flex-wrap my-2">
          <div className="info__item d-flex flex-column me-4 mb-2">
            <span className="gray-text mb-1">Имя</span>
            <span>{userData.user.name === 'не указано' ? '-' : userData.user.name}</span>
          </div>
          <div className="info__item d-flex flex-column me-4 mb-1">
            <span className="gray-text mb-1">Фамилия</span>
            <span>{userData.user.surname === 'не указано' ? '-' : userData.user.surname}</span>
          </div>
          <div className="info__item d-flex flex-column me-4 mb-1">
            <span className="gray-text mb-1">Телефон</span>
            <span>{userData.user.phoneNumber === 'не указано' ? '-' : userData.user.phoneNumber}</span>
          </div>
          <div className="info__item d-flex flex-column me-4 mb-1">
            <span className="gray-text mb-1">Электронная почта</span>
            <span> {userData.user.email ? userData.user.email : '-'} </span>
          </div>
        </div>
      </div>
      <div className="profile-page__productivity justify-content-between align-items-center d-flex flex-wrap w-75">
        <div className="d-flex flex-wrap flex-column">
          <h2>Ваша продуктивность выросла!</h2>
          <span className="mt-2 mb-4">За прошлую неделю вы выполнили 12 задач</span>
          <div className="blue_button w-80">Подробнее</div>
        </div>
        <div>
          <img src={productivity_img} alt="#" />
        </div>
      </div>
    </>
  );
}

export default ProfileComponent;
