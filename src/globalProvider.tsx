import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { FilterParams, Todo } from './types/types';
import { prepareTodoList } from './utils/prepareTodoList';

type EmptyFunc = () => void;
const emptyFunc: EmptyFunc = () => {};

interface InitialState {
  isAllTodoCompleted: boolean;
  isCompletedTodos: boolean;
  activeTodos: number;
  todoData: Todo[];
  hasTodo: boolean;
  filter: FilterParams;
  todoList: Todo[];
  deleteCompleted: () => void;
  handleUpdate: (normalizedTitle: string, id: number) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (currentId: number) => void;
  toggleAll: () => void;
  addTodo: (title: string) => void;
  setFilter: React.Dispatch<React.SetStateAction<FilterParams>>;
}

const initialState: InitialState = {
  isAllTodoCompleted: false,
  isCompletedTodos: false,
  activeTodos: 0,
  todoData: [],
  hasTodo: false,
  filter: FilterParams.All,
  todoList: [],
  deleteCompleted: emptyFunc,
  handleUpdate: emptyFunc,
  deleteTodo: emptyFunc,
  toggleTodo: emptyFunc,
  toggleAll: emptyFunc,
  addTodo: emptyFunc,
  setFilter: emptyFunc,
};

const TodoContext = createContext<InitialState>(initialState);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [todoData, setTodoData] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterParams>(FilterParams.All);

  useEffect(() => {
    const data = localStorage.getItem('todos');

    if (data === null) {
      setTodoData([]);

      return;
    }

    try {
      setTodoData(JSON.parse(data));
    } catch {
      setTodoData([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoData));
  }, [todoData]);

  const { activeTodos, isCompletedTodos, isAllTodoCompleted, hasTodo } =
    useMemo(
      () => ({
        activeTodos: todoData.filter(todo => !todo.completed).length,

        isCompletedTodos: todoData.some(todo => todo.completed),

        isAllTodoCompleted:
          todoData.length > 0 && todoData.every(todo => todo.completed),

        hasTodo: !!todoData.length,
      }),
      [todoData],
    );

  const addTodo = (title: string) => {
    const normalizedTitle = title.trim();

    const newTodo: Todo = {
      id: +new Date(),
      title: normalizedTitle,
      completed: false,
    };

    const newData = [...todoData, newTodo];

    setTodoData(newData);
  };

  const deleteTodo = (id: number) => {
    const newData = todoData.filter(todo => todo.id !== id);

    setTodoData(newData);
  };

  const handleUpdate = (normalizedTitle: string, id: number) => {
    const newData = todoData.map(todo =>
      todo.id === id ? { ...todo, title: normalizedTitle } : todo,
    );

    setTodoData(newData);
  };

  const toggleTodo = (currentId: number) => {
    const newData = todoData.map(todo =>
      todo.id === currentId ? { ...todo, completed: !todo.completed } : todo,
    );

    setTodoData(newData);
  };

  const deleteCompleted = () => {
    const newData = todoData.filter(todo => !todo.completed);

    setTodoData(newData);
  };

  const toggleAll = () => {
    const newStatus = !isAllTodoCompleted;

    const newData = todoData.map(todo => ({ ...todo, completed: newStatus }));

    setTodoData(newData);
  };

  const todoList = prepareTodoList(todoData, filter);

  const value = {
    isAllTodoCompleted,
    isCompletedTodos,
    activeTodos,
    todoData,
    hasTodo,
    filter,
    todoList,
    deleteCompleted,
    handleUpdate,
    deleteTodo,
    toggleTodo,
    toggleAll,
    addTodo,
    setFilter,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export const useTodoContext = () => useContext(TodoContext);
