import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { Todo } from '../../type';
import { TodoItem } from '../TodoItem';

interface Props {
  todoList: Todo[]
  onDelete: (id: number) => void
  onCompletedChange: (id: number) => void
  setVisibleTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

export const TodoList: FC<Props> = ({
  todoList,
  onDelete,
  onCompletedChange,
  setVisibleTodos,
}) => {
  let visibelTodos = [...todoList];
  const { pathname } = useLocation();

  visibelTodos = visibelTodos.filter(todo => {
    switch (pathname) {
      case '/completed':
        return todo.completed;
      case '/active':
        return !todo.completed;
        break;

      default:
        return todo;
        break;
    }
  });

  return (

    <ul className="todo-list" data-cy="todoList">
      {visibelTodos.map(todo => (
        <TodoItem
          todo={todo}
          onDelete={onDelete}
          onCompletedChange={onCompletedChange}
          key={todo.id}
          setVisibleTodos={setVisibleTodos}
        />
      ))}

    </ul>
  );
};
