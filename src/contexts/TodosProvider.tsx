import React, { useMemo, useReducer } from 'react';
import { Todo } from '../types/Todo';
import { TodoAction } from '../types/TodoAction';
import { FilterOptions } from '../types/FilterOptions';
import { useLocalStorage } from '../hooks/useLocalStorage';

type Props = {
  children: React.ReactNode,
};

type Action = {
  action: TodoAction,
  todo: Todo,
} | { action: TodoAction.ClearCompleted } | { action: FilterOptions };

interface State {
  todos: Todo[],
  filteredTodos: Todo[],
  filterOptions: FilterOptions,
}

function filterTodos(todos: Todo[], filterOpitons: FilterOptions) {
  switch (filterOpitons) {
    case FilterOptions.Active:
      return todos.filter(({ completed }) => !completed);

    case FilterOptions.Completed:
      return todos.filter(({ completed }) => completed);

    default:
      return [...todos];
  }
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
        filteredTodos: filterTodos(newTodos, state.filterOptions),
        todos: newTodos,
      };
    }

    case TodoAction.Delete: {
      const newTodos = state.todos.filter(currentTodo => ((
        currentTodo.id !== (rest as { todo: Todo }).todo.id)));

      return {
        ...state,
        filteredTodos: filterTodos(newTodos, state.filterOptions),
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
        filteredTodos: filterTodos(todoCopy, state.filterOptions),
        todos: todoCopy,
      };
    }

    case TodoAction.ClearCompleted: {
      const newTodos = filterTodos(state.todos, FilterOptions.Active);

      return {
        ...state,
        filteredTodos: filterTodos(newTodos, state.filterOptions),
        todos: newTodos,
      };
    }

    case FilterOptions.All:
      return {
        ...state,
        filterOptions: FilterOptions.All,
        filteredTodos: filterTodos(state.todos, FilterOptions.All),
      };

    case FilterOptions.Active:
      return {
        ...state,
        filterOptions: FilterOptions.Active,
        filteredTodos: filterTodos(state.todos, FilterOptions.Active),
      };

    case FilterOptions.Completed:
      return {
        ...state,
        filterOptions: FilterOptions.Completed,
        filteredTodos: filterTodos(state.todos, FilterOptions.Completed),
      };

    default:
      return state;
  }
}

export const TodosContext = React.createContext({
  todos: [] as Todo[],
  filteredTodos: [] as Todo[],
  filterOptions: FilterOptions.All,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dispatch: (_action: Action) => { },
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [localTodos, setLocalTodos] = useLocalStorage('todos', []);

  const [state, dispatch] = useReducer(reducer, {
    todos: localTodos,
    filteredTodos: localTodos,
    filterOptions: FilterOptions.All,
  });

  const value = useMemo(() => {
    setLocalTodos(state.todos);

    return {
      todos: state.todos,
      filteredTodos: state.filteredTodos,
      filterOptions: state.filterOptions,
      dispatch,
    };
  }, [state]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
