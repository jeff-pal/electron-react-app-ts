import { useEffect } from "react";
const { ipcRenderer } = window.require('electron');

function App() {
  useEffect(
    () => {
      ipcRenderer.send('TEST123', { arg1: 'arg1', arg2: 'arg2' });
      ipcRenderer.on('TEST123', (event, arg) => {
        ipcRenderer.removeAllListeners('TEST123');
        console.log('Event handled', event);
        console.log('Arguments',arg);
      });
    }, 
    []
  )

  return (
    <div>
      My App
    </div>
  );
}

export default App;
