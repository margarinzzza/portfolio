import styles from './CatalogComponent.module.scss'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { deviceActions } from '../../features/auth/deviceSlice';

const CategoriesComponent = ({categoriesData}) => {
  const dispatch = useDispatch()
  const { typeSearchQuery } = useSelector(store => store.device)

  return (
    <div className={`${styles.catalogCategories}`}>
      <div className={`${styles.catalogCategoriesList}`}>
        {categoriesData.length > 0 ?
          categoriesData.map(el => {
            return <div key={el.id} 
            onClick={()=>dispatch(deviceActions.setTypeSearchQuery(el))}
            className={`link_item ${styles.catalogCategory} ${typeSearchQuery?.id===el.id&&'link_item_active'}`}>
              {el.name}
            </div>
          })
          : <div>Categories list is empty</div>}
      </div>
    </div>
  );
}

export default CategoriesComponent;