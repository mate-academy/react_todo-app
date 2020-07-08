import React from 'react';
import { TodoAppTypes } from '../Shapes/Shapes';
import { Input } from '../Input/Input';
import { TodoList } from '../TodoList/TodoList';
import { TodosFilter } from '../TodosFilter/TodosFilter';

export class TodoApp extends React.Component {
  state = {}

  render() {
    const {
      tasks,
      addTask,
      toggle,
      onActive,
      onCompleted,
      onDeleted,
      onClear,
      onAllSelected,
      onEditTask,
    } = this.props;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <Input addTask={addTask} />
        </header>

        <section className="main">
          <TodoList
            items={tasks}
            toggle={toggle}
            onDeleted={onDeleted}
            onAllSelected={onAllSelected}
            onEditTask={onEditTask}
          />
        </section>

        <footer className="footer">
          <span className="todo-count">
            {`${tasks.length} items left`}
          </span>

          <TodosFilter
            onActive={onActive}
            onCompleted={onCompleted}
            onClear={onClear}
          />
        </footer>
      </section>
    );
  }
}

TodoApp.propTypes = TodoAppTypes;

TodoApp.defaultProps = {
  tasks: [],
};
