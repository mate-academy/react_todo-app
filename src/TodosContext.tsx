import React, { useReducer, useState } from 'react';

export type Todo = {
  title: string,
  id: number,
  completed: boolean,
};

type Props = {
  children: React.ReactNode,
};

export const todos: Todo[] = [];

interface Action {
  type: string,
}

function reducer(state: Todo[], action: Action) {
  switch (action.type) {
    case 'all':
      return state;
    case 'completed':
      return state.filter(todo => (todo.completed === true));
    case 'active':
      return state.filter(todo => (todo.completed === false));
    default:
      return state;
  }
}

interface Context {
  newTodos: Todo[],
  newTodo: Todo,
  handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleOnSubmit: (event: React.FormEvent) => void,
  handleCompletedChange: (id: number) => void,
  handleTodoDelete: (id: number) => void,
  handleAllCompletedChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void,
  allCompleted: boolean,
  activeTodos: Todo[],
  handleClearCompleted: () => void,
  completedTodos: Todo[],
  handleFilterChange: (filterType: string) => void,
  handleFilterClick: (
    filterType: string,
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => void
}

export const TodosContext = React.createContext<Context>({
  newTodos: [],
  newTodo: {
    title: '',
    id: 0,
    completed: false,
  },
  handleTitleChange: () => { },
  handleOnSubmit: () => { },
  handleCompletedChange: () => { },
  handleTodoDelete: () => { },
  handleAllCompletedChange: () => {},
  allCompleted: false,
  activeTodos: [],
  handleClearCompleted: () => {},
  completedTodos: [],
  handleFilterChange: () => {},
  handleFilterClick: () => {},
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [newTodo, setNewTodo] = useState<Todo>({
    title: '',
    id: 0,
    completed: false,
  });

  const [allCompleted, setAllCompleted] = useState(false);

  const [newTodos, setNewTodos] = useState(todos);

  const activeTodos = newTodos.filter(todo => !todo.completed);

  const completedTodos = newTodos.filter(todo => todo.completed);

  const [, dispatch] = useReducer(reducer, newTodos);

  const handleFilterChange = (filterType: string) => {
    switch (filterType) {
      case 'all':
        dispatch({ type: 'all' });
        break;
      case 'completed':
        dispatch({ type: 'completed' });
        break;
      case 'active':
        dispatch({ type: 'active' });
        break;
      default:
        break;
    }
  };

  const handleFilterClick = (
    filterType: string,
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    event.preventDefault();
    handleFilterChange(filterType);
  };

  const updateAllCompleted = (todosList: Todo[]) => {
    const allTodosCompleted = todosList.every((todo) => todo.completed);

    setAllCompleted(allTodosCompleted);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo({
      ...newTodo,
      title: event.target.value,
    });
  };

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setNewTodos([...newTodos, newTodo]);

    setNewTodo({
      ...newTodo,
      title: '',
      id: +new Date(),
    });
  };

  const handleTodoDelete = (id: number) => {
    const filteredTodos = newTodos.filter((todo) => todo.id !== id);

    setNewTodos(filteredTodos);

    if (filteredTodos.length === 0) {
      setAllCompleted(false);
    } else {
      updateAllCompleted(filteredTodos);
    }
  };

  const handleCompletedChange = (id: number) => {
    const updatedTodos = newTodos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    });

    setNewTodos(updatedTodos);
    updateAllCompleted(updatedTodos);
  };

  const handleAllCompletedChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAllCompleted(event.target.checked);
    const updatedTodos = newTodos.map((todo) => ({
      ...todo,
      completed: event.target.checked,
    }));

    setNewTodos(updatedTodos);
    updateAllCompleted(updatedTodos);
  };

  const handleClearCompleted = () => {
    setNewTodos(activeTodos);

    if (activeTodos.length === 0) {
      setAllCompleted(false);
    } else {
      updateAllCompleted(activeTodos);
    }
  };

  return (
    <TodosContext.Provider
      value={{
        newTodos,
        handleTitleChange,
        newTodo,
        handleOnSubmit,
        handleCompletedChange,
        handleTodoDelete,
        handleAllCompletedChange,
        allCompleted,
        activeTodos,
        handleClearCompleted,
        completedTodos,
        handleFilterChange,
        handleFilterClick,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
