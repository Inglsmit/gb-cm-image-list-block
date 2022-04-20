import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import Save from './save';

registerBlockType('cm-block/cm-image-list', {
	edit: Edit,
	save: Save,
});
