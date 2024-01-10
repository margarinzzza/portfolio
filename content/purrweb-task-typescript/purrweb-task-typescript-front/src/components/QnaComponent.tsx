import { useState } from "react";
import { questionsState } from "../redux/store";

function QnaComponent() {
  const [questionState, setQuestionState] = useState(0)

  return (
    <div className="qna">
      <h2 className="mb-4">Часто задаваемые вопросы</h2>
      <div className="qna__questions">
        {questionsState.map((info) => {
          return <div key={info.id} className="qna__allin">
            <div key={info.id} className="c-pointer align-items-center qna__question d-flex justify-content-between" onClick={() => { questionState === info.id ? setQuestionState(0) : setQuestionState(info.id) }}>
              <span>{info.question}</span>
                <svg className={questionState !== info.id ? 'ms-1 tr-3' : 'ms-1 rotate'} width="1.94vh" height="1.09vh" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className={questionState !== info.id ? '' : 'blue-fill'} d="M8.00077 8.44749C7.56274 8.44828 7.12885 8.36272 6.7239 8.1957C6.31896 8.02869 5.9509 7.78351 5.64077 7.47416L0.194108 2.02749C0.0685721 1.90196 -0.00195312 1.73169 -0.00195312 1.55416C-0.00195313 1.37663 0.0685721 1.20636 0.194108 1.08083C0.319644 0.955291 0.489907 0.884766 0.667441 0.884766C0.844976 0.884766 1.01524 0.955291 1.14077 1.08083L6.58744 6.52749C6.96244 6.90203 7.47077 7.1124 8.00077 7.1124C8.53078 7.1124 9.03911 6.90203 9.41411 6.52749L14.8608 1.08083C14.9863 0.955291 15.1566 0.884766 15.3341 0.884766C15.5116 0.884766 15.6819 0.955291 15.8074 1.08083C15.933 1.20636 16.0035 1.37663 16.0035 1.55416C16.0035 1.73169 15.933 1.90196 15.8074 2.02749L10.3608 7.47416C10.0506 7.78351 9.68259 8.02869 9.27765 8.1957C8.8727 8.36272 8.43881 8.44828 8.00077 8.44749Z" fill="#717583" />
                </svg>
            </div>
            <div className={questionState !== info.id ? 'd-none qna__answer' : 'qna__answer d-flex'}>
              <p>
                {info.answer}
              </p>
            </div>
          </div>
        })}

      </div>
    </div>
  );
}

export default QnaComponent;
