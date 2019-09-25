import React from 'react';

import NewTodo from './components/NewTodo/NewTodo';
import TodoItem from './components/TodoItem/TodoItem';
import Footer from './components/Footer/Footer';

class App extends React.Component {
  state = {
    todos: JSON.parse(localStorage.getItem('todos')) || [],
    filteredTodos: JSON.parse(localStorage.getItem('todos')) || [],
    idCount: JSON.parse(localStorage.getItem('idCount')) || 0,
    filter: 'all',
    isAllTodosCompleted: false,
  }

  componentDidUpdate() {
    localStorage.setItem('todos', JSON.stringify(this.state.todos));
    localStorage.setItem('idCount', JSON.stringify(this.state.idCount));
  }

  changeFilter = (event) => {
    const {
      target: {
        dataset: {
          filter,
        }
      }
    } = event;

    event.preventDefault();

    this.setState({
      filter: filter,
    });

    this.filterTodos();
  }

  filterTodos = () => {
    this.setState(prevState => {
      let newFilteredTodos = [];
      const { filter, todos } = prevState;

      switch (filter) {
        case 'active':
          newFilteredTodos = todos.filter(todo => (
            todo.completed === false
          ));
          break;
        case 'completed':
          newFilteredTodos = todos.filter(todo => (
            todo.completed === true
          ));
          break;
        default:
          newFilteredTodos = todos;
      }

      return ({
        filteredTodos: newFilteredTodos,
      });
    });
  }

  addTodoToData = (inputNewTodoValue) => {
    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        {
          id: prevState.idCount + 1,
          title: inputNewTodoValue,
          completed: false,
        },
      ],

      idCount: ++prevState.idCount,
    }));

    this.checkIsAllTodosCompleted();
    this.filterTodos();
  }

  checkIsAllTodosCompleted = () => {
    this.setState(prevState => ({
      isAllTodosCompleted: prevState.todos.every(todo => (
        todo.completed === true
      )),
    }));
  }

  editTodoInData = (id, value) => {
    if (!value) {
      this.deleteTodoFromData(id);
      return;
    }

    this.setState(prevState => ({
      todos: prevState.todos.map(todo => {
        if (todo.id === Number(id)) {
          return ({
            ...todo,
            title: value,
          });
        }

        return todo;
      }),
    }));
    this.filterTodos();
  }

  deleteTodoFromData = (todoId) => {
    this.setState(prevState => {
      const indexTodoInArray = prevState.todos.findIndex(todo => (
        todo.id === Number(todoId)
      ));
      let tempTodos = [...prevState.todos];
      
      tempTodos.splice(indexTodoInArray, 1);

      return ({
        todos: tempTodos,
      });
    });

    this.checkIsAllTodosCompleted();
    this.filterTodos();
  }

  deleteAllCompletedTodoFromData = () => {
    this.setState(prevState => ({
      todos: prevState.todos.reduce((acc, todo) => {
        if (todo.completed === true) {
          return [...acc];
        }

        return [...acc, todo,];
      }, []),

      isAllTodosCompleted: false,
    }));
    this.filterTodos();
  }

  changeTodoCompleteStatus = ({
    target: {
      dataset: {
        todoId,
      }
    }
  }) => {
    this.setState(prevState => {
      return ({
        ...prevState,
        todos: [...prevState.todos].reduce((acc, todo) => {
          if (todo.id === Number(todoId)) {
            todo.completed = !(todo.completed);
          }
          return ([
            ...acc,
            todo,
          ]);
        }, []),
      });
    });

    this.checkIsAllTodosCompleted();
    this.filterTodos();
  }

  changeTodosCompleteStatus = () => {
    this.setState(prevState => ({
      todos: [...prevState.todos].map(todo => ({
        ...todo,
        completed: !(prevState.isAllTodosCompleted)
      })),
      isAllTodosCompleted: !(prevState.isAllTodosCompleted),
    }));

    this.filterTodos();
  }

  countActiveTodos = () => {
    const { todos } = this.state;

    return todos.filter(todo => (
      todo.completed === false
    ))
      .length;
  }

  findSomeCompletedTodo = () => {
    const { todos } = this.state;

    return todos.some(todo => (
      todo.completed === true
    ));
  }

  render() {
    const {
      filteredTodos,
      filter,
      todos,
      isAllTodosCompleted
    } = this.state;

    const activeTodosLeft = this.countActiveTodos();
    const isSomeTodoCompleted = this.findSomeCompletedTodo();

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTodo addTodoToData={this.addTodoToData} />
        </header>
        <section className="main">
          {!!(todos.length) &&
            <>
              <input
                type="checkbox"
                id="toggle-all"
                className="toggle-all"
                onChange={this.changeTodosCompleteStatus}
                checked={isAllTodosCompleted}
              />
              <label htmlFor="toggle-all">Mark all as complete</label>
            </>
          }
          <ul className="todo-list">
            {filteredTodos.map(todo => (
              <TodoItem
                todo={todo}
                deleteTodoFromData={this.deleteTodoFromData}
                changeTodoCompleteStatus={this.changeTodoCompleteStatus}
                editTodoInData={this.editTodoInData}
                key={todo.id} />
            ))}
          </ul>
        </section>

        {!!(todos.length) &&
          <Footer
            activeTodosLeft={activeTodosLeft}
            changeFilter={this.changeFilter}
            filter={filter}
            isSomeTodoCompleted={isSomeTodoCompleted}
            deleteAllCompletedTodoFromData={this.deleteAllCompletedTodoFromData}
          />
        }
      </section>
    );
  }
}

export default App;
