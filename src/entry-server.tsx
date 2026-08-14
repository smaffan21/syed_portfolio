import { renderToString } from 'react-dom/server';
import App from './App.tsx';
import { caseStudyRoutes, getRouteSeo } from './caseStudies';

export const routes = ['/', ...caseStudyRoutes];

export function render(path: string) {
  return renderToString(<App path={path} />);
}

export { getRouteSeo };
