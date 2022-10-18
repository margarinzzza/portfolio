import { Link } from 'react-router-dom';
import style from './FirstTaskPage.module.scss'
import ItemComponent from './ItemComponent';
import { firstTaskState } from '../../store';

const FirstTaskPage = () => {

  return (
    <div className={`${style.content} first-task`}>
      <Link className='back-button' to={'../'}>Назад</Link>
      <p><br />
        Таблица на странице <br/>
        В текст статьи на странице с адаптивной версткой менеджеры добавили таблицу.
        На десктопе таблицы выглядят хорошо, но на мобиле - появляется горизонтальный скролл, верстка едет. Что делать?
      </p><br/>
      <p>
        Задать table свойство word-break: break-all;<br/>
        Div-у blog задать свойство box-sizing: border-box;
      </p>

      <div className={`${style.itemsList}`}>
        {firstTaskState.map((item, index) => {
          return <ItemComponent key={item.id} data={item} />
        })}
      </div>
    </div>
  );
}

export default FirstTaskPage;
