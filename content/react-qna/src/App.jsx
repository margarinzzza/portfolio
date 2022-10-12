import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import './App.css';
import { qnas } from './store/store';
import { setQuestion, setProgressBar, setRightQuestions, resetQuestions } from './redux/slices/qnaSlice';
import { useDispatch } from 'react-redux';
import end_img from './media/img/prize.png'

const App = () => {
  const dispatch = useDispatch()
  const { qna, progressBar, rightQuestions } = useSelector((state) => state.qna)
  const nextQuestion = (el) => {
    if (el.isTrue) {
      dispatch(setRightQuestions())
    }
    dispatch(setProgressBar())
    dispatch(setQuestion(qna.id + 1))
  }
  const checkDeclension = () => {
    const lastRightQuestionNumber = rightQuestions % 10
    if (rightQuestions === 1) {
      return 'ответ'
    } else if (rightQuestions > 11 && lastRightQuestionNumber === 1) {
      return 'ответ'
    } else if (5 > lastRightQuestionNumber && lastRightQuestionNumber > 1) {
      return 'ответа'
    } else {
      return 'ответов'
    }
  }

  return (
    <div className={`app container-fluid g-0`}>
      <div className='content'>
        <div className='qna-card text-black'>
          {qna !== 'end' && (
            <div className='qna-progress' style={{ 'width': `${progressBar}%` }}></div>
          )}
          {qna !== 'end' ? (
            <>
              <h2 className='qna-q fw-bold'>{qna.question}</h2>
              <div className='qna-answers'>
                {qna.answers.map((el, index) => {
                  return <div onClick={() => nextQuestion(el)} key={index} className='qna-answer'>{el.answer}</div>
                })}
              </div>
            </>
          ) : (
            <div className='qna-end text-center'>
              <img src={end_img} alt="end" />
              <h4 className=''>Вы отгадали {rightQuestions} {checkDeclension()} из {qnas.length}</h4>
              <div className='button' onClick={() => dispatch(resetQuestions())}>Попробовать снова</div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default App;
