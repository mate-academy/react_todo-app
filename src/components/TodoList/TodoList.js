import React from 'react';
import { uuid } from 'uuidv4';
import PropTypes from 'prop-types';
import { TodoFooter } from '../TodoFooter/TodoFooter';
import { addHighLight } from '../Helpers/addHighlight';

export class TodoList extends React.Component {
    state = {
      defaultList: [...this.props.generalList],
      onToggle: 'default',
      value: 0,
    };

    // componentDidUpdate(prevProps) {
    //   if (prevProps.generalList !== this.props.generalList) {
    //     this.setState({
    //       defaultList: this.props.generalList,
    //     });
    //   }
    // }

    static getDerivedStateFromProps(props, state) {
      if (props.generalList !== state.defaultList) {
        return {
          defaultList: props.generalList,
        };
      }

      return null;
    }

    handleShowActive = (index) => {
      this.setState({
        onToggle: 'active',
        value: index,
      });
    }

    handleShowCompleted = (index) => {
      this.setState({
        onToggle: 'completed',
        value: index,
      });
    }

    handleShowAll = (index) => {
      this.setState({
        onToggle: 'default',
        value: index,
      });
    }

    render() {
      const { onToggle, defaultList, value } = this.state;
      const {
        isSubmitted,
        checkBoxId,
        handleChecked,
        handleClearCompleted,
        handleClearTask,
        handleMarkAll,
        isTouched,
      } = this.props;
      const completedTasks = Array.from(checkBoxId.values())
        .filter(task => task !== false).length;
      const remainedTasks = defaultList.length - completedTasks;

      const taskStructure = (id, task) => (
        <li className={addHighLight(id, checkBoxId)} key={uuid()}>
          <div className="view">
            <input
              type="checkbox"
              className="toggle"
              id={`todo-${id}`}
              checked={checkBoxId.get(id) === true}
              onChange={event => handleChecked(id, event.target.checked)}
            />
            <label>{task}</label>
            <button
              type="button"
              onClick={() => handleClearTask(id)}
              className="destroy"
            />
          </div>
          <input type="text" className="edit" />
        </li>
      );

      const listDisplaying = (toggle) => {
        switch (toggle) {
          case 'active':
            return defaultList.filter(task => !checkBoxId.get(task.id))
              .map(task => (
                taskStructure(task.id, task.task)
              ));
          case 'completed':
            return defaultList.filter(task => checkBoxId.get(task.id))
              .map(task => (
                taskStructure(task.id, task.task)
              ));
          default:
            return defaultList.map(task => (
              taskStructure(task.id, task.task)
            ));
        }
      };

      return (
        <>
          <section className="main">
            <input
              type="checkbox"
              onClick={() => handleMarkAll(isTouched)}
              id="toggle-all"
              className="toggle-all"
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
            <ul className="todo-list">
              {listDisplaying(onToggle)}
            </ul>
          </section>
          <TodoFooter
            remainedTasks={remainedTasks}
            value={value}
            handleClearCompleted={handleClearCompleted}
            isSubmitted={isSubmitted}
            handleShowActive={this.handleShowActive}
            handleShowCompleted={this.handleShowCompleted}
            handleShowAll={this.handleShowAll}
          />
        </>
      );
    }
}

TodoList.propTypes = {
  generalList: PropTypes.arrayOf(PropTypes.shape({
    task: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,
  isSubmitted: PropTypes.bool.isRequired,
  checkBoxId: PropTypes.objectOf(PropTypes.any).isRequired,
  handleChecked: PropTypes.func.isRequired,
  handleClearCompleted: PropTypes.func.isRequired,
  handleClearTask: PropTypes.func.isRequired,
  handleMarkAll: PropTypes.func.isRequired,
  isTouched: PropTypes.bool.isRequired,
};
