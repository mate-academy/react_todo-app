/* eslint-disable jsx-a11y/control-has-associated-label */
import { NewTodo } from './components/NewTodo/NewTodo';
import { TodoList } from './components/TodoList/TodoList';
import { Filters } from './components/Filters/Filters';
import {
  TodosContextProvider,
} from './components/TodosContextProvider/TodosContextProvider';

export const App = () => {
  // const handleDeleting = (id: number) => {
  //   const indexOfTodo = todos.findIndex(todo => todo.id === id);

  //   setTodos(prevTodos => [...prevTodos].splice(indexOfTodo, 1));
  // };

  return (
    <TodosContextProvider>
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <NewTodo />
        </header>

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList />

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
        </section>

        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            3 items left
          </span>

          <Filters />

          <button type="button" className="clear-completed">
            Clear completed
          </button>
        </footer>
      </div>
    </TodosContextProvider>
  );
};
