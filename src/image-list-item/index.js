import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import Edit from './edit';
import Save from './save';

registerBlockType('cm-block/image-list-item', {
	title: __('Image', 'cm-image-list'),
	description: __('Image item', 'cm-image-list'),
	icon: 'image',
	parent: ['cm-block/cm-image-list'],
	supports: {
		reusable: false,
		html: false,
	},
	attributes: {
		imgID: {
			type: 'number',
		},
		imgAlt: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'alt',
			default: '',
		},
		imgURL: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src',
		},
		title: {
			type: 'string',
			source: 'html',
			selector: 'h4',
		},
		description: {
			type: 'string',
			source: 'html',
			selector: 'p.description',
		},
	},
	edit: Edit,
	save: Save,
});
