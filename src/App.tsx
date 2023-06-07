import React, { useEffect, useMemo, useState } from 'react';
import { Header } from './components/Header';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';
import {
  createTodo,
  deleteTodo, getTodos, updateTodo,
} from './api/todos';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';

const USER_ID = 7075;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoTitle, setTodoTitle] = useState('');
  const [isEnterPressed, setIsEnterPressed] = useState(false);
  const [selectFilter, setSelectFilter] = useState('all');
  const [allTodosCompleted, setAllTodosCompleted] = useState<boolean>(true);

  const count = todos.length;

  useEffect(() => {
    getTodos(USER_ID).then(todosFromServer => {
      setTodos(todosFromServer);
    });
  }, [isEnterPressed,
  ]);

  const visibleTodos = useMemo(() => {
    return todos.filter((todo: Todo) => {
      switch (selectFilter) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          return todos;
      }
    });
  }, [
    todos,
    selectFilter,
  ]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleDeleteTodo = (todoId: number) => {
    deleteTodo(todoId);
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  const handleChangeTodo = async (
    todoId: number,
    updatedFields: { title?: string; completed?: boolean },
  ) => {
    await updateTodo(todoId, updatedFields);

    setTodos(state => state.map(todo => {
      if (todo.id === todoId) {
        return { ...todo, ...updatedFields };
      }

      return todo;
    }));
  };

  const clearCompleted = () => {
    todos
      .filter(todo => todo.completed)
      .forEach(async todo => {
        await deleteTodo(todo.id);
        setTodos(prevTodos => prevTodos
          .filter(prevTodo => prevTodo.id !== todo.id));
      });
  };

  const handleToggleAll = () => {
    const updatedTodos = todos.map(todo => (
      {
        ...todo,
        completed: allTodosCompleted,
      }
    ));

    setTodos(updatedTodos);
    setAllTodosCompleted(prevCompleted => !prevCompleted);
  };

  const isCompleted = todos.some(todo => todo.completed === true);

  return (
    <div className="todoapp">
      <Header
        inputText={todoTitle}
        setInputText={(ev) => {
          setTodoTitle(ev.target.value);
          setIsEnterPressed(false);
        }}
        handleKeyPress={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            createTodo(7075, todoTitle);
          }
        }}
        handleKeyUp={(event) => {
          if (event.key === 'Enter') {
            setIsEnterPressed(true);
            setTodoTitle('');
          }
        }}
      />
      {' '}

      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={todos.every((todo: Todo) => todo.completed)}
        onChange={handleToggleAll}
      />
      {todos.length > 0 && (
        <TodoList
          todos={visibleTodos}
          removeTodo={handleDeleteTodo}
          changeTodo={handleChangeTodo}
        />
      )}
      {todos.length > 0 && (
        <Footer
          count={count}
          setFilter={setSelectFilter}
          clearCompleted={clearCompleted}
          isCompleted={isCompleted}
        />
      )}
    </div>
  );
};
