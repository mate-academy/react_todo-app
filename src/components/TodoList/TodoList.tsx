import { FC, useState } from 'react';
import { TodoTask } from '../TodoTask';
import { Todo } from '../../types/Todo';
import { ErrorType } from '../../types/Error';

type Props = {
  todos: Todo[];
  filteredTodos: Todo[];
  tempTodo: Todo | null;
  processingTodoIds: number[];
  error: ErrorType;
  removeTodo: (todoId: number) => void;
  updateTodo: (todoId: number, updatedData: Partial<Todo>) => void;

};

export const TodoList: FC<Props> = ({
  todos,
  filteredTodos,
  tempTodo,
  processingTodoIds,
  removeTodo,
  updateTodo,
  error,
}) => {
  const allTodosCompleted = todos.every(todo => todo.completed);
  const [checked, setChecked] = useState(allTodosCompleted);

  const handleOnChangeToggleAll = () => {
    if (allTodosCompleted) {
      todos.forEach(
        todo => updateTodo(todo.id, { completed: !todo.completed }),
      );

      return;
    }

    todos.forEach(todo => {
      if (!todo.completed) {
        updateTodo(todo.id, { completed: !todo.completed });
      }
    });

    setChecked(prev => !prev);
  };

  return (
    <section className="todoapp__main">
      <input
        type="checkbox"
        id="toggle-all"
        className="todoapp__toggle-all"
        data-cy="toggleAll"
        checked={checked}
        onChange={handleOnChangeToggleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul data-cy="todoList">
        {filteredTodos.map(todo => (
          <TodoTask
            key={todo.id}
            todo={todo}
            error={error}
            isLoading={processingTodoIds.includes(todo.id)}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
          />
        ))}

        {tempTodo && (
          <TodoTask
            todo={tempTodo}
            error={error}
            isLoading={processingTodoIds.includes(tempTodo.id)}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
          />
        )}
      </ul>

    </section>
  );
};
