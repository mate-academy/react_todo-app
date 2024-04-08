import { Todo } from '../../../../types/Todo';
import { filterTodos } from '../../../../utils/utils';
import { TodosContext } from '../../../../store/Store';
import { TodoItem } from '../TodoItem/TodoItem';
import React, { useContext, useState } from 'react';

type Props = {
  items: Todo[];
};

export const TodoList: React.FC<Props> = ({ items }) => {
  const { filter } = useContext(TodosContext);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const displayedTodos: Todo[] = filterTodos(filter, items);

  return (
    <ul className="todo-list" data-cy="todosList">
      {displayedTodos.map(todo => {
        return (
          <TodoItem
            todo={todo}
            key={todo.id}
            selectedTodo={selectedTodo}
            setSelectedTodo={setSelectedTodo}
          />
        );
      })}
    </ul>
  );
};
