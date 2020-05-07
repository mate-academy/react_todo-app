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

  render() {
    return (
      <section className="todoapp">
        <TodoApp handleSubmit={this.handleSubmit} />
        <TodoList
          todosList={this.state.todos}
          handleTaskRemover={this.handleTaskRemover}
          statusHandler={this.statusHandler}
        />
        <TodosFilter />
      </section>
    );
  }
}

export default App;
