export const QUIZ_API = {
  BASE_URL: 'https://opentdb.com',
  CATEGORIES: '/api_category.php',
  QUESTIONS: '/api.php',
};

export const fetchCategories = async (dataSetterFunction) => {
  try {
    const response = await fetch(`${QUIZ_API.BASE_URL}${QUIZ_API.CATEGORIES}`);
    if (!response.ok) throw new Error('Failed to fetch categories');

    const data = await response.json();
    dataSetterFunction(data);
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

export const fetchQuizQuestions = async (
  category,
  difficulty,
  dataSetterFunction
) => {
  try {
    const response = await fetch(
      `${QUIZ_API.BASE_URL}${QUIZ_API.QUESTIONS}?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`
    );
    if (!response.ok) throw new Error('Failed to fetch categories');

    const data = await response.json();
    dataSetterFunction(data);
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};
