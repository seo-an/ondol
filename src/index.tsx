import React from 'react';
import * as ReactDOMClient from 'react-dom/client';

import '../public/css/style.css';
import '../public/css/fonts.css';

import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

// React 애플리케이션의 루트를 생성
const root = ReactDOMClient.createRoot(rootElement);

root.render(<App />);