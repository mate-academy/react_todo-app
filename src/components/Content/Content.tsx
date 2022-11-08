import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { getUserId } from '../../api/users';
import {
  deleteTodo,
  getTodos,
  updateTodo,
} from '../../api/todos';
import { getFilteredTodos } from '../../utils/filterTodos';
import { handleIsProcessed } from '../../utils/handleIsProcessed';
import { AuthContext } from '../Auth/AuthContext';
import { Header } from './Header';
import { TodoList } from './TodoList';
import { Footer } from './Footer';
import { Todo } from '../../types/Todo';
import { TodoStatus } from '../../types/TodoStatus';
import { Error } from '../../types/Error';

type Props = {
  onError: (error: Error | null) => void;
};

export const Content: React.FC<Props> = ({ onError }) => {
  const user = useContext(AuthContext);
  const { todoStatus = '' } = useParams();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoFilter, setTodoFilter] = useState(TodoStatus.ALL);
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [isProcessed, setIsProcessed] = useState<number[]>([]);
  const [isAdding, setIsAdding] = useState(false);

  useMemo(() => {
    switch (todoStatus) {
      case 'active':
        setTodoFilter(TodoStatus.ACTIVE);
        break;

      case 'completed':
        setTodoFilter(TodoStatus.COMPLETED);
        break;

      case '':
        setTodoFilter(TodoStatus.ALL);
        break;

      default:
        onError(Error.PAGE_NOT_FOUND);
        break;
    }
  }, [todoStatus]);

  const filteredTodos = useMemo(() => (
    getFilteredTodos(todos, todoFilter)
  ), [todos, todoFilter]);

  const handleSetTodos = useCallback((newTodo: Todo) => {
    setTodos(allTodos => [...allTodos, newTodo]);
  }, []);

  const handleTodoFilter = useCallback((filterStatus: TodoStatus) => {
    setTodoFilter(filterStatus);
  }, []);

  const handleSetIsAdding = useCallback((status: boolean) => {
    setIsAdding(status);
  }, []);

  const handleSetTempTodo = useCallback(
    (userId?: number, title?: string) => {
      if (!userId || !title) {
        setTempTodo(null);
      }

      if (userId && title) {
        setTempTodo({
          id: 0,
          userId,
          title,
          completed: false,
        });
      }
    }, [],
  );

  const handleUpdateTodo = useCallback(
    async (todoId: number, data: {}) => {
      handleIsProcessed('ADD', todoId, setIsProcessed);
      onError(null);

      try {
        const updatedTodo = await updateTodo(todoId, data);

        setTodos(prev => prev.map(todo => {
          if (todo.id === updatedTodo.id) {
            return updatedTodo;
          }

          return todo;
        }));
      } catch {
        onError(Error.UPDATE_TODO);
      } finally {
        handleIsProcessed('DELETE', todoId, setIsProcessed);
      }
    }, [],
  );

  const handleDeleteTodo = useCallback(
    async (todoId: number) => {
      handleIsProcessed('ADD', todoId, setIsProcessed);
      onError(null);

      try {
        await deleteTodo(todoId);

        setTodos(allTodos => allTodos.filter(todo => todo.id !== todoId));
      } catch {
        onError(Error.DELETE_TODO);
      } finally {
        handleIsProcessed('DELETE', todoId, setIsProcessed);
      }
    }, [],
  );

  useEffect(() => {
    if (user) {
      getTodos(getUserId(user))
        .then(setTodos)
        .catch(() => onError(Error.GET_TODOS));
    }
  }, []);

  return (
    <div className="todoapp__content">
      <Header
        todos={filteredTodos}
        isAdding={isAdding}
        onAdding={handleSetIsAdding}
        onAddTodo={handleSetTodos}
        onUpdateTodo={handleUpdateTodo}
        onSetTempTodo={handleSetTempTodo}
        onError={onError}
      />

      <TodoList
        todos={filteredTodos}
        isAdding={isAdding}
        tempTodo={tempTodo}
        isProcessed={isProcessed}
        onUpdateTodo={handleUpdateTodo}
        onDeleteTodo={handleDeleteTodo}
      />

      {todos.length > 0 && (
        <Footer
          todos={todos}
          onTodoFilter={handleTodoFilter}
          onDeleteTodo={handleDeleteTodo}
        />
      )}
    </div>
  );
};
