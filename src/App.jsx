import { useState } from 'react';
import { useCallback, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [Length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [Password, setPassword] = useState("");

  // use ref hook
  let referance = useRef(null);

  // useCallback is a React Hook that lets you cache a function definition between re-renders.
  // usage of callback hook
  /* useCallback store the data in cache to reuse parts or threads. 
  Skipping re-rendering of components
    Updating state from a memoized callback
    Preventing an Effect from firing too often
    Optimizing a custom Hook */

  const PasswordGenerator = useCallback(() => {
    let Password = "";
    let num = "0123456789";
    let alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let char = "!@#$%^&*+=<>?-_";

    if (numberAllowed) alpha += num;
    if (charAllowed) alpha += char;

    for (let i = 1; i <= Length; i++) {
      let value = Math.floor(Math.random() * alpha.length + 1);
      Password += alpha.charAt(value);
    }

    setPassword(Password);
  }, [Length, numberAllowed, charAllowed, setPassword]);

  const copyToClipboard = useCallback(() => {
    referance.current?.select();
    window.navigator.clipboard.writeText(Password);
  }, [Password]);


  useEffect(() => {
    PasswordGenerator();
  }, [Length, numberAllowed, charAllowed, PasswordGenerator]);

  return (

    <div className=' w-full bg-gray-700 text-center rounded-lg max-w-md shadow-md m-auto text-emerald-500 password mt-20 p-3'>
      <h1 className='text-3xl text-gray-50 font-bold m-4 px-3 underline block '> PASSWORD GENERATOR </h1>
      <div
        className='flex flex-wra m-3 shadow-sm  bg-white rounded-lg '>
        <input type="text"
          className='bg-white w-full px-4 py-3 outline-0 border-none rounded-lg text-emerald-500'
          value={Password}
          placeholder='Password'
          readOnly
          ref={referance}
        />
        <button type="button" className="bg-gradient-to-r from-green-400 to-blue-500  hover:to-yellow-500 text-white  px-8 py-3 rounded-lg cursor-pointer"
          onClick={copyToClipboard}>
          Copy
        </button>
      </div>
      <div className='flex flex-wrap text-sm gap-2 mt-4 justify-around'>

        <div className='flex items-center gap-x-1 '>
          <input type="range"
            value={Length}
            min={8}
            max={24}
            className="cursor-pointer rounded-lg accent-green-400"
            onChange={(e) => { setLength(e.target.value) }} />
          <label>Length : {Length}</label>
        </div>

        <div className='flex items-center gap-x-1 m-2'>
          <input type="checkbox"
            defaultChecked={numberAllowed}
            id='numberInput'
            onChange={() => { setNumberAllowed((prev) => !prev) }} />
          <label htmlFor='numberInput'>Numbers</label>
        </div>

        <div className='flex items-center gap-x-1 m-2'>
          <input type="checkbox"
            defaultChecked={charAllowed}
            id='charInput'
            onChange={() => { setCharAllowed((prev) => !prev) }} />
          <label htmlFor='charInput'> Character</label>
        </div>
      </div>
      <button type="button" className="bg-gradient-to-r from-green-400 to-emerald-300  hover:to-green-600 text-white  px-8 py-3 rounded-lg cursor-pointer border-none shadow-xl"
        onClick={PasswordGenerator}
      >
        Generate
      </button>
    </div>
  )
}

export default App
