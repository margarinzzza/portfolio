import styles from './CatalogComponent.module.scss'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'

const MobileCategoriesComponent = ({ categoriesData }) => {
  const dispatch = useDispatch()

  return (
    <div className={`${styles.catalogCategoriesListMobile}`}>
      {categoriesData.length > 0 ?
        categoriesData.map(el => {
          return <div key={el.id} className={`link_item ${styles.catalogCategory}`}>
            {el.name}
          </div>
        })
        :
        <div>Categories list is empty</div>
      }
    </div>
  );
}

export default MobileCategoriesComponent;