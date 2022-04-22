import { __ } from '@wordpress/i18n';
import Flickity from 'react-flickity-component';
import {
	useBlockProps,
	InspectorControls,
	MediaPlaceholder,
	BlockControls,
	// MediaReplaceFlow,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import { Spinner, PanelBody, ToolbarButton, Button } from '@wordpress/components';
import { isBlobURL } from '@wordpress/blob';
import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
	const { gallery } = attributes;
	const ids = gallery && gallery.map( el => el.id);
	const ids4Mp = [];
	if (gallery) gallery.forEach( el => ids4Mp.push({id: el.id}) );
	
	const onSelectImage = (media) => {
		// if ( ! media || ! media.url ) {
		// 	setAttributes( { imgURL: undefined, imgID: undefined, imgAlt: '' } );
		// 	return;
		// }

		const images = [];
		media.forEach( el => {
			images.push({
				id: el.id,
				url: el.url,
				alt: el.alt,
			});
		});

		setAttributes({
			gallery: images
		});
	};

	const removeGallery = () => {
		setAttributes({
			imgURL: undefined,
			imgAlt: '',
			imgID: undefined,
		});
	};

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
			{gallery &&
				!gallery.lenght && (
				<BlockControls group="inline">
					<MediaUploadCheck>
						<MediaUpload
							onSelect={onSelectImage}
							allowedTypes={['image']}
							value={ ids }
							render={ ( { open } ) => (
								<Button onClick={ open }>{__('Edit Gallery', 'cm-image-list')}</Button>
							) }
							multiple
							gallery
						/>
					</MediaUploadCheck>
					{/* <MediaReplaceFlow
						name={__('Replace Image', 'cm-image-list')}
						onSelect={onSelectImage}
						// onSelectURL={onSelectURL}
						// onError={ onUploadError }
						accept="image/*"
						allowedTypes={['image']}
						mediaIds={ ['1691', '1687', '1686'] }
						multiple={true}
						// mediaURL={imgURL}
						gallery={true}
					/> */}
					<ToolbarButton onClick={removeGallery}>
						{__('Remove Gallery', 'cm-image-list')}
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
					// onSelectURL={onSelectURL}
					// onError={ onUploadError }
					accept="image/*"
					allowedTypes={['image']}
					// disableMediaButtons={ imgURL }
					// value={ [{id: 770}, {id: '768'}, {id: 807}, {id: 769}] }
					value={ ids4Mp }
					gallery
					multiple
					// notices={ noticeUI }
				/>
			</div>
		</>
	);
}
