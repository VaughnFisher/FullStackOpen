import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Heading = (props) => <h1>{props.title}</h1>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Stat = (props) => (
  <p>{props.text} {props.value}</p>
)

const Stats = ({data}) => {
  const total = data.good + data.neutral + data.bad
  const average = (data.good - data.bad)/total
  const positive = 100 * (data.good/total) + ' %'

  console.log(data.good)


  if(total===0){
    return (
      <>
      <h1>Statistics</h1>
      <p>No Feedback Given</p>
      </>
    )
  }
  return (
    <>
    <h1>Statistics</h1>
    <Stat text="Good:" value={data.good} />
    <Stat text="Neutral:" value={data.neutral} />
    <Stat text="Bad" value={data.bad} />
    <Stat text="Average" value={average} />
    <Stat text="Positive" value={positive} />
    </>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const data = {
    good: good,
    neutral: neutral,
    bad: bad
  }


  const title = "Give Feedback!"

  const incGood = newValue => setGood(newValue)

  const incNeutral = newValue => setNeutral(newValue)

  const incBad = newValue => setBad(newValue)

  return (
    <div>
      <Heading title={title} />
      <Button handleClick={() => incGood(good+1)} text="Good" />
      <Button handleClick={() => incNeutral(neutral+1)} text="Neutral" />
      <Button handleClick={() => incBad(bad+1)} text="Bad" />
      <Stats data={data} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)