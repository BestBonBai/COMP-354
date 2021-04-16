import $ from 'jquery';
import Quill from 'quill';
import EditsMenu from './test/editsMenu'
import Edit from './test/edit'
import Counter from './test/counter'
import ShowGroup from './test/showGroup'
global.ShowGroup = ShowGroup;
global.Counter = Counter;
global.Edit = Edit;
global.EditsMenu = EditsMenu;
global.Quill = Quill;
window.$ = $;
global.$ = global.jQuery = $;