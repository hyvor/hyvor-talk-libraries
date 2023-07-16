import ReactDOM from 'react-dom/client'
import App from './App';

export default function renderReact(root: HTMLElement) {
    ReactDOM.createRoot(root).render(
        <App />
    );
}