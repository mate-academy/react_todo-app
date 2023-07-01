import { useCallback, useMemo, useState } from 'react';
import { Status } from '../types/TodoStatus';
import { TodoList } from './TodoList/TodoList';
import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import { useLocalStorage } from '../utils/useLocaleStorage';
import { Todo } from '../types/Todo';

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [selectedStatus, setSelectedStatus] = useState(Status.All);

  const filteredTodos = useMemo(() => {
    switch (selectedStatus) {
      case Status.ACTIVE:
        return todos.filter((todo: Todo) => !todo.completed);
      case Status.COMPLETED:
        return todos.filter((todo: Todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, selectedStatus]);

  const allCompleted = useMemo(() => (
    todos.every((todo: Todo) => todo.completed)
  ), [todos]);

  const toggleAllTodos = useCallback(async () => {
    setTodos(
      todos.map((todo: Todo) => ({
        ...todo,
        completed: !allCompleted,
      })),
    );
  }, [todos, allCompleted]);

  return (
    <>
      <Header
        todos={todos}
        setTodos={setTodos}
      />

      {!!todos.length && (
        <TodoList
          filteredTodos={filteredTodos}
          toggleAllTodos={toggleAllTodos}
          setTodos={setTodos}
        />
      )}

      <Footer
        todos={todos}
        setTodos={setTodos}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
      />
    </>
  );
};
