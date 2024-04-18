import { Link } from "react-router-dom"
import { useDispatch } from "react-redux";
import { visibleStatesActions } from "../../../features/visibleStates";

const StoryComponent = ({ storyId, title }) => {

  const dispatch = useDispatch()

  return (
    <Link onClick={() => dispatch(visibleStatesActions.showSidePopup('story'))} to={`/story/${storyId}`} className={`story rounded`} style={{ backgroundImage: `url("https://cm.samokat.ru/processed/story_media/23c1b650-ef72-481c-a89a-255d8d6ac775.jpg")` }}>
      <span className="text-white font-semibold">{title}</span>
    </Link>
  )
}

export default StoryComponent;
