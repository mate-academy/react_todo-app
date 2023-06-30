import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  FilterTodos,
  FormTodos,
  TodoList,
  UserForm,
} from './components';
import { Todo } from './types/Todo';
import { useLocalStorage } from './utils/localStorage';
import { Status } from './types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [isUser, setIsUser] = useState(false);
  const location = useLocation();
  const isAllCompleted = useMemo(() => todos.every(
    (todo: Todo) => todo.completed,
  ), [todos]);

  const filteredTodos = useMemo(() => todos.filter((todo: Todo) => {
    const pathName = location.pathname;

    switch (pathName) {
      case Status.ACTIVE:
        return !todo.completed;

      case Status.COMPLETED:
        return todo.completed;

      default:
        return Status.ALL;
    }
  }), [todos, location]);

  const addTodo = (title: string) => {
    if (!title) {
      return;
    }

    const newTodo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const deleteTodos = (todoId: number) => {
    setTodos(todos.filter((todo: Todo) => todo.id !== todoId));
  };

  const changeTodoTitle = (todoId: number, title: string) => {
    setTodos(todos.map((todo: Todo) => {
      if (todo.id !== todoId) {
        return todo;
      }

      return { ...todo, title };
    }));
  };

  const changeTodoStatus = (
    todoId: number,
    completed: boolean,
  ) => {
    setTodos(todos.map((todo: Todo) => {
      if (todo.id !== todoId) {
        return todo;
      }

      return { ...todo, completed };
    }));
  };

  const allTodosCompleted = () => {
    setTodos(todos.map((todo: Todo) => {
      if (todo.completed === isAllCompleted) {
        return { ...todo, completed: !isAllCompleted };
      }

      return { ...todo, completed: !isAllCompleted };
    }));
  };

  if (!isUser) {
    return <UserForm setIsUser={setIsUser} />;
  }

  return (
    <>
      <div className="todoapp">
        <FormTodos addTodo={addTodo} />

        <section className="main">
          <TodoList
            todos={filteredTodos}
            deleteTodos={deleteTodos}
            changeTodoTitle={changeTodoTitle}
            changeTodoStatus={changeTodoStatus}
            allTodosCompleted={allTodosCompleted}
          />
        </section>

        {!!todos.length && (
          <FilterTodos
            visibleTodos={todos}
            setTodos={setTodos}
            location={location}
          />
        )}
      </div>
    </>
  );
};
