import React from 'react';
import TodoApp from './TodoApp';
import TodoList from './TodoList';
import TodosFilter from './TodosFilter';

class App extends React.Component {
  state = {
    todos: [],
  }

  addTodo = (todo) => {
    this.setState(state => ({
      todos: [...state.todos, todo],
    }));
  }

  doneTask = (id) => {
    this.setState(state => ({
      todos: state.todos.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }

        return item;
      }),
    }));
  }

  render() {
    const { todos } = this.state;

    return (
      <section className="todoapp">
        <TodoApp addTodo={this.addTodo} />

        <section className="main">
          {todos
            && (
              <TodoList
                items={todos}
                doneTask={this.doneTask}
              />
            )}
        </section>
        <TodosFilter item={todos.filter(item => !item.completed).length} />
      </section>
    );
  }
}

export default App;
