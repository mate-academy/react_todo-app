import React, { useContext } from 'react';
import { TodosStateContext } from '../providers/TodosProvider';
import { TodoItem } from './TodoItem';

export const TodoList = () => {
  const { state } = useContext(TodosStateContext);

  // const [, setEditingTodoTitle] = useState<string>('');

  // const setEditingTodoTitleHandler = (value: string) => {
  //   setEditingTodoTitle(value);
  // };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {state?.todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}

      {/* This todo is being edited */}
      {/* <div data-cy="Todo" className="todo">
        <label className="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            className="todo__status"
          />
        </label>

        <form>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value="Todo is being edited now"
          />
        </form>
      </div> */}
    </section>
  );
};
