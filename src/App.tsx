import React, { useContext, useState } from 'react';
import { TodoForm } from './Components/TodoForm/TodoForm';
import { Footer } from './Components/Footer/Footer';
import { Filter } from './types/Filter';
import { TodoList } from './Components/TodoList/TodoList';
import { StateContext } from './GlobalProvider/GlobalProvider';
import { getFilteredTodos } from './Components/FilteredTodos/FilteredTodos';

export const App: React.FC = () => {
  const todos = useContext(StateContext);
  const [filter, setFilter] = useState<Filter>(Filter.All);

  const filteredTodos = getFilteredTodos(todos, filter);
  // const [todos, setTodos] = useState<Todo[]>([]);
  // const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  // const [deletingTodoId, setDeletingTodoId] = useState<number | null>(null);
  // const [loadingByIds, setLoadingByIds] = useState<number[]>([]);
  // const [errorMessage, setErrorMessage] = useState<ErrorType>(
  //   ErrorType.DEFAULT,
  // );

  // useEffect(() => {
  //   todoServices
  //     .getTodos()
  //     .then(setTodos)
  //     .catch(() => {
  //       setErrorMessage(ErrorType.LOADING);
  //       setTimeout(() => setErrorMessage(ErrorType.DEFAULT), 3000);
  //     });
  // }, []);

  // const addTodo = ({ id, userId, title, completed }: Todo) => {
  //   const newTempTodo = { id, userId, title, completed };

  //   setTempTodo(newTempTodo);

  //   return todoServices
  //     .createTodo({ title, userId, completed })
  //     .then(newTodo => setTodos(currentTodo => [...currentTodo, newTodo]))
  //     .catch(error => {
  //       setErrorMessage(ErrorType.ADD);
  //       throw error;
  //     })
  //     .finally(() => {
  //       setTempTodo(null);
  //     });
  // };

  // const deleteTodo = (todoId: number) => {
  //   setDeletingTodoId(todoId);

  //   return todoServices
  //     .deleteTodo(todoId)
  //     .then(() => {
  //       setTodos(currentTodo => currentTodo.filter(todo => todo.id !== todoId));
  //     })
  //     .catch(error => {
  //       setErrorMessage(ErrorType.DELETE);
  //       throw error;
  //     })
  //     .finally(() => {
  //       setDeletingTodoId(null);
  //     });
  // };

  // const clearCompleted = () => {
  //   const completedTodoId = todos
  //     .filter(todo => todo.completed)
  //     .map(todo => todo.id);

  //   if (completedTodoId.length === 0) {
  //     return;
  //   }

  //   completedTodoId.forEach(completedTodo => deleteTodo(completedTodo));
  // };

  // const updateTodoStatus = (todoToUpdate: Todo) => {
  //   setLoadingByIds(prev => [...prev, todoToUpdate.id]);

  //   const findTodo = todos.find(todo => todo.id === todoToUpdate.id);

  //   if (!findTodo) {
  //     return;
  //   }

  //   const updateTodo = { ...findTodo, completed: !findTodo.completed };

  //   return todoServices
  //     .updateTodo(updateTodo.id, { completed: updateTodo.completed })
  //     .then(newTodo => {
  //       setTodos(current =>
  //         current.map(todo => (todo.id === newTodo.id ? newTodo : todo)),
  //       );
  //     })
  //     .catch(error => {
  //       setErrorMessage(ErrorType.UPDATE);

  //       throw error;
  //     })
  //     .finally(() => {
  //       setLoadingByIds(prev => prev.filter(id => id !== todoToUpdate.id));
  //     });
  // };

  // const toggleAll = () => {
  //   const shouldCompleteAll = todos.some(todo => !todo.completed);

  //   const updates = todos
  //     .filter(todo => todo.completed !== shouldCompleteAll)
  //     .map(todo =>
  //       todoServices.updateTodo(todo.id, { completed: shouldCompleteAll }),
  //     );

  //   Promise.all(updates).then(newTodos => {
  //     setTodos(current =>
  //       current.map(
  //         todo => newTodos.find(updated => updated.id === todo.id) || todo,
  //       ),
  //     );
  //   });

  //   const todosToUpdate = todos.filter(
  //     todo => todo.completed !== shouldCompleteAll,
  //   );

  //   todosToUpdate.forEach(todo => {
  //     updateTodoStatus({ ...todo, completed: activeTodos });
  //   });
  // };

  // const updateTodoTitle = (updatedTodo: Todo) => {
  //   setLoadingByIds(prev => [...prev, updatedTodo.id]);

  //   if (updatedTodo.title.trim() === '') {
  //     return deleteTodo(updatedTodo.id);
  //   }

  //   return todoServices
  //     .updateTodo(updatedTodo.id, { title: updatedTodo.title })
  //     .then(newTodo => {
  //       setTodos(current =>
  //         current.map(todo => (todo.id === newTodo.id ? newTodo : todo)),
  //       );
  //     })
  //     .catch(error => {
  //       setErrorMessage(ErrorType.UPDATE);
  //       throw error;
  //     })
  //     .finally(() => {
  //       setLoadingByIds(prev => prev.filter(id => id !== updatedTodo.id));
  //     });
  // };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoForm />

        <TodoList filteredTodos={filteredTodos} />

        {/* Hide the footer if there are no todos */}

        {todos.length > 0 && <Footer filter={filter} setFilter={setFilter} />}
      </div>
    </div>
  );
};
