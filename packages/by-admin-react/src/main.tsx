import ReactDOM from 'react-dom/client'
import 'virtual:uno.css'
import './index.css'
import App from './App.tsx'


const rootDOM = document.getElementById('root')!
const root = ReactDOM.createRoot(rootDOM)
root.render(<App />)
