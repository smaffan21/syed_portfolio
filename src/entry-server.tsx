import { renderToString } from 'react-dom/server';
import App from './App.tsx';
import { getRouteSeo } from './caseStudies';

export const routes = ['/'];

export function render() {
  return renderToString(<App />);
}

export { getRouteSeo };
