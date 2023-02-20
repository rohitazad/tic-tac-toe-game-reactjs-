import React, {useState} from 'react';
import Square from './square';
const TicTacToeGame = ()=>{
    const [board, setBoard] = useState(Array(9).fill(null));
    const [player, setPlayer] = useState('X');
    const [gemeOver, setGameOver]= useState(false);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const handlerClick = (index)=>{
       // console.log('click to button yes ', index)
       if(board[index] || gemeOver){
        return;
       }
       let newBoard = [...board];
       newBoard[index] = player;
       setBoard(newBoard);

       let winner = calculationWiner (newBoard);
       if(winner){
        setGameOver(true);
        alert(`Player ${winner} has been won`);
       }else if(!newBoard.includes(null)){
        setGameOver(true);
        alert(`The game is Draw!`);
       }else{
        setPlayer(player === 'X' ? 'O' : 'X');
       }
       setHistory([...history, newBoard]);
    }
    const calculationWiner = (square)=>{
        const lines = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];
        for(let i =0; i < lines.length; i ++){
            const [a,b,c] = lines[i];
            if(square[a] && square[a] === square[b] && square[a] === square[c]){
                return square[a];
            }
        }
        return null;
    }
    const resetGameHandler = ()=>{
        setBoard(Array(9).fill(null));
        setPlayer('X')
        setGameOver(false);
    }
    
    const moves = history.map((step, move)=>{
        const desc = move ? `Go to Move #${move}` : 'Go to Game Start';

        return (
            <li key={move}>
                <button onClick={()=>{jumpToMomve(move)}}>
                    {desc}
                </button>
            </li>
        )
    })
    const jumpToMomve = (step)=>{
        //console.log(step);
        setBoard(history[step]);
        setGameOver(false);
        setHistory(history.slice(0, step + 1))
    }
    return (
        <>
            <h2>Tic Tac Toe Game In React Js 18.</h2>
            <div className='board'>
                {
                    board.map((item, index)=>{
                        return <Square clickBtn={handlerClick} key={index} value={item} index={index}/>
                    })
                }
            </div>
            <button onClick={resetGameHandler}> Reset Game</button>
            <ol>
                {moves}
            </ol>
            
        </>
    )
}

export default TicTacToeGame;