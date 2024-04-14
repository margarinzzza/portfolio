import CarouselComponent from "../../carousel/CarouselComponent";

const StoriesComponent = () => {

  return (
    <div>
      <CarouselComponent items={new Array(10).fill()} type={'story'} />
    </div>
  )
}

export default StoriesComponent;
