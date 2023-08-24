import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
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

  // відфільтрувати завдання відповідно до вибраного фільтра
  const filteredTodos = todos.filter(todo => {
    if (filter === Status.COMPLETED) {
      return todo.completed;
    }

    if (filter === Status.ACTIVE) {
      return !todo.completed;
    }

    return true;
  });

  //  оновлювати стан newTodo з текстом введеного завдання
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTodos(event.target.value);
  };

  // буде додавати нове завдання до списку
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

  // для додавання нового завдання під час натискання Enter:
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddTodo();
    }
  };

  // Для того щоб видалити завдання
  const deleteTodo = (id: number) => {
    const updateTodos = todos.filter(todo => todo.id !== id);

    setTodos(updateTodos);
  };

  // очистка завершених завдань
  const clearForm = () => {
    const incompleteTodos = todos.filter(todo => !todo.completed);

    setTodos(incompleteTodos);
  };

  // змінювати статус виконаності окремих завдань у списку
  const toggleCompleted = (id: number) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  //  перемикання статусу всіх завдань за допомогою toggleAll
  const toggleAllChange = () => {
    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: !toggleAll,
    }));

    setTodos(updatedTodos);
    setToggleAll(!toggleAll);
  };

  // редагування завдання в функцію editTodo
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
