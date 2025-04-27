'use strict';

import React from 'react';

const STORAGE_KEY = 'emoji-count';
const EMOJIS_LIST = ["😒", "😂", "😇", "😎", "🙄"];

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            emojiCounts: JSON.parse(localStorage.getItem(STORAGE_KEY)) || EMOJIS_LIST.map(_ => 0),
            showResults: false
        };
    }
  
    emojiClick = (index) => {
        this.setState((prevState) => {
            const newEmojiCounts = [...prevState.emojiCounts]; 
            newEmojiCounts[index]++;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newEmojiCounts));
            return { 
                emojiCounts: newEmojiCounts,
                showResults: false
            };
        });
    };
 
    showResults = () => {
        this.setState({ showResults: true }); 
    };

    getMaxCount = () => {
        return Math.max(...this.state.emojiCounts);
    };
    
    getWinningEmojiIndex = () => {
        const maxCount = this.getMaxCount();
        return this.state.emojiCounts.indexOf(maxCount);
    };

    clearResults = () => {
        this.setState((prevState) => {
          const clearedEmojiCounts = prevState.emojiCounts.map(() => 0);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(clearedEmojiCounts));
      
          return {
            emojiCounts: clearedEmojiCounts, 
            showResults: false,
          };
        });
    };
  
    render() {
        const winningIndex = this.getWinningEmojiIndex();

        return (
            <div className="emoji-block">
                <h1>Voting for the best smile</h1>
                <ul className="emoji-list">
                    {EMOJIS_LIST.map((emoji, index) => (
                      <li className="emoji-item" key={index}>
                          <span className="emoji" onClick={() => this.emojiClick(index)}>
                              {emoji}
                          </span>
                          {this.state.showResults && (
                              <span className="click-counter">
                                  {this.state.emojiCounts[index]}
                              </span>
                          )}
                      </li>
                    ))}
                </ul>

                <div className="btn-wrap">
                    <button className="btn btn-show" onClick={this.showResults}>Show Results</button>
                    <button className="btn btn-clear" onClick={this.clearResults}>Clear</button>
                </div>

                {this.state.showResults && (<div className='results-block'>
                    {this.getMaxCount() === 0 ? <h2>No winner</h2> : (
                        <h2>Winner: {EMOJIS_LIST[winningIndex]} ({this.getMaxCount()})</h2>
                    )}
                </div>)}
            </div>
        );
    }
}