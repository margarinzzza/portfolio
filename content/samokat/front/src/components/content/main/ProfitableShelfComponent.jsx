import { productArr } from "../../../store";
import CarouselComponent from "../../carousel/CarouselComponent";

const ProfitableShelfComponent = () => {

  let onlyProfitable = []
  productArr.forEach(el => el.tags.forEach(tag => tag === 'profitable' && onlyProfitable.push(el)))

  return (
    <div className={`main_block profitable-shelf`}>
      <div className="flex items-center justify-between mb-2">
        <h2>Выгодная полка</h2>
        <div className="flex items-center cursor-pointer">
          <span className="opacity-50 font-semibold  mr-2">Больше</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#9f9f9f" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
          </svg>
        </div>
      </div>
      <CarouselComponent items={onlyProfitable} type={'product'} />
    </div>
  )
}

export default ProfitableShelfComponent;
