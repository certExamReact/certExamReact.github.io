import React, { createContext, useContext, useMemo, useReducer } from 'react';

export const QuizContext = createContext(undefined);

export default function QuizContextProviderComponent({ children }) {
  const initialSelectQuizState = {
    categoryId: 0,
    difficultyId: 0,
    isValid: false,
    quizSubmitted: [],
  };

  const selectQuizReducer = (state, action) => {
    switch (action.type) {
      case 'category':
        return { ...state, categoryId: action.value };
      case 'difficulty':
        return { ...state, difficultyId: action.value };
      case 'isValid':
        return { ...state, isValid: action.value };
      case 'quizSubmitted':
        return { ...state, quizSubmitted: action.value };
      case 'reset':
        return initialSelectQuizState;
      default:
        return state;
    }
  };

  const [selectQuizState, selectQuizDispatch] = useReducer(
    selectQuizReducer,
    initialSelectQuizState
  );
  const contextValue = useMemo(
    () => ({ selectQuizState, selectQuizDispatch }),
    [selectQuizState]
  );

  return (
    <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>
  );
}

export const useQuizContext = () => {
  const quizContext = useContext(QuizContext);
  //console.log(quizContext)
  if (!quizContext) {
    throw new Error('quizContext not defined.');
  }

  return quizContext;
};
