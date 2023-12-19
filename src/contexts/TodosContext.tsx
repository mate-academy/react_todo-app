import React, { createContext, useReducer } from 'react';

interface ITodo {
  id: number;
  completed: boolean;
  title: string;
}

type InitialStateType = {
  todos: ITodo[];
  filteredTodos: ITodo[];
};

const initialState = {
  todos: [],
  filteredTodos: [],
};

type Action = { type: 'ADD_TODO_ITEM'; title: string } |
{ type: 'REMOVE_TODO_ITEM', id: number } |
{ type: 'MARK_ALL_AS_COMPLETED' } |
{ type: 'MARK_ALL_AS_UNCOMPLETED' } |
{ type: 'MARK_TASK_AS_COMPLETED', id: number } |
{ type: 'SAVE_EDITED_TITLE', title: string, titleId: number } |
{ type: 'SHOW_ALL_TASKS' } |
{ type: 'SHOW_ACTIVE_TASKS', filter: 'Active_Tasks' } |
{ type: 'SHOW_COMPLETED_TASKS', filter: 'Completed_Tasks' } |
{ type: 'CLEAR_COMPLETED' };

export const todosReducer = (state: InitialStateType, action: Action) => {
  switch (action.type) {
    case 'ADD_TODO_ITEM':
      return {
        ...state,
        todos: state.todos.concat({
          title: action.title,
          completed: false,
          id:
            state.todos.length > 0
              ? Math.max(...state.todos.map((elem) => elem.id)) + 1
              : 1,
        }),
      };

    case 'SAVE_EDITED_TITLE':
      return {

        ...state,
        todos: state.todos.map((todo) => (
          todo.id === action.titleId
            ? { ...todo, title: action.title }
            : todo
        )),
      };

    case 'REMOVE_TODO_ITEM':

      return {
        ...state,
        todos: state.todos.filter((todoItem) => todoItem.id !== action.id),
      };

    case 'MARK_TASK_AS_COMPLETED':
      return {
        ...state,
        todos: state.todos.map((todo) => (
          todo.id === action.id ? {
            ...todo,
            completed: !todo.completed,
          } : todo)),

      };

    case 'MARK_ALL_AS_COMPLETED':

      return {
        ...state,
        todos: state.todos
          .map((todo) => ({
            ...todo,
            completed: true,
          })),
      };

    case 'MARK_ALL_AS_UNCOMPLETED':

      return {
        ...state,
        todos: state.todos
          .map((todo) => ({
            ...todo,
            completed: false,
          })),
      };

    case 'SHOW_ACTIVE_TASKS':
      const filterActiveTasks = action.filter;

      return {
        ...state,
        todos: filterActiveTasks,
      };

    case 'SHOW_COMPLETED_TASKS':
      const filterCompletedTasks = action.filter;

      return {
        ...state,
        todos: filterCompletedTasks,
      };

    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.completed === false),
      };

    default:
      return state;
  }
};

export const TodosContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const Provider: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(todosReducer, initialState);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};
