import React, { useReducer } from 'react';

export type State = {
  todoList: { id: number; completed: boolean; title: string }[];
};

type Props = {
  children: React.ReactNode;
};

type Action =
  { type: 'ADD_TODO_ITEM', todoItemTitle: string } |
  { type: 'REMOVE_TODO_ITEM', todoItemId: number } |
  { type: 'TOGGLE_COMPLETED', todoItemId: number };

export type AddItem = {
  (todoItemTitle: string): void
};

const initialState: State = {
  todoList: [],
};

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'ADD_TODO_ITEM':
      return {
        todoList: [
          ...state.todoList,
          {
            id: new Date().valueOf(),
            completed: false,
            title: action.todoItemTitle,
          },
        ],
      };
    case 'REMOVE_TODO_ITEM': {
      const filteredItems = state.todoList.filter((todoItem) => {
        return todoItem.id !== action.todoItemId;
      });

      return {
        todoList: filteredItems,
      };
    }

    case 'TOGGLE_COMPLETED': {
      const updatedTodoList = state.todoList.map((todoItem) => {
        return todoItem.id === action.todoItemId
          ? { ...todoItem, completed: !todoItem.completed }
          : todoItem;
      });

      return { todoList: updatedTodoList };
    }

    default: return state;
  }
};

export const TodosContext = React.createContext(initialState);

export const Provider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    todoList: state.todoList,
    addItem: (todoItemTitle: string) => {
      dispatch({ type: 'ADD_TODO_ITEM', todoItemTitle });
    },
    removeItem: ((todoItemId: number) => {
      dispatch({ type: 'REMOVE_TODO_ITEM', todoItemId });
    }),
    markAsCompleted: ((todoItemId: number) => {
      dispatch({ type: 'TOGGLE_COMPLETED', todoItemId });
    }),
  };

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
