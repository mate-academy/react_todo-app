import React, {
  useEffect, useMemo, useState,
} from 'react';
import { ContextType } from './types/ContextType';
import { Todo } from './types/Todo';

enum Position {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export const TodosContext = React.createContext<ContextType>({
  todos: [],
  title: '',
  filteredTodos: [],
  filt: '',
  Position,
  setTodos: () => {},
  handleTitleChange: () => {},
  handleAddTodo: () => {},
  handleDelete: () => {},
  handleInputChange: () => {},
  handleEnter: () => {},
  setFilt: () => {},
  toggled: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[] | []>([]);
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
      setTodos((allTodos) => [
        ...allTodos,
        { id: +new Date(), title, completed: false },
      ]);
      setTitle('');
    }
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleAddTodo(event);
    }
  };

  const handleDelete = useMemo(() => {
    return (id: number) => {
      const newTodos = todos.filter((todo) => todo.id !== id);

      setTodos(newTodos);
    };
  }, [todos]);

  const handleInputChange = (updatedTodo: Todo) => {
    console.log('typed', updatedTodo);
    setTodos(currentTodos => {
      const newTodos = [...currentTodos];
      const found = newTodos.findIndex(item => item.id === updatedTodo.id);

      newTodos.splice(found, 1, updatedTodo);

      return newTodos;
    });
  };

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

  const filteredTodos = todos.filter((todo) => {
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
    Position,
    setTodos,
    handleTitleChange,
    handleAddTodo,
    handleDelete,
    handleInputChange,
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
