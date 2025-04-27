'use strict';

import React, { useState } from 'react';

const STORAGE_KEY = 'emoji-count';
const EMOJIS_LIST = ["😒", "😂", "😇", "😎", "🙄"];

export default () => {
    const [emojiCounts, setEmojiCounts] = useState(JSON.parse(localStorage.getItem(STORAGE_KEY)) || EMOJIS_LIST.map(_ => 0));
    const [showResults, setShowResults] = useState(false);
  
    const emojiClick = (index) => {
        const newEmojiCounts = [...emojiCounts]; 
        newEmojiCounts[index]++;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newEmojiCounts));
        setEmojiCounts(newEmojiCounts);
        setShowResults(false);
    };

    const getMaxCount = () => {
        return Math.max(...emojiCounts);
    };
    
    const getWinningEmojiIndex = () => {
        const maxCount = getMaxCount();
        return emojiCounts.indexOf(maxCount);
    };

    const clearResults = () => {
        const newEmojiCounts = emojiCounts.map(() => 0);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newEmojiCounts));
        setEmojiCounts(newEmojiCounts);
        setShowResults(false);
    };
  
    const winningIndex = getWinningEmojiIndex();

    return (
        <div className="emoji-block">
            <h1>Voting for the best smile</h1>
            <ul className="emoji-list">
                {EMOJIS_LIST.map((emoji, index) => (
                    <li className="emoji-item" key={index}>
                        <span className="emoji" onClick={() => emojiClick(index)}>
                            {emoji}
                        </span>
                        {showResults && <span className="click-counter">{emojiCounts[index]}</span>}
                    </li>
                ))}
            </ul>

            <div className="btn-wrap">
                <button className="btn btn-show" onClick={() => setShowResults(true)}>Show Results</button>
                <button className="btn btn-clear" onClick={clearResults}>Clear</button>
            </div>

            {showResults && (<div className='results-block'>
                {getMaxCount() === 0 ? <h2>No winner</h2> : (
                    <h2>Winner: {EMOJIS_LIST[winningIndex]} ({getMaxCount()})</h2>
                )}
            </div>)}
        </div>
    );
}