// import { useContext } from 'react';
import { useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';
// import { TodoContext } from '../../context';

type Props = {
  todos: Todo[];
  deleteTodo: (todo: Todo) => void;
  updateTodoCheckStatus: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  deleteTodo,
  updateTodoCheckStatus,
  updateTodo,
}) => {
  // const todos = useContext<Todo[]>(TodoContext);
  const [editingId, setEditingId] = useState<number | undefined>(undefined);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          updateTodoCheckStatus={updateTodoCheckStatus}
          setEditingId={setEditingId}
          updateTodo={updateTodo}
          isEditing={todo.id === editingId}
        />
      ))}
    </section>
  );
};
