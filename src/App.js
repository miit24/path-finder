import './App.css';
import { useEffect, useState } from "react";
import { Button, Flex, Spacer } from '@chakra-ui/react'
import { Square } from '@chakra-ui/react';

function App() {
  const [grid, setGrid] = useState([])
  const [n, setN] = useState(20)
  const [endX, setEndX] = useState()
  const [endY, setEndY] = useState()

  let visited = []
  let dp = []

  for (let i = 0; i < n; i++) {
    let temp = [];
    for (let j = 0; j < n; j++) {
      temp.push(0);
    }
    visited.push(temp)
  }

  for (let i = 0; i < n + 1; i++) {
    let temp = [];
    for (let j = 0; j < n + 1; j++) {
      temp.push(-1);
    }
    dp.push(temp)
  }

  useEffect(() => {
    generateMazeTestCase(45)
    setN(grid.length)
    setEndX(n - 1)
    setEndY(n - 1)
  }, [])

  let timeout = (delay) => {
    return new Promise(res => setTimeout(res, delay));
  }

  let isPossible = (x, y) => {
    if ((x >= 0 && x < n) && (y >= 0 && y < n) && grid[x][y] === 1 && visited[x][y] == 0) {
      return true;
    }
    else {
      return false;
    }
  }

  let solve = async (x, y) => {
    if (x === n-1 && y === n-1) {
      setGrid(prev => {
        let old = [...prev];
        old[x][y] = 3;
        return old
      })
      return 1;
    }
    if (dp[x][y] !== -1) return dp[x][y];

    visited[x][y] = 1;

    //down
    let flag = false;
    let newx = x + 1;
    let newy = y;
    if (isPossible(newx, newy)) {
      setGrid(prev => {
        let old = [...prev];
        old[x][y] = 2;
        return old
      })
      await timeout(1)
      flag = await solve(newx, newy);
      if (flag) {
        setGrid(prev => {
          let old = [...prev];
          old[x][y] = 3;
          return old
        })
        return dp[x][y] = flag;
      }
      setGrid(prev => {
        let old = [...prev];
        old[x][y] = 1;
        return old
      })
    }
    
    //right
    newx = x;
    newy = y + 1;
    if (isPossible(newx, newy)) {
      setGrid(prev => {
        let old = [...prev];
        old[x][y] = 2;
        return old
      })
      await timeout(1)
      flag = await solve(newx, newy);
      if (flag) {
        setGrid(prev => {
          let old = [...prev];
          old[x][y] = 3;
          return old
        })
        return dp[x][y] = flag;
      }
      setGrid(prev => {
        let old = [...prev];
        old[x][y] = 1;
        return old
      })
    }
    //left
    newx = x;
    newy = y - 1;
    if (isPossible(newx, newy)) {
      setGrid(prev => {
        let old = [...prev];
        old[x][y] = 2;
        return old
      })
      await timeout(1)
      flag = await solve(newx, newy);
      if (flag) {
        setGrid(prev => {
          let old = [...prev];
          old[x][y] = 3;
          return old
        })
        return dp[x][y] = flag;
      }
      setGrid(prev => {
        let old = [...prev];
        old[x][y] = 1;
        return old
      })
    }

    //up
    newx = x - 1;
    newy = y;
    if (isPossible(newx, newy)) {
      setGrid(prev => {
        let old = [...prev];
        old[x][y] = 2;
        return old
      })
      await timeout(1)
      flag = await solve(newx, newy);
      if (flag) {
        setGrid(prev => {
          let old = [...prev];
          old[x][y] = 3;
          return old
        })
        return dp[x][y] = flag;
      }
      setGrid(prev => {
        let old = [...prev];
        old[x][y] = 1;
        return old
      })
    }


    visited[x][y] = 0;
    return dp[x][y] = 0
  }


let generateMazeTestCase = (n) => {
  // Create the maze matrix
  let maze = [];
  for (let i = 0; i < n; i++) {
    maze[i] = new Array(n).fill(1);
  }

  // Set some random blocks in the maze
  for (let i = 0; i < n * n * 0.3; i++) {
    let x = Math.floor(Math.random() * n);
    let y = Math.floor(Math.random() * n);
    maze[x][y] = 0;
  }
  setGrid(maze)
  setN(maze.length)
  for (let i = 0; i < n; i++) {
    let temp = [];
    for (let j = 0; j < n; j++) {
      temp.push(0);
    }
    visited.push(temp)
  }
  for (let i = 0; i < n + 1; i++) {
    let temp = [];
    for (let j = 0; j < n + 1; j++) {
      temp.push(-1);
    }
    dp.push(temp)
  }
}

let setEndVariable = (i,j)=>{
  setEndX(i)
  setEndY(j)
  alert(`Set Point ${i} ${j}`)
}


return (
  <div className="App">
    {
      grid.map((r, i) => {
        return <Flex className='grid' key={i}>
          {
            r.map((c, ey) => {
              if (c === 1) {
                return (
                  <Square className='square' size='13px' key={ey} style={{ cursor: "pointer" }}
                  >
                  </Square>)
              }
              else if (c === 2) {
                return (
                  <Square className='square' style={{ backgroundColor: "white" }} size='13px' key={ey}>
                  </Square>)
              }
              else if (c === 3) {
                return (
                  <Square className='square' bg='pink.500' size='13px' key={ey}>
                  </Square>)
              }
              else {
                return (
                  <Square className='square' bg='blue.500' size='13px' key={ey}>
                  </Square>)
              }
            })
          }
        </Flex>
      })
    }
    <div className='btn'>
      <Button onClick={() => { solve(0, 0) }}>Start</Button>
      <Button onClick={() => { generateMazeTestCase(45) }}>Generate</Button>
    </div>
  </div>
);
}

export default App;
