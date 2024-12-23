import './App.css'

import { ThemeProvider } from './components/theme-provider'
import Workbench from './pages/Workbench'

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Workbench />
    </ThemeProvider>
  )
}

export default App
