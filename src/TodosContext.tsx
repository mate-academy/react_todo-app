import React, { useState } from 'react';
import { Todo } from './services/types';
import { Filter } from './services/enums';

interface FilterParams {
  filterBy?: Filter,
}

function filterTodosByCompleted(todos: Todo[], filter: Filter): Todo[] {
  let todosCopy = [...todos];

  switch (filter) {
    case (Filter.ACTIVE): {
      todosCopy = todosCopy.filter(todo => !todo.completed);
      break;
    }

    case (Filter.COMPLETED): {
      todosCopy = todosCopy.filter(todo => todo.completed);
      break;
    }

    default: {
      break;
    }
  }

  return todosCopy;
}

function filterTodos(todos: Todo[], { filterBy }: FilterParams): Todo[] {
  let todosCopy = [...todos];

  if (filterBy) {
    todosCopy = filterTodosByCompleted(todos, filterBy);
  }

  return todosCopy;
}

function useLocalStorage<T>(key: string, startValue: T): [T, (v: T) => void] {
  const [value, setValue] = useState(startValue);

  const save = (newValue: T) => {
    localStorage.setItem(key, JSON.stringify(value));
    setValue(newValue);
  };

  return [value, save];
}

interface ContextProps {
  todos: Todo[],
  visibleTodos: Todo[],
  handleOnAdd: (newQuery: string) => void,
  handleAllCompletedToggle: (event: React.FormEvent<HTMLInputElement>) => void,
  handleClearAllCompleted: () => void,
  hanldeTodoChange: (newTodo: Todo) => void,
  hanldeOnDelete: (todoId: number) => void,
  isTodosHasCompleted: () => boolean,
  isEveryTodoCompleted: () => boolean,
  filterBy: Filter,
  setFilterBy: (newFilter: Filter) => void,
}

export const TodosContext = React.createContext<ContextProps>({
  todos: [],
  visibleTodos: [],
  handleOnAdd: () => {},
  handleAllCompletedToggle: () => {},
  handleClearAllCompleted: () => {},
  hanldeTodoChange: () => {},
  hanldeOnDelete: () => {},
  isTodosHasCompleted: () => false,
  isEveryTodoCompleted: () => false,
  filterBy: Filter.ALL,
  setFilterBy: () => {},
});

interface ProviderProps {
  children: React.ReactNode,
}

export const TodosProvider: React.FC<ProviderProps> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filterBy, setFilterBy] = useState(Filter.ALL);

  const visibleTodos = filterTodos(todos, { filterBy });

  const handleOnAdd = (newQuery: string) => {
    let newTodoId = 1;

    if (todos.length !== 0) {
      newTodoId = Math.max(...todos.map(todo => todo.id)) + 1;
    }

    const newTodo: Todo = {
      id: newTodoId,
      title: newQuery.trim(),
      completed: false,
    };

    const newTodos = [
      ...todos,
      newTodo,
    ];

    setTodos(newTodos);
  };

  const handleAllCompletedToggle
    = (event: React.FormEvent<HTMLInputElement>) => {
      const newTodos = [...todos].map(todo => {
        return {
          ...todo,
          completed: event.currentTarget.checked,
        };
      });

      setTodos(newTodos);
    };

  const handleClearAllCompleted = () => {
    const activeTodos = [...todos].filter(todo => !todo.completed);

    setTodos(activeTodos);
  };

  const hanldeTodoChange = (newTodo: Todo) => {
    const indexOfOldTodo = todos.findIndex(todo => {
      return todo.id === newTodo.id;
    });

    const newTodos = [...todos];

    newTodos.splice(indexOfOldTodo, 1, newTodo);

    setTodos(newTodos);
  };

  const hanldeOnDelete = (todoId: number) => {
    const indexOfTodoToDelete = todos.findIndex(todo => {
      return todo.id === todoId;
    });

    const newTodos = [...todos];

    newTodos.splice(indexOfTodoToDelete, 1);

    setTodos(newTodos);
  };

  const isTodosHasCompleted = () => {
    return todos.some(todo => todo.completed);
  };

  const isEveryTodoCompleted = () => {
    return todos.every(todo => todo.completed);
  };

  const value = {
    todos,
    visibleTodos,
    handleOnAdd,
    handleAllCompletedToggle,
    handleClearAllCompleted,
    hanldeTodoChange,
    hanldeOnDelete,
    isTodosHasCompleted,
    isEveryTodoCompleted,
    filterBy,
    setFilterBy,
  };

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
