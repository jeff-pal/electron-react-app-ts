import { BrowserWindow as BrowserWindowInterface, Menu as MenuInterface, MenuItem, MenuItemConstructorOptions } from 'electron';
const { Menu } = window.require('@electron/remote')  as { BrowserWindow: typeof BrowserWindowInterface, Menu: typeof MenuInterface };

const menu = (menuOptions: Array<(MenuItemConstructorOptions) | (MenuItem)>)=>{
  const menu = Menu.buildFromTemplate(menuOptions)
  Menu.setApplicationMenu(menu)
}

const useMenu = () => {
  return menu;
}

export default useMenu;