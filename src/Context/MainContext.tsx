/* eslint-disable @typescript-eslint/indent */
import React, { useReducer } from 'react';
import { Todo } from '../types/Todo';
import { title } from 'process';

type Props = {
  children: React.ReactNode;
};

type GlobalState = {
  todos: Todo[] | [];
  something: string;
};

type Action =
  | { type: 'todoAdd'; payload: Todo }
  | { type: 'todoDelete'; payload: Pick<Todo, 'id'> }
  | {
      type: 'todoUpdate';
      payload: {
        id: Todo['id'];
        title?: Todo['title'];
        completed?: Todo['completed'];
      };
    };

// const oooo: Todo[] = [
//   {
//     id: 0,
//     title: 'ksjbdj',
//     completed: false,
//   },
//   {
//     id: 1,
//     title: 'weewefwgeg',
//     completed: false,
//   },
// ];

// localStorage.setItem('todos', JSON.stringify(oooo));

const initialState: GlobalState = {
  todos: JSON.parse(localStorage.getItem('todos') ?? '[]'),
  something: '',
};

function reducer(state: GlobalState, action: Action): GlobalState {
  const { todos } = state;

  switch (action.type) {
    case 'todoAdd':
      const newTodo = action.payload;

      return { ...state, todos: [...todos, newTodo] };
    case 'todoDelete':
      const idForDelete = action.payload.id;
      const newTodos = todos.filter(todo => todo.id !== idForDelete);

      return { ...state, todos: newTodos };
    case 'todoUpdate':
      const idForUpdate = action.payload.id;

      const updatedTodos = todos.map(todo => {
        return todo.id !== idForUpdate
          ? todo
          : {
              ...todo,
              title: action.payload.title ? action.payload.title : todo.title,
              completed:
                action.payload.completed !== undefined
                  ? action.payload.completed
                  : todo.completed,
            };
      });

      return { ...state, todos: updatedTodos };
    default:
      return state;
  }
}

export const StateContext = React.createContext<GlobalState>(initialState);
export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);

const MainContext: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  if (state.todos.length === 2) {
    dispatch({
      type: 'todoAdd',
      payload: { id: 2, title: 'snjkdnskjdn', completed: false },
    });
    dispatch({
      type: 'todoUpdate',
      payload: { id: 0, completed: true },
    });
  }

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default MainContext;
