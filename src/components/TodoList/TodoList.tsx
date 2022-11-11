import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { TodoItem } from '../TodoItem/TodoItem';
import './TodoList.scss';

type Props = {
  todos: Todo[];
  removeOneTodo: (todoId: number) => void;
  todoAction: number[];
  isAdding: boolean;
  newTodoName: string;
  user: User | null;
  changeOneTodoStatus: (todoId: number, completed: boolean) => void;
  editTodo: (todoId: number, todoName: string) => void;
  editingTodo: number;
  changeTitle: (editingTodo: number, newName: string) => void;
};

export const TodoList: React.FC<Props> = (
  {
    todos,
    removeOneTodo,
    todoAction,
    isAdding,
    newTodoName,
    user,
    changeOneTodoStatus,
    editTodo,
    editingTodo,
    changeTitle,
  },
) => {
  if (!user) {
    return null;
  }

  return (
    <section className="todoapp__main" data-cy="TodoList">
      <TransitionGroup>
        {todos.map(todo => (
          <CSSTransition
            key={todo.id}
            timeout={300}
            classNames="item"
          >
            <TodoItem
              todo={todo}
              removeOneTodo={removeOneTodo}
              todoAction={todoAction}
              changeOneTodoStatus={changeOneTodoStatus}
              editTodo={editTodo}
              editingTodo={editingTodo}
              changeTitle={changeTitle}
            />
          </CSSTransition>
        ))}
        {isAdding && (
          <CSSTransition
            key={0}
            timeout={300}
            classNames="item"
          >
            <TodoItem
              todo={{
                id: 0,
                title: newTodoName,
                completed: false,
                userId: user.id,
                createdAt: new Date(),
                updatedAt: new Date(),
              }}
              todoAction={[0]}
              removeOneTodo={removeOneTodo}
              changeOneTodoStatus={changeOneTodoStatus}
              editTodo={editTodo}
              editingTodo={Math.random()}
              changeTitle={changeTitle}
            />
          </CSSTransition>
        )}
      </TransitionGroup>
    </section>
  );
};
