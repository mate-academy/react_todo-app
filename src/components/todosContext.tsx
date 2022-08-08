import {
  createContext,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  createTodo, editTodo, getUserTodos, removeTodo,
} from '../api/todos';
import { CreateTodo, Todo } from '../types/Todo';
import { TodosContextType } from '../types/TodosContext';

const userId = 3924;

type Props = {
  children: React.ReactNode
};

export const TodosContext = createContext<TodosContextType | null>(null);

export const TodosProvider: FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo []>([]);

  useEffect(() => {
    getUserTodos(userId).then(setTodos);
  }, []);

  const addTodo = useCallback(async (
    newTodo: CreateTodo,
  ) => {
    const createdTodo = await createTodo(newTodo);

    if (createdTodo) {
      getUserTodos(userId).then(setTodos);
    }
  }, []);

  const changeStatusTodo = useCallback(
    async (todo: Todo) => {
      const todoId = await editTodo(todo.id, { completed: !todo.completed });

      if (todoId) {
        getUserTodos(userId).then(setTodos);
      }
    }, [],
  );

  const toogleALL = useCallback(
    async (isAllCompleted: boolean) => {
      if (isAllCompleted) {
        await Promise.all(
          todos.map(async (todo) => {
            await editTodo(todo.id, { completed: !todo.completed });
          }),
        );
      } else {
        await Promise.all(
          todos.map(async (todo) => {
            if (!todo.completed) {
              await editTodo(todo.id, { completed: true });
            }
          }),
        );
      }

      getUserTodos(userId).then(setTodos);
    }, [todos],
  );

  const deleteAllCompleted = useCallback(
    async () => {
      await Promise.all(
        todos.map(async (todo) => {
          if (todo.completed) {
            await removeTodo(todo.id);
          }
        }),
      );

      getUserTodos(userId).then(setTodos);
    }, [todos],
  );

  const deleteTodo = useCallback(
    async (todo: Todo) => {
      const todoId = await removeTodo(todo.id);

      if (todoId) {
        getUserTodos(userId).then(setTodos);
      }
    }, [],
  );

  const editeTodoTitle = useCallback(
    async (newTitle: string, todo: Todo) => {
      let todoId;

      if (!newTitle || !newTitle.trim()) {
        todoId = deleteTodo(todo);
      } else {
        todoId = await editTodo(todo.id, { title: newTitle.trim() });
      }

      if (todoId) {
        getUserTodos(userId).then(setTodos);
      }
    }, [],
  );

  const contextValue = useMemo(() => {
    return {
      todos,
      addTodo,
      changeStatusTodo,
      deleteTodo,
      toogleALL,
      editeTodoTitle,
      deleteAllCompleted,
    };
  }, [todos]);

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
};
