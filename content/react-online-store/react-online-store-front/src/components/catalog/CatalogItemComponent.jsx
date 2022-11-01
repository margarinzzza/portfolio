import styles from './CatalogComponent.module.scss'
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import phone_img from '../../media/img/phone.png'
import { useEffect } from 'react';

const CatalogItemComponent = ({ itemData, brandsData }) => {
  
  const dispatch = useDispatch()
  const setItemBrand = () => {
    let brandName = ''
    for (let i = 0; i < brandsData.length; i++) {
      if (brandsData[i].id === itemData.brandId) {
        brandName = brandsData[i].name
      }
    }
    return brandName
  }

  return (
    <Link to={`/catalog/${itemData.id}`} className={`${styles.catalogItem}`}>
      <img src={phone_img} alt={itemData.name} />
      <div className={`${styles.catalogItemBrandRating}`}>
        <h5>{setItemBrand()}</h5>
        {itemData.rating === 0 ?
          <span className='text-gray-400'>No estimates</span>
          :
          <span>{itemData.rating}</span>
        }
      </div>
      <span className={`${styles.catalogItemName}`}>{itemData.name}</span>
    </Link>
  );
}

export default CatalogItemComponent;