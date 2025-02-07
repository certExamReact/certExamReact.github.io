import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import QuizApp from './components/QuizApp';
import QuizContextProviderComponent from './context/QuizContext';
import QuizResults from './components/QuizResult';


const router = createBrowserRouter([
  {
    path: '/',
    element: <QuizApp/>
  },
  {
    path: '/result',
    element: <QuizResults />
  }
])
function App() {
  return (
    <div className="App">
      <QuizContextProviderComponent>
        <RouterProvider router={router}/>
      </QuizContextProviderComponent>
    </div>
  );
}

export default App;
