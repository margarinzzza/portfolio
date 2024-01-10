import { useState, useEffect } from "react"
import { DropdownListComponent } from '../../dropdownList/DropdownListComponent'
import { cities, categories } from "../../../staticStates";
import { useSelector, useDispatch } from "react-redux"
import { createEvent, eventsSliceActions, getUserEvents } from "../../../features/eventsSlice";

const ProposalFormComponent = () => {

  const { createEventError } = useSelector(state => state.eventsSlice)
  const { userData } = useSelector(state => state.authSlice)
  const dispatch = useDispatch()
  const actualDate = new Date
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imgUrl, setImgUrl] = useState('https://тайгерспорт.рф/wp-content/uploads/2022/05/basketbol.jpg')
  const [category, setCategory] = useState('')

  const [cityPoint, setCityPoint] = useState('')
  const [streetPoint, setStreetPoint] = useState('')
  const [buildingPoint, setBuildingPoint] = useState('')

  const [beginDate, setBeginDate] = useState('')
  const [beginTime, setBeginTime] = useState('')

  const [durationDays, setDurationDays] = useState('')
  const [durationHours, setDurationHours] = useState('')
  const [durationMinutes, setDurationMinutes] = useState('')

  const [minMembers, setMinMembers] = useState(0)
  const [maxMembers, setMaxMembers] = useState(0)

  const [expensesType, setExpensesType] = useState('general')
  const [generalExpenses, setGeneralExpenses] = useState(0)
  const [individualExpenses, setIndividualExpenses] = useState(0)
  const [totalExpenses, setTotalExpenses] = useState(0)

  const createProposal = async () => {
    if (title === '') return dispatch(eventsSliceActions.setCreateEventError('Введите заголовок'))
    if (description === '') return dispatch(eventsSliceActions.setCreateEventError('Введите описание'))
    if (category === '') return dispatch(eventsSliceActions.setCreateEventError('Укажите категорию'))
    if (cityPoint === '') return dispatch(eventsSliceActions.setCreateEventError('Укажите город'))
    if (streetPoint === '') return dispatch(eventsSliceActions.setCreateEventError('Укажите улицу'))
    if (buildingPoint === '') return dispatch(eventsSliceActions.setCreateEventError('Укажите дом'))
    if (beginDate === '') return dispatch(eventsSliceActions.setCreateEventError('Укажите дату начала события'))
    if (beginTime === '') return dispatch(eventsSliceActions.setCreateEventError('Укажите время начала события'))
    if (durationHours !== '' && durationHours > 11) return dispatch(eventsSliceActions.setCreateEventError('Укажите корректное время'))
    if (durationMinutes !== '' && durationMinutes > 59) return dispatch(eventsSliceActions.setCreateEventError('Укажите корректное время'))
    if (!minMembers > 0) return dispatch(eventsSliceActions.setCreateEventError('Укажите минимальное количество участников'))
    let price
    if (Array.isArray(totalExpenses)) price = `${totalExpenses[0]}/${totalExpenses[1]}`
    else price = individualExpenses
    const proposalData = {
      title, text: description, imgUrl, category, city: cityPoint, creator: userData._id, adress: `${streetPoint}, ${buildingPoint}`,
      startDateAndTime: `${beginDate}, ${beginTime}`, durationTime: `${durationDays === '' ? '0' : durationDays}/${durationHours === '' ? '0' : durationHours}/${durationMinutes === '' ? '0' : durationMinutes}`,
      participantsMinNum: minMembers, participantsMaxNum: maxMembers, price
    }
    await dispatch(createEvent(proposalData)).unwrap().then((res) => {
      dispatch(eventsSliceActions.setCreateEventError('Событие успешно добавлено'))
      setTitle(''); setDescription(''); setCategory(''); setCityPoint(''); setStreetPoint(''); setBuildingPoint(''); setBeginDate(''); setBeginTime('');
      setDurationDays(''); setDurationHours(''); setDurationMinutes(''); setMinMembers(0); setMaxMembers(0); setExpensesType('general'); setGeneralExpenses(0); setIndividualExpenses(0); setTotalExpenses(0);
      setTimeout(() => {
        dispatch(eventsSliceActions.setCreateEventError(''))
      }, 3000)
      dispatch(getUserEvents(userData._id))
    }).catch((e) => {
      console.log('e')
    })
  }

  useEffect(() => {
    setGeneralExpenses(0)
    setIndividualExpenses(0)
  }, [expensesType])

  useEffect(() => {
    if (expensesType === 'individual') return setTotalExpenses(individualExpenses)
    let from = Math.round((generalExpenses / minMembers))
    let till = Math.round((generalExpenses / maxMembers))
    return setTotalExpenses([from, till])
  }, [generalExpenses, individualExpenses, minMembers, maxMembers])

  const getMinDate = () => {
    let date = actualDate.toLocaleString().slice(0, 10);
    let year = date.slice(6, 10)
    let month = date.slice(3, 5)
    let day = date.slice(0, 2)
    return `${year}-${month}-${day}`
  }

  const returnTotalExpenses = () => {
    if (Array.isArray(totalExpenses)) {
      if (typeof totalExpenses[0] === 'number' && typeof totalExpenses[1] === 'number') {
        if (isFinite(totalExpenses[0]) && isFinite(totalExpenses[1])) {
          if (totalExpenses[0] > 0) {
            return `От ${totalExpenses[1]} ₽ до ${totalExpenses[0]}`
          } else return 'Бесплатно'
        } else return `Не определена`
      } else return `Не определена 0`
    }
    if (totalExpenses < 1) return 'Бесплатно'
    else return `${totalExpenses} ₽`
  }

  return (
    <div className="create_proposal">
      <h1>Новое предложение</h1>
      <div className="proposal_form">
        <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder={'Заголовок *'} />
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} placeholder={'Описание *'} cols="30" rows="10"></textarea>
        <DropdownListComponent data={categories} selectedItem={category} setItem={setCategory} placeholder={'категорию'} />
        {/* тут будет фото */}
        <h3>Место сбора *</h3>
        <div className={'flex flex-wrap'}>
          <DropdownListComponent data={cities} selectedItem={cityPoint} setItem={setCityPoint} placeholder={'город'} />
          <input onChange={(e) => setStreetPoint(e.target.value)} value={streetPoint} type="text" placeholder={'Улица'} />
          <input onChange={(e) => setBuildingPoint(e.target.value)} value={buildingPoint} type="text" placeholder={'Здание'} />
        </div>

        <h3>Начало события *</h3>
        <div className={'flex flex-wrap'}>
          <input onChange={(e) => setBeginDate(e.target.value)} value={beginDate} type="date" min={getMinDate()} />
          <input onChange={(e) => setBeginTime(e.target.value)} value={beginTime} type="time" />
        </div>

        <h3>Длительность события</h3>
        <div className={'flex flex-wrap'}>
          <input min={0} onChange={(e) => setDurationDays(e.target.value)} value={durationDays} type="number" placeholder={'Дни'} />
          <input min={0} max={24} onChange={(e) => setDurationHours(e.target.value)} value={durationHours} type="number" placeholder={'Часы'} />
          <input min={0} max={60} onChange={(e) => setDurationMinutes(e.target.value)} value={durationMinutes} type="number" placeholder={'Минуты'} />
        </div>

        <h3>Количество участников *</h3>
        <div className={'flex flex-wrap'}>
          <input min={0} onChange={(e) => {
            setMinMembers(e.target.value)
            if (e.target.value > maxMembers) {
              setMaxMembers(e.target.value)
            }
          }} value={minMembers} type="number" placeholder={'От'} />
          <input min={0} onChange={(e) => {
            setMaxMembers(e.target.value)
            if (e.target.value < minMembers) {
              setMinMembers(e.target.value)
            }
          }} value={maxMembers} type="number" placeholder={'До'} />
        </div>

        <div className={'flex flex-wrap'}>
          <div onClick={() => setExpensesType('general')} className={`px-2 flex flex-1 flex-col ${expensesType === 'general' ? 'opacity-100' : 'opacity-40'} ${expensesType === 'general' && 'transition-all cursor-auto'} ${expensesType !== 'general' && 'cursor-pointer'}`}>
            <h3>Общие расходы</h3>
            <p className={'text-slate-700'}>Если требуются затраты, которые необходимо разделить поровну среди участников</p>
            <input className={`${expensesType === 'general' ? 'pointer-events-auto' : 'pointer-events-none'}`} min={0} onChange={(e) => setGeneralExpenses(e.target.value)} value={generalExpenses} type="number" />
          </div>
          <div onClick={() => setExpensesType('individual')} className={`px-2 flex flex-1 flex-col ${expensesType === 'individual' ? 'opacity-100' : 'opacity-40'} ${expensesType === 'individual' && 'transition-all cursor-auto'} ${expensesType !== 'individual' && 'cursor-pointer'}`}>
            <h3>Индивидуальные расходы</h3>
            <p className={'text-slate-700'}>Если затраты на каждого человека фиксированы</p>
            <input className={`${expensesType === 'individual' ? 'pointer-events-auto' : 'pointer-events-none'}`} min={0} onChange={(e) => setIndividualExpenses(e.target.value)} value={individualExpenses} type="number" />
          </div>
        </div>
        <h4 className="my-3">Цена: {returnTotalExpenses()}</h4>
        <div className="flex justify-end cursor-pointer hover:underline p-4" onClick={() => createProposal()}>Добавить</div>
        <span className={`text-slate-500 flex justify-center pb-4 ${createEventError === '' ? 'opacity-0' : 'opacity-100 transition-all'}`}>{createEventError}</span>
      </div>
    </div >
  );
}

export default ProposalFormComponent;
