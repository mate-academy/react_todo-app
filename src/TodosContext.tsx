import React, { useState, useEffect } from 'react';

export type Todo = {
  title: string,
  id: number,
  completed: boolean,
  editing: boolean,
};

type Props = {
  children: React.ReactNode,
};

export const todos: Todo[] = [];

function prepareTodos(todosList: Todo[], status: string): Todo[] {
  return todosList.filter((todo) => {
    switch (status) {
      case 'completed':
        return todo.completed;
      case 'active':
        return !todo.completed;
      default:
        return true;
    }
  });
}

interface Context {
  newTodos: Todo[],
  newTodo: Todo,
  handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleOnSubmit: (event: React.FormEvent) => void,
  handleAllCompletedChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void,
  allCompleted: boolean,
  activeTodos: Todo[],
  handleClearCompleted: () => void,
  completedTodos: Todo[],
  myNewTodos: Todo[],
  setFilterBy: React.Dispatch<React.SetStateAction<string>>,
  filterBy: string,
  setNewTodos: (value: React.SetStateAction<Todo[]>) => void,
  setMyNewTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
}

export const TodosContext = React.createContext<Context>({
  newTodos: [],
  newTodo: {
    title: '',
    id: 0,
    completed: false,
    editing: false,
  },
  handleTitleChange: () => { },
  handleOnSubmit: () => { },
  handleAllCompletedChange: () => {},
  allCompleted: false,
  activeTodos: [],
  handleClearCompleted: () => {},
  completedTodos: [],
  myNewTodos: [],
  setFilterBy: () => {},
  filterBy: 'all',
  setNewTodos: () => {},
  setMyNewTodos: () => {},
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [newTodo, setNewTodo] = useState<Todo>({
    title: '',
    id: 0,
    completed: false,
    editing: false,
  });

  const [allCompleted, setAllCompleted] = useState(false);
  const [newTodos, setNewTodos] = useState(todos);
  const activeTodos = newTodos.filter(todo => !todo.completed);
  const completedTodos = newTodos.filter(todo => todo.completed);
  const [filterBy, setFilterBy] = useState('all');
  const [myNewTodos, setMyNewTodos] = useState(newTodos);

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

  const handleClearCompleted = () => {
    setNewTodos(activeTodos);

    if (activeTodos.length === 0) {
      setAllCompleted(false);
    } else {
      updateAllCompleted(activeTodos);
    }
  };

  useEffect(() => {
    setMyNewTodos(prepareTodos(newTodos, filterBy));
  }, [newTodos, filterBy]);

  const handleAllCompletedChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAllCompleted(event.target.checked);
    const updatedTodos = myNewTodos.map((todo) => ({
      ...todo,
      completed: event.target.checked,
    }));

    setNewTodos(updatedTodos);
    updateAllCompleted(updatedTodos);
  };

  return (
    <TodosContext.Provider
      value={{
        newTodos,
        handleTitleChange,
        newTodo,
        handleOnSubmit,
        handleAllCompletedChange,
        allCompleted,
        activeTodos,
        handleClearCompleted,
        completedTodos,
        myNewTodos,
        setFilterBy,
        filterBy,
        setNewTodos,
        setMyNewTodos,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
