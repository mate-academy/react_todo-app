/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext } from 'react';
import { NewTodo } from './components/NewTodo/NewTodo';
import { TodoList } from './components/TodoList/TodoList';
import {
  TodosContext,
  // TodosContextProvider,
} from './components/TodosContextProvider/TodosContextProvider';

export const App = () => {
  const { todos } = useContext(TodosContext);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <NewTodo />
      </header>

      {todos.length !== 0 && (
        <TodoList />
      )}
    </div>
  );
};
