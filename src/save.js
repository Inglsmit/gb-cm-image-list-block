// eslint-disable-next-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const { gallery } = attributes;

	return (
		<div
			{...useBlockProps.save()}
		>
			{gallery && gallery.length > 0 && (
				<div className="wp-block-cm-block-cm-image-list__carousel">
					{gallery.map((el) => (
						<>
							<div className={'carousel-cell'}>
								<img
									src={el.url}
									alt={el.alt}
								/>
							</div>
						</>
					))}
				</div>
			)}

		</div>
	);
}
