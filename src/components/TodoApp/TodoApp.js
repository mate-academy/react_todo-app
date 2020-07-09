import React from 'react';

import { TodoAppTypes } from '../Shapes/Shapes';
import { Input } from '../Input/Input';
import { TodoList } from '../TodoList/TodoList';
import { TodosFilter } from '../TodosFilter/TodosFilter';

export const TodoApp = (props) => {
  const {
    tasks,
    showOnlyActive,
    showOnlyCompleted,
    addTask,
    toggle,
    onToggleTask,
    onDeleted,
    onClear,
    onAllSelected,
    onEdit,
    onChangeCurrentTask,
  } = props;

  const numberOfTask = tasks.length;

  return (
    <section className="todoapp">

      <Input addTask={addTask} />

      <TodoList
        tasks={tasks}
        showOnlyActive={showOnlyActive}
        showOnlyCompleted={showOnlyCompleted}
        toggle={toggle}
        onDeleted={onDeleted}
        onAllSelected={onAllSelected}
        onEdit={onEdit}
        onChangeCurrentTask={onChangeCurrentTask}
      />

      {(numberOfTask)
        ? (
          <TodosFilter
            tasks={tasks}
            onToggleTask={onToggleTask}
            showOnlyActive={showOnlyActive}
            showOnlyCompleted={showOnlyCompleted}
            onClear={onClear}
          />
        )
        : ''}

    </section>
  );
};

TodoApp.propTypes = TodoAppTypes;

TodoApp.defaultProps = {
  tasks: [],
};
