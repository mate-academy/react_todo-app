import React, { useCallback } from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../context/TodosContext';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { setTodos } = React.useContext(TodosContext);
  // const [updatedTodo, setUpdatedTodo] = useState(todo.title);

  const deleteTodo = useCallback((todoID: number) => {
    setTodos(currentTodos => currentTodos.filter(
      todoItem => todoItem.id !== todoID,
    ));
  }, []);

  const toggleTodoCompleted = useCallback((todoID: number) => {
    setTodos(currentTodos => currentTodos.map(
      todoItem => (todoItem.id === todoID
        ? { ...todoItem, completed: !todoItem.completed }
        : todoItem),
    ));
  }, []);

  // const updateTodo = (e: React.MouseEvent<HTMLInputElement>) => {
  //   e.preventDefault();

  // };

  return (
    <li
      key={todo.id}
      className={classNames(
        {
          completed: todo.completed,
          // editing
        },
      )}
      // onDoubleClick={() => updateTodo}
      // value={updatedTodo}
      // onChange={(e) => setUpdatedTodo(e.target.value)}
      // onDoubleClick={updateTodo}

    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onChange={() => toggleTodoCompleted(todo.id)}
        />
        <label htmlFor="toggle-view">{todo.title}</label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="deleteButton"
          onClick={() => deleteTodo(todo.id)}
        />
      </div>

      <input
        type="text"
        className="edit"
        // value={updatedTodo}
        // onChange={(e) => setUpdatedTodo(e.target.value)}

      />
    </li>

  /* {<li>
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
      </ul> */
  );
};
