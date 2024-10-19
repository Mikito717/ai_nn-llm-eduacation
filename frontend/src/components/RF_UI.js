import React, { useState } from 'react'

const RF_UI = () => {
  const [nEstimators, setNEstimators] = useState(100)
  const [maxDepth, setMaxDepth] = useState(null)
  const [minSamplesSplit, setMinSamplesSplit] = useState(2)
  const [minSamplesLeaf, setMinSamplesLeaf] = useState(1)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({
      n_estimators: nEstimators,
      max_depth: maxDepth,
      min_samples_split: minSamplesSplit,
      min_samples_leaf: minSamplesLeaf,
    })
  }

  return (
    <div>
      <h1>ランダムフォレストのハイパーパラメータ設定</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>n_estimators:</label>
          <input
            type="number"
            value={nEstimators}
            onChange={(e) => setNEstimators(e.target.value)}
          />
        </div>
        <div>
          <label>max_depth:</label>
          <input
            type="number"
            value={maxDepth}
            onChange={(e) => setMaxDepth(e.target.value)}
          />
        </div>
        <div>
          <label>min_samples_split:</label>
          <input
            type="number"
            value={minSamplesSplit}
            onChange={(e) => setMinSamplesSplit(e.target.value)}
          />
        </div>
        <div>
          <label>min_samples_leaf:</label>
          <input
            type="number"
            value={minSamplesLeaf}
            onChange={(e) => setMinSamplesLeaf(e.target.value)}
          />
        </div>
        <button type="submit">設定を送信</button>
      </form>
    </div>
  )
}

export default RF_UI
