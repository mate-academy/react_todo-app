/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react';
import { useParams } from 'react-router-dom';

import {
  AuthContext,
  TodoList,
  TodoFooter,
  Todo,
  getTodos,
  Filter,
  Notification,
  TodoHeader,
} from './imports';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.all);
  const [notification, setNotification] = useState('');
  const [isToggleClicked, setIsToggleClicked] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isClearButtonClicked, setIsClearButtonClicked] = useState(false);

  const { filterParam = '' } = useParams();

  useMemo(() => {
    switch (filterParam) {
      case '':
      default:
        setFilter(Filter.all);
        break;
      case 'active':
        setFilter(Filter.active);
        break;
      case 'completed':
        setFilter(Filter.completed);
        break;
    }
  }, [filterParam]);

  const filterList = (todosList: Todo[]) => {
    switch (filter) {
      case Filter.all:
        return todosList;
      case Filter.active:
        return todosList.filter(todo => todo.completed === false);
      case Filter.completed:
        return todosList.filter(todo => todo.completed === true);
      default:
        return todosList;
    }
  };

  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    if (user) {
      getTodos(user.id)
        .then(setTodos)
        .catch(() => {
          setNotification('Unable to get todos');
        });
    }
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader
          newTodoField={newTodoField}
          todos={todos}
          setTodos={setTodos}
          setIsToggleClicked={setIsToggleClicked}
          isAdding={isAdding}
          setIsAdding={setIsAdding}
          user={user}
          setNotification={setNotification}
        />

        {todos.length > 0 && (
          <>
            <TodoList
              todos={filterList(todos)}
              setTodos={setTodos}
              isToggleClicked={isToggleClicked}
              isAdding={isAdding}
              isClearButtonClicked={isClearButtonClicked}
              setNotification={setNotification}
            />

            <TodoFooter
              todos={todos}
              setIsClearButtonClicked={setIsClearButtonClicked}
              setTodos={setTodos}
            />
          </>
        )}
      </div>

      {notification && (
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
      )}

    </div>
  );
};
