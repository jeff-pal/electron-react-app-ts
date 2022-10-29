import { BrowserWindow as BrowserWindowInterface } from 'electron';
const { BrowserWindow } = window.require('@electron/remote')  as { BrowserWindow: typeof BrowserWindowInterface };

const useOpenBrowserWindow = () => {
  return (url: string) => {
    const win = new BrowserWindow();
    win.loadURL(url);
  }
}

export default useOpenBrowserWindow;