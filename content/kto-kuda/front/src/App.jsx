import HeaderComponent from "./components/header/HeaderComponent";
import { Route, Routes } from "react-router-dom"
import NotFoundComponent from "./components/notFound/NotFoundComponent";
import EventsComponent from "./components/content/events/EventsComponent";
import ProposalsComponent from "./components/content/proposals/ProposalsComponent";
import AccountComponent from "./components/content/account/AccountComponent";
import CalendarComponent from "./components/content/calendar/CalendarComponent";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refreshMe } from "./features/authSlice";
import { useNavigate, Navigate } from "react-router-dom";
import EventPageComponent from "./components/content/eventPage/EventPageComponent";
import LoadingComponent from "./components/loading/LoadingComponent";

const App = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { isAuth, authStatus } = useSelector(state => state.authSlice)
  useEffect(() => {
    dispatch(refreshMe())
  }, [])

  return (
    <>
      {authStatus === 'loading' ? <LoadingComponent /> :
        <div className={`app`}>
          <HeaderComponent />
          <div className="content w-11/12 mx-auto mt-4">
            <Routes>
              <Route path="/" element={<EventsComponent />} />
              <Route path="/events" element={<Navigate to="../" replace={true} />} />
              <Route path="/events/:eventId" element={<EventPageComponent />} />
              {isAuth &&
                <>
                  <Route path="/my-proposals" element={<ProposalsComponent />} />
                  <Route path="/my-events" element={<CalendarComponent />} />
                  <Route path="/account" element={<AccountComponent />} />
                </>
              }
              <Route path="*" element={<NotFoundComponent />} />
            </Routes>
          </div>
        </div>
      }
    </>
  )
}

export default App;
