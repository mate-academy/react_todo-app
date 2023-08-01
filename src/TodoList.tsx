import { useContext, useState } from 'react';
import { TodoContextType, TodosContext } from './TodosContext';
// import { Todo } from './types/Todo';

/* eslint-disable jsx-a11y/control-has-associated-label */
export const TodosList: React.FC = () => {
  const { todos, setTodos } = useContext<TodoContextType>(TodosContext);
  const [toggleAll, setToggleAll] = useState(() => {
    if (todos.filter(todo => todo.completed === false).length > 0) {
      return false;
    }

    return true;
  });

  const handleToggle = () => {
    setToggleAll(!toggleAll);
    setTodos(oldTodos => oldTodos.map(todo => todo.completed = !toggleAll));

    // setTodos(
    //   (oldTodos: Todo[]) => (
    //     [...oldTodos].map((todo: Todo) => (
    //       todo.completed = !toggleAll))),
    // );
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onClick={handleToggle}
        checked={toggleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

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
      </ul>
    </section>
  );
};
