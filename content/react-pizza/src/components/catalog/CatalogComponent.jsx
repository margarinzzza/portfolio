import styles from './CatalogComponent.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { filterPizzas } from '../../redux/slices/filterSlice';
import PizzaComponent from './PizzaComponent';
import { useEffect } from 'react';
const CatalogComponent = () => {
  const dispatch = useDispatch()
  const { selectedCategory, selectedSort, searchQuery, pizzasList } = useSelector(state => state.filters)
  useEffect(() => {
    dispatch(filterPizzas())
  }, [selectedCategory, selectedSort, searchQuery])

  return (
    <div className={`${styles.catalog}`}>
      <h1>{selectedCategory.value} пиццы</h1>
      <div className={`${styles.pizzasList}`}>
        {pizzasList.length > 0 ?
          pizzasList.map(item => {
            return <PizzaComponent key={item.id} data={item} />
          })
          :
          <h5>Пиццы кончились</h5>
        }
      </div>
    </div>
  );
}

export default CatalogComponent;
