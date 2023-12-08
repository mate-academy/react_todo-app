import React, {
  useMemo, useState,
} from 'react';
import { useLocalStorage } from './LocaleStorageHooksg/LocaleStorageHooks';
import { ContextType } from './types/ContextType';
import { Position } from './types/Position';
import { Todo } from './types/Todo';

export const TodosContext = React.createContext<ContextType>({
  todos: [],
  title: '',
  filteredTodos: [],
  filt: '',
  setTodos: () => {},
  handleTitleChange: () => {},
  handleAddTodo: () => {},
  handleDelete: () => {},
  handleEnter: () => {},
  setFilt: () => {},
  toggled: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[] | []>('todos', []);
  const [title, setTitle] = useState('');
  const [filt, setFilt] = useState<Position>(Position.All);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleAddTodo = (event: React.KeyboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (title.trim() === '') {
      setTitle('');
    } else {
      setTodos([
        ...todos,
        { id: +new Date(), title, completed: false },
      ]);
      setTitle('');
    }
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddTodo(event);
    }
  };

  const handleDelete = useMemo(() => {
    return (id: number) => {
      const newTodos = todos.filter((todo: { id: number; }) => todo.id !== id);

      setTodos(newTodos);
    };
  }, [todos, setTodos]);

  const toggled = (id: number) => {
    const done = todos.map((item: Todo) => {
      if (item.id === id) {
        const newItem = { ...item, completed: !item.completed };

        return newItem;
      }

      return item;
    });

    setTodos(done);
  };

  const filteredTodos = todos.filter((todo: { completed: boolean; }) => {
    switch (filt) {
      case Position.Active:
        return !todo.completed;
      case Position.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  const value = {
    todos,
    title,
    filteredTodos,
    filt,
    setTodos,
    handleTitleChange,
    handleAddTodo,
    handleDelete,
    handleEnter,
    setFilt,
    toggled,
  };

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
