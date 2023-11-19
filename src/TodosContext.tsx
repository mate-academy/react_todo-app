import React, { useCallback, useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { TyChangeEvtInputElmt, TySetState } from './types/General';

type TodosContextProps = {
  addTodo: (newTodo: Todo) => void,
  deleteTodo: (todoId: Todo['id']) => void,
  updateTodo: (updatedTodo: Todo) => void,
  filter: Filter,
  setFilter: TySetState<Filter>,
  visibleTodos: Todo[],
  activeTodos: Todo[],
  isAnyTodo: boolean,
  isEachTodoComplete: boolean,
  isAnyTodoComplete: boolean,
  handleAllTodosComplete: (event: TyChangeEvtInputElmt) => void,
  handleRemoveTodosComplete: () => void,
};

export const TodosContext
  = React.createContext<TodosContextProps>({
    addTodo: () => { },
    deleteTodo: () => { },
    updateTodo: () => { },
    filter: Filter.ALL,
    setFilter: () => { },
    visibleTodos: [],
    activeTodos: [],
    isAnyTodo: false,
    isEachTodoComplete: false,
    isAnyTodoComplete: false,
    handleAllTodosComplete: () => { },
    handleRemoveTodosComplete: () => { },
  });

function getPraperedTodos(
  todos: Todo[],
  filter: Filter,
): Todo[] {
  return todos.filter(todo => {
    switch (filter) {
      case Filter.ACTIVE:
        return !todo.completed;

      case Filter.COMPLETED:
        return todo.completed;

      case Filter.ALL:
      default:
        return true;
    }
  });
}

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useState<Filter>(Filter.ALL);
  const visibleTodos = getPraperedTodos(todos, filter);
  const activeTodos = getPraperedTodos(todos, Filter.ACTIVE);
  const isAnyTodo = !!todos.length;
  const isEachTodoComplete
    = isAnyTodo && todos.every(todo => todo.completed);
  const isAnyTodoComplete = todos.some(todo => todo.completed);

  // #region TODOS_PROVIDER_INTERFACE
  const addTodo = useCallback((newTodo: Todo): void => {
    setTodos(
      [...todos, newTodo],
    );
  }, [todos, setTodos]);

  const deleteTodo = useCallback((todoId: Todo['id']): void => {
    setTodos(
      [...todos].filter(todo => todo.id !== todoId),
    );
  }, [todos, setTodos]);

  const updateTodo = useCallback((updatedTodo: Todo): void => {
    setTodos(
      todos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)),
    );
  }, [todos, setTodos]);
  // #endregion

  // #region HANDLER
  const handleAllTodosComplete = (event: TyChangeEvtInputElmt) => {
    setTodos(todos.map(
      todo => ({ ...todo, completed: event.target.checked }),
    ));
  };

  const handleRemoveTodosComplete = () => {
    setTodos([...todos].filter(
      todo => !todo.completed,
    ));
  };
  // #endregion

  const value = {
    addTodo,
    deleteTodo,
    updateTodo,
    filter,
    setFilter,
    visibleTodos,
    activeTodos,
    isAnyTodo,
    isEachTodoComplete,
    isAnyTodoComplete,
    handleAllTodosComplete,
    handleRemoveTodosComplete,
  };

  return (
    <TodosContext.Provider
      value={value}
    >
      {children}
    </TodosContext.Provider>
  );
};
