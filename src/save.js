// eslint-disable-next-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const { gallery } = attributes;

	return (
		<div {...useBlockProps.save()}>
			{gallery &&
				!gallery.lenght &&
				gallery.map((el) => (
					<>
						<img src={el.url} alt={el.alt} />
					</>
				))}
		</div>
	);
}
