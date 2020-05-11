import React from 'react';
import TodoList from './components/TodoList';
import TodoFooter from './components/TodoFooter';

class App extends React.Component {
  state = {
    todos: [],
    todoTitle: '',
    todoId: 1,
    isFooterVisible: false,
  }

  handleTitleChange = (e) => {
    this.setState({
      todoTitle: e.target.value,
    });
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.setState((state) => {
        const newTitle = {
          id: state.todoId + 1,
          title: state.todoTitle,
        };

        return {
          todos: [...state.todos, newTitle],
          isFooterVisible: true,
        };
      });
    }
  }

  render() {
    const { todos } = this.state;
    const { todoTitle, isFooterVisible } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            value={todoTitle}
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.handleTitleChange}
            onKeyDown={this.handleKeyDown}
          />
        </header>

        <section className="">
          <input type="checkbox" id="toggle-all" className="toggle-all" />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList todos={todos} />
        </section>

        {isFooterVisible && <TodoFooter />}
      </section>
    );
  }
}

export default App;
