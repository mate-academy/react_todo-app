import React, {
  ChangeEvent,
  useState,
  KeyboardEvent,
  useMemo,
} from 'react';
import { Todo } from '../types/Todo';
import { Status } from '../services/Status';
import { useLocalStorage } from '../services/localStorage';
import { editTodoFunction } from '../types/EditTodoFunction';

type TodoContext = {
  todos: Todo[];
  setTodos: (value: Todo[]) => void;
  toggleAll: boolean;
  setToggleAll: (status: boolean) => void;
  filter: Status;
  setFilter: React.Dispatch<React.SetStateAction<Status>>;
  filteredTodos: Todo[];
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddTodo: () => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  deleteTodo: (id: number) => void;
  clearForm: () => void;
  toggleCompleted: (id: number) => void;
  toggleAllChange: () => void;
  editTodo: editTodoFunction;
  newTodos: string;
  setNewTodos: React.Dispatch<React.SetStateAction<string>>;
};

type Props = {
  children: React.ReactNode;
};

export const TodosContext = React.createContext<TodoContext>({
  todos: [],
  setTodos: () => {},
  toggleAll: false,
  setToggleAll: () => {},
  filter: Status.ALL,
  setFilter: () => {},
  filteredTodos: [],
  handleInputChange: () => {},
  handleAddTodo: () => {},
  handleKeyDown: () => {},
  deleteTodo: () => {},
  clearForm: () => {},
  toggleCompleted: () => {},
  toggleAllChange: () => {},
  editTodo: () => {},
  newTodos: '',
  setNewTodos: () => {},
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage('todos', [] as Todo[]);
  const [filter, setFilter] = useState(Status.ALL);
  const [toggleAll, setToggleAll] = useState(false);
  const [newTodos, setNewTodos] = useState('');

  // Filtrate the task according to the selected filter
  const filteredTodos = useMemo(() => {
    if (filter === Status.COMPLETED) {
      return todos.filter(todo => todo.completed);
    }

    if (filter === Status.ACTIVE) {
      return todos.filter(todo => !todo.completed);
    }

    return todos;
  }, [todos, filter]);

  // Update NewTodo Status with Text Task Text
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTodos(event.target.value);
  };

  // will add a new task to the list
  const handleAddTodo = () => {
    if (newTodos.trim() !== '') {
      const newTask = {
        id: +new Date(),
        title: newTodos,
        completed: false,
      };

      setTodos([...todos, newTask]);
      setNewTodos('');
    }
  };

  // To add a new task while pressing Enter:
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddTodo();
    }
  };

  // To delete the task
  const deleteTodo = (id: number) => {
    const updateTodos = todos.filter(todo => todo.id !== id);

    setTodos(updateTodos);
  };

  // Cleaning the completed tasks
  const clearForm = () => {
    const incompleteTodos = todos.filter(todo => !todo.completed);

    setTodos(incompleteTodos);
  };

  // change the status of the performance of individual tasks in the list
  const toggleCompleted = (id: number) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  // Switching the status of all tasks using Toggleall
  const toggleAllChange = () => {
    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: !toggleAll,
    }));

    setTodos(updatedTodos);
    setToggleAll(!toggleAll);
  };

  // Editing the task in the EditTodo function
  const editTodo: editTodoFunction = (id, newTitle) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, title: newTitle };
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  const todoState = {
    todos,
    setTodos,
    toggleAll,
    setToggleAll,
    filter,
    setFilter,
    filteredTodos,
    handleInputChange,
    handleKeyDown,
    handleAddTodo,
    deleteTodo,
    clearForm,
    toggleCompleted,
    toggleAllChange,
    editTodo,
    newTodos,
    setNewTodos,
  };

  return (
    <TodosContext.Provider value={todoState}>{children}</TodosContext.Provider>
  );
};
