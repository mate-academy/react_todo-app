import React, { useMemo, useReducer } from 'react';
import { Todo } from '../types/Todo';
import { TodoAction } from '../types/TodoAction';
import { FilterOptions } from '../types/FilterOptions';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface Props {
  children: React.ReactNode,
}

type Action = {
  action: TodoAction,
  todo: Todo,
} | { action: TodoAction.ClearCompleted } | { action: FilterOptions };

interface State {
  todos: Todo[],
  filterOptions: FilterOptions,
}

function reducer(
  state: State,
  { action, ...rest }: Action,
): State {
  switch (action) {
    case TodoAction.Add: {
      const newTodos = [...state.todos, (rest as { todo: Todo }).todo];

      return {
        ...state,
        todos: newTodos,
      };
    }

    case TodoAction.Delete: {
      const newTodos = state.todos.filter(currentTodo => ((
        currentTodo.id !== (rest as { todo: Todo }).todo.id)));

      return {
        ...state,
        todos: newTodos,
      };
    }

    case TodoAction.Update: {
      const todoCopy = [...state.todos];
      const editedTodoIndex
        = todoCopy.findIndex(currentTodo => (
          currentTodo.id === (rest as { todo: Todo }).todo.id));

      todoCopy[editedTodoIndex] = (rest as { todo: Todo }).todo;

      return {
        ...state,
        todos: todoCopy,
      };
    }

    case TodoAction.ClearCompleted: {
      return {
        ...state,
        todos: state.todos.filter(({ completed }) => !completed),
      };
    }

    default:
      return {
        ...state,
        filterOptions: action,
      };
  }
}

export const TodosContext = React.createContext({
  todos: [] as Todo[],
  filterOptions: FilterOptions.All,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dispatch: (_action: Action) => { },
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [localTodos, setLocalTodos] = useLocalStorage('todos', []);

  const [state, dispatch] = useReducer(reducer, {
    todos: localTodos,
    filterOptions: FilterOptions.All,
  });

  const value = useMemo(() => {
    setLocalTodos(state.todos);

    return {
      todos: state.todos,
      filterOptions: state.filterOptions,
      dispatch,
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
