import React, { Component } from 'react';
import { isSameMonth, isSameDay, parseISO } from 'date-fns';
import './Graph.css';

export default class Graph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tooltipOpen: false,
      tooltipX: 0,
      tooltipY: 0,
      tooltipExecuted: '',
      tooltipSubtotal: '',
      tooltipIdeal: ''
    };
  }
  render() {
    const {
      goalInSeconds,
      totalExecutedSeconds,
      dateInMonth,
      dailyGoalSeconds,
      dailyData,
      graphData
    } = this.props.graphData;

    const goalHours = goalInSeconds / 3600;
    const currentDayIndex = graphData.findIndex(data => isSameDay(new Date(), parseISO(data.date)));
    const unit = 60 / graphData.length;
    const maxGraphSlice = currentDayIndex === -1 ? graphData.length : (currentDayIndex + 1);

    return (
      <div style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
        <div>
          <strong>Goal: </strong> {hms(goalInSeconds)}<br />
          <strong>Executed: </strong> {hms(totalExecutedSeconds)}<br />
          <strong>Daily goal: </strong> {hms(dailyGoalSeconds)}<br />
          {currentDayIndex !== -1 && (
            <span><strong>Distance from daily goal: </strong> {hms(graphData[currentDayIndex].executedSlope - graphData[currentDayIndex].idealSlope)}</span>
          )}
        </div>
        <div style={{ flex: '1', display: 'none' }}>
          {graphData.map(({ date, goal, executed, idealSlope, executedSlope }, index) => {
            const idealPercent = idealSlope / goalInSeconds;
            const executedPercent = executedSlope / goalInSeconds;
            return (
              <div key={index}
                style={{ padding: '3px', height: '100%', display: 'flex', flex: '1', flexDirection: 'column' }}>
                <div style={{ flex: '1', display: 'flex', alignItems: 'flex-end' }}>
                  <div style={{ background: '#f00', flex: '1', height: `${idealPercent * 100}%` }}
                    title={`Ideal: ${hms(idealSlope)} remaining`} />
                  <div style={{ background: '#0f0', flex: '1', height: `${executedPercent * 100}%` }}
                    title={`Executed: ${hms(executedSlope)} remaining`} />
                </div>
                <div style={{ height: '30px', fontWeight: index === currentDayIndex ? 'bold' : 'normal' }}>
                  {index + 1}.
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ flex: '1' }}>
          <svg style={{ height: '100%', width: '100%' }} version="1" viewBox="0 0 60 30" id="graph">
            {Array.from({ length: goalHours + 1 }, (_, i) => i).map(hour => (
              <path
                strokeWidth={0.1}
                fill="none"
                stroke="#cccccc"
                d={`M 0 ${29 - 28 * (hour / goalHours)} H 60`}
                key={hour}
              />
            ))}
            {Array.from({ length: goalHours + 1 }, (_, i) => i).map(hour => (
              <text
                color="#cccccc"
                x={0}
                y={29.6 - 28 * (hour / goalHours)}
                key={hour}
                fontSize={0.5}
              >
                {hour}
              </text>
            ))}
            <path
              className="ideal"
              d={graphData.map(({ idealSlope }, i) => (
                `${i === 0 ? 'M' : 'L'} ${unit * i + unit / 2} ${29 - (idealSlope / goalInSeconds) * 28}`
              )).join(' ')}
            />
            {graphData.map(({ idealSlope }, i) => (
              <circle
                onMouseOver={event => this.showTooltip(event, i)}
                onMouseLeave={() => this.hideTooltip()}
                cx={unit * i + unit / 2}
                cy={29 - (idealSlope / goalInSeconds) * 28}
                r={0.2}
                className="ideal"
                key={i}
              />
            ))}
            <path className="executed" d={graphData.slice(0, maxGraphSlice).map(({ executedSlope }, i) => (
              `${i === 0 ? 'M' : 'L'} ${unit * i + unit / 2} ${29 - (executedSlope / goalInSeconds) * 28}`
            )).join(' ')} />
            {graphData.slice(0, maxGraphSlice).map(({ executedSlope }, i) => (
              <circle
                onMouseOver={event => this.showTooltip(event, i)}
                onMouseLeave={() => this.hideTooltip()}
                cx={unit * i + unit / 2}
                cy={29 - (executedSlope / goalInSeconds) * 28}
                r={0.2}
                className="executed"
                key={i}
              />
            ))}
            {Array.from({ length: graphData.length }, (_, i) => i).map(day => (
              <text textAnchor="end" x={unit * day + unit / 2} y={30} key={day} fontSize={0.8}>{day + 1}.</text>
            ))}
          </svg>
          <div id="tooltip" style={{
            visibility: this.state.tooltipOpen ? 'visible' : 'hidden',
            left: this.state.tooltipX,
            top: this.state.tooltipY
          }}>
            <p>Executed: {this.state.tooltipExecuted}</p>
            <p>Subtotal: {this.state.tooltipSubtotal}</p>
            <p>Ideal: {this.state.tooltipIdeal}</p>
          </div>
        </div>
      </div>
    )
  }

  showTooltip(event, index) {
    const tooltipDimensions = document.querySelector('#tooltip').getBoundingClientRect();
    const bodyDimensions = document.body.getBoundingClientRect();
    const { left, height, right, top } = event.currentTarget.getBoundingClientRect();
    let tooltipX = right + 20;
    if (tooltipX + tooltipDimensions.width > bodyDimensions.right) {
      tooltipX = left - 20 - tooltipDimensions.width;
    }
    let tooltipY = top + height / 2 - tooltipDimensions.height / 2;
    if (tooltipY + tooltipDimensions.height > bodyDimensions.bottom) {
      tooltipY = bodyDimensions.bottom - tooltipDimensions.height - 5;
    }
    const data = this.props.graphData.graphData[index];
    const totalHours = this.props.graphData.goalInSeconds;
    this.setState({
      tooltipX,
      tooltipY,
      tooltipOpen: true,
      tooltipExecuted: hms(data.executed),
      tooltipSubtotal: hms(totalHours - data.executedSlope),
      tooltipIdeal: hms(totalHours - data.idealSlope)
    });
  }

  hideTooltip() {
    this.setState({ tooltipOpen: false });
  }
}

function hms(seconds) {
  seconds = Math.floor(seconds);
  return [Math.floor(seconds / 3600), Math.floor(seconds / 60) % 60, seconds % 60].map(i => rjust(`${i}`, 2, '0')).join(':')
}

function rjust(string, width, padding) {
  padding = padding || ' ';
  padding = padding.substr(0, 1);
  if (string.length < width)
    return padding.repeat(width - string.length) + string;
  else
    return string;
}
