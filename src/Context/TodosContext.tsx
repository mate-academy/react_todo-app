import {
  FormEvent,
  ReactNode,
  createContext, useCallback, useContext, useEffect, useState,
} from 'react';
import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

interface TodosContextInterface {
  todos: Todo[];
  setTodos(todos: Todo[]): void;
  createNewTodo(event: FormEvent): void;
  messageError: string;
  setMessageError(message: string): void;
  value: string;
  setValue(text: string): void;
  tempTodo: Todo | null;
  handleToggleComplete(): void;
  loading: boolean;
  setLoading(load: boolean): void;
  handleDeleteTodo(todo: Todo): void;
  handleDeleteCompleted(): void;
  handleClickCheck(todo: Todo): void;
  editTitle(id: number, title: string): void;
}

export const TodosContext = createContext<TodosContextInterface>(
  {
    todos: [],
    setTodos: () => { },
    createNewTodo: () => { },
    messageError: '',
    setMessageError: () => { },
    value: '',
    setValue: () => { },
    tempTodo: null,
    handleToggleComplete: () => { },
    loading: false,
    setLoading: () => { },
    handleDeleteTodo: () => { },
    handleDeleteCompleted: () => { },
    handleClickCheck: () => { },
    editTitle: () => { },
  },
);

export const TodosConstextProvider = (
  { children }: {
    children: ReactNode
  },
) => {
  const [messageError, setMessageError] = useState('');
  const [value, setValue] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(false);

  const USER_ID = 10529;
  const url = `/todos?userId=${USER_ID}`;

  if (messageError) {
    setTimeout(() => setMessageError(''), 3000);
  }

  useEffect(() => {
    client.get<Todo[]>(url).then(response => {
      return setTodos(response);
    }).catch(() => setMessageError('Unable loading todos'));
  }, [tempTodo, todos]);

  const createNewTodo = useCallback((event: FormEvent) => {
    event.preventDefault();

    if (!value) {
      setMessageError('Title can\'t be empty');
    } else {
      const newTodo: Todo = {
        id: 0,
        title: value,
        userId: USER_ID,
        completed: false,
      };

      setTempTodo(newTodo);

      client.post(url, newTodo).then(() => {
        setValue('');
        setTempTodo(null);
        setMessageError('');
      }).catch(() => {
        setMessageError('Unable to add a todo');
      });
    }
  }, [value]);

  const handleToggleComplete = useCallback(() => {
    setLoading(true);
    const newTodos = todos.map(async todo => {
      let newTodo: Todo;
      const { id, title, userId } = todo;

      if (todos.find(tod => !tod.completed)) {
        newTodo = {
          id,
          title,
          userId,
          completed: true,
        };
      } else {
        newTodo = {
          id,
          title,
          userId,
          completed: false,
        };
      }

      const data = {
        completed: newTodo.completed,
      };
      const urlId = `/todos/${newTodo.id}?userId=${USER_ID}`;

      const patchedTodo = await client.patch(urlId, data)
        .catch(() => setMessageError('Unable to update a todo'));

      return patchedTodo;
    });

    setLoading(false);

    return newTodos;
  }, [todos]);

  const handleDeleteCompleted = useCallback(() => {
    const filterdTodos = todos
      .map(todo => {
        if (todo.completed) {
          const uniqUrl = `/todos/${todo.id}?userId=${USER_ID}`;

          return client.delete(uniqUrl)
            .catch(() => setMessageError('Unable to delete a todo'));
        }

        return todo;
      });

    return filterdTodos;
  }, [todos]);

  const handleDeleteTodo = useCallback(async (todo: Todo) => {
    const urlId = `/todos/${todo.id}?userId=${USER_ID}`;

    try {
      return await client.delete(urlId);
    } catch {
      return setMessageError('Unable to delete a todo');
    }
  }, [todos]);

  const handleClickCheck = useCallback(async (todo: Todo) => {
    setLoading(true);
    const { id } = todo;
    const urlId = `/todos/${id}?userId=${USER_ID}`;
    let data;

    if (todo.completed === false) {
      data = { completed: true };
    } else {
      data = { completed: false };
    }

    setLoading(false);

    try {
      return await client.patch(urlId, data);
    } catch {
      return setMessageError('Unable to update a todo');
    }
  }, [todos]);

  const editTitle = useCallback((id: number, title: string) => {
    if (title.trim() === '') {
      const findEmptyTitle = todos.find(todo => todo.id === id);

      return findEmptyTitle && handleDeleteTodo(findEmptyTitle);
    }

    const urlId = `/todos/${id}?userId=${USER_ID}`;
    const data = { title };

    return client.patch(urlId, data)
      .catch(() => setMessageError('Unable to update a todo'));
  }, [todos]);

  return (
    <TodosContext.Provider value={{
      todos,
      setTodos,
      createNewTodo,
      value,
      setValue,
      messageError,
      setMessageError,
      tempTodo,
      handleToggleComplete,
      loading,
      setLoading,
      handleDeleteTodo,
      handleDeleteCompleted,
      handleClickCheck,
      editTitle,
    }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodosContext = () => useContext(TodosContext);
