import { __ } from '@wordpress/i18n';
import Flickity from 'react-flickity-component';
import {
	useBlockProps,
	InspectorControls,
	MediaPlaceholder,
	BlockControls,
	MediaReplaceFlow,
} from '@wordpress/block-editor';
import { Spinner, PanelBody, ToolbarButton } from '@wordpress/components';
import { isBlobURL } from '@wordpress/blob';

export default function Edit({ attributes, setAttributes }) {
	const { gallery, imgURL } = attributes;
	// console.log(gallery);

	const onSelectImage = (media) => {
		// console.log(media);

		// if ( ! media || ! media.url ) {
		// 	setAttributes( { imgURL: undefined, imgID: undefined, imgAlt: '' } );
		// 	return;
		// }

		const images = [];
		media.map((el) =>
			images.push({
				id: el.id,
				url: el.url,
				alt: el.alt,
			})
		);

		// console.log('images');
		// console.log(gallery);

		setAttributes({
			gallery: images,
		});
		// setAttributes( { imgURL: image.url, imgID: image.id, imgAlt: image.alt } );
	};

	const onSelectURL = (newURL) => {
		setAttributes({
			imgURL: newURL,
			imgID: undefined,
			imgAlt: '',
		});
	};

	const removeImage = () => {
		setAttributes({
			imgURL: undefined,
			imgAlt: '',
			imgID: undefined,
		});
	};

	// const flickityOptions = {
	// 	initialIndex: 2
	// }

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Image Settings', 'cm-image-list')}>
					{/* { id && (
						<SelectControl
							label={ __( 'Image Size', 'cm-image-list' ) }
							options={ getImageSizeOptions() }
							value={ url }
							onChange={ onChangeImageSize }
						/>
					) } */}
				</PanelBody>
			</InspectorControls>
			{imgURL && (
				<BlockControls group="inline">
					<MediaReplaceFlow
						name={__('Replace Image', 'cm-image-list')}
						onSelect={onSelectImage}
						onSelectURL={onSelectURL}
						// onError={ onUploadError }
						accept="image/*"
						allowedTypes={['image']}
						// mediaId={ imgID }
						mediaURL={imgURL}
					/>
					<ToolbarButton onClick={removeImage}>
						{__('Remove Image', 'cm-image-list')}
					</ToolbarButton>
				</BlockControls>
			)}
			<div {...useBlockProps()}>
				<Flickity>
					{gallery &&
						!gallery.lenght &&
						gallery.map((el) => (
							<>
								<img src={el.url} alt={el.alt} />
								{isBlobURL(el.url) && <Spinner />}
							</>
						))}
				</Flickity>

				<MediaPlaceholder
					icon="image"
					onSelect={onSelectImage}
					onSelectURL={onSelectURL}
					// onError={ onUploadError }
					accept="image/*"
					allowedTypes={['image']}
					// disableMediaButtons={ imgURL }
					multiple
					// notices={ noticeUI }
				/>
			</div>
		</>
	);
}
