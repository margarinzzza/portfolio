import styles from './CatalogComponent.module.scss'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getBrands, getCategories } from '../../features/auth/filtersSlice';
import CategoriesComponent from './CategoriesComponent';
import BrandsComponent from './BrandsComponent';
import MobileCategoriesComponent from './MobileCategoriesComponent';
import CatalogSearchComponent from './CatalogSearchComponent';
import { getDevices } from '../../features/auth/deviceSlice';
import CatalogItemComponent from './CatalogItemComponent';
import { useState } from 'react';

const CatalogComponent = () => {
  const dispatch = useDispatch()
  const { categoriesData, brandsData } = useSelector(store => store.filters)
  const { devicesData, nameSearchQuery, typeSearchQuery, brandSearchQuery } = useSelector(store => store.device)
  const [actualPage, setActualPage] = useState(1)
  const itemPerPage = 10
  let pagesNumber = Math.ceil(devicesData.length / itemPerPage)
  let currentArray = devicesData.slice(actualPage * itemPerPage - itemPerPage, actualPage * itemPerPage)

  useEffect(() => {
    dispatch(getDevices({ nameSearchQuery, typeSearchQuery, brandSearchQuery }))
  }, [nameSearchQuery, typeSearchQuery, brandSearchQuery])

  useEffect(() => {
    dispatch(getCategories())
    dispatch(getBrands())
  }, [])

  return (
    <div className={`${styles.catalogPage}`}>
      <CategoriesComponent categoriesData={categoriesData} />

      <div className={`${styles.catalog}`}>
        <div className={`${styles.catalogSearchBrands}`}>
          <CatalogSearchComponent />
          <BrandsComponent brandsData={brandsData} />
          <MobileCategoriesComponent categoriesData={categoriesData} />
        </div>

        <div className={`${styles.catalogItems}`}>
          {currentArray.length > 0 ?
            currentArray.map(el => {
              return <CatalogItemComponent categoriesData={categoriesData} brandsData={brandsData} key={el.id} itemData={el} />
            })
            : <h2 className='mt-2'>Devices are missing</h2>
          }
        </div>
        <div className={`${styles.pagination}`}>
          {pagesNumber > 1 &&
            [...Array(pagesNumber)].map((el, idx) => {
              return (
                <div
                  key={idx}
                  className={`${actualPage - 1 === idx && styles.activePage}`}
                  onClick={() => setActualPage(idx + 1)}>{idx + 1}</div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default CatalogComponent;