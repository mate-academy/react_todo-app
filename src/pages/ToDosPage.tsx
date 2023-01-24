import {
  FC, useContext, useEffect, useState,
} from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import {
  deleteTODO,
  getCompletedTODOs,
  getTODOs,
  postTODO,
  updateTODOstatus,
  updateTODOtitle,
} from '../api/todos';

import { AuthContext } from '../contexts/AuthContext';
import { ErrorContext } from '../contexts/ErrorContext';

import { Header } from '../components/Header';
import { ToDoList } from '../components/ToDoList';
import { Footer } from '../components/Footer';
import { ErrorMessage } from '../components/ErrorMessage';

import { Todo } from '../types/Todo';
import { ErrorType } from '../types/ErrorType';
import { FilterStatus } from '../types/FilterStatus';

export const ToDosPage: FC = () => {
  const { user, setUser } = useContext(AuthContext);
  const { errorType, setErrorType, clearError } = useContext(ErrorContext);

  const [visibleToDos, setVisibleToDos] = useState<Todo[]>([]);
  const [editingTodoIds, setEditingToDoIds] = useState<number[]>([]);

  const [hasCompleted, setHasCompleted] = useState(false);
  const [activeCount, setActiveCount] = useState(0);
  const [filterStatus, setFilterStatus] = useState(FilterStatus.All);

  const [newTodoTitle, setNewTodoTitle] = useState('');

  const [isAdding, setIsAdding] = useState(false);
  const [isTemp, setIsTemp] = useState(false);

  const [requestCount, setRequestCount] = useState(0);

  const handleLogOut = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const triggerRequest = () => setRequestCount((curr) => curr + 1);

  const setEditingTodo = (id: number) => (
    setEditingToDoIds(curr => [...curr, id])
  );

  const deleteToDos = async (idS: number | number[]) => {
    try {
      if (Array.isArray(idS)) {
        await Promise.all(idS.map(id => deleteTODO(id)));
      } else {
        await deleteTODO(idS);
      }
    } catch {
      setErrorType(ErrorType.Delete);
    } finally {
      triggerRequest();
    }
  };

  const updateStatus = async (idS: number | number[], status: boolean) => {
    try {
      if (Array.isArray(idS)) {
        await Promise.all(idS.map(id => updateTODOstatus(id, !status)));
      } else {
        await updateTODOstatus(idS, status);
      }
    } catch {
      setErrorType(ErrorType.Update);
    } finally {
      triggerRequest();
    }
  };

  const updateTitle = async (id: number, newTitle: string) => {
    try {
      await updateTODOtitle(id, newTitle);
    } catch {
      setErrorType(ErrorType.Update);
    } finally {
      triggerRequest();
    }
  };

  const getIdsForChanges = (todos: Todo[]) => {
    const idS = todos.map(({ id = 0 }) => id);

    setEditingToDoIds(idS);

    return idS;
  };

  const getSelectedTodos = (todos: Todo[]) => {
    const filteredTodos = todos.filter(({ completed }) => {
      switch (filterStatus) {
        case FilterStatus.Active:
          return !completed;

        case FilterStatus.Completed:
          return completed;

        default:
          return true;
      }
    });

    setVisibleToDos(filteredTodos);
  };

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      return;
    }

    if (!newTodoTitle) {
      triggerRequest();
      setErrorType(ErrorType.EmptyTitle);

      return;
    }

    clearError();
    setIsAdding(true);
    setIsTemp(true);

    const newToDo: Todo = {
      userId: user.id,
      title: newTodoTitle,
      completed: false,
      id: 0,
    };

    setVisibleToDos(prev => [...prev, newToDo]);

    try {
      await postTODO(newToDo);
      setNewTodoTitle('');
    } catch {
      setErrorType(ErrorType.Add);

      return;
    } finally {
      triggerRequest();
    }
  };

  const handleRemoveTodo = (todoId: number) => {
    if (!user) {
      return;
    }

    clearError();
    setEditingTodo(todoId);
    deleteToDos(todoId);
  };

  const handleClearCompleted = async () => {
    if (!user) {
      return;
    }

    try {
      const completedTodosFromServer = await getCompletedTODOs(user.id);
      const idS = getIdsForChanges(completedTodosFromServer);

      deleteToDos(idS);
    } catch {
      setErrorType(ErrorType.Unexpected);
    } finally {
      triggerRequest();
    }
  };

  const handleUpdateTodoStatus = (todoId: number, status: boolean) => {
    if (!user) {
      return;
    }

    clearError();
    setEditingTodo(todoId);
    updateStatus(todoId, status);
  };

  const handleAllToggler = async (isButtonActive: boolean) => {
    if (!user) {
      return;
    }

    try {
      const todosFromServer = await getTODOs(user.id);
      const todosForUpdate = todosFromServer.filter(({ completed }) => (
        isButtonActive ? completed : !completed
      ));
      const idS = getIdsForChanges(todosForUpdate);

      updateStatus(idS, isButtonActive);
    } catch {
      setErrorType(ErrorType.Unexpected);
    } finally {
      triggerRequest();
    }
  };

  const handleTitleChange = (todoId: number, newTitle: string) => {
    clearError();
    setEditingTodo(todoId);

    if (newTitle) {
      updateTitle(todoId, newTitle);
    } else {
      deleteToDos(todoId);
    }
  };

  useEffect(() => {
    setIsAdding(false);
    setEditingToDoIds([]);
  }, [visibleToDos]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const setTodos = async () => {
      try {
        const todosFromServer = await getTODOs(user.id);

        getSelectedTodos(todosFromServer);
        setHasCompleted(todosFromServer.some(({ completed }) => completed));
        setActiveCount(
          todosFromServer.filter(({ completed }) => !completed).length,
        );
      } catch {
        setErrorType(ErrorType.Unexpected);
      } finally {
        setIsTemp(false);
      }
    };

    setTodos();
  }, [filterStatus, requestCount]);

  useEffect(() => {
    setTimeout(clearError, 3000);
  }, [requestCount]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          newTodoTitle={newTodoTitle}
          onTitleChange={setNewTodoTitle}
          onToDoAdd={handleAddTodo}
          isAdding={isAdding}
          isButtonActive={!activeCount && hasCompleted}
          onToggleAll={handleAllToggler}
        />

        <ToDoList
          todos={visibleToDos}
          isTemp={isTemp}
          onRemove={handleRemoveTodo}
          editingToDoId={editingTodoIds}
          onStatusChange={handleUpdateTodoStatus}
          onTitleChange={handleTitleChange}
        />

        {(!!visibleToDos.length || activeCount || hasCompleted) && (
          <Footer
            hasCompleted={hasCompleted}
            activeCount={activeCount}
            onFilterChange={setFilterStatus}
            filter={filterStatus}
            onClearCompleted={handleClearCompleted}
          />
        )}
      </div>

      <Link
        to="/login"
        className="todoapp__logout button is-primary"
        onClick={handleLogOut}
      >
        Log out
      </Link>

      <CSSTransition
        classNames="error"
        in={!!errorType}
        timeout={500}
        unmountOnExit
      >
        <ErrorMessage />
      </CSSTransition>
    </div>
  );
};
