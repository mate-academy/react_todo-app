import React from 'react';
import { Todo } from '../types/Todo';
import { FILTER_TYPE } from '../constants';
import { FilterType } from '../types/FilterType';
import { TodoContextType } from '../types/TodoContextType';

export const TodoContext = React.createContext<TodoContextType>({
  todos: [],
  setTodos: () => {},
  todoTitle: '',
  filterBy: FILTER_TYPE.ALL,
  setFilterBy: () => {},
  filteredTodos: [],
  setTodoTitle: () => {},
  handleToggleAll: () => { },
  handleUpdatedTodos: () => {},
  handleClearCompletedTodos: () => {},
  handleTodoSubmission: () => {},
  handleTodoToggle: () => {},
  handleDeleteTodo: () => {},
});

const initialTodos = () => {
  const storedTodos = localStorage.getItem('todos');

  if (storedTodos) {
    return JSON.parse(storedTodos);
  }

  return [];
};

export const TodoContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [todos, setTodos] = React.useState<Todo[]>(initialTodos());
  const [todoTitle, setTodoTitle] = React.useState<string>('');
  const [filterBy, setFilterBy] = React.useState<FilterType>(FILTER_TYPE.ALL);

  React.useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = React.useMemo(() => {
    switch (filterBy) {
      case FILTER_TYPE.ACTIVE:
        return todos.filter(todo => !todo.completed);
      case FILTER_TYPE.COMPLETED:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filterBy]);

  const handleTodoSubmission = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!todoTitle.trim()) {
      return;
    }

    const newTodo = {
      id: +new Date(),
      title: todoTitle.trim(),
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setTodoTitle('');
  };

  const handleToggleAll = () => {
    setTodos(prevTodos => {
      const completed = !prevTodos.every(todo => todo.completed);

      return prevTodos.map(todo => ({ ...todo, completed }));
    });
  };

  const handleTodoToggle = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleClearCompletedTodos = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleUpdatedTodos = (id: number, trimedTodoTitle: string) => {
    const updatedTodos = todos.map(td => {
      if (td.id === id) {
        return { ...td, title: trimedTodoTitle };
      }
      return td;
    });

    setTodos(updatedTodos);
  };

  const contextValue = {
    todos,
    setTodos,
    filterBy,
    setFilterBy,
    filteredTodos,
    todoTitle,
    setTodoTitle,
    handleToggleAll,
    handleUpdatedTodos,
    handleTodoSubmission,
    handleTodoToggle,
    handleClearCompletedTodos,
    handleDeleteTodo,
  };

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};
