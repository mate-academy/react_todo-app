import React from 'react';
import getTodos from './api/todos';
import TodoApp from './TodoApp';
import TodoList from './TodoList';
import TodosFilter from './TodosFilter';

class App extends React.Component {
  state = {
    todos: [],
    visibleTodos: [],
  };

  componentDidMount() {
    this.setState({
      todos: getTodos,
      visibleTodos: getTodos,
    });
  }

  addTodo = (title) => {
    this.setState(prevState => {
      const newTodos = [
        ...prevState.todos,
        {
          title,
          id: prevState.todos.length + 1,
          completed: false,
        },
      ];

      return {
        visibleTodos: newTodos,
        todos: newTodos,
      }
    });
  };

  handlerChangeCompleted = (id) => {
    this.setState(prevState => {
      const newTodos = prevState.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      });

      return {
        visibleTodos: newTodos,
        todos: newTodos,
      }
    });
  };

  handleChangeCompletedAll = () => {
    this.setState(prevState => {
      if (prevState.visibleTodos.every(todo => todo.completed === false)
        || prevState.visibleTodos.every(todo => todo.completed === true)) {
        const changeAllTodos = prevState.visibleTodos.map(todo => ({
          ...todo,
          completed: !todo.completed,
        }));

        return {
          visibleTodos: changeAllTodos,
          todos: changeAllTodos,
        };
      } else {
        const changeSomeTodos =  prevState.visibleTodos.map(todo => ({
          ...todo,
          completed: true,
        }));

        return {
          visibleTodos: changeSomeTodos,
          todos: changeSomeTodos,
        };
      }

    });
  };

  handleRemoveTodo = (id) => {
    this.setState(prevState => {
      const newTodos = prevState.visibleTodos.filter(todo => (
        todo.id !== id
      ));
      return {
        visibleTodos: newTodos,
        todos: newTodos,
      }
    });
  };

  handlerFilter = (filterField) => {
    this.setState(state => {
      switch (filterField) {
        case 'all':
          return {
            visibleTodos: state.todos,
          };
        case  'active':
          return {
            visibleTodos: state.todos.filter(todo => (
              todo.completed === false
            )),
          };
        case  'completed':
          return {
            visibleTodos: state.todos.filter(todo => (
              todo.completed === true
            )),
          };
      }
    });
  };

  handlerClearCompleted = () => {
    this.setState(prevState => {
      const newTodos = prevState.visibleTodos.filter(todo => (
        todo.completed === false
      ));
      return {
        visibleTodos: newTodos,
        todos: newTodos,
      }
    });
  };

  render() {
    const { visibleTodos } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <TodoApp addTodo={this.addTodo} />
        </header>

        <TodoList
          todos={visibleTodos}
          changeCompleted={this.handlerChangeCompleted}
          changeCompletedAll={this.handleChangeCompletedAll}
          removeTodo={this.handleRemoveTodo}
        />

        <footer className="footer" style={{ display: 'block' }}>
          <span className="todo-count">
            {`${visibleTodos.length} items left`}
          </span>

          <TodosFilter
            handlerFilter={this.handlerFilter}
          />

          <button
            type="button"
            className="clear-completed"
            style={{ display: 'block' }}
            onClick={this.handlerClearCompleted}
          >
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}

export default App;
