'use client';
import { useEffect, useState } from 'react';

// Types
type Player = 'X' | 'O';
type Cell = Player | null;

// Helpers
const winningLines = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6],
];

function calculateWinner(board: Cell[]) {
  for (const [a,b,c] of winningLines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return board.every(cell => cell !== null) ? 'Draw' : null;
}

export default function Page() {
  // --- Theme ---
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem('ttt-theme');
    if (saved) setDark(saved === 'dark');
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('ttt-theme', dark ? 'dark' : 'light');
  }, [dark]);

  // --- Game State ---
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [turn, setTurn] = useState<Player>('X');
  const [winner, setWinner] = useState<Player | 'Draw' | null>(null);

  // load saved game
  useEffect(() => {
    const saved = localStorage.getItem('ttt-board');
    if (saved) {
      const data = JSON.parse(saved) as { board: Cell[]; turn: Player; };
      setBoard(data.board);
      setTurn(data.turn);
    }
  }, []);

  // save on change
  useEffect(() => {
    localStorage.setItem(
      'ttt-board',
      JSON.stringify({ board, turn })
    );
    setWinner(calculateWinner(board));
  }, [board, turn]);

  // handle click
  const clickCell = (i: number) => {
    if (board[i] || winner) return;
    const next = board.slice();
    next[i] = turn;
    setBoard(next);
    setTurn(turn === 'X' ? 'O' : 'X');
  };

  // reset
  const reset = () => {
    setBoard(Array(9).fill(null));
    setTurn('X');
    setWinner(null);
    localStorage.removeItem('ttt-board');
  };

  // lib/firebase.ts (or any file you like)
console.log('Firebase project:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground transition-colors duration-500">
      <button
        onClick={() => setDark(!dark)}
        className="absolute top-4 right-4 px-3 py-1 bg-gray-800 dark:bg-gray-200 text-white dark:text-black rounded"
      >
        {dark ? '☀️ Light' : '🌙 Dark'}
      </button>

      <h1 className="text-4xl font-bold mb-8 neon-pink dark:neon-teal animate-flicker">
        Tic‑Tac‑Toe
      </h1>

      <div className="grid grid-cols-3 gap-4">
        {board.map((cell, i) => (
          <div
            key={i}
            onClick={() => clickCell(i)}
            className="w-24 h-24 flex items-center justify-center bg-gray-200 dark:bg-gray-800 rounded-lg cursor-pointer transform hover:scale-110 transition"
          >
            {cell === 'X' && (
              <span className="text-6xl font-extrabold text-neon-pink animate-flicker">
                X
              </span>
            )}
            {cell === 'O' && (
              <span className="text-6xl font-extrabold text-neon-teal animate-pulse-fast">
                O
              </span>
            )}
          </div>
        ))}
      </div>

      {winner && (
        <div className="mt-8 flex items-center space-x-4">
          <span
            className={
              'text-2xl font-semibold ' +
              (winner === 'X'
                ? 'text-neon-pink animate-flicker'
                : winner === 'O'
                ? 'text-neon-teal animate-pulse-fast'
                : 'text-gray-500')
            }
          >
            {winner === 'Draw' ? "It's a draw!" : `${winner} wins!`}
          </span>
          <button
            onClick={reset}
            className="px-4 py-2 bg-gray-800 dark:bg-gray-200 text-white dark:text-black rounded"
          >
            ↻ New Game
          </button>
        </div>
      )}
    </div>
  );
}
