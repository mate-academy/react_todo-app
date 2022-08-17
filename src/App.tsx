import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header, TodoList, Footer } from './components';
import useLocaleStorage from './UseLocaleStorage';

export const App: React.FC = () => {
  const [title, setTitle] = useState('');

  const [todos, setTodos] = useLocaleStorage<Todo[]>('todos', []);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);

  const { pathName } = useParams();

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    setVisibleTodos(todos.filter(todo => {
      switch (pathName) {
        case 'completed':
          return todo.completed;

        case 'active':
          return !todo.completed;

        default:
          return todo;
      }
    }));
  }, [todos, pathName]);

  const onDeleteTodo = (todoId: number) => {
    setTodos(todos.filter((todo: Todo) => todoId !== todo.id));
  };

  const togglerAllCheck = () => {
    const someTodoActive = todos.some(todo => !todo.completed);

    if (someTodoActive) {
      setTodos(todos.map(todo => {
        return {
          ...todo,
          completed: true,
        };
      }));
    }

    if (!someTodoActive) {
      setTodos(todos.map(todo => {
        return {
          ...todo,
          completed: false,
        };
      }));
    }
  };

  const onCheckTodo = (todoId: number) => {
    setTodos(
      todos.map((todo: Todo) => {
        if (todoId === todo.id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }),
    );
  };

  const onAddTodo = () => {
    if (title.trim() === '') {
      setTitle('');

      return;
    }

    const newTodo: Todo = {
      id: Number(new Date()),
      title,
      completed: false,
    };

    setTodos([
      ...todos,
      newTodo,
    ]);

    setTitle('');
  };

  const setNewTitleTodo = (newTitle: string, todoId: number) => {
    if (newTitle.trim() === '') {
      onDeleteTodo(todoId);

      return;
    }

    setTodos(todos
      .map((todo: Todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            title: newTitle,
          };
        }

        return todo;
      }));
  };

  const getActiveTodosCount = () => {
    return (todos.filter(
      t => !t.completed,
    )).length;
  };

  const clearCompletedTodos = () => {
    setTodos(todos.filter((todo: Todo) => !todo.completed));
    setVisibleTodos(todos);
  };

  return (
    <div className="todoapp">
      <Header title={title} setTitle={setTitle} onAddTodo={onAddTodo} />
      <TodoList
        visibleTodos={visibleTodos}
        togglerAllCheck={togglerAllCheck}
        onDeleteTodo={onDeleteTodo}
        onCheckTodo={onCheckTodo}
        setNewTitle={setNewTitleTodo}
      />
      {todos.length && (
        <Footer
          getActiveTodosCount={getActiveTodosCount}
          clearCompletedTodos={clearCompletedTodos}
        />
      )}
    </div>
  );
};
