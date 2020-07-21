import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Heading = (props) => <h1>{props.title}</h1>

const Anecdote = (props) => (
  <>
    <p>"{anecdotes[props.anecdote]}"</p>
    <p>has {props.votes[props.anecdote]} votes</p>
  </>
)

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Stat = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
)

const Stats = ({data}) => {
  const total = data.good + data.neutral + data.bad
  const average = (data.good - data.bad)/total
  const positive = 100 * (data.good/total) + ' %'

  if(total===0){
    return (
      <>
      <h1>Statistics</h1>
      <p>No feedback given</p>
      </>
    )
  }
  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <Stat text="Good: " value={data.good} />
          <Stat text="Neutral: " value={data.neutral} />
          <Stat text="Bad: " value={data.bad} />
          <Stat text="Average: " value={average} />
          <Stat text="Positive: " value={positive} />
        </tbody>
      </table>
    </>
  )
}



const MostVotes = (props) => {
  const mostVotes = Math.max(...props.votes)
  const index = props.votes.indexOf(mostVotes)

  if(mostVotes > 0){
    return (
      <>
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdote={index} votes={props.votes} />
      </>
    )
  }

  return (
    <>
      <h1>Anecdote with most votes</h1>
      <p>No votes for anecdotes submitted</p>
    </>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const data = {
    good: good,
    neutral: neutral,
    bad: bad
  }

  const title = "Give Feedback!"

  const incGood = newValue => setGood(newValue)

  const incNeutral = newValue => setNeutral(newValue)

  const incBad = newValue => setBad(newValue)

  const randAnec = newValue => setSelected(newValue)

  const addVote = (selected) => {
    const newVotes = [...votes] 
    newVotes[selected]++
    setVotes(newVotes)
  }

  return (
    <>
    <div>
      <Heading title="Anecdote of the day" />
      <Anecdote anecdote={selected} votes={votes} />
      <Button handleClick={() => addVote(selected)} text="Vote"/>
      <Button handleClick={() => randAnec(Math.floor(Math.random()*6))} text="New Anecdote" />
      <MostVotes anecdotes={anecdotes} votes={votes}/>
    </div>
    <div>
      <Heading title={title} />
      <Button handleClick={() => incGood(good+1)} text="Good" />
      <Button handleClick={() => incNeutral(neutral+1)} text="Neutral" />
      <Button handleClick={() => incBad(bad+1)} text="Bad" />
      <Stats data={data} />
    </div>
    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(<App />, 
  document.getElementById('root')
)