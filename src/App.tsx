/* eslint-disable jsx-a11y/control-has-associated-label */
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Header } from './Components/Header/Header';
import { Main } from './Components/Main/Main';
import { Footer } from './Components/Footer/Footer';
import { useLocalStorage } from './customHooks/useLocalStorage';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [listOfTodos, setlistOfTodos] = useState<Todo[]>([]);
  const [pendingTasksCount, setPendingTasksCount] = useState(1);
  const infoLocalStorage = useLocalStorage(listOfTodos);
  const { filterCriteria } = useParams();

  useEffect(() => {
    if (infoLocalStorage) {
      setlistOfTodos(infoLocalStorage);
    }
  }, [infoLocalStorage]);

  useEffect(() => {
    let numberOfActivities = 0;

    listOfTodos.forEach(el => {
      if (!el.completed) {
        numberOfActivities += 1;
      }
    });

    setPendingTasksCount(numberOfActivities);
  }, [listOfTodos]);

  return (
    <div className="todoapp">
      <Header
        listOfTodos={listOfTodos}
        setlistOfTodos={setlistOfTodos}
      />

      <Main
        listOfTodos={listOfTodos}
        setlistOfTodos={setlistOfTodos}
        filterCriteria={filterCriteria}
      />

      <Footer
        filterCriteria={filterCriteria}
        pendingTasksCount={pendingTasksCount}
        completedTasks={listOfTodos.length - pendingTasksCount}
        setlistOfTodos={setlistOfTodos}
      />

    </div>
  );
};
