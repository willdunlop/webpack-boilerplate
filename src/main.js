/**
 *                                                    By William Dunlop
 *       _  _______   __           _______ _                     _     
 *      | |/ ____\ \ / /          |__   __| |                   (_)    
 *      | | (___  \ V /   ______     | |  | |__  _ __ ___  ___   _ ___ 
 *  _   | |\___ \  > <   |______|    | |  | '_ \| '__/ _ \/ _ \ | / __|
 * | |__| |____) |/ . \              | |  | | | | | |  __/  __/_| \__ \
 *  \____/|_____//_/ \_\             |_|  |_| |_|_|  \___|\___(_) |___/
 *                                                             _/ |    
 *                                                            |__/     
 *                                                       
 */


/* Three dependencies */
import Core from './core'
import dom from 'jsx-render'


/* UI Dependencies */
import App from './interface/app';


var ui = document.getElementById('ui');
ui.appendChild(<App />);

/** 
 * Probably dont have to append App to window. 
 * Can look at simply calling upon it if we don't want app information to be public
 * */
// window.app = new Core();