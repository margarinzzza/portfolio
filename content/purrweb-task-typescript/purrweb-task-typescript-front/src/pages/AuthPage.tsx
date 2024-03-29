import { useEffect } from "react";
import { useState } from "react";
import { useForm } from 'react-hook-form'
import { fetchRegister, fetchLogin, checkEmailUnique, clearAuthErr } from "../Auth";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthPage = (props: any) => {

  const dispatch = useDispatch<any>();
  const [authState, setAuthState] = useState('auth')
  const userData = useSelector((state: any) => state.auth)

  const {
    reset: resetLogin,
    watch: watchLoginFields,
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState:
    { errors: errorsLogin,
      isValid: isValidLogin,
    } }
    = useForm({
      mode: 'all',
      defaultValues: { email: '', password: '' },
      criteriaMode: "all"
    })

  const {
    reset: resetReg,
    watch: watchRegFields,
    register: registerReg,
    handleSubmit: handleSubmitReg,
    formState:
    { errors: errorsReg,
      isValid: isValidReg
    } }
    = useForm({
      mode: 'onTouched',
    })

  const [confirmPassword, setConfirmPassord] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [showPasswordLogin, setShowPasswordLogin] = useState(false)
  const [showPasswordRegister, setShowPasswordRegister] = useState(false)

  function passwordFieldManagement(passwordName: any, formType: any) {
    if (!passwordName && !formType?.password) return 'security-input success-check'
    else if (!passwordName && formType?.password) return 'security-input error-input'
    else if (passwordName && formType?.password) return 'error-input '
  }

  async function continueRegister(values: any) {
    const data = await dispatch(checkEmailUnique({ email: values.email })).unwrap().then((e: any) => {
      if (values.passwordConfirm === values.password) {
        setConfirmPassord(false)
        setAuthState('continue-register')
      } else setConfirmPassord(true)
    }).catch((e: any) => {
      console.log('err', e)
    })
  }

  const onSubmitRegister = async (values: any) => {
    const data = await dispatch(fetchRegister(values)).unwrap().then((e: any) => {
      setEmailError(false)
      window.localStorage.setItem('token', e.token)
    }).catch((e: any) => {
      console.log('err', e)
    })
  }

  const onSubmitLogin = async (values: any) => {
    const data = await dispatch(fetchLogin(values)).unwrap().then((e: any) => {
      setPasswordError(false)
      window.localStorage.setItem('token', e.token)
    }).catch((e: any) => {
      console.log('err', e)
    })
  }

  // useEffect(()=>{
  //   console.log(watchLoginFields())
  //   dispatch(clearAuthErr())
  // }, [watchLoginFields(), watchRegFields()])

  const changeAuth = (value: string) => {
    setAuthState(value)
    dispatch(clearAuthErr())
  }

  if (props.isAuth) {
    return <Navigate to={'/profile'} />
  }

  return (
    <>
      {authState === 'auth' ?
        <form className="auth form-content flex-column d-flex m-auto" onSubmit={handleSubmitLogin(onSubmitLogin)}>
          <h4 className="text-center">Авторизация</h4>
          <div className="auth-form d-flex flex-column">
            <span>Электронная почта</span>
            <input
              className={errorsLogin?.email ? 'error-input' : 'success-check'}
              {...registerLogin('email',
                {
                  required: 'Укажите почту',
                  pattern: { value: /\S+@\S+\.\S+/, message: "Введите почту в формате test@example.ru" }
                })}
              type="search"
              placeholder="example@mail.ru"
            />
            <p className="error-text">{errorsLogin?.email && <>{errorsLogin?.email?.message || 'Error'}</>}</p>
            <span>Пароль</span>
            <div className="password-input">
              <input className={passwordFieldManagement(showPasswordLogin, errorsLogin)}
                {...registerLogin('password',
                  {
                    required: 'Укажите пароль',
                  })} type="search" placeholder="Введите пароль" />
              {watchLoginFields('password') !== '' &&
                <a onClick={() => setShowPasswordLogin(!showPasswordLogin)} className={`password_eye ${showPasswordLogin ? 'password-hide' : 'password-show'} `}></a>
              }
            </div>
            <p className="error-text">
              <p>{errorsLogin?.password && <>{errorsLogin?.password?.message || 'Error'}</>}</p>
              <p>{userData?.authErr !== '' && userData.authErr}</p>
            </p>
          </div>

          <button className={`button ${isValidLogin ? 'blue_button  my-3' : 'disabled_button my-3'}`} >
            Продолжить
          </button>

          <div className="text-center fs-14">
            Еще нет аккаунта? <span className="href-text" onClick={() => changeAuth('register')}>Зарегистрироваться</span>
          </div>
        </form>

        : authState === 'register' ?

          <form className="auth form-content flex-column d-flex m-auto" onSubmit={handleSubmitReg(continueRegister)}>
            <h4 className="text-center">Регистрация</h4>
            <div className="auth-form d-flex flex-column">
              <span>Электронная почта</span>
              <input
                className={errorsReg?.email ? 'error-input' : 'success-check'}
                {...registerReg('email',
                  {
                    required: 'Укажите почту',
                    pattern: { value: /\S+@\S+\.\S+/, message: "Введите почту в формате test@example.ru" }
                  })}
                type="search"
                placeholder="example@mail.ru"
              />
              <p className="error-text">{errorsReg?.email && <>{errorsReg?.email?.message || 'Error'}</>}
                {emailError ? 'Такой email занят' : ''}
              </p>
              <span>Пароль</span>
              <div className="password-input">
                <input className={passwordFieldManagement(showPasswordRegister, errorsReg)}
                  {...registerReg('password',
                    {
                      required: 'Укажите пароль',
                      pattern: { value: /\S+$/, message: 'Введите пароль без пробелов' },
                      minLength: { value: 8, message: "Пароль должен содержать минимум 8 символов" }
                    })} type="search" placeholder="Введите пароль"
                />
                {watchRegFields('password') !== '' &&
                  <a onClick={() => setShowPasswordRegister(!showPasswordRegister)} className={`password_eye ${showPasswordRegister ? 'password-hide' : 'password-show'} `}></a>
                }
              </div>
              <p className="error-text">{errorsReg?.password && <>{errorsReg?.password?.message || 'Error'}</>}</p>
              <span>Повтор пароля</span>
              <div className="password-input">
                <input className={passwordFieldManagement(showPasswordRegister, errorsReg)}
                  {...registerReg('passwordConfirm',
                    {
                      required: 'Повторите пароль',
                    })} type="search" placeholder="Введите пароль"
                />
                <a onClick={() => setShowPasswordRegister(!showPasswordRegister)} className={showPasswordRegister ? 'password-hide' : 'password-show'}></a>
              </div>
              <p className="error-text">
                <p>{errorsReg?.passwordConfirm && <>{errorsReg?.passwordConfirm?.message || 'Error'}</>}</p>
                <p>{confirmPassword && ' Пароли не совпадают'}</p>
                <p>{userData?.authErr !== '' && userData.authErr}</p>
              </p>
            </div>
            <button className={`button ${isValidReg ? 'blue_button my-3' : 'disabled_button my-3'}`}>
              Продолжить
            </button>
            <div className="text-center fs-14">
              Уже есть аккаунт? <span className="href-text" onClick={() => changeAuth('auth')}>Войти</span>
            </div>
          </form>

          : authState === 'continue-register' ?
            <>
              <div className="back c-pointer gray-text d-flex align-items-center">
                <svg className="me-2" width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.66667 3.33288H2L4.19333 1.13955C4.25582 1.07758 4.30542 1.00384 4.33926 0.922602C4.37311 0.841363 4.39053 0.754225 4.39053 0.666218C4.39053 0.57821 4.37311 0.491073 4.33926 0.409833C4.30542 0.328594 4.25582 0.25486 4.19333 0.192885C4.06843 0.0687177 3.89946 -0.000976562 3.72333 -0.000976562C3.54721 -0.000976562 3.37824 0.0687177 3.25333 0.192885L0.393333 3.05955C0.142942 3.30845 0.00148853 3.6465 0 3.99955C0.00324439 4.35028 0.144563 4.68561 0.393333 4.93288L3.25333 7.79954C3.31549 7.86126 3.3892 7.91014 3.47025 7.94337C3.55129 7.97661 3.63809 7.99356 3.72569 7.99325C3.81329 7.99294 3.89997 7.97538 3.98078 7.94157C4.06159 7.90776 4.13495 7.85837 4.19667 7.79621C4.25839 7.73405 4.30726 7.66034 4.3405 7.5793C4.37373 7.49825 4.39068 7.41145 4.39037 7.32385C4.39006 7.23626 4.3725 7.14958 4.33869 7.06877C4.30489 6.98796 4.25549 6.9146 4.19333 6.85288L2 4.66621H8.66667C8.84348 4.66621 9.01305 4.59598 9.13807 4.47095C9.2631 4.34593 9.33333 4.17636 9.33333 3.99955C9.33333 3.82274 9.2631 3.65317 9.13807 3.52814C9.01305 3.40312 8.84348 3.33288 8.66667 3.33288Z" fill="#6F7488" />
                </svg>
                <a onClick={() => changeAuth('register')}>Назад</a>
              </div>
              <form onSubmit={handleSubmitReg(onSubmitRegister)} className="auth form-content d-flex flex-column m-auto">
                <h4 className="text-center">Заполните данные о себе</h4>
                <div className="auth-form d-flex flex-column">
                  <span>Имя</span>
                  <input className={errorsReg?.name ? 'error-input' : 'success-check'}
                    {...registerReg('name', {
                      required: 'Укажите имя',
                      pattern: {
                        value: /[A-Za-zА-Яа-яЁё][\S]{2,50}/,
                        message: "Неверный формат данных"
                      }
                    })}
                    type="search"
                    placeholder="Введите имя"
                  />
                  <p className="error-text">{errorsReg?.name && <>{errorsReg?.name?.message || 'Error'}</>}</p>
                  <span>Фамилия</span>
                  <input className={errorsReg?.surname ? 'error-input' : 'success-check'}
                    {...registerReg('surname', {
                      required: 'Укажите фамилию',
                      pattern: {
                        value: /[A-Za-zА-Яа-яЁё][\S]{2,50}/,
                        message: "Неверный формат данных"
                      }
                    })}
                    type="search"
                    placeholder="Введите фамилию" />
                  <p className="error-text">{errorsReg?.surname && <>{errorsReg?.surname?.message || 'Error'}</>}</p>
                  <span>Телефон</span>
                  <input className={errorsReg?.phoneNumber ? 'error-input' : 'success-check'}
                    {...registerReg('phoneNumber', {
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
                  <p className="error-text">
                    {errorsReg?.phoneNumber && <>{`${errorsReg?.phoneNumber?.message}` || 'Error'}</>}
                    {userData?.authErr !== '' && userData.authErr}
                    </p>
                </div>
                <button className={`button my-3 ${isValidReg ? 'blue_button' : 'disabled_button'} `}>
                  Продолжить
                </button>
              </form>
            </>
            : ''}
    </>

  );
}

export default AuthPage;
