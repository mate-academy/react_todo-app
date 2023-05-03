import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';
import { TodoCondition } from '../../types/TodoCondition';

type Props = {
  todos: Todo[],
  onDeleteTodo: (todoId: number) => void,
  procesingTodosId: number[],
  todoCondition: TodoCondition,
  toggleTodo: (curentTodo: Todo[], status?: boolean | undefined) => void,
  handleSubmitEditing: (id: number, thisTitle: string) => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  onDeleteTodo,
  procesingTodosId,
  todoCondition,
  toggleTodo,
  handleSubmitEditing,
}) => {
  return (
    <>
      {todos.map((todo: Todo) => {
        let thisTodoCondition = TodoCondition.neutral;

        if (procesingTodosId.includes(todo.id)) {
          thisTodoCondition = todoCondition;
        }

        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDeleteTodo={onDeleteTodo}
            todoCondition={thisTodoCondition}
            toggleTodo={toggleTodo}
            handleSubmitEditing={handleSubmitEditing}
          />
        );
      })}
    </>
  );
};
