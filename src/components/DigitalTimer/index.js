import React, {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timerLimit: 25, // Default timer limit value
      timerRunning: false, // To track whether the timer is running
      timeElapsed: 0, // Track elapsed time in seconds
    }
  }

  // Lifecycle method to clean up the interval when the component is unmounted
  componentWillUnmount() {
    clearInterval(this.timerInterval)
  }

  // To format the time into MM:SS format
  formatTime = () => {
    const {timerLimit, timeElapsed} = this.state
    const totalRemainingSeconds = timerLimit * 60 - timeElapsed
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = totalRemainingSeconds % 60
    const formattedSeconds = seconds > 9 ? seconds : `0${seconds}`
    return `${minutes}:${formattedSeconds}`
  }

  // To handle Start and Pause button click
  onStartOrPauseClick = () => {
    const {timerRunning} = this.state
    if (timerRunning) {
      clearInterval(this.timerInterval)
    } else {
      this.timerInterval = setInterval(this.runTimer, 1000)
    }
    this.setState(prevState => ({
      timerRunning: !prevState.timerRunning,
    }))
  }

  // Timer logic that runs every second
  runTimer = () => {
    const {timerLimit, timeElapsed} = this.state
    const isTimerCompleted = timeElapsed === timerLimit * 60

    if (isTimerCompleted) {
      clearInterval(this.timerInterval)
      this.setState({timerRunning: false})
    } else {
      this.setState(prevState => ({timeElapsed: prevState.timeElapsed + 1}))
    }
  }

  // Reset the timer when Reset button is clicked
  onResetClick = () => {
    clearInterval(this.timerInterval)
    this.setState({
      timerLimit: 25, // Reset to default timer limit
      timeElapsed: 0,
      timerRunning: false,
    })
  }

  // Increment the timer limit
  incrementTimerLimit = () => {
    this.setState(prevState => ({timerLimit: prevState.timerLimit + 1}))
  }

  // Decrement the timer limit
  decrementTimerLimit = () => {
    const {timerLimit} = this.state
    if (timerLimit > 1) {
      this.setState(prevState => ({timerLimit: prevState.timerLimit - 1}))
    }
  }

  render() {
    const {timerLimit, timerRunning} = this.state
    const startPauseText = timerRunning ? 'Pause' : 'Start'
    const startPauseIconUrl = timerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const isButtonsDisabled = timerRunning

    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="timer-container">
          <div className="timer">
            <h1 className="timer-text">{this.formatTime()}</h1>
            <p className="timer-status">
              {timerRunning ? 'Running' : 'Paused'}
            </p>
          </div>
        </div>
        <div className="controls-container">
          <div className="start-reset-container">
            <button
              className="control-button"
              type="button"
              onClick={this.onStartOrPauseClick}
            >
              <img
                src={startPauseIconUrl}
                alt={startPauseText === 'Start' ? 'play icon' : 'pause icon'}
              />
              {startPauseText}
            </button>
            <button
              className="control-button"
              type="button"
              onClick={this.onResetClick}
            >
              <img
                src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                alt="reset icon"
              />
              Reset
            </button>
          </div>
          <div className="set-timer-limit-container">
            <p className="timer-limit-text">Set Timer Limit</p>
            <div className="timer-limit-controls">
              <button
                className="limit-control-button"
                type="button"
                onClick={this.decrementTimerLimit}
                disabled={isButtonsDisabled}
              >
                -
              </button>
              <p className="timer-limit-value">{timerLimit}</p>
              <button
                className="limit-control-button"
                type="button"
                onClick={this.incrementTimerLimit}
                disabled={isButtonsDisabled}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
