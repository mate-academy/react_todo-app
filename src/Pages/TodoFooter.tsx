import React, {
  useContext,
  useState,
  useMemo,
} from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { TodoContext } from '../hoc/TodoProvider';
import { deleteTodo } from '../api/api';
import './TodoFooter.scss';

export const TodoFooter: React.FC = () => {
  const { todos, setTodos } = useContext(TodoContext);
  const [haveCompleted, setHaveCompleted] = useState(0);

  const completedTodos = useMemo(() => {
    const count = todos
      ? todos.filter(todo => todo.completed === true).length
      : 0;

    if (count > 0) {
      setHaveCompleted(count);
    }

    if (count === 0) {
      setHaveCompleted(0);
    }

    return count;
  }, [todos]);

  const removedCompleted = () => {
    setTodos(todos.filter(todo => {
      if (todo.completed) {
        deleteTodo(todo.id);
      }

      return !todo.completed;
    }));
  };

  return (
    <>
      {(todos && todos.length > 0) && (
        <div className="panel-block">
          <div
            className="field field__footer"
          >
            <div className="conteiner">
              <div
                className="field is-grouped is-justify-content-space-between"
              >
                <div className="content mb-0">
                  <p className="is-size-6">
                    {todos && `${todos?.length - haveCompleted}
                  ${todos?.length - haveCompleted === 1 ? ' item' : ' items'} left`}
                  </p>
                </div>

                <div className="conteiner mb-0">
                  <div
                    className="panel-tabs tabs is-small mb-0 status"
                  >
                    <NavLink
                      to="/"
                      className={({ isActive: ac }) => classNames(
                        {
                          'is-active has-text-white has-background-primary': ac,
                        },
                      )}
                    >
                      All
                    </NavLink>

                    <NavLink
                      to="/active"
                      className={({ isActive: ac }) => classNames(
                        'status--middle',
                        {
                          'is-active has-text-white has-background-primary': ac,
                        },
                      )}
                    >
                      Active
                    </NavLink>

                    <NavLink
                      to="/completed"
                      className={({ isActive: ac }) => classNames(
                        {
                          'is-active has-text-white has-background-primary': ac,
                        },
                      )}
                    >
                      Completed
                    </NavLink>
                  </div>
                </div>

                <div
                  className={classNames(
                    'conteiner mb-0',
                    { delCompleted: completedTodos === 0 },
                  )}
                >
                  <div className="buttons">
                    <button
                      type="button"
                      className="button is-danger is-rounded is-small"
                      onClick={removedCompleted}
                    >
                      Clear completed
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
