import { Link, useNavigate } from 'react-router-dom';
import { useQuizContext } from '../context/QuizContext';
import '../assets/css/Quiz.css';
export default function QuizResults() {
  const { selectQuizState } = useQuizContext();
  const navigate = useNavigate();
  const totalCorrectAnswers = selectQuizState.quizSubmitted.filter(
    (q) => q.userAnswer === q.correctAnswer
  ).length;

  const navigateToHome = () => {
    navigate('/');
  };

  const getScoreColorClass = () => {
    if (totalCorrectAnswers <= 1) return 'bg-red';
    if (totalCorrectAnswers >= 2 && totalCorrectAnswers <= 3)
      return 'bg-yellow';
    return 'bg-green';
  };

  const getAnswerClass = (quiz, answer) => {
    let classes = [];
    if (
      (quiz.userAnswer === answer && quiz.userAnswer === quiz.correctAnswer) ||
      answer === quiz.correctAnswer
    ) {
      classes.push('selected-button');
    }
    if (quiz.userAnswer === answer && quiz.userAnswer !== quiz.correctAnswer) {
      classes.push('wrong-selected-button');
    }
    return classes.join(' ');
  };

  if (selectQuizState.quizSubmitted.length === 0) {
    return (
      <div>
        There are no results. <Link to="/">Back to home</Link>
      </div>
    );
  }

  return (
    <div>
      <div style={{ textAlign: 'left' }}>
        <h1>Results</h1>
        {selectQuizState.isValid &&
          selectQuizState.quizSubmitted.length > 0 && (
            <div style={{ textAlign: 'left' }}>
              {selectQuizState.quizSubmitted.map((quiz) => (
                <div key={quiz.id}>
                  <div>{quiz.question}</div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {quiz.answers.map((answer, indexAnswer) => (
                      <div
                        className={`unselected-button ${getAnswerClass(
                          quiz,
                          answer
                        )}`}
                        key={indexAnswer}
                      >
                        {answer}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div style={{ display: 'flex' }}>
                <div className={`result-box ${getScoreColorClass()}`}>
                  You scored {totalCorrectAnswers} out of 5
                </div>
              </div>

              <div style={{ display: 'flex' }}>
                <div onClick={navigateToHome} className="submit-button">
                  Create a new quiz
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
