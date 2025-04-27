'use strict';

import React from "react";
import ReactDOM from 'react-dom/client';

import Main from './components/Main.js';
import './styles.css';

const rootNodeElement = document.querySelector('#main');
const root = ReactDOM.createRoot(rootNodeElement);
root.render(<Main/>);