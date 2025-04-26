const UserInterface = require('./UserInterface.js');
let ui = new UserInterface();
let info = ui.getAllInfo('./ex1叠后光.mr');
ui.showAllInfo(info);
