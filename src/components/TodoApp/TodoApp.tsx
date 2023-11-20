import { useContext } from 'react';
import { TodoFilter } from '../TodosFilter/TodosFilter';
import { Header } from '../Header/Header';
import { Main } from '../Main/Main';
import { TodosContext } from '../../TodosContext';

export const TodoApp = () => {
  const { todos } = useContext(TodosContext);

  return (
    <div className="todoapp">
      <Header />

      {todos.length > 0
        && (
          <>
            <Main />
            <TodoFilter />
          </>
        )}
    </div>
  );
};
