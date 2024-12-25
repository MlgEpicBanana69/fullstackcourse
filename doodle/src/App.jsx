import {useState} from 'react'

const App = () => {
  const [clicks, setClicks] = useState({
    left: 0, right: 0
  })

  const [allClicks, setAllClicks] = useState([])

  const handleLeftClick = () => {
    const newClicks = {
      ...clicks,
      left: clicks.left + 1,
    }
    setAllClicks(allClicks.concat('L'))
    setClicks(newClicks)
  }

  const handleRightClick = () => {
    const newClicks = {
      ...clicks,
      right: clicks.right + 1
    }
    setAllClicks(allClicks.concat('R'))
    setClicks(newClicks)
  }

  return (
    <div>
      {clicks.left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {clicks.right}
      <h1>{allClicks.join('')}</h1>
    </div>
  )
}

export default App