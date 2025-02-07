import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useQuizContext } from '../context/QuizContext';
import { DIFFICULTY_OPTIONS, LIST_OPTIONS } from '../constants/constants';
import { fetchCategories } from '../services/api';

const Select = React.memo(({ id, options, onChange }) => (
  <select id={id} onChange={onChange}>
    {options}
  </select>
));

function SelectQuizSection() {
  const { selectQuizState, selectQuizDispatch } = useQuizContext();

  const [categoryList, setCategoryList] = useState([
    { id: 0, name: 'Select a category' },
  ]);
  const hasFetchedCategories = useRef(false);

  const handleFetchedCategories = (data) => {
    setCategoryList((prev) => [...prev, ...data.trivia_categories]);
  };

  useEffect(() => {
    selectQuizDispatch({ type: 'reset' });
    if (!hasFetchedCategories.current) {
      fetchCategories(handleFetchedCategories);
      hasFetchedCategories.current = true;
    }
  }, [selectQuizDispatch]);

  const updateQuizSelection = useCallback(
    (listType, id) => {
      selectQuizDispatch({ type: listType, value: id });
    },
    [selectQuizDispatch]
  );

  const handleCategoryChange = useCallback(
    (e) => updateQuizSelection(LIST_OPTIONS.CATEGORY, Number(e.target.value)),
    [updateQuizSelection]
  );

  const handleDifficultyChange = useCallback(
    (e) => updateQuizSelection(LIST_OPTIONS.DIFFICULTY, Number(e.target.value)),
    [updateQuizSelection]
  );

  const { categoryId, difficultyId, isValid } = selectQuizState;
  const isSelectionValid = useCallback(() => 
    categoryId !== 0 && difficultyId !== 0
  , [categoryId, difficultyId]);

  const handleCreateQuiz = useCallback(() => {
    if (isSelectionValid() && !isValid) {
      selectQuizDispatch({ type: 'isValid', value: isSelectionValid() });
    }
  }, [selectQuizDispatch, isValid, isSelectionValid]);

  const categoryOptions = useMemo(
    () =>
      categoryList.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      )),
    [categoryList]
  );

  const difficultyOptions = useMemo(
    () =>
      DIFFICULTY_OPTIONS.map((difficulty) => (
        <option key={difficulty.id} value={difficulty.id}>
          {difficulty.name}
        </option>
      )),
    []
  );

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Select
          id="categorySelect"
          options={categoryOptions}
          onChange={handleCategoryChange}
        />
        <Select
          id="difficultySelect"
          options={difficultyOptions}
          onChange={handleDifficultyChange}
        />
        <button id="createBtn" onClick={handleCreateQuiz}>
          Create
        </button>
      </div>
    </div>
  );
}
export default SelectQuizSection;
