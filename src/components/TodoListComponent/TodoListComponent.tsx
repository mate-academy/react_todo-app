/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext } from 'react';
import { AppContext } from '../../context';
import { ListItemComponent } from './ListItemComponent';

export const TodoListComponent = () => {
  const { state } = useContext(AppContext);
  const todos = state.getVisibleTodos();

  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map(todo => (
        <ListItemComponent todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};
