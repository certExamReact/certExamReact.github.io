import React, { useEffect, useState } from 'react';
import { useQuizContext } from '../context/QuizContext';
import { sanitizeEntityHtml } from '../utils/sanitizeSpecialChar';
import { useNavigate } from 'react-router-dom';
import { DIFFICULTY_OPTIONS } from '../constants/constants';
import { shuffleArray } from '../utils/shuffleArray';
import { fetchQuizQuestions } from '../services/api';

function QuizAnswer() {
  const { selectQuizState, selectQuizDispatch } = useQuizContext();
  const [quizList, setQuizList] = useState([]);
  const navigate = useNavigate();

  const handleFetchedQuizData = (data) => {
    const quizzesResult = data.results;
    const quizzes = quizzesResult.map((quiz, index) => {
      let answers = [quiz.correct_answer, ...quiz.incorrect_answers];
      answers = answers.map((answer) => sanitizeEntityHtml(answer));
      shuffleArray(answers);
      return {
        id: index,
        question: sanitizeEntityHtml(quiz.question),
        correctAnswer: sanitizeEntityHtml(quiz.correct_answer),
        answers: answers,
        userAnswer: '',
      };
    });
    setQuizList(quizzes);
  };

  useEffect(() => {
    if (selectQuizState.isValid && selectQuizState.quizSubmitted.length === 0) {
      const difficultyOption = DIFFICULTY_OPTIONS.find(
        (dif) => dif.id === selectQuizState.difficultyId
      );
      if (difficultyOption) {
        const difficulty = difficultyOption.name.toLowerCase();
        fetchQuizQuestions(
          selectQuizState.categoryId,
          difficulty,
          handleFetchedQuizData
        );
      }
    }
  }, [selectQuizState.isValid]);

  const updateUserAnswer = (quizId, selectedAnswer) => {
    setQuizList((prevQuizzes) =>
      prevQuizzes.map((quiz) =>
        quiz.id === quizId ? { ...quiz, userAnswer: selectedAnswer } : quiz
      )
    );
  };

  const areAllAnswersSelected = quizList.every(
    (quiz) => quiz.userAnswer !== ''
  );

  const handleSubmitQuiz = () => {
    selectQuizDispatch({ type: 'quizSubmitted', value: quizList });
    navigate('/result');
  };
  return (
    <>
      {selectQuizState.isValid && quizList.length > 0 && (
        <div style={{ textAlign: 'left' }}>
          {quizList.map((quiz, indexQuestion) => (
            <div key={indexQuestion}>
              <div>{quiz.question}</div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {quiz.answers.map((answer, indexAnswer) => (
                  <div
                    onClick={() => updateUserAnswer(quiz.id, answer)}
                    className={
                      answer === quiz.userAnswer
                        ? 'selected-button'
                        : 'unselected-button'
                    }
                    key={indexAnswer}
                  >
                    {answer}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {areAllAnswersSelected && (
            <div style={{ display: 'flex' }}>
              <div onClick={handleSubmitQuiz} className="submit-button">
                Submit
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
export default QuizAnswer;
