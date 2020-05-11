export const winningPositions = [
  [1, 2, 3],
  [1, 4, 7],
  [4, 5, 6],
  [7, 8, 9],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
]

////////////////////////////////////////////////////////////////

export const evaluateState = (positions, wincon) => {
  let winner
  const possibleMoves = getPossibleMoves(positions)

  if (!possibleMoves.length) {
    console.log("DRAW")
    winner = "DRAW"
    return winner
  }
  for (let arr of wincon) {
    let player1 = 0
    let player2 = 0
    for (let num of arr) {
      if (positions[num] === 1) {
        player1++
      } else if (positions[num] === 2) {
        player2++
      }
    }
    if (player1 === 3) {
      winner = 1
      break
    } else if (player2 === 3) {
      winner = 2
      break
    }
  }
  return winner
}

////////////////////////////////////////////////////////////////

export const getPossibleMoves = (positions) => {
  let result = []
  for (let i = 1; i <= 9; i++) {
    if (!positions[i]) {
      result.push(i)
    }
  }
  return result
}

const evaluateMove = (num, wincon, player, playerOneState, playerTwoState) => {
  let finalScore = 0
  const ownState = player === 1 ? playerOneState : playerTwoState
  const opponentState = player === 1 ? playerTwoState : playerOneState

  const isGoodMove = (arr, playerState) => {
    let result = 0
    for (let num of playerState) {
      if (arr.includes(num)) result++
    }
    return result
  }

  for (let arr of wincon) {
    if (arr.includes(num) && isGoodMove(arr, opponentState) === 2) {
      finalScore += 100
    }
    if (arr.includes(num) && !isGoodMove(arr, opponentState)) {
      const moveEvaluation = isGoodMove(arr, ownState)
      if (moveEvaluation === 2) {
        finalScore += 100000
      } else if (moveEvaluation === 1) {
        finalScore += 10
      } else {
        finalScore++
      }
    }
  }
  return finalScore
}

export const decideMove = ({
  positions,
  activePlayer,
  wincon,
  playerOneState,
  playerTwoState,
}) => {
  let bestValue = 0
  let bestMove
  const possibleMoves = getPossibleMoves(positions)
  for (let move of possibleMoves) {
    const evaluation = evaluateMove(
      move,
      wincon,
      activePlayer,
      playerOneState,
      playerTwoState
    )
    if (evaluation > bestValue) {
      bestValue = evaluation
      bestMove = move
    }
  }
  if (!bestMove) return possibleMoves[0]
  return bestMove
}
