import React, { useState } from 'react'

const LLMSelectionUI = ({ onchange }) => {
  const [selectedButton, setSelectedButton] = useState(null)

  const handleClick = (buttonNumber) => {
    setSelectedButton(buttonNumber)
    onchange(buttonNumber)
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '10px',
      }}
    >
      <button onClick={() => handleClick(1)}>Button 1</button>
      <button onClick={() => handleClick(2)}>Button 2</button>
      <button onClick={() => handleClick(3)}>Button 3</button>
      <button onClick={() => handleClick(4)}>Button 4</button>
      <button onClick={() => handleClick(5)}>Button 5</button>
      <button onClick={() => handleClick(6)}>Button 6</button>
    </div>
  )
}

export default LLMSelectionUI
