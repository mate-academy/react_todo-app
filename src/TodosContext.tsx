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

function getTodosFromLocalStorage() {
  const todos = localStorage.getItem('todos');

  if (todos === null) {
    localStorage.setItem('todos', JSON.stringify([]));

    return [];
  }

  return JSON.parse(todos);
}

function setTodosInLocalStorage(todos: Todo[]) {
  localStorage.setItem('todos', JSON.stringify(todos));
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
  const [todos, setTodos] = useState<Todo[]>(getTodosFromLocalStorage());
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
    setTodosInLocalStorage(newTodos);
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
      setTodosInLocalStorage(newTodos);
    };

  const handleClearAllCompleted = () => {
    const activeTodos = [...todos].filter(todo => !todo.completed);

    setTodos(activeTodos);
    setTodosInLocalStorage(activeTodos);
  };

  const hanldeTodoChange = (newTodo: Todo) => {
    const indexOfOldTodo = todos.findIndex(todo => {
      return todo.id === newTodo.id;
    });

    const newTodos = [...todos];

    newTodos.splice(indexOfOldTodo, 1, newTodo);

    setTodos(newTodos);
    setTodosInLocalStorage(newTodos);
  };

  const hanldeOnDelete = (todoId: number) => {
    const indexOfTodoToDelete = todos.findIndex(todo => {
      return todo.id === todoId;
    });

    const newTodos = [...todos];

    newTodos.splice(indexOfTodoToDelete, 1);

    setTodos(newTodos);
    setTodosInLocalStorage(newTodos);
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
