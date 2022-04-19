/* eslint-disable no-unused-vars */
import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import './editor.scss';

export default function Edit() {
	return (
		<p {...useBlockProps()}>
			<InnerBlocks
				allowedBlocks={['cm-block/image-list-item']}
				orientation="horizontal"
				template={[['cm-block/image-list-item']]}
			/>
		</p>
	);
}
