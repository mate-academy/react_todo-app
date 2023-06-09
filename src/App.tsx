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
import { Filter } from './utils/vars';

const USER_ID = 7075;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoTitle, setTodoTitle] = useState('');
  const [isEnterPressed, setIsEnterPressed] = useState(false);
  const [selectFilter, setSelectFilter] = useState(Filter.ALL);
  const [isAddingTodo, setIsAddingTodo] = useState(false);

  const count = todos.filter(todo => !todo.completed).length;
  const isChecked = todos.every((todo: Todo) => todo.completed);

  useEffect(() => {
    getTodos(USER_ID).then(todosFromServer => {
      setTodos(todosFromServer);
    });
  }, [isEnterPressed]);

  const visibleTodos = useMemo(() => {
    return todos.filter((todo: Todo) => {
      switch (selectFilter) {
        case Filter.ACTIVE:
          return !todo.completed;
        case Filter.COMPLETED:
          return todo.completed;
        default:
          return true;
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

  const clearCompleted = async () => {
    const completedTodoIds = todos
      .filter(todo => todo.completed)
      .map(todo => todo.id);

    await Promise.all(completedTodoIds.map(deleteTodo));

    setTodos(prevTodos => prevTodos
      .filter(prevTodo => !completedTodoIds.includes(prevTodo.id)));
  };

  const handleToggleAll = () => {
    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: !todos.every((someTodo: Todo) => someTodo.completed),
    }));

    setTodos(updatedTodos);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !isAddingTodo) {
      event.preventDefault();
      setIsAddingTodo(true);
      createTodo(7075, todoTitle)
        .then(() => {
          setIsAddingTodo(false);
          setTodoTitle('');
        })
        .catch(() => {
          setIsAddingTodo(false);
        });
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setIsEnterPressed(true);
      setTodoTitle('');
    }
  };

  const handleSetInputText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
    setIsEnterPressed(false);
  };

  const isCompleted = todos.some(todo => todo.completed === true);

  return (
    <div className="todoapp">
      <Header
        inputText={todoTitle}
        setInputText={handleSetInputText}
        handleKeyPress={handleKeyPress}
        handleKeyUp={handleKeyUp}
      />

      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onChange={handleToggleAll}
        checked={isChecked}
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
