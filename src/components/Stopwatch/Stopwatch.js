import React, { Component } from 'react';

import Button from '../Button/Button';

import './Stopwatch.css';

class Stopwatch extends Component {
  state = {
    running: false,
    elapsed: 0,
    lastTick: 0,
  };

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick = () => {
    if (this.state.running) {
      const now = Date.now();
      const diff = now - this.state.lastTick;

      this.setState(prevState => ({
        elapsed: prevState.elapsed + diff,
        lastTick: now,
      }));
    }
  }

  handleStart = () => {
    this.setState({
      running: true,
      lastTick: Date.now(),
    });
  }

  handlePause = () => {
    this.setState({ running: false });
  }

  handleStop = () => {
    this.setState({
      running: false,
      elapsed: 0,
      lastTick: 0,
    });
  }

  format = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // eslint-disable-next-line max-len
    return `${minutes > 9 ? minutes : `0${minutes}`}:${seconds > 9 ? seconds : `0${seconds}`}`;
  }

  render() {
    const time = this.format(this.state.elapsed);

    return (
      <section className="stopwatch">
        <div className="stopwatch__time">{time}</div>

        <div className="stopwatch__controls">
          {this.state.running
            ? (
              <Button
                className="icon"
                icon="pause"
                onClick={this.handlePause}
              />
            )
            : (
              <Button
                className="icon"
                icon="play_arrow"
                onClick={this.handleStart}
              />
            )
          }

          <Button className="icon" icon="stop" onClick={this.handleStop} />
        </div>
      </section>
    );
  }
}

export default Stopwatch;
