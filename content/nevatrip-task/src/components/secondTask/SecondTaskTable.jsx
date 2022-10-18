import style from './SecondTaskPage.module.scss'

const SecondTaskTable = () => {
  return (
    <>
      <p>
        Некоторые события нужно продавать с дополнительными типами билетов - льготный и групповой, у которых будут свои цены и название. Имеется информация, что вероятно, будут другие типы билетов, которые нужно будет добавить. Нужно уметь сохранять при заказе 2 дополнительных типа билета, льготный и групповой в бд. Задача - Показать конечный вид таблицы с добавленными типами билетов. Объяснить свое решение.
      </p>
      <table className={`${style.eventTicketsTable}`}>
        <tr className={`${style.names}`}>
          <td>id</td>
          <td>event_id</td>
          <td>event_date</td>
          <td>ticket_adult_price</td>
          <td>ticket_adult_quantity</td>
          <td>ticket_kid_price</td>
          <td>ticket_kid_quantity</td>
          <td>preferential_price</td>
          <td>preferential_quantity</td>
          <td>group_price</td>
          <td>group_quantity</td>
          <td>barcode</td>
          <td>equal_price</td>
          <td>created</td>
        </tr>
        <tr className={`${style.values}`}>
          <td>1</td>
          <td>001</td>
          <td>2021-08-21 13:00:00</td>
          <td>700</td>
          <td>1</td>
          <td>450</td>
          <td>0</td>
          <td>300</td>
          <td>2</td>
          <td>500</td>
          <td>3</td>
          <td>111111</td>
          <td>2800</td>
          <td>2021-01-11 13:22:09</td>
        </tr>
        <tr className={`${style.values}`}>
          <td>2</td>
          <td>002</td>
          <td>2021-07-29 18:00:00</td>
          <td>1000</td>
          <td>0</td>
          <td>800</td>
          <td>1</td>
          <td>200</td>
          <td>1</td>
          <td>400</td>
          <td>0</td>
          <td>222222</td>
          <td>1000</td>
          <td>2021-01-12 16:62:08</td>
        </tr>
        <tr className={`${style.values}`}>
          <td>3</td>
          <td>001</td>
          <td>2021-08-15 17:00:00</td>
          <td>700</td>
          <td>0</td>
          <td>450</td>
          <td>2</td>
          <td>300</td>
          <td>0</td>
          <td>500</td>
          <td>0</td>
          <td>333333</td>
          <td>900</td>
          <td>2021-01-13 10:08:45</td>
        </tr>
      </table>
      <p>
        Часто посетители из одного заказа приходят не одновременно на события. Возникает необходимость чекинить их по отдельности. Для этого у каждого билета должен быть свой баркод. Если в одном заказе было куплено несколько билетов, 2 взрослых, 3 детских, 4 льготных - то должно быть 9 баркодов для каждого билета соответственно. Задача - Показать конечный вид таблицы, где у каждого билета свой баркод. Объяснить свое решение.
      </p>
      <table className={`${style.eventTicketsTable}`}>
        <tr className={`${style.names}`}>
          <td>id</td>
          <td>event_id</td>
          <td>event_date</td>
          <td>ticket_adult_price</td>
          <td>ticket_adult_quantity</td>
          <td>ticket_adult_barcodes</td>
          <td>ticket_kid_price</td>
          <td>ticket_kid_quantity</td>
          <td>ticket_kid_barcodes</td>
          <td>preferential_price</td>
          <td>preferential_quantity</td>
          <td>ticket_preferential_barcodes</td>
          <td>group_price</td>
          <td>group_quantity</td>
          <td>ticket_group_barcodes</td>
          <td>barcode</td>
          <td>equal_price</td>
          <td>created</td>
        </tr>
        <tr className={`${style.values}`}>
          <td>1</td>
          <td>001</td>
          <td>2021-08-21 13:00:00</td>
          <td>700</td>
          <td>1</td>
          <td>11111</td>
          <td>450</td>
          <td>0</td>
          <td>0</td>
          <td>300</td>
          <td>2</td>
          <td>11113, 11114</td>
          <td>500</td>
          <td>3</td>
          <td>11115, 11116, 11117</td>
          <td>111111</td>
          <td>2800</td>
          <td>2021-01-11 13:22:09</td>
        </tr>
        <tr className={`${style.values}`}>
          <td>2</td>
          <td>002</td>
          <td>2021-07-29 18:00:00</td>
          <td>1000</td>
          <td>0</td>
          <td>0</td>
          <td>800</td>
          <td>1</td>
          <td>12344</td>
          <td>200</td>
          <td>1</td>
          <td>11244</td>
          <td>400</td>
          <td>0</td>
          <td>0</td>
          <td>222222</td>
          <td>1000</td>
          <td>2021-01-12 16:62:08</td>
        </tr>
        <tr className={`${style.values}`}>
          <td>1</td>
          <td>001</td>
          <td>2021-08-21 13:00:00</td>
          <td>700</td>
          <td>5</td>
          <td>11124, 11128, 11126, 11128, 11121,</td>
          <td>450</td>
          <td>1</td>
          <td>11110</td>
          <td>300</td>
          <td>3</td>
          <td>11113, 11114, 11224</td>
          <td>500</td>
          <td>0</td>
          <td>0</td>
          <td>333333</td>
          <td>4850</td>
          <td>2021-01-11 13:22:09</td>
        </tr>
      </table>
      <p>
        будет создаваться массив баркодов для каждого количества купленных билетов
      </p>
    </>


  );
}

export default SecondTaskTable;
