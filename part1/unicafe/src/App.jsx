import { useState } from 'react'

const Button = ({text, value, handler}) => {
  return <button onClick={handler(value+1)}>text</button>
}

const StatisticLine = ({text, value}) => {
  return (
    <tbody>
        <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </tbody>
  )
}

const Statistics = ({good, neutral, bad}) => {
  let feedbackCount = () => {
    return good + neutral + bad
  }

  let feedbackAvg = () => {
    return (good * 1 + neutral * 0 + bad * -1) / feedbackCount()
  }

  let feedbackPositive = () => {
    return good / (feedbackCount())
  }

  if (feedbackCount() === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <h2>No feedback given</h2>
      </div>
    )
  }

  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={feedbackCount()} />
        <StatisticLine text="average" value={feedbackAvg()} />
        <StatisticLine text="positive" value={feedbackPositive()} />
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <p>
        <button onClick={() => setGood(good+1)}>good</button>
        <button onClick={() => setNeutral(neutral+1)}>neutral</button>
        <button onClick={() => setBad(bad+1)}>bad</button>
      </p>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App