import { useEffect, useState } from 'react'

import kanaList from './assets/kana.json';
import './App.css'

interface Kana {
  name: string;
  hiragana: string;
}

function App() {
  const length = kanaList.length;
  const [currentKana, setCurrentKana] = useState<Kana>();
  const [showHiragana, setShowHiragana] = useState(false);
  const [alwaysShowKana, setAlwaysShowKana] = useState(false);
  const dictationButtonText = `Dictation mode ${alwaysShowKana ? 'OFF' : 'ON'}`;
  const mainButtonText = showHiragana || alwaysShowKana ? 'Generate' : 'Reveal';

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

  const toogleMainButton = () => {
    if (showHiragana || alwaysShowKana) {
      generateKana();
    } else {
      setShowHiragana(true);
    }
  };

  return (
    <div className='main row'>
      <div className='column gap-20'>
        <button
          className={showHiragana ? 'primary-button' : 'secondary-button'}
          onClick={toogleMainButton}
        >
          {mainButtonText}
        </button>
        <button
          className={`dictation-button${alwaysShowKana ? '' : ' dictation-button__on'}`}
          onClick={() => setAlwaysShowKana(!alwaysShowKana)}
        >
          {dictationButtonText}
        </button>
      </div>
      <div className='row gap-20'>
        {currentKana &&
          <div className='column'>
            <span className='label'>Pronounce:</span>
            <span className='sound'>{currentKana.name}</span>
          </div>
        }
      </div>
       <div className='column gap-20'>
          <div className='column'>
            <span className='label'>Hiragana:</span>
            {currentKana && (showHiragana || alwaysShowKana) &&
              <span className='kana'>{currentKana.hiragana}</span>
            }
          </div>
       </div>
    </div>
  )
}

export default App
