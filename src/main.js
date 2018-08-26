/**
 *                                       By William Dunlop
 *   ______                  ___          __   _ _             
 *  |  ____|                | \ \        / /  | | |            
 *  | |__ ___  _ __ ___  ___| |\ \  /\  / /_ _| | | _____ _ __ 
 *  |  __/ _ \| '__/ _ \/ __| __\ \/  \/ / _` | | |/ / _ \ '__|
 *  | | | (_) | | |  __/\__ \ |_ \  /\  / (_| | |   <  __/ |   
 *  |_|  \___/|_|  \___||___/\__| \/  \/ \__,_|_|_|\_\___|_|                                                                                                                           
 *                                                       
 *                                                       
 */

/* Three dependencies */
import Core from './core'

/* UI Dependencies */
import React from 'react';
import ReactDOM from 'react-dom';

import App from './interface/app';

ReactDOM.render(<App />, document.getElementById('ui'));

/** 
 * Probably dont have to append App to window. 
 * Can look at simply calling upon it if we don't want app information to be public
 * */
window.app = new Core();