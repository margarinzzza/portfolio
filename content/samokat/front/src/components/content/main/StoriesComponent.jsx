import { storiesArr } from "../../../store";
import CarouselComponent from "../../carousel/CarouselComponent";

const StoriesComponent = () => {
  
  return (
    <div>
      <CarouselComponent items={storiesArr} type={'story'} />
    </div>
  )
}

export default StoriesComponent;
