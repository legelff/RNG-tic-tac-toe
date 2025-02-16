import { useState, useRef } from 'react'
import './App.css'

function App() {
  // table refs
  const r1c1 = useRef<HTMLTableDataCellElement>(null);
  const r1c2 = useRef<HTMLTableDataCellElement>(null);
  const r1c3 = useRef<HTMLTableDataCellElement>(null);
  const r2c1 = useRef<HTMLTableDataCellElement>(null);
  const r2c2 = useRef<HTMLTableDataCellElement>(null);
  const r2c3 = useRef<HTMLTableDataCellElement>(null);
  const r3c1 = useRef<HTMLTableDataCellElement>(null);
  const r3c2 = useRef<HTMLTableDataCellElement>(null);
  const r3c3 = useRef<HTMLTableDataCellElement>(null);

  // turn =  0 -> X / turn =  1 -> O
  const [turn, setTurn] = useState<number>(() => Math.round(Math.random()));

  const [user1, setUser1] = useState<string>("Player 1"); // replaceable with own name
  const [healthUser1, setHealthUser1] = useState<number>(100); // percentage of health (healthbar)
  const [scoreUser1, setScoreUser1] = useState<number>(0); // total score of user

  const [user2, setUser2] = useState<string>("Player 2")
  const [healthUser2, setHealthUser2] = useState<number>(100);
  const [scoreUser2, setScoreUser2] = useState<number>(0);

  const handleWin = (() => {
    if (turn === 0) {
      // reduce health of O
      const randomDmg: number = Math.round(Math.random() * (50 - 20) + 20); // remove from 20 to 50 health
      const newHealth: number = healthUser2 - randomDmg;

      if (newHealth <= 0) {
        // user2 lost
        setHealthUser2(0);
        setScoreUser1(scoreUser1 + 1);

        setTimeout(() => {
          setHealthUser2(100);
          setHealthUser1(100);
        }, 1000);
      }

      else {
        setHealthUser2(newHealth);
      }
    }

    else {
      // reduce health of X
      const randomDmg: number = Math.round(Math.random() * (50 - 20) + 20); // remove from 20 to 50 health
      const newHealth: number = healthUser1 - randomDmg;

      if (newHealth <= 0) {
        // user1 lost
        setHealthUser1(0);
        setScoreUser2(scoreUser1 + 1);

        setTimeout(() => {
          setHealthUser1(100);
          setHealthUser2(100);
        }, 1000);
      }

      else {
        setHealthUser1(newHealth);
      }
    }
  })

  const handleDraw = (() => {
    // reduce health of both
    const randomDmgX: number = Math.round(Math.random() * (30 - 10) + 10); // remove from 10 to 30 health
    const randomDmgO: number = Math.round(Math.random() * (30 - 10) + 10);
    const newHealthX: number = healthUser1 - randomDmgX;
    const newHealthO: number = healthUser2 - randomDmgO;

    if (newHealthX <= 0 && newHealthO <= 0) {
      setHealthUser1(0);
      setHealthUser2(0);

      // both below 0, check which had more health to decide the winner
      if (healthUser1 === healthUser2) {
        // both get a point
        setScoreUser1(scoreUser1 + 1);
        setScoreUser2(scoreUser2 + 1);
      }

      else if (healthUser1 > healthUser2) {
        // X wins
        setScoreUser1(scoreUser1 + 1);
      }

      else {
        // O wins
        setScoreUser2(scoreUser2 + 1);
      }

      setTimeout(() => {
        setHealthUser1(100);
        setHealthUser2(100);
      }, 1000);
    }

    else if (newHealthX <= 0) {
      // X lost
      setHealthUser1(0);
      setHealthUser2(newHealthO);

      setScoreUser2(scoreUser2 + 1);

      setTimeout(() => {
        setHealthUser1(100);
        setHealthUser2(100);
      }, 1000);
    }

    else if (newHealthO <= 0) {
      // O lost
      setHealthUser2(0);
      setHealthUser1(newHealthX);

      setScoreUser1(scoreUser1 + 1);

      setTimeout(() => {
        setHealthUser1(100);
        setHealthUser2(100);
      }, 1000);
    }

    else {
      // both take damage because draw
      setHealthUser1(newHealthX);
      setHealthUser2(newHealthO);
    }
  })

  const handleClick = (() => {
    let win: boolean = false;
    let draw: boolean = false;

    // check based on turn
    if (turn === 0) {
      // turn X -> check if X won
      // check rows
      if (r1c1.current?.innerHTML === 'X' && r1c2.current?.innerHTML === 'X' && r1c3.current?.innerHTML === 'X') {
        // row 1 X win
        win = true;
        handleWin();
      }

      else if (r2c1.current?.innerHTML === 'X' && r2c2.current?.innerHTML === 'X' && r2c3.current?.innerHTML === 'X') {
        // row 2 X win
        win = true;
        handleWin();
      }

      else if (r3c1.current?.innerHTML === 'X' && r3c2.current?.innerHTML === 'X' && r3c3.current?.innerHTML === 'X') {
        // row 3 X win
        win = true;
        handleWin();
      }

      // check cols
      else if (r1c1.current?.innerHTML === 'X' && r2c1.current?.innerHTML === 'X' && r3c1.current?.innerHTML === 'X') {
        // col 1 X win
        win = true;
        handleWin();
      }

      else if (r1c2.current?.innerHTML === 'X' && r2c2.current?.innerHTML === 'X' && r3c2.current?.innerHTML === 'X') {
        // col 2 X win
        win = true;
        handleWin();
      }

      else if (r1c3.current?.innerHTML === 'X' && r2c3.current?.innerHTML === 'X' && r3c3.current?.innerHTML === 'X') {
        // col 3 X win
        win = true;
        handleWin();
      }

      // check diag
      else if (r1c1.current?.innerHTML === 'X' && r2c2.current?.innerHTML === 'X' && r3c3.current?.innerHTML === 'X') {
        // left to right diag X win
        win = true;
        handleWin();
      }

      else if (r1c3.current?.innerHTML === 'X' && r2c2.current?.innerHTML === 'X' && r3c1.current?.innerHTML === 'X') {
        // right to left diag X win
        win = true;
        handleWin();
      }
    }

    else {
      // turn O -> check if O won
      // check rows
      if (r1c1.current?.innerHTML === 'O' && r1c2.current?.innerHTML === 'O' && r1c3.current?.innerHTML === 'O') {
        // row 1 O win
        win = true;
        handleWin();
      }

      else if (r2c1.current?.innerHTML === 'O' && r2c2.current?.innerHTML === 'O' && r2c3.current?.innerHTML === 'O') {
        // row 2 O win
        win = true;
        handleWin();
      }

      else if (r3c1.current?.innerHTML === 'O' && r3c2.current?.innerHTML === 'O' && r3c3.current?.innerHTML === 'O') {
        // row 3 O win
        win = true;
        handleWin();
      }

      // check cols
      else if (r1c1.current?.innerHTML === 'O' && r2c1.current?.innerHTML === 'O' && r3c1.current?.innerHTML === 'O') {
        // col 1 O win
        win = true;
        handleWin();
      }

      else if (r1c2.current?.innerHTML === 'O' && r2c2.current?.innerHTML === 'O' && r3c2.current?.innerHTML === 'O') {
        // col 2 O win
        win = true;
        handleWin();
      }

      else if (r1c3.current?.innerHTML === 'O' && r2c3.current?.innerHTML === 'O' && r3c3.current?.innerHTML === 'O') {
        // col 3 O win
        win = true;
        handleWin();
      }

      // check diag
      else if (r1c1.current?.innerHTML === 'O' && r2c2.current?.innerHTML === 'O' && r3c3.current?.innerHTML === 'O') {
        // left to right diag O win
        win = true;
        handleWin();
      }

      else if (r1c3.current?.innerHTML === 'O' && r2c2.current?.innerHTML === 'O' && r3c1.current?.innerHTML === 'O') {
        // right to left diag O win
        win = true;
        handleWin();
      }
    }

    if (r1c1.current?.innerHTML != '' && r1c1.current?.innerHTML != '' && r1c2.current?.innerHTML != '' && r1c3.current?.innerHTML != '' && r2c1.current?.innerHTML != '' && r2c2.current?.innerHTML != '' && r2c3.current?.innerHTML != '' && r3c1.current?.innerHTML != '' && r3c2.current?.innerHTML != '' && r3c3.current?.innerHTML != '') {
      draw = true;
      handleDraw();
    }

    if (win || draw) {
      // reset game
      if (r1c1.current) {
        r1c1.current.innerHTML = '';
      }
      
      if (r1c2.current) {
        r1c2.current.innerHTML = '';
      }

      if (r1c3.current) {
        r1c3.current.innerHTML = '';
      }

      if (r2c1.current) {
        r2c1.current.innerHTML = '';
      }
      
      if (r2c2.current) {
        r2c2.current.innerHTML = '';
      }

      if (r2c3.current) {
        r2c3.current.innerHTML = '';
      }

      if (r3c1.current) {
        r3c1.current.innerHTML = '';
      }
      
      if (r3c2.current) {
        r3c2.current.innerHTML = '';
      }

      if (r3c3.current) {
        r3c3.current.innerHTML = '';
      }
    }

    setTurn(turn === 0 ? 1 : 0);
  })

  return (
    <>
    <div className='userInfo userInfo1'>
      <div className='score'
      style={{color: turn === 0 ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.5)'}}>
        {scoreUser1}
      </div>

      <input type="text" value={user1}
      onChange={(e) => setUser1(e.target.value)}
      style={{color: turn === 0 ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.5)'}}/>

      <div className='healthBar healthBar1'
      style={{borderColor: turn === 0 ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.5)',
        color: turn === 0 ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.5)'
      }}>
        {healthUser1}%

        <div style={{width:healthUser1 + '%'}} className='healthBarProgress healthBarProgress1'>
        </div>
      </div>

      <div className='sign'
      style={{color: turn === 0 ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.5)'}}>
        X
      </div>
    </div>

    <div className='userInfo userInfo2'>
      <div className='sign'
      style={{color: turn === 1 ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.5)'}}>
        O
      </div>

      <div className='healthBar healthBar2'
      style={{borderColor: turn === 1 ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.5)',
        color: turn === 1 ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.5)'
      }}>
        {healthUser2}%

        <div style={{width:healthUser2 + '%'}} className='healthBarProgress healthBarProgress2'>
        </div>
      </div>

      <input type="text" value={user2}
      onChange={(e) => setUser2(e.target.value)}
      style={{color: turn === 1 ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.5)'}}/>

      <div className='score'
      style={{color: turn === 1 ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.5)'}}>
        {scoreUser2}
      </div>
    </div>

    <table>
      <tbody>
        <tr>
            <td className='topLeft'
            ref={r1c1}
            onClick={(e) => {
              if (e.currentTarget.innerHTML === '') {
                e.currentTarget.innerHTML = turn === 0 ? 'X' : 'O';
                handleClick();
              }
            }}>       
            </td>

          <td className='topMiddle'
          ref={r1c2}
          onClick={(e) => {
            if (e.currentTarget.innerHTML === '') {
              e.currentTarget.innerHTML = turn === 0 ? 'X' : 'O';
              handleClick();
            }
          }}>
          </td>

          <td className='topRight'
          ref={r1c3}
          onClick={(e) => {
            if (e.currentTarget.innerHTML === '') {
              e.currentTarget.innerHTML = turn === 0 ? 'X' : 'O';
              handleClick();
            }
          }}>         
          </td>
        </tr>

        <tr>
          <td className='middleLeft'
          ref={r2c1}
          onClick={(e) => {
            if (e.currentTarget.innerHTML === '') {
              e.currentTarget.innerHTML = turn === 0 ? 'X' : 'O';
              handleClick();
            }
          }}>
          </td>

          <td className='middleMiddle'
          ref={r2c2}
          onClick={(e) => {
            if (e.currentTarget.innerHTML === '') {
              e.currentTarget.innerHTML = turn === 0 ? 'X' : 'O';
              handleClick();
            }
          }}>         
          </td>

          <td className='middleRight'
          ref={r2c3}
          onClick={(e) => {
            if (e.currentTarget.innerHTML === '') {
              e.currentTarget.innerHTML = turn === 0 ? 'X' : 'O';
              handleClick();
            }
          }}>          
          </td>
        </tr>

        <tr>
          <td className='bottomLeft'
          ref={r3c1}
          onClick={(e) => {
            if (e.currentTarget.innerHTML === '') {
              e.currentTarget.innerHTML = turn === 0 ? 'X' : 'O';
              handleClick();
            }
          }}>
          </td>

          <td className='bottomMiddle'
          ref={r3c2}
          onClick={(e) => {
            if (e.currentTarget.innerHTML === '') {
              e.currentTarget.innerHTML = turn === 0 ? 'X' : 'O';
              handleClick();
            }
          }}>         
          </td>

          <td className='bottomRight'
          ref={r3c3}
          onClick={(e) => {
            if (e.currentTarget.innerHTML === '') {
              e.currentTarget.innerHTML = turn === 0 ? 'X' : 'O';
              handleClick();
            }
          }}>         
          </td>
        </tr>
      </tbody>
      
    </table>
    </>
  )
}

export default App