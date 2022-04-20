// eslint-disable-next-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const { imgID, imgURL, imgAlt, title, description } = attributes;

	return (
		<div {...useBlockProps.save()}>
			{imgURL && (
				<img
					src={imgURL}
					alt={imgAlt}
					className={imgID ? `wp-image-${imgID}` : null}
				/>
			)}
			{title && <RichText.Content tagName="h4" value={title} />}
			{description && (
				<RichText.Content
					tagName="p"
					className="description"
					value={description}
				/>
			)}
		</div>
	);
}
