import { renderDefaultAllWorks } from "./works.js";
import { renderButtons } from "./buttons.js";
import { setEditingMode } from "./editing.js";

/*********************************************************************************
 * 
 * This file contains functions to start website. 
 * 
 *********************************************************************************/

setEditingMode();

renderDefaultAllWorks();

renderButtons();