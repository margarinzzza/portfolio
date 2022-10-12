import { Navigate } from "react-router-dom";
import ProfileComponent from "../components/ProfileComponent";
import QnaComponent from "../components/QnaComponent";

const ProfilePage = (props: any) => {
  if (!props.isAuth) {
    return <Navigate to={'/'}/>
  } 

  

  return (
    <div className="profile-page">
      
      <ProfileComponent />
      <QnaComponent/>
    </div>
  );
}

export default ProfilePage;