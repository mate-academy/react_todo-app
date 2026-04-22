import React, { useReducer } from 'react';
import { Action } from '../types/ActionType';
import { TodosType } from '../types/TodosInterface';
import { FilterEnum } from '../types/FilterEnum';

interface State {
  todos: TodosType[];
  filter: FilterEnum;
}

function getInitialTodos() {
  const storage = localStorage.getItem('todos');

  if (!storage) {
    return [];
  }

  return JSON.parse(storage);
}

const initialState: State = {
  todos: getInitialTodos(),
  filter: FilterEnum.ALL,
};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);

function addTodo(state: State, title: string) {
  const newTodos: TodosType = {
    id: +new Date(),
    title: title.trim(),
    completed: false,
  };

  localStorage.setItem('todos', JSON.stringify([...state.todos, newTodos]));

  return [...state.todos, newTodos];
}

function deleteTodo(state: State, todosID: number) {
  const newTodos = state.todos.filter(
    (currentTodo: TodosType) => currentTodo.id !== todosID,
  );

  localStorage.setItem('todos', JSON.stringify(newTodos));

  return newTodos;
}

function updateTodos(state: State, updateTodo: TodosType, newTitle: string) {
  const index = [...state.todos].findIndex((currentTodo: TodosType) => {
    return currentTodo.id === updateTodo.id;
  });

  const newTodos: TodosType = {
    id: updateTodo.id,
    title: newTitle,
    completed: updateTodo.completed,
  };

  state.todos.splice(index, 1, newTodos);

  localStorage.setItem('todos', JSON.stringify(state.todos));

  return state.todos;
}

function completeTodos(state: State, todosID: number) {
  const newTodos = [...state.todos].map((currentTodos: TodosType) => {
    return currentTodos.id === todosID
      ? { ...currentTodos, completed: !currentTodos.completed }
      : currentTodos;
  });

  localStorage.setItem('todos', JSON.stringify(newTodos));

  return newTodos;
}

function deleteCopleted(state: State) {
  const newTodos = [...state.todos].filter(
    (currentTodos: TodosType) => currentTodos.completed === false,
  );

  localStorage.setItem('todos', JSON.stringify(newTodos));

  return newTodos;
}

function completeAll(state: State) {
  const isEveryActive = [...state.todos].some(
    (currentTodos: TodosType) => currentTodos.completed === false,
  );

  const isEveryCompleted = [...state.todos].some(
    (currentTodos: TodosType) => currentTodos.completed === true,
  );

  if (isEveryActive) {
    const everyCompletedTodos = [...state.todos].map(
      (currentTodos: TodosType) => {
        return { ...currentTodos, completed: true };
      },
    );

    localStorage.setItem('todos', JSON.stringify(everyCompletedTodos));

    return everyCompletedTodos;
  }

  if (isEveryCompleted) {
    const everyactiveTodos = [...state.todos].map((currentTodos: TodosType) => {
      return { ...currentTodos, completed: false };
    });

    localStorage.setItem('todos', JSON.stringify(everyactiveTodos));

    return everyactiveTodos;
  }

  const newTodos = [...state.todos].map((currentTodos: TodosType) => {
    return currentTodos.completed === false
      ? { ...currentTodos, completed: true }
      : { ...currentTodos };
  });

  localStorage.setItem('todos', JSON.stringify(newTodos));

  return newTodos;
}

function TodosReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        todos: addTodo(state, action.title),
      };
    case 'delete':
      return {
        ...state,
        todos: deleteTodo(state, action.todoID),
      };
    case 'update':
      return {
        ...state,
        todos: updateTodos(state, action.currentTodo, action.newTitle),
      };
    case 'complete':
      return {
        ...state,
        todos: completeTodos(state, action.todoID),
      };
    case 'filter':
      return {
        ...state,
        filter: action.filterType,
      };
    case 'deleteCompleted':
      return {
        ...state,
        todos: deleteCopleted(state),
      };
    case 'completeAll':
      return {
        ...state,
        todos: completeAll(state),
      };
    default:
      return state;
  }
}

interface Props {
  children: React.ReactNode;
}

export const GlobalTodosContext: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(TodosReducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
