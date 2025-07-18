import { Todo } from '../types/Todo';
import { FilterType } from '../types/FilterType';
import { TodoItem } from './TodoItem';
import { useContext, useState } from 'react';
import { TodoContext } from './TodoContext';

type Props = {
  filterType: FilterType;
};

export const TodoList: React.FC<Props> = ({ filterType }) => {
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [selectedTodoNewValue, setSelectedTodoNewValue] = useState<string>('');
  const { todos } = useContext(TodoContext);

  function handleTodoSelect(todoId: number, title: string) {
    setSelectedTodoId(todoId);
    setSelectedTodoNewValue(title);
  }

  function deselectTodo() {
    setSelectedTodoId(null);
    setSelectedTodoNewValue('');
  }

  function isTodoVisible(todo: Todo): boolean {
    switch (filterType) {
      case 'all':
        return true;
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
    }
  }

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.filter(isTodoVisible).map((todo: Todo) => {
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            isSelected={selectedTodoId === todo.id}
            selectedTodoNewValue={selectedTodoNewValue}
            onTodoSelect={handleTodoSelect}
            deselectTodo={deselectTodo}
            onSelectedTodoNewValueChange={setSelectedTodoNewValue}
          />
        );
      })}
    </section>
  );
};
