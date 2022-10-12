import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useForm } from 'react-hook-form'
import { useDispatch } from "react-redux";
import { fetchRedactProfile } from "../Auth";

const RedactProfilePage = (props: any) => {

  const dispatch = useDispatch<any>();
  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    mode: 'onBlur'
  })
  const onSubmitRedactProfile = async (values: any) => {
    const data = await dispatch(fetchRedactProfile(values))
    if (!data.payload) {
      return alert('Не удалось обновить профиль')
    }
  }

  if (!props.isAuth) {
    return <Navigate to={'/'} />
  }

  return (
    <>
      <div className="back c-pointer gray-text d-flex align-items-center">
        <svg className="me-2" width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.66667 3.33288H2L4.19333 1.13955C4.25582 1.07758 4.30542 1.00384 4.33926 0.922602C4.37311 0.841363 4.39053 0.754225 4.39053 0.666218C4.39053 0.57821 4.37311 0.491073 4.33926 0.409833C4.30542 0.328594 4.25582 0.25486 4.19333 0.192885C4.06843 0.0687177 3.89946 -0.000976562 3.72333 -0.000976562C3.54721 -0.000976562 3.37824 0.0687177 3.25333 0.192885L0.393333 3.05955C0.142942 3.30845 0.00148853 3.6465 0 3.99955C0.00324439 4.35028 0.144563 4.68561 0.393333 4.93288L3.25333 7.79954C3.31549 7.86126 3.3892 7.91014 3.47025 7.94337C3.55129 7.97661 3.63809 7.99356 3.72569 7.99325C3.81329 7.99294 3.89997 7.97538 3.98078 7.94157C4.06159 7.90776 4.13495 7.85837 4.19667 7.79621C4.25839 7.73405 4.30726 7.66034 4.3405 7.5793C4.37373 7.49825 4.39068 7.41145 4.39037 7.32385C4.39006 7.23626 4.3725 7.14958 4.33869 7.06877C4.30489 6.98796 4.25549 6.9146 4.19333 6.85288L2 4.66621H8.66667C8.84348 4.66621 9.01305 4.59598 9.13807 4.47095C9.2631 4.34593 9.33333 4.17636 9.33333 3.99955C9.33333 3.82274 9.2631 3.65317 9.13807 3.52814C9.01305 3.40312 8.84348 3.33288 8.66667 3.33288Z" fill="#6F7488" />
        </svg>
        <Link to={'/profile'}>Назад</Link>
      </div>

      <form onSubmit={handleSubmit(onSubmitRedactProfile)} className="auth form-content d-flex flex-column m-auto">
        <h4 className="text-center">Заполните данные о себе</h4>
        <div className="auth-form d-flex flex-column">
          <span>Имя</span>
          <input className={errors?.name ? 'error-input':'success-check'}
            {...register('name', {
              required: 'Укажите имя',
              pattern: {
                value: /[A-Za-zА-Яа-яЁё][\S]{1,50}/,
                message: "Неверный формат данных"
              } 
            })}
            type="search"
            placeholder="Введите имя"
          />
          <p className="error-text">{errors?.name && <>{errors?.name?.message || 'Error'}</>}</p>
          <span>Фамилия</span>
          <input className={errors?.surname ? 'error-input':'success-check'}
            {...register('surname', {
              required: 'Укажите фамилию',
              pattern: {
                value: /[A-Za-zА-Яа-яЁё][\S]{1,50}/,
                message: "Неверный формат данных"
              }
            })}
            type="search"
            placeholder="Введите фамилию" />
          <p className="error-text">{errors?.surname && <>{errors?.surname?.message || 'Error'}</>}</p>
          <span>Телефон</span>
          <input className={errors?.phoneNumber ? 'error-input':'success-check'}
            {...register('phoneNumber', {
              required: 'Укажите телефон',
              minLength: {
                value: 11,
                message: "Номер состоит из 11 цифр"
              },
              pattern: {
                value: /[7-8]{1}[0-9]{10}/,
                message: "Неверный формат данных"
              }
            })} maxLength={11} type="search" placeholder="88009501141" />
          <p className="error-text">{errors?.phoneNumber && <>{errors?.phoneNumber?.message || 'Error'}</>}</p>
        </div>
        <button type="submit">
          <div className={isValid ? 'blue_button my-3' : 'disabled_button my-3'}>
            Продолжить
          </div>
        </button>
      </form>
    </>

  );
}

export default RedactProfilePage;