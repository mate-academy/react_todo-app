import React, { useEffect, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter/TodosFilter';
import { Header } from './components/Header';
import { FilterType } from './types/FilterType';
import { ErrorType } from './types/ErrorType';
import { TransitioObjectType } from './types/TransitionObjectType';
import {
  addTodo,
  deleteTodo,
  getTodos,
  getUser,
  toggleCompleted,
  updateTodoTitle,
} from './api';

const USER_ID = 10812;

export const App: React.FC = () => {
  const nodeRef = useRef(null);
  const [inProp, setInProp] = useState(false);
  const [userName, setUserName] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [filterOption, setFilterOption] = useState(FilterType.ALL);
  const [errorMessage, setErrorMessage] = useState(ErrorType.NONE);

  const defaultStyle = {
    transition: 'opacity 300ms ease-in-out',
    opacity: 0,
  };

  const transitionStyles: TransitioObjectType = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };

  const handleSetError = (msg: ErrorType) => {
    if (msg === ErrorType.NONE) {
      return;
    }

    setInProp(true);
    setErrorMessage(msg);

    setTimeout(() => {
      setInProp(false);
    }, 3000);
  };

  const saveTodos = (value: Todo[]) => {
    setTodos(value);
    localStorage.setItem('todos', JSON.stringify(value));
  };

  useEffect(() => {
    getUser(USER_ID)
      .then(res => setUserName(res.name))
      .catch(() => handleSetError(ErrorType.NoUser));

    getTodos(USER_ID)
      .then(res => saveTodos(res))
      .catch(() => handleSetError(ErrorType.NoTodos));

    switch (window.location.hash) {
      case '#/active':
        setFilterOption(FilterType.ACTIVE);
        break;

      case '#/completed':
        setFilterOption(FilterType.COMPLETED);
        break;

      default:
        setFilterOption(FilterType.ALL);
    }
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSetError(ErrorType.NONE);

    if (!newTodoTitle.trim()) {
      setNewTodoTitle('');
      handleSetError(ErrorType.EmptyTitle);

      return;
    }

    const newTodo = {
      id: +new Date(),
      title: newTodoTitle,
      completed: false,
    };

    addTodo({
      userId: USER_ID,
      title: newTodoTitle,
      completed: false,
    })
      .then(() => saveTodos([...todos, newTodo]))
      .catch(() => handleSetError(ErrorType.UnableCompleteAction))
      .finally(() => setNewTodoTitle(''));
  };

  const getFilteredTodos = (option: FilterType, todosToFilter: Todo[]) => {
    switch (option) {
      case FilterType.ACTIVE:
        return todosToFilter.filter(todo => todo.completed === false);

      case FilterType.COMPLETED:
        return todosToFilter.filter(todo => todo.completed === true);

      default:
        return todosToFilter;
    }
  };

  const visibleTodos = getFilteredTodos(filterOption, todos);
  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);
  const areAllCompleted = todos.every(todo => todo.completed);

  const handleToggleCompleted = (todoId: number) => {
    const updatedTodos = [...todos];
    const index = updatedTodos.findIndex(todo => todo.id === todoId);

    updatedTodos[index].completed = !updatedTodos[index].completed;

    saveTodos(updatedTodos);

    toggleCompleted(todoId, updatedTodos[index].completed)
      .then()
      .catch(() => {
        handleSetError(ErrorType.UnableCompleteAction);
        updatedTodos[index].completed = !updatedTodos[index].completed;
        saveTodos(updatedTodos);
      });
  };

  const handleToggleAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkedStatus = e.target.checked;
    const updatedTodos
      = [...todos].map(todo => ({
        ...todo,
        completed: checkedStatus,
      }));

    const promises = updatedTodos
      .map(todo => toggleCompleted(todo.id, checkedStatus));

    saveTodos(updatedTodos);

    Promise.all([...promises])
      .then()
      .catch(() => {
        handleSetError(ErrorType.UnableCompleteAction);
        saveTodos([...todos]);
      });
  };

  const handleDeleteTodo = (todoId: number) => {
    const updatedTodos = [...todos].filter(todo => todo.id !== todoId);

    saveTodos(updatedTodos);

    deleteTodo(todoId)
      .then()
      .catch(() => {
        handleSetError(ErrorType.UnableCompleteAction);
        saveTodos(todos);
      });
  };

  const handleClearCompletedTodos = () => {
    const updatedTodos = [...todos].filter(todo => !todo.completed);

    const promises = updatedTodos.map(todo => deleteTodo(todo.id));

    saveTodos(updatedTodos);

    Promise.all([...promises])
      .then()
      .catch(() => {
        handleSetError(ErrorType.UnableCompleteAction);
        saveTodos([...todos]);
      });
  };

  const handlePatchTodo = (todoId: number, title: string) => {
    const updatedTodos = [...todos].map(todo => {
      if (todo.id !== todoId) {
        return todo;
      }

      return {
        ...todo,
        title,
      };
    });

    saveTodos(updatedTodos);

    updateTodoTitle(todoId, title)
      .then()
      .catch(() => {
        handleSetError(ErrorType.UnableCompleteAction);
        saveTodos([...todos]);
      });
  };

  return (
    <div className="todoapp">
      {userName
      && (
        <>
          {!userName
            ? (
              <h1
                style={{
                  fontSize: '100px',
                  top: '-155px',
                }}
              >
                todos
              </h1>
            ) : <h1>{`${userName}'s todos`}</h1>}

          <Header
            newTodoTitle={newTodoTitle}
            onTitleChange={setNewTodoTitle}
            onFormSubmit={handleFormSubmit}
          />

          <TodoList
            todos={visibleTodos}
            areAllCompleted={areAllCompleted}
            onToggleComplete={handleToggleCompleted}
            onToggleAll={handleToggleAll}
            onDeleteTodo={handleDeleteTodo}
            onPatchTodo={handlePatchTodo}
          />

          {todos.length > 0 && (
            <TodosFilter
              activeTodosAmount={activeTodos.length}
              completedTodosAmount={completedTodos.length}
              onFilterTodos={setFilterOption}
              onClearCompletedTodos={handleClearCompletedTodos}
            />
          )}
        </>
      )}

      <Transition nodeRef={nodeRef} in={inProp} timeout={300}>
        {state => (
          <div
            className="error"
            ref={nodeRef}
            style={{
              ...defaultStyle,
              ...transitionStyles[state as keyof TransitioObjectType],
            }}
          >
            {errorMessage}
            <button
              type="button"
              className="error__button"
              aria-label="close__error"
              onClick={() => setInProp(false)}
            />
          </div>
        )}
      </Transition>
    </div>
  );
};
