import React, { PropTypes as P } from 'react';
import { connect } from 'react-redux';
import { toggle } from './reducer';

const modify = connect(
  state => ({
    tasks: state.tasks
  })
);

class TaskList extends React.Component {

  static propTypes = {
    text: P.string.isRequired,
    tasks: P.array.isRequired
  };

  toggleCompleted(i) {
    return () => this.props.dispatch(toggle(i));
  }

  render() {
    const { text, tasks } = this.props;
    return (
        <div>
            <h1>Hello, {text}</h1>
            <ol>
              {tasks.map((task, i) =>
                <Item
                  key={i}
                  text={task.text}
                  completed={task.completed}
                  onChange={this.toggleCompleted(i)}
                />
              )}
            </ol>
        </div>
    );
  }
}

export default modify(TaskList);

const Item = ({ text, completed, onChange }) =>
  <li>
    <label>
      <input type="checkbox" checked={completed} onChange={onChange} />
      {text}
      {completed ? " (completed)" : null}
    </label>
  </li>
;
