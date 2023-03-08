import React, {
  useState,
  useRef,
  useEffect,
} from 'react';
import { useParams } from 'react-router-dom';
import { ErrorType } from './types/ErrorType';
import { Filter } from './types/Filter';

import { TodoList } from './components/TodosList/TodosList';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Error } from './components/Error/Error';

import { Todo } from './types/Todo';
import { useLocalStorage } from './hooks/useLocalStorage';

export const App: React.FC = () => {
  const newTodoField = useRef<HTMLInputElement>(null);
  const [typeOfError, setTypeOfError] = useState(ErrorType.success);
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useLocalStorage([]);
  const { filter = Filter.all } = useParams();

  useEffect(() => {
    const timeoutID = setTimeout(() => setTypeOfError(ErrorType.success), 3000);

    return () => {
      clearTimeout(timeoutID);
    };
  });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTitle(value);
  };

  const listModified = (type: Filter | string) => {
    switch (type) {
      case Filter.active:
        return todos.filter(item => !item.completed);
      case Filter.completed:
        return todos.filter(item => item.completed);
      default:
        return todos;
    }
  };

  const uploadTodos = (newTodo: Todo) => {
    setTodos([
      ...todos,
      newTodo,
    ]);
  };

  const handleSubmit
  = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.length) {
      setTypeOfError(ErrorType.emptyTitle);

      return;
    }

    const data: Todo = {
      id: +new Date(),
      title,
      completed: false,
    };

    uploadTodos(data);
    setTitle('');
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter(item => item.id !== id));
  };

  const errorDisable = () => {
    setTypeOfError(ErrorType.success);
  };

  const deleteCompletedTodos = () => {
    setTodos(listModified(Filter.active));
  };

  const handleChangeTodo = (data: object, id: number) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          ...data,
        };
      }

      return todo;
    }));
  };

  const completedTodos = listModified(Filter.completed).length;
  const todosFiltered = listModified(filter);
  const activeTodos = listModified(Filter.active).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          onHandleSubmit={handleSubmit}
          onHandleInput={handleInput}
          setTodos={setTodos}
          newTodoField={newTodoField}
          inputValue={title}
          todos={todos}
        />
        <TodoList
          onDelete={handleDelete}
          onHandleChangeTodo={handleChangeTodo}
          todos={todosFiltered}
        />
        {!!todos.length && (
          <Footer
            onDeleteCompletedTodos={deleteCompletedTodos}
            completedTodos={completedTodos}
            activeTodos={activeTodos}
          />
        )}
      </div>

      <Error
        onErrorDisable={errorDisable}
        errorType={typeOfError}
      />
    </div>
  );
};
