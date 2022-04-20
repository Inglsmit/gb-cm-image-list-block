import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
	MediaPlaceholder,
	BlockControls,
	MediaReplaceFlow,
} from '@wordpress/block-editor';
import {
	Spinner,
	PanelBody,
	TextareaControl,
	TextControl,
	ToolbarButton,
} from '@wordpress/components';
import { isBlobURL } from '@wordpress/blob';

export default function Edit({ attributes, setAttributes }) {
	const { imgID, imgURL, imgAlt, title, description } = attributes;

	const onChangeAlt = (newAlt) => {
		setAttributes({ imgAlt: newAlt });
	};

	const onChangeTitle = (newTitle) => {
		setAttributes({ title: newTitle });
	};

	const onChangeDesc = (newDesc) => {
		setAttributes({ description: newDesc });
	};

	const onSelectImage = (image) => {
		if (!image || !image.url) {
			setAttributes({ imgURL: undefined, imgID: undefined, imgAlt: '' });
			return;
		}
		setAttributes({
			imgURL: image.url,
			imgID: image.id,
			imgAlt: image.alt,
		});
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
					{imgURL && !isBlobURL(imgURL) && (
						<TextareaControl
							label={__('Alt Text', 'cm-image-list')}
							value={imgAlt}
							onChange={onChangeAlt}
							help={__(
								"Alternative text describes your image to people can't see it. Add a short description with its key details.",
								'cm-image-list'
							)}
						/>
					)}
					<TextControl
						label={__('Title', 'cm-image-list')}
						value={title}
						onChange={onChangeTitle}
					/>
					<TextareaControl
						label={__('Description', 'cm-image-list')}
						value={description}
						onChange={onChangeDesc}
						help={__('Descritption of the slide.', 'cm-image-list')}
					/>
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
						mediaId={imgID}
						mediaURL={imgURL}
					/>
					<ToolbarButton onClick={removeImage}>
						{__('Remove Image', 'cm-image-list')}
					</ToolbarButton>
				</BlockControls>
			)}
			<div {...useBlockProps()}>
				{imgURL && (
					<div
						className={`wp-block-cm-block-cm-image-list__image-list-item${
							isBlobURL(imgURL) ? ' is-loading' : ''
						}`}
					>
						<img src={imgURL} alt={imgAlt} />
						{isBlobURL(imgURL) && <Spinner />}
					</div>
				)}
				<MediaPlaceholder
					icon="image"
					onSelect={onSelectImage}
					onSelectURL={onSelectURL}
					// onError={ onUploadError }
					accept="image/*"
					allowedTypes={['image']}
					disableMediaButtons={imgURL}
					// notices={ noticeUI }
				/>
				<RichText
					// ref={ titleRef }
					placeholder={__('Title', 'cm-image-list')}
					tagName="h4"
					onChange={onChangeTitle}
					value={title}
					allowedFormats={[]}
				/>
				<RichText
					placeholder={__('Description', 'cm-image-list')}
					tagName="p"
					className="description"
					onChange={onChangeDesc}
					value={description}
					allowedFormats={[]}
				/>
			</div>
		</>
	);
}
