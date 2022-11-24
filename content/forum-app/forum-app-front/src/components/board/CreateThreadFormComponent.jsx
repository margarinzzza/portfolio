import { useDispatch, useSelector } from 'react-redux'
import { threadReducerAction } from '../../features/threadSlice';

function CreateThreadFormComponent({ visible, setVisible, func }) {

  const { createThreadError, threadName, threadDesc } = useSelector((state) => state.thread)
  const dispatch = useDispatch()

  return (
    <div className={`${visible && 'activePopUp'} popUp`}>
      <div className='popUpContent'>
        <h3 className='text-center mb-2'>Создать тред</h3>
        <div>
          <input onChange={(e) => dispatch(threadReducerAction.setThreadName(e.target.value))} value={threadName} type="text" placeholder='Название' />
          <textarea onChange={(e) => dispatch(threadReducerAction.setThreadDesc(e.target.value))} value={threadDesc} placeholder='Описание' rows="3"></textarea>
        </div>
        <div className='flex justify-between mt-6'>
          <span className='linkItem' onClick={() => setVisible(false)}>Отменить</span>
          <span onClick={() => func()} className='linkItem'>Создать</span>
        </div>
        <span className='text-gray-500 text-center'>{createThreadError !== '' && createThreadError}</span>
      </div>

    </div>
  );
}

export default CreateThreadFormComponent;
