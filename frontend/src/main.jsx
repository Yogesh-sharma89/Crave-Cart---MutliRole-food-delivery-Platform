
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import QueryProvider from './provider/QueryProvider.jsx'
createRoot(document.getElementById('root')).render(
<QueryProvider>
  <App/>
</QueryProvider>
)
