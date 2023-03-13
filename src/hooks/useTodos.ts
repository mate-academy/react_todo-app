import {
  ChangeEvent,
  useCallback,
  useContext,
  useReducer,
  useState,
} from 'react';
import {
  addTodo,
  getTodos,
  removeTodo,
  updateTodo,
} from '../api/todos';
import { INITIAL_STATE_TEMPTODO } from '../constants/initial_state_newTodo';
import { Context } from '../context';
import { Error } from '../enums/Error';
import { ReducerTempTodoType } from '../enums/ReducerTempTodoType';
import { reducer } from '../reducer';
import { Todo } from '../types/Todo';
import { useLocalStorage } from './useLocalStorage';

export function useTodos() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  const [tempTodo, dispatch] = useReducer(reducer, INITIAL_STATE_TEMPTODO);

  const [processingIds, setProcessingIds] = useState<number[]>([]);
  const [isCreated, setIsCreated] = useState(false);
  const { user, setCurrentError } = useContext(Context);

  const getTodosFromServer = useCallback(async () => {
    if (!user) {
      return;
    }

    try {
      const todosFromServer = await getTodos(user.id);

      setTodos(todosFromServer);
    } catch {
      setCurrentError(Error.UPLOAD);
    }
  }, [todos, processingIds]);

  const onAdd = useCallback((todo: Todo) => {
    setIsCreated(true);

    const toAddTodo = async () => {
      try {
        const addedTodo = await addTodo(todo);

        setTodos([...todos, addedTodo]);
        dispatch({ type: ReducerTempTodoType.RESET });
      } catch {
        setCurrentError(Error.ADD);
      } finally {
        setIsCreated(false);
      }
    };

    return toAddTodo();
  }, [todos]);

  const onDelete = useCallback((todoID: number) => {
    setProcessingIds(prev => [...prev, todoID]);

    const toRemoveTodo = async () => {
      try {
        await removeTodo(todoID);

        await getTodosFromServer();
      } catch {
        setCurrentError(Error.REMOVE);
      } finally {
        setProcessingIds(prev => prev.filter(id => id !== todoID));
      }
    };

    return toRemoveTodo();
  }, [todos]);

  const onUpdate = useCallback((todoID: number, data: Partial<Todo>) => {
    setProcessingIds(prev => [...prev, todoID]);

    const toUpdateTodo = async () => {
      try {
        await updateTodo(todoID, data);
        await getTodosFromServer();
      } catch {
        setCurrentError(Error.UPDATE);
      } finally {
        setProcessingIds(prev => prev.filter(id => id !== todoID));
      }
    };

    toUpdateTodo();
  }, [todos]);

  const dispatchTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ReducerTempTodoType.TITLE,
      newTitle: e.target.value,
    });
  }, [tempTodo]);

  const isProcessing = useCallback((id: number) => {
    return !!processingIds.includes(id) || id === 0;
  }, [processingIds]);

  return [
    isCreated,
    tempTodo,
    todos,
    onAdd,
    dispatchTitle,
    onDelete,
    onUpdate,
    getTodosFromServer,
    isProcessing,
  ];
}
