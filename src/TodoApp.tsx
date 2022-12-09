import React, {
  FormEvent,
  useEffect,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { Footer } from './components/Footer';
import { FilterTypes } from './types/FilterTypes';
import { Notification } from './components/Notification';

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const localTodos = localStorage.getItem('todos');

    return localTodos ? JSON.parse(localTodos) : [];
  });

  const [title, setTitle] = useState('');
  const [notification, setNotification] = useState<string>('');
  const { pathname } = useLocation();

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = todos.filter(({ completed }) => {
    switch (pathname) {
      case FilterTypes.COMPLETED:
        return completed;

      case FilterTypes.ACTIVE:
        return !completed;

      default:
        return true;
    }
  });

  const addNewTodo = (event: FormEvent) => {
    event.preventDefault();
    setNotification('');
    const newTitle = title.trim();

    if (!newTitle || !/\S/.test(newTitle)) {
      setNotification('Title can\'t be empty');

      return;
    }

    const newId = +new Date();

    const todoToAdd = {
      id: newId,
      title: newTitle,
      completed: false,
    };

    setTodos(previousTodos => [...previousTodos, todoToAdd]);
    setTitle('');
  };

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  const switchTodoStatus = (id: number, status: boolean) => {
    setTodos(
      todos.map((todo: Todo) => {
        return {
          ...todo,
          ...(id === todo.id && { completed: status }),
        };
      }),
    );
  };

  const toggleStatus = (
    id: number,
    status: boolean,
  ) => {
    switchTodoStatus(id, !status);
  };

  const toggleAllTodos = () => {
    const someTodoActive = todos.some(todo => !todo.completed);

    setTodos(todos.map(todo => ({
      ...todo,
      completed: Boolean(someTodoActive),
    })));
  };

  const newTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const deleteTodo = async (id: number) => {
    setTodos(todos.filter((todo: Todo) => id !== todo.id));
  };

  const removeCompletedTodos = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const changeInputText = (id: number, query: string) => {
    setTodos(todos.map(todo => {
      return {
        ...todo,
        ...(id === todo.id && { title: query }),
      };
    }));
  };

  return (
    <>
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>
        </header>

        <form onSubmit={addNewTodo}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={newTodo}
          />
        </form>

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            onChange={toggleAllTodos}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList
            todos={filteredTodos}
            deleteTodo={deleteTodo}
            togleStatus={toggleStatus}
            changeInputText={changeInputText}
          />
        </section>

        {todos.length > 0 && (
          <Footer
            todosLeft={activeTodos}
            completedTodos={completedTodos}
            removeCompletedTodos={removeCompletedTodos}
          />
        )}
      </div>

      <Notification
        notification={notification}
        onSetNotification={setNotification}
      />
    </>
  );
};
