import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}
const Statistics = (props) => {
  return (
    <div>
      <h1>statistics</h1>
      {props.all > 0 ? (
        <table>
          <tbody>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={props.all} />
          <StatisticLine text="average" value={props.avg} />
          <StatisticLine text="positive" value={props.pos} />
          </tbody>
        </table>
      ) : (
        <p>no feedback given</p>
      )}
    </div>
  )
}
const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [statValue, setStatValue] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1);
    setAll(all + 1)
    setStatValue(statValue + 1)

  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    setAll(all + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1);
    setAll(all + 1)
    setStatValue(statValue - 1)
  }

  let avg =  statValue / all;
  let pos = (good / all) *100;

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good'/>
      <Button handleClick={handleNeutralClick} text='neutral'/>
      <Button handleClick={handleBadClick} text='bad'/>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        avg={avg}
        pos={pos}/>
    </div>

  )
}

export default App