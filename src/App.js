import React from 'react';
import NewTodo from './components/NewTodo/NewTodo';
import TodoItem from './components/TodoItem/TodoItem';
import FilterItem from './components/FilterItem/FilterItem';

class App extends React.Component {
  state = {
    todos: [],
    filteredTodos: [],
    idCount: 0,
    filter: 'all',
    isAllTodosCompleted: false,
  }

  changeFilter = (event) => {
    const { target: { dataset: { filter } } } = event;

    event.preventDefault();
    this.setState({
      filter: filter,
    });
    this.filterTodos();
  }

  filterTodos = () => {
    this.setState(prevState => {
      let newFilteredTodos = [];

      switch (prevState.filter) {
        case 'active':
          newFilteredTodos = prevState.todos.filter(todo => todo.completed === false);
          break;
        case 'completed':
          newFilteredTodos = prevState.todos.filter(todo => todo.completed === true);
          break;
        default:
          newFilteredTodos = prevState.todos;
          break;
      }

      return ({
        filteredTodos: newFilteredTodos,
      });
    });
  }

  addTodoToData = (inputNewTodoValue) => {
    this.setState(prevState => {
      return ({
        todos: [
          ...prevState.todos,
          {
            id: prevState.idCount + 1,
            title: inputNewTodoValue,
            completed: false,
          },
        ],
        idCount: ++prevState.idCount,
      });
    });
    this.checkIsAllTodosCompleted();
    this.filterTodos();
  }

  checkIsAllTodosCompleted = () => {
    this.setState(prevState => {
      return ({
        isAllTodosCompleted: prevState.todos.every(todo => todo.completed === true),
      });
    })
  }

  editTodoInData = (id, value) => {
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

  deleteTodoFromData = ({ target: { dataset: { todoId } } }) => {
    // console.dir(todoId);
    this.setState(prevState => {
      const indexTodoInArray = prevState.todos.findIndex(todo => (
        todo.id === Number(todoId)
      ));

      prevState.todos.splice(indexTodoInArray, 1);

      return ({
        todos: prevState.todos,
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

  changeTodoCompleteStatus = ({ target: { dataset: { todoId } } }) => {
    this.setState(prevState => {
      // const isAllCompleted = prevState.todos.every(todo => todo.completed === true);
      // console.dir(prevState.todos);
      return ({
        todos: prevState.todos.reduce((acc, todo) => {
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
      todos: prevState.todos.map(todo => ({
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

  findSomeCompleteTodo = () => {
    const { todos } = this.state;

    return todos.some(todo => (
      todo.completed === true
    ));
  }

  render() {
    const { filteredTodos, filter, todos, isAllTodosCompleted } = this.state;
    const activeTodosLeft = this.countActiveTodos();
    const isSomeTodoComplete = this.findSomeCompleteTodo();
    // console.dir(this.state.filteredTodos);

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTodo addTodoToData={this.addTodoToData} />
        </header>
        <section className="main" style={{ display: 'block' }}>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onChange={this.changeTodosCompleteStatus}
            checked={isAllTodosCompleted}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
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
          <footer className="footer">
            {!!activeTodosLeft &&
              <span className="todo-count">
                {`${activeTodosLeft} item left`}
              </span>
            }

            <ul className="filters">
              <FilterItem
                href="#/"
                dataFilter="all"
                onClick={this.changeFilter}
                anchor="All"
                filter={filter}
              />

              <FilterItem
                href="#/active"
                dataFilter="active"
                onClick={this.changeFilter}
                anchor="Active"
                filter={filter}
              />

              <FilterItem
                href="#/completed"
                dataFilter="completed"
                onClick={this.changeFilter}
                anchor="Completed"
                filter={filter}
              />
            </ul>
            {isSomeTodoComplete &&
              <button
                type="button"
                className="clear-completed"
                onClick={this.deleteAllCompletedTodoFromData}
              >
                Clear completed
              </button>
            }
          </footer>
        }

      </section>
    );
  }
}

export default App;
