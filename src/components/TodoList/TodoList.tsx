// import { useContext } from 'react';
// import { Todo } from '../../types/Todo';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';
// import { useState } from 'react';
// import { TodoContext } from '../../context';

type Props = {
  todos: Todo[];
  deleteTodo: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  deleteTodo,
  updateTodo,
}) => {
  // const todos = useContext<Todo[]>(TodoContext);
  // const todos = useState<Todo[]>([]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      ))}
    </section>
  );
};
