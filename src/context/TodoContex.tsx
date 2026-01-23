import {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react';
import { Todo } from '../types/Todo';

type TodoContextType = {
  todoList: Todo[];
  inputRef: React.RefObject<HTMLInputElement>;
  editedTodo: number | null;
  updateTodo: (todo: Todo) => void;
  addTodo: (todoTitle: string) => void;
  deleteTodo: (todo: Todo) => void;
  removeCompletedTodos: () => void;
  toggleAll: () => void;
  setEditingTodo: (id: number) => void;
  exitEditingTodo: () => void;
  filteredTodos: { todosCompleted: Todo[]; todosNotCompleted: Todo[] };
};

export const TodoContext = createContext<TodoContextType>({
  todoList: [],
  inputRef: { current: null },
  editedTodo: null,
  updateTodo: () => {},
  addTodo: () => {},
  deleteTodo: () => {},
  removeCompletedTodos: () => {},
  toggleAll: () => {},
  setEditingTodo: () => {},
  exitEditingTodo: () => {},
  filteredTodos: { todosCompleted: [], todosNotCompleted: [] },
});

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todoList, setTodoList] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem('todos');

    if (storedTodos !== null) {
      return JSON.parse(storedTodos);
    } else {
      return [];
    }
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const [editedTodo, setEditedTodo] = useState<number | null>(null);
  const filteredTodos = useMemo(() => {
    const todosCompleted = todoList.filter(todo => todo.completed === true);
    const todosNotCompleted = todoList.filter(todo => todo.completed === false);

    return { todosCompleted, todosNotCompleted };
  }, [todoList]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoList));
  }, [todoList]);

  function addTodo(todoTitle: string) {
    const trimmedTitle = todoTitle.trim();

    if (!trimmedTitle) {
      return;
    }

    const newTodo: Todo = {
      title: trimmedTitle,
      completed: false,
      id: Date.now(),
    };

    setTodoList(prev => [...prev, newTodo]);
  }

  function deleteTodo(todo: Todo) {
    setTodoList(prev => prev.filter(removed => todo.id !== removed.id));

    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  }

  function updateTodo(newTodo: Todo) {
    const trimmedTitle = newTodo.title.trim();

    if (!trimmedTitle) {
      deleteTodo(newTodo);

      return;
    }

    setTodoList(prev =>
      prev.map(todo =>
        todo.id === newTodo.id ? { ...newTodo, title: trimmedTitle } : todo,
      ),
    );
  }

  function removeCompletedTodos() {
    setTodoList(prev => prev.filter(todo => todo.completed === false));

    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  }

  function toggleAll() {
    setTodoList(prev => {
      const completed = !prev.every(t => t.completed);

      return prev.map(todo => ({ ...todo, completed }));
    });
  }

  function setEditingTodo(id: number) {
    setEditedTodo(id);
  }

  function exitEditingTodo() {
    setEditedTodo(null);
  }

  const todoValue = {
    todoList,
    inputRef,
    editedTodo,
    updateTodo,
    addTodo,
    deleteTodo,
    removeCompletedTodos,
    toggleAll,
    setEditingTodo,
    exitEditingTodo,
    filteredTodos,
  };

  return (
    <TodoContext.Provider value={todoValue}>{children}</TodoContext.Provider>
  );
}
