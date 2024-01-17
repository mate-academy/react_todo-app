import React, {
  useContext,
  // useEffect,
} from 'react';
import { TodosContext } from './Store';
import { TodoItem } from './TodoItem';
import { CompleteAll } from '../types/completeAll';

type Props = {};

export const TodoList: React.FC<Props> = React.memo(() => {
  const {
    todos,
    // setTodos,
    // completeAll,
    setCompleteAll,
  } = useContext(TodosContext);

  const handleClick = () => {
    setCompleteAll((prevCompleteAll: CompleteAll) => {
      if (prevCompleteAll === null) {
        return true;
      }

      return !prevCompleteAll;
    });
  };

  // useEffect(() => {
  //   const checkbox = document.getElementById('toggle-all');

  //   if (checkbox && completeAll) {
  //     checkbox.click();
  //   }
  // }, []);

  // useEffect(() => {
  //   if (completeAll !== null) {
  //     const updatedTodos = todos.map(todo => (
  //       { ...todo, complete: completeAll }
  //     ));

  //     setTodos(updatedTodos);
  //   }
  // }, [completeAll]);

  return (
    <>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onClick={handleClick}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todoList">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            // clickEvent={completeAll}
          />
        ))}
        {
          // #region
          /*
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
          */
          // #endregion
        }
      </ul>
    </>
  );
});
