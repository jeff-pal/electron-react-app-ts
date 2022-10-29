import { Dialog } from 'electron';
const { shell } = window.require('electron');
const { dialog } = window.require('@electron/remote') as { dialog: Dialog };

const errorBox = (message: string, type: string) => {
  dialog.showErrorBox(message, type);
}

const selectAndOpenFile = (title: string = 'Open Dialogue', message: string = 'First Dialog') => {
  dialog.showOpenDialog(
      {
        title,
        message,
        //pass 'openDirectory' to strictly open directories
        properties: ['openFile'],
        filters: [
          { name: 'All Files', extensions: ['*'] },
          { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
          { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
          // { name: 'Custom File Type', extensions: ['as'] },
        ]
      }
  ).then(result=>{
    shell.openPath(result.filePaths[0]);
    console.log(result.filePaths[0]);
  })
}

export enum messageBoxType {
  Message = 'Message',
  Info = 'Info',
  Error = 'Error',
  Warning = 'Warning'
}

const showMessageBox = (message: string) => {
  dialog.showMessageBox({
    type:'none',
    title:'None',
    message: message
  }
  ).then(result=>{
    console.log(result);
  })
}

const showInfoBox = (message: string, title?: string, buttons ?: string[]) => {
  if(!buttons || buttons.length < 1) {
    throw new Error("Missing parameters");
  }
  dialog.showMessageBox({
    type: 'info',
    title: title || 'Info',
    message: message,
    buttons: buttons
  }
  ).then(result=>{
    console.log(result.response)
  })
}

const showErrorBox = (message: string, title?: string, detail?: string) => {
  dialog.showMessageBox({
    type: 'error',
    title: title || 'Error',
    message: message,
    detail: detail
  }
  ).then(result=>{
      console.log(result)
  })
}

const showWarningBox = (message: string, title?: string, warningCheckboxLabel?: string, buttons ?: string[]) => {
  if(!warningCheckboxLabel || !buttons || buttons.length < 1) {
    throw new Error("Missing parameters");
  }
  dialog.showMessageBox({
    type:'warning',
    title: title || 'Warning',
    message: message,
    checkboxLabel: warningCheckboxLabel,
    buttons: buttons
  }
  ).then(result=>{
      console.log(result.response, result.checkboxChecked)
  })
}

const messageBox = (
  message: string,
  title?: string,
  type: messageBoxType = messageBoxType.Message,
  buttons?: string[],
  errorDetail?: string,
  warningCheckboxLabel?: string
) => {
  switch (type) {
    case messageBoxType.Info:
      showInfoBox(message, title, buttons);
      break;
    case messageBoxType.Error:
      showErrorBox(message, title, errorDetail);
      break;
    case messageBoxType.Warning:
      showWarningBox(message, title, warningCheckboxLabel, buttons);
      break;
    default:
      showMessageBox(message);
      break;
  }
}

const useDialog = () => {
  return { errorBox, selectAndOpenFile, messageBox };
}

export default useDialog;