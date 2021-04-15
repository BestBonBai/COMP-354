import $ from 'jquery';
import Quill from 'quill';
import EditsMenu from './test/editsMenu'
import Edit from './test/edit'
global.Edit = Edit;
global.EditsMenu = EditsMenu;
global.Quill = Quill;
window.$ = $;
global.$ = global.jQuery = $;