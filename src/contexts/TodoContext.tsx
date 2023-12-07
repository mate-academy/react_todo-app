import React, {
  createContext,
  useReducer,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { Todo } from '../types/Todo';
import { getStorageData } from '../storageFunction/getStorageData';
import { todoReducer } from '../reducers/todoReducer';
import { Action } from '../types/Action';
import { setStorageData } from '../storageFunction/setStorageData';

interface TodoProviderState {
  children: React.ReactNode;
}

interface TodoContextProps {
  todoList: Todo[],
  todoListToShow: Todo[],
  dispatch: React.Dispatch<Action>,
  filter: string,
  setFilter: (filter: string) => void;
}

export const TodoContext = createContext<TodoContextProps>({
  todoList: [],
  todoListToShow: [],
  dispatch: () => { },
  filter: '',
  setFilter: () => { },
});

export const TodoProvider: React.FC<TodoProviderState> = ({
  children,
}) => {
  const [todoList, dispatch] = useReducer(todoReducer, []);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const initialtodoList = getStorageData();

    dispatch({ type: 'setInitialTodoList', todoList: initialtodoList });
  }, []);

  useEffect(() => {
    setStorageData(todoList);
  }, [todoList]);

  const todoListToShow = useMemo(() => {
    switch (filter) {
      case 'completed':
        return todoList.filter(todo => todo.completed === true);
      case 'active':
        return todoList.filter(todo => todo.completed === false);
      default:
        return todoList;
    }
  }, [todoList, filter]);

  return (
    <TodoContext.Provider value={{
      todoList,
      todoListToShow,
      dispatch,
      filter,
      setFilter,
    }}
    >
      {children}
    </TodoContext.Provider>
  );
};
