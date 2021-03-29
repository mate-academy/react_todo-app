import React, { useContext, ChangeEvent, MouseEvent } from 'react';
import { Route, Switch } from 'react-router';
import { TodoItem } from '../TodoItem';
import { TodosContext, Todo } from '../TodosContext';
import { filterCompleteTodo, filterActiveTodo, showAllTodo } from '../helpers';

export const TodoList = React.memo(
  () => {
    const { todos, setTodos } = useContext(TodosContext);

    const changeStatus = (event: ChangeEvent<HTMLInputElement>) => {
      const { id, checked } = event.target;

      const todoWithNewStatus = [...todos].map(
        (todo) => {
          if (todo.id === +id) {
            todo.completed = checked;
          }

          return {
            ...todo,
          };
        },
      );

      setTodos(todoWithNewStatus);
    };

    const removeTodo = (event: MouseEvent) => {
      const { id } = event.target as HTMLElement;
      const updatedTodo = todos.filter(todo => todo.id !== +id);

      setTodos(updatedTodo);
    };

    return (
      <ul className="todo-list">
        <Switch>
          <Route path="/completed">
            {filterCompleteTodo(todos).map((todo: Todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                changeStatus={changeStatus}
                removeTodo={removeTodo}
              />
            ))}
          </Route>
          <Route path="/active">
            {filterActiveTodo(todos).map((todo: Todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                changeStatus={changeStatus}
                removeTodo={removeTodo}
              />
            ))}
          </Route>
          <Route exact path="/">
            {showAllTodo(todos).map((todo: Todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                changeStatus={changeStatus}
                removeTodo={removeTodo}
              />
            ))}
          </Route>
        </Switch>
      </ul>
    );
  }
);
