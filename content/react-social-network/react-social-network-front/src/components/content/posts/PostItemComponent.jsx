import styles from './PostsComponent.module.css'

const PostItemComponent = ({ data }) => {
  const {timeStamps} = data
  let Ymd = timeStamps.slice(0, 10)
  let Hms = timeStamps.slice(11, 19)

  return (
    <div className={`${styles.postItem}`}>
      <div className={`${styles.postItemImg}`}>
        <img src="https://bazametrov.ru/uploads/new-agency/default_logo_user.jpg" alt={data.name} />
        <span>{data.name}</span>
      </div>
      <div className={`${styles.postItemData}`}>
        <span>{Ymd} {Hms}</span>
        <p>{data.text}</p>
      </div>
    </div>
  );
}

export default PostItemComponent;
