import React, { useReducer } from 'react';
import { Todo } from '../types/Todo';
import todos from '../api/todos.json';

type State = {
  todos: Todo[];
};

type Action
  = { type: 'addTodo', payload: string }
  | { type: 'toggle', payload: { id: number, status: boolean } }
  | { type: 'delete', payload: number };

type Props = {
  children: React.ReactNode;
};

export const initialState: State = {
  todos: [...todos],
};

const switchCompleted = (
  id: number,
  status: boolean,
  previousTodos: Todo[],
) => {
  const newTodos = [...previousTodos];
  const index = newTodos.findIndex(el => el.id === id);

  newTodos[index].completed = !status;

  return newTodos;
};

const deleteTodo = (id: number, previousTodos: Todo[]): Todo[] => {
  return previousTodos.filter(el => el.id !== id);
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'addTodo':
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: +new Date(), title: action.payload, completed: false },
        ],
      };

    case 'toggle':
      return {
        ...state,
        todos: switchCompleted(
          action.payload.id,
          action.payload.status,
          state.todos,
        ),
      };

    case 'delete':
      return {
        ...state,
        todos: deleteTodo(action.payload, state.todos),
      };

    default:
      return state;
  }
};

export const TodosContext = React.createContext(initialState);
export const DispatchContext
  = React.createContext((() => {}) as React.Dispatch<Action>);

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <TodosContext.Provider value={state}>
        {children}
      </TodosContext.Provider>
    </DispatchContext.Provider>
  );
};
