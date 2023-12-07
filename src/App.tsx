import React from 'react';

import { TodoAddForm } from './Components/TodoAddForm/TodoAddForm';
import { TodoList } from './Components/TodoList/TodoList';
import { TodosFilter } from './Components/TodosFilter/TodosFilter';

import { TodoProvider } from './contexts/TodoContext';

export const App: React.FC = () => {
  /*
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [modifier, setModifier] = useState('all');
  useEffect(() => {
    const storedData = getStorageData();

    setTodoList(storedData);
  }, []);
  */

  /*
  const todoListToShow = useMemo(() => {
    switch (modifier) {
      case 'active':
        return todoList.filter(item => item.completed === false);
      case 'completed':
        return todoList.filter(item => item.completed === true);
      default:
        return todoList;
    }
  }, [modifier, todoList]);
  */

  return (
    <div className="todoapp">
      <TodoProvider>
        <header className="header">
          <h1>todos</h1>
          <TodoAddForm />
        </header>

        <section className="main">
          <TodoList />
        </section>

        <footer className="footer">
          <TodosFilter />
        </footer>
      </TodoProvider>
    </div>
  );
};
