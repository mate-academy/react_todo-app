import { useCallback, useContext, useEffect } from 'react';
import { TodoItem } from './TodoItem';
import { TodosContext } from '../contexts/TodosContext';
import { FilterContext } from '../contexts/FilterContext';
import { Status } from '../enums/status';

type Props = {
  onEveryToggled: (state: boolean) => void;
};

export const TodoList: React.FC<Props> = ({ onEveryToggled }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const { status } = useContext(FilterContext);

  useEffect(() => {
    if (todos.every(todo => todo.completed)) {
      onEveryToggled(false);
    } else {
      onEveryToggled(true);
    }
  }, [onEveryToggled, todos]);

  const toggle = (id: number) => {
    const todosCopy = [...todos];
    const chosenTodoIndex = todosCopy.findIndex(todo => todo.id === id);
    const chosenTodo = todosCopy[chosenTodoIndex];

    if (chosenTodo) {
      if (!chosenTodo.completed) {
        chosenTodo.completed = true;
      } else {
        chosenTodo.completed = false;
      }
    }

    todosCopy.splice(chosenTodoIndex, 1, chosenTodo);

    setTodos(todosCopy);
  };

  const deleteTodo = useCallback(
    (id: number) => {
      const updatedTodos = todos.filter(todo => todo.id !== id);

      setTodos(updatedTodos);
    },
    [todos, setTodos],
  );

  return (
    <ul className="todo-list" data-cy="todosList">
      {todos
        .filter(todo => {
          if (status === Status.all) {
            return true;
          }

          if (status === Status.active) {
            return !todo.completed;
          }

          if (status === Status.completed) {
            return todo.completed;
          }

          return true;
        })
        .map(todo => (
          <TodoItem
            todo={todo}
            onDelete={deleteTodo}
            onComplete={toggle}
            key={todo.id}
          />
        ))}
    </ul>
  );
};
