import Versions from './components/Versions'

function App(): JSX.Element {
  //const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <Versions></Versions>
    </>
  )
}

export default App
