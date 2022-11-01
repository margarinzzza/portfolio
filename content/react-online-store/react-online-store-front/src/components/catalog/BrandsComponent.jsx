import styles from './CatalogComponent.module.scss'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { deviceActions } from '../../features/auth/deviceSlice';

const BrandsComponent = ({ brandsData }) => {
  const dispatch = useDispatch()
  const { brandSearchQuery } = useSelector(store => store.device)

  return (
    <div className={`${styles.catalogBrands}`}>
      {brandsData.length > 0 ?
        brandsData.map(el => {
          return <div key={el.id} 
          onClick={()=>dispatch(deviceActions.setBrandSearchQuery(el))}
          className={`link_item ${styles.catalogBrand} ${brandSearchQuery?.id===el.id&&'link_item_active'}`}>
            {el.name}
          </div>
        })
        :
        <div>Brands list is empty</div>
      }
    </div>
  );
}

export default BrandsComponent;