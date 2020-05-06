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

  render() {
    return (
      <section className="todoapp">
        <TodoApp handleSubmit={this.handleSubmit} />
        <TodoList todosList={this.state.todos} />
        <TodosFilter />
      </section>
    );
  }
}

export default App;
