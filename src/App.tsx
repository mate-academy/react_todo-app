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

      {/*
      <ul className="todo-list" data-cy="todoList">
        <li>
          <div className="view">
            <input type="checkbox" className="toggle" id="toggle-view" />
            <label htmlFor="toggle-view">asdfghj</label>
            <button type="button" className="destroy" data-cy="deleteTodo" />
          </div>
          <input type="text" className="edit" />
        </li>

        <li className="completed">
          <div className="view">
            <input type="checkbox" className="toggle" id="toggle-completed" />
            <label htmlFor="toggle-completed">qwertyuio</label>
            <button type="button" className="destroy" data-cy="deleteTodo" />
          </div>
          <input type="text" className="edit" />
        </li>

        <li className="editing">
          <div className="view">
            <input type="checkbox" className="toggle" id="toggle-editing" />
            <label htmlFor="toggle-editing">zxcvbnm</label>
            <button type="button" className="destroy" data-cy="deleteTodo" />
          </div>
          <input type="text" className="edit" />
        </li>

        <li>
          <div className="view">
            <input type="checkbox" className="toggle" id="toggle-view2" />
            <label htmlFor="toggle-view2">1234567890</label>
            <button type="button" className="destroy" data-cy="deleteTodo" />
          </div>
          <input type="text" className="edit" />
        </li>
      </ul> */}
    </div>
  );
};
