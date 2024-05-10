import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { Todo } from './types/Todo';
import {
  FILTER_FIELD_ACTIVE,
  FILTER_FIELD_ALL,
  FILTER_FIELD_COMPLETED,
} from './tools/constants';

type ContextProps = {
  readyTodos: Todo[];
  title: string;
  setTitle: (title: string) => void;
  editedTitle: string;
  setEditedTitle: (newTitle: string) => void;
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  isHover: boolean;
  setIsHover: (isHover: boolean) => void;
  selectedTodo: Todo | null;
  setSelectedTodo: (todo: Todo | null) => void;
  filterField: string;
  setFilterField: (field: string) => void;
  notCompletedTodos: Todo[];
  addTodo: (newTodo: Todo) => void;
  updateTodo: (updatedTodo: Todo) => void;
  handleCompletedStatus: (todo: Todo) => void;
  handleAllCompleted: () => void;
  handleDelete: (todo: Todo) => void;
  handleDeleteCompleted: () => void;
  handleSubmit: (event: FormEvent) => void;
  titleField: React.MutableRefObject<HTMLInputElement | null> | null;
  editingTitleField: React.MutableRefObject<HTMLInputElement | null> | null;
  wasEdited: boolean;
  setWasEdited: (wasEdited: boolean) => void;
};

export const TodoContext = React.createContext<ContextProps>({
  readyTodos: [],
  title: '',
  setTitle: () => {},
  editedTitle: '',
  setEditedTitle: () => {},
  todos: [],
  setTodos: () => {},
  isHover: false,
  setIsHover: () => {},
  selectedTodo: null,
  setSelectedTodo: () => {},
  filterField: '',
  setFilterField: () => {},
  notCompletedTodos: [],
  addTodo: () => {},
  updateTodo: () => {},
  handleCompletedStatus: () => {},
  handleAllCompleted: () => {},
  handleDelete: () => {},
  handleDeleteCompleted: () => {},
  handleSubmit: () => {},
  titleField: null,
  editingTitleField: null,
  wasEdited: false,
  setWasEdited: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  function preparedTodos(todos: Todo[], filterField: string) {
    const readyTodos = [...todos];

    if (filterField) {
      switch (filterField) {
        case FILTER_FIELD_ALL:
          return readyTodos;

        case FILTER_FIELD_ACTIVE:
          return readyTodos.filter(todo => !todo.completed);

        case FILTER_FIELD_COMPLETED:
          return readyTodos.filter(todo => todo.completed);

        default:
          return readyTodos;
      }
    }

    return readyTodos;
  }

  const [title, setTitle] = useState('');
  const [editedTitle, setEditedTitle] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isHover, setIsHover] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterField, setFilterField] = useState('all');
  const notCompletedTodos = todos.filter(todo => !todo.completed);
  const [wasEdited, setWasEdited] = useState(false);

  const readyTodos = preparedTodos(todos, filterField);

  const titleField = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (titleField.current) {
      titleField.current.focus();
    }
  }, [todos]);

  const editingTitleField = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (editingTitleField.current) {
      editingTitleField.current.focus();
    }
  }, [selectedTodo]);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');

    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (newTodo: Todo) => {
    setTodos(currentTodos => [...currentTodos, newTodo]);
    setTitle('');
  };

  const updateTodo = (updatedTodo: Todo) => {
    setTodos(currentTodos => {
      const newTodos = [...currentTodos];
      const index = newTodos.findIndex(todo => todo.id === updatedTodo.id);

      newTodos.splice(index, 1, updatedTodo);

      return newTodos;
    });
    setSelectedTodo(null);
    setEditedTitle('');
  };

  const handleCompletedStatus = (currentTodo: Todo) => {
    setTodos(
      todos.map(todo => {
        if (todo.id === currentTodo.id) {
          return { ...todo, completed: !todo.completed };
        }

        return todo;
      }),
    );
  };

  const handleAllCompleted = () => {
    setTodos(
      todos.map(todo => {
        if (notCompletedTodos.length === 0) {
          return { ...todo, completed: false };
        }

        return { ...todo, completed: true };
      }),
    );
  };

  const handleDelete = (currentTodo: Todo) => {
    const newTodos = todos.filter(todo => todo.id !== currentTodo.id);

    setTodos(newTodos);
  };

  const handleDeleteCompleted = () => {
    const newTodos = todos.filter(todo => !todo.completed);

    setTodos(newTodos);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (selectedTodo) {
      if (!editedTitle.trim() && wasEdited) {
        handleDelete(selectedTodo);
      } else if (!editedTitle.trim() && !wasEdited) {
        setEditedTitle(selectedTodo.title);
        setSelectedTodo(null);
      } else {
        const updatedTodo = { ...selectedTodo, title: editedTitle.trim() };

        updateTodo(updatedTodo);
      }
    } else {
      if (!title.trim()) {
        return;
      }

      addTodo({
        id: +new Date(),
        title: title.trim(),
        completed: false,
      });
    }
  };

  const value = {
    readyTodos,
    title,
    setTitle,
    editedTitle,
    setEditedTitle,
    todos,
    setTodos,
    isHover,
    setIsHover,
    selectedTodo,
    setSelectedTodo,
    filterField,
    setFilterField,
    notCompletedTodos,
    addTodo,
    updateTodo,
    handleCompletedStatus,
    handleAllCompleted,
    handleDelete,
    handleDeleteCompleted,
    handleSubmit,
    titleField,
    editingTitleField,
    wasEdited,
    setWasEdited,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
