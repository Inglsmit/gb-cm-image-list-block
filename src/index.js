import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import './image-list-item';
import Edit from './edit';
import save from './save';

registerBlockType('cm-block/cm-image-list', {
	edit: Edit,
	save,
});
