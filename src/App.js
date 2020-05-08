import React from 'react';
import TodoApp from './Components/TodoApp/TodoApp';
import TodoList from './Components/TodoList/TodoList';
import TodosFilter from './Components/TodosFilter/TodosFilter';

const todos = [
  {
    title: 'Clean a car',
    id: 1,
    completed: false,
  },
  {
    title: 'Go to the gym',
    id: 2,
    completed: false,
  },
];

class App extends React.Component {
  state = {
    todos: [...todos],
    filtrationType: '',
  }

  handleSubmit = (newTask) => {
    this.setState(prev => ({
      todos: [...prev.todos, newTask],
    }));
  }

  handleTaskRemover = (taskId) => {
    this.setState(prev => ({
      todos: [...prev.todos].filter(task => taskId !== task.id),
    }));
  }

  statusHandler = (taskId) => {
    this.setState(prev => ({
      todos: prev.todos.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            completed: !task.completed,
          };
        }

        return task;
      }),
    }));
  }

  filterSelector = (filterType) => {
    this.setState({ filtrationType: filterType });
  }

  filterByPattern = () => {
    switch (this.state.filtrationType) {
      case 'active':
        return this.state.todos.filter(task => task.completed === false);

      case 'completed':
        return this.state.todos.filter(task => task.completed !== false);

      default:
        return this.state.todos;
    }
  }

  activeTasksCounter = () => this.state.todos
    .filter(task => !task.completed).length

  render() {
    return (
      <section className="todoapp">
        <TodoApp handleSubmit={this.handleSubmit} />
        <TodoList
          todosList={this.filterByPattern()}
          handleTaskRemover={this.handleTaskRemover}
          statusHandler={this.statusHandler}
        />
        <TodosFilter
          activeTasksCounter={this.activeTasksCounter}
          filterSelector={this.filterSelector}
        />
      </section>
    );
  }
}

export default App;
