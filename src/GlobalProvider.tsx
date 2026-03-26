import React, { useEffect } from 'react';
import { Todo } from './types/Todo';
import { Action } from './types/Action';
import { ActionTypes } from './types/ActionTypes';
import * as todoService from './service/todo.service';
import { addTodo, removeTodo } from './service/todo.service';
import { Filters } from './types/Filters';

type Props = { children: React.ReactNode };

const initialState = {
  todos: [],
  todosCount: 0,
  completedCount: 0,
  activeCount: 0,
  visibleTodos: [],
  filter: Filters.ALL,
  selectedTodoId: null,
};

type RootState = {
  todos: Todo[];
  todosCount: number;
  completedCount: number;
  activeCount: number;
  visibleTodos: Todo[];
  filter: Filters;
  selectedTodoId: number | null;
};

const StateContext = React.createContext<RootState>(initialState);
const DispatchContext = React.createContext<React.Dispatch<Action>>(() => {});

export const useDispatch = () => React.useContext(DispatchContext);
export const useStateValue = () => React.useContext(StateContext);

const getTodoCounts = (todos: Todo[]) => ({
  todosCount: todos.length,
  completedCount: todos.filter(todo => todo.completed).length,
  activeCount: todos.filter(todo => !todo.completed).length,
});

const filterTodos = (todos: Todo[], filter: Filters) => {
  return todos.filter(todo => {
    if (filter === Filters.ALL) {
      return true;
    }

    if (filter === Filters.ACTIVE) {
      return !todo.completed;
    }

    return todo.completed;
  });
};

const addTodoToState = (state: RootState, todo: Todo): RootState => {
  addTodo(todo);

  const newTodos = [...state.todos, todo];

  return {
    ...state,
    todos: newTodos,
    todosCount: state.todosCount + 1,
    activeCount: state.activeCount + 1,
    visibleTodos: filterTodos(newTodos, state.filter),
  };
};

const removeTodoFromState = (state: RootState, id: number): RootState => {
  const todoToRemove = state.todos.find(todo => todo.id === id);

  if (!todoToRemove) {
    return state;
  }

  removeTodo(id);
  const newTodos = state.todos.filter(todo => todo.id !== id);

  return {
    ...state,
    todos: newTodos,
    todosCount: state.todosCount - 1,
    completedCount: todoToRemove.completed
      ? state.completedCount - 1
      : state.completedCount,
    activeCount: todoToRemove.completed
      ? state.activeCount
      : state.activeCount - 1,
    visibleTodos: filterTodos(newTodos, state.filter),
  };
};

const updateTodoTitle = (state: RootState, todo: Todo) => {
  if (todo.title.trim() === '') {
    return removeTodoFromState(state, todo.id);
  }

  todoService.editTodo(todo);
  const newTodos = state.todos.map(t => (t.id === todo.id ? todo : t));

  return {
    ...state,
    todos: newTodos,
    visibleTodos: filterTodos(newTodos, state.filter),
  };
};

const updateTodoStatus = (state: RootState, id: number) => {
  todoService.toggleTodo(id);

  const updatedTodo = state.todos.find(todo => todo.id === id);

  if (!updatedTodo) {
    return state;
  }

  const updatedTodos = state.todos.map(t =>
    t.id === id ? { ...t, completed: !t.completed } : t,
  );
  const visible = filterTodos(updatedTodos, state.filter);

  return {
    ...state,
    todos: updatedTodos,
    completedCount: updatedTodo.completed
      ? state.completedCount - 1
      : state.completedCount + 1,
    activeCount: updatedTodo.completed
      ? state.activeCount + 1
      : state.activeCount - 1,
    visibleTodos: visible,
  };
};

const clearCompletedTodos = (state: RootState) => {
  const completedTodos = state.todos.filter(todo => todo.completed);

  completedTodos.forEach(todo => removeTodo(todo.id));
  const newTodos = state.todos.filter(todo => !todo.completed);

  return {
    ...state,
    todos: newTodos,
    completedCount: 0,
    todosCount: state.todosCount - completedTodos.length,
    visibleTodos: filterTodos(newTodos, state.filter),
  };
};

const setFilter = (state: RootState, filter: Filters) => {
  const visible = filterTodos(state.todos, filter);

  return {
    ...state,
    filter: filter,
    visibleTodos: visible,
  };
};

const handleToggleTodos = (state: RootState) => {
  const toUpdate: Todo[] = [];
  const isAllCompleted = state.todosCount === state.completedCount;
  const completed = !isAllCompleted;
  const todos = state.todos;

  if (isAllCompleted) {
    toUpdate.push(...todos);
  } else {
    toUpdate.push(...todos.filter(todo => !todo.completed));
  }

  toUpdate.forEach(todo => {
    todoService.editTodo({ id: todo.id, title: todo.title, completed });
  });

  const newTodos = todoService.getTodos();

  const counts = getTodoCounts(newTodos);

  return {
    ...state,
    todos: newTodos,
    todosCount: counts.todosCount,
    completedCount: counts.completedCount,
    activeCount: counts.activeCount,
    visibleTodos: filterTodos(newTodos, state.filter),
  };
};

const selectTodo = (state: RootState, payload: number | null) => {
  return {
    ...state,
    selectedTodoId: payload,
  };
};

const reducer = (state: RootState, action: Action) => {
  switch (action.type) {
    case ActionTypes.ADD_TODOS: {
      const todos = action.payload;
      const counts = getTodoCounts(todos);

      return {
        ...state,
        todos: state.todos.concat(todos),
        todosCount: state.todosCount + counts.todosCount,
        completedCount: state.completedCount + counts.completedCount,
        activeCount: state.activeCount + counts.activeCount,
        visibleTodos: state.visibleTodos.concat(todos),
      };
    }

    case ActionTypes.ADD_TODO:
      return addTodoToState(state, action.payload);

    case ActionTypes.REMOVE_TODO:
      return removeTodoFromState(state, action.payload);

    case ActionTypes.TOGGLE_TODO:
      return updateTodoStatus(state, action.payload);
    case ActionTypes.EDIT_TODO:
      return updateTodoTitle(state, action.payload);
    case ActionTypes.TOGGLE_ALL:
      return handleToggleTodos(state);
    case ActionTypes.CLEAR_COMPLETED:
      return clearCompletedTodos(state);
    case ActionTypes.SET_FILTER:
      return setFilter(state, action.payload);
    case ActionTypes.SELECT_TODO:
      return selectTodo(state, action.payload);
  }
};

export const GlobalProvider = ({ children }: Props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  useEffect(() => {
    const todos = todoService.getTodos();

    if (!todos.length) {
      return;
    }

    dispatch({ type: ActionTypes.ADD_TODOS, payload: todos });
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
