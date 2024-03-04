import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginComponent from "./LoginComponent";
import RegisterComponent from "./RegisterComponent";
import { Link, useNavigate } from "react-router-dom";
import { authSliceActions, refreshMe } from "../../features/authSlice";

const AuthComponent = ({ authType }) => {

    const navigate = useNavigate()
    const { isAuth } = useSelector(state => state.authSlice)
    const dispatch = useDispatch()
    useEffect(() => {
        (async () => await dispatch(refreshMe()).unwrap().then(e => e !== null && navigate('/')).catch((e) => navigate('/login')))()
    }, [])

    return (
        <div className={`auth`}>
            {authType === 'log' ? <LoginComponent /> : <RegisterComponent />}
            <div className="flex justify-center">
                {authType === 'log' ?
                    <span className="text-slate-500">Еще нет аккаунта? <Link to={'../register'} onClick={() => dispatch(authSliceActions.setAuthError(''))} className="underline underline-offset-4">Зарегистрироваться</Link></span>
                    : <span className="text-slate-500">Уже есть аккаунт? <Link to={'../login'} onClick={() => dispatch(authSliceActions.setAuthError(''))} className="underline underline-offset-4">Войдите</Link></span>
                }
            </div>

        </div>
    )
}

export default AuthComponent;
