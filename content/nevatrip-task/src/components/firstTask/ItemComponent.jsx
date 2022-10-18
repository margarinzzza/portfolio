import style from './FirstTaskPage.module.scss'
import FlightItemComponent from './FlightItemComponent'
import { time_word } from '../../funcs/funcs';

const ItemComponent = ({ data }) => {

  return (
    <div className={`${style.item}`}>
      <div style={{ backgroundImage: `url('${data.imgSrc}')` }} className={`${style.itemImg}`}>
        {data.banner.name !== '' &&
          <div className={`${style.itemImgBanner} ${data.banner.bannerColor} ${style.itemImgBanner}`}>
            {data.banner.name}
          </div>
        }
      </div>
      <div className={`${style.itemDescription}`}>
        <h4 className={`${style.itemDescriptionHeader}`}>{data.header}</h4>
        <div className={`${style.itemDescriptionSpentTime}`}>
          <svg width="1.6vh" height="1.6vh" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 0C3.5888 0 0 3.5888 0 8C0 12.4112 3.5888 16 8 16C12.4112 16 16 12.4112 16 8C16 3.5888 12.4112 0 8 0ZM8 14.2977C4.52746 14.2977 1.7021 11.4727 1.7021 8C1.7021 4.5273 4.52746 1.70226 8 1.70226C11.4725 1.70226 14.2979 4.5273 14.2979 8C14.2979 11.4727 11.4725 14.2977 8 14.2977Z" fill="#C7C7C7" />
            <path d="M12.1693 7.75296H8.57407V3.43019C8.57407 3.06642 8.27913 2.77148 7.91536 2.77148C7.55159 2.77148 7.25665 3.06642 7.25665 3.43019V8.41167C7.25665 8.77544 7.55159 9.07037 7.91536 9.07037H12.1693C12.5331 9.07037 12.828 8.77544 12.828 8.41167C12.828 8.04789 12.5331 7.75296 12.1693 7.75296Z" fill="#C7C7C7" />
          </svg>
          <span className='ml-2'>{data.spentTime} {time_word(data.spentTime, ['час', 'часа', 'часов'])}</span>
        </div>
        <div className={`${style.itemDescriptionList}`}>
          {data.listItems.map((item, index) => {
            return (
              <div className={`${style.itemDescriptionListItem}`} key={index}>
                <svg width="1.6vh" height="1.6vh" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.24255 11.4204C6.51714 12.1458 5.3401 12.1458 4.61504 11.4204L0.544058 7.34931C-0.181353 6.62423 -0.181353 5.44716 0.544058 4.72209C1.26912 3.99666 2.44616 3.99666 3.17157 4.72209L5.59708 7.1473C5.78018 7.33005 6.07742 7.33005 6.26087 7.1473L12.8284 0.579592C13.5535 -0.145834 14.7305 -0.145834 15.4559 0.579592C15.8043 0.927951 16 1.4006 16 1.8932C16 2.38581 15.8043 2.85845 15.4559 3.20681L7.24255 11.4204Z" fill="#FECF01" />
                </svg>
                <span>{item}</span>
              </div>
            )
          })}
          <div className={`${style.nearestFlight} ${style.itemDescriptionListItem}`}>
            <div className='flex items-center'>
              <svg width="1.6vh" height="1.6vh" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.24255 11.4204C6.51714 12.1458 5.3401 12.1458 4.61504 11.4204L0.544058 7.34931C-0.181353 6.62423 -0.181353 5.44716 0.544058 4.72209C1.26912 3.99666 2.44616 3.99666 3.17157 4.72209L5.59708 7.1473C5.78018 7.33005 6.07742 7.33005 6.26087 7.1473L12.8284 0.579592C13.5535 -0.145834 14.7305 -0.145834 15.4559 0.579592C15.8043 0.927951 16 1.4006 16 1.8932C16 2.38581 15.8043 2.85845 15.4559 3.20681L7.24255 11.4204Z" fill="#FECF01" />
              </svg>
              <span>Ближайший рейс сегодня</span>
            </div>
            <div className={`mt-2 ${style.flightsList}`}>
              <FlightItemComponent data={data.flights} />
            </div>
          </div>
        </div>
        <div className={`${style.itemDescriptionDetails}`}>
          <div className={`${style.itemDescriptionCost}`}>
            <h3>{data.cost} ₽</h3>
            {data.costAtPier !== null &&
              <span>{data.costAtPier} ₽ на причале</span>
            }
          </div>
          <div className={`${style.detailsButton}`}>Подробнее</div>
        </div>
      </div>
    </div>
  );
}

export default ItemComponent;
