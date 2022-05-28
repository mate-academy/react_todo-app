import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { TodoContext } from '../hoc/TodoProvider';

export const TodoFooter: React.FC = () => {
  const content = useContext(TodoContext);
  const todos = content?.todos;
  const setTodos = content?.setTodos;
  const setFilteredTodos = content?.setFilteredTodos;
  const [filterBy, setFilterBy] = useState('all');
  const [haveCompleted, setHaveCompleted] = useState(0);

  const handleFilterStatus = (value: string) => {
    setFilterBy(value);
  };

  useEffect(() => {
    if (todos && setFilteredTodos) {
      switch (filterBy) {
        case 'active':
          setFilteredTodos(todos.filter(todo => todo.completed === false));
          break;
        case 'completed':
          setFilteredTodos(todos.filter(todo => todo.completed === true));
          break;
        default:
          setFilteredTodos(todos);
          break;
      }
    }
  }, [filterBy]);

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
    if (todos && setTodos) {
      setTodos(todos.filter(todo => todo.completed === false));
    }
  };

  return (
    <>
      {(todos && todos.length > 0) && (
        <div className="panel-block">
          <div
            className="field"
            style={{ width: '100%' }}
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
                    className="panel-tabs tabs is-small mb-0"
                    style={{
                      borderRadius: '20px',
                      border: '0.5px solid lightgrey',
                    }}
                  >
                    <NavLink
                      to="/"
                      className={({ isActive: ac }) => classNames(
                        {
                          'is-active has-text-white has-background-primary': ac,
                        },
                      )}
                      onClick={() => handleFilterStatus('all')}
                    >
                      All
                    </NavLink>

                    <NavLink
                      to="/active"
                      className={({ isActive: ac }) => classNames(
                        {
                          'is-active has-text-white has-background-primary': ac,
                        },
                      )}
                      style={{
                        borderLeft: '0.5px solid lightgrey',
                        borderRight: '0.5px solid lightgrey',
                      }}
                      onClick={() => handleFilterStatus('active')}
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
                      onClick={() => handleFilterStatus('completed')}
                    >
                      Completed
                    </NavLink>
                  </div>
                </div>

                <div
                  className="conteiner mb-0"
                  style={{
                    visibility: completedTodos === 0 ? 'hidden' : 'visible',
                  }}
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
