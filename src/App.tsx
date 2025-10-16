import { useEffect, useState } from 'react'

import kanaList from './assets/kana.json';
import './App.css'

interface Kana {
  name: string;
  nameRu: string;
  hiragana: string;
}

function App() {
  const length = kanaList.length;
  const [currentKana, setCurrentKana] = useState<Kana>();
  const [showHiragana, setShowHiragana] = useState(false);
  const [alwaysShowKana, setAlwaysShowKana] = useState(false);
  const dictationButtonText = `Dictation mode ${alwaysShowKana ? 'OFF' : 'ON'}`;

  useEffect(() => {
    pickKana();
  }, [])

  const pickKana = () => {
    const kana = kanaList[Math.floor(Math.random() * length)];

    setCurrentKana(kana);
  }

  const generateKana = () => {
    pickKana();
    setShowHiragana(false);
  }

  const onKeyDown = ({ code }) => {
    if (code === 'Enter') generateKana();
  }


  return (
    <div className='main row' onKeyDown={onKeyDown}>
      <div className='column gap-20'>
        <button
          className='primary-button'
          onClick={generateKana}
        >
          Generate
        </button>
        {currentKana &&
          <div className='column'>
            <span className='label'>Sound:</span>
            <span className='sound'>{`${currentKana.name} (${currentKana.nameRu})`}</span>
          </div>
        }
      </div>
       <div className='column gap-20'>
        <button className='secondary-button' onClick={() => setShowHiragana(true)}>
          Show kana
        </button>
          <div className='column'>
            <span className='label'>Hiragana:</span>
            {currentKana && (showHiragana || alwaysShowKana) &&
              <span className='kana'>{currentKana.hiragana}</span>
            }
          </div>
       </div>
      <button
        className={`dictation-button${alwaysShowKana ? '' : ' dictation-button__on'}`}
        onClick={() => setAlwaysShowKana(!alwaysShowKana)}
      >
        {dictationButtonText}
      </button>
    </div>
  )
}

export default App
