import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { Action, Filter, State, Todo } from '../Types/Types';
import * as actions from './../components/utils/Activities';

export const TodosContext = React.createContext<State>({
  todos: [],
  visibleTodos: [],
  dispatch: () => {},
  filter: 'All',
  setFilter: () => {},
});

type Props = {
  children: React.ReactNode;
};

function reducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'add':
      return actions.addTodo(state, action.payload);

    case 'delete':
      return actions.deleteTodo(state, action.payload);

    case 'check':
      return actions.checkTodo(state, action.payload);

    case 'edit':
      return actions.editTodo(state, action.payload);

    case 'toggleAll':
      return actions.toggleAll(state);

    default:
      return state;
  }
}

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const init = () => {
    try {
      const stored = localStorage.getItem('todos');

      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const [todos, dispatch] = useReducer(reducer, [], init);
  const [filter, setFilter] = useState<Filter>('All');

  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch {
      return;
    }
  }, [todos]);

  const value = useMemo(
    function filterTodos(): State {
      let visibleTodos = [...todos];

      switch (filter) {
        case 'Active':
          visibleTodos = visibleTodos.filter(todo => todo.completed === false);
          break;
        case 'Completed':
          visibleTodos = visibleTodos.filter(todo => todo.completed === true);
          break;
        case 'All':
          break;
      }

      return { todos, visibleTodos, dispatch, filter, setFilter };
    },
    [todos, filter],
  );

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
