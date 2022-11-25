import React, { useContext } from 'react';
import { Filter } from '../Filter';
import { AppContext } from '../AppContext';
import { deleteTodo } from '../../api/todos';
import { ErrorTodo } from '../../types/ErrorTodo';

type Props = {
  numberOfNotCompletedTodo: number | undefined,
};

export const Footer: React.FC<Props> = React.memo(
  ({
    numberOfNotCompletedTodo,
  }) => {
    const {
      todosFromServer,
      closeErrorMessage,
      setTodosFromServer,
      setIdOfTodosForLoader,
      showErrorMessage,
    } = useContext(AppContext);

    const deleteCompletedTodos = () => {
      let todosNonDeleted = todosFromServer;

      closeErrorMessage();

      if (todosFromServer?.find(
        todoFromServer => todoFromServer.completed,
      )) {
        const idOfTodosForDeletion = todosFromServer
          .filter(todoFromServer => todoFromServer.completed)
          .map(todo => todo.id);

        setIdOfTodosForLoader(idOfTodosForDeletion);

        Promise.allSettled(idOfTodosForDeletion.map(
          idOfTodoForDeletion => deleteTodo(idOfTodoForDeletion),
        ))
          .then(results => results.forEach((result, i) => {
            if (
              result.status === 'fulfilled'
              && typeof result.value !== 'number'
              && 'Error' in result.value
            ) {
              showErrorMessage(ErrorTodo.Delete);
            }

            if (
              result.status === 'fulfilled'
              && (result.value === 1 || result.value === 0)
            ) {
              todosNonDeleted = todosNonDeleted?.filter(
                todo => todo.id !== idOfTodosForDeletion[i],
              );

              if (todosFromServer.length === idOfTodosForDeletion.length) {
                setTodosFromServer(undefined);
              } else {
                setTodosFromServer(todosNonDeleted);
              }
            }

            setIdOfTodosForLoader([]);
          }));
      }
    };

    const style = {
      display: 'block',
    };

    if (numberOfNotCompletedTodo === todosFromServer?.length) {
      style.display = 'none';
    }

    return (
      <footer className="todoapp__footer" data-cy="Footer">
        <span className="todo-count" data-cy="todosCounter">
          {`${numberOfNotCompletedTodo} items left`}
        </span>

        <Filter />

        <button
          data-cy="ClearCompletedButton"
          type="button"
          className="todoapp__clear-completed"
          onClick={deleteCompletedTodos}
          disabled={numberOfNotCompletedTodo === todosFromServer?.length}
          style={style}
        >
          Clear completed
        </button>
      </footer>
    );
  },
);
