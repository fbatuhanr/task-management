import { createRoot } from 'react-dom/client'
import StoreProvider from './providers/StoreProvider.tsx';
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
    <StoreProvider>
        <App />
    </StoreProvider>
)
