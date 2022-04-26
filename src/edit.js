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
import {
	Spinner,
	PanelBody,
	ToolbarButton,
	Button,
	ToggleControl,
	withNotices,
} from '@wordpress/components';
import { isBlobURL } from '@wordpress/blob';
import './editor.scss';

function Edit({ attributes, setAttributes, noticeOperations, noticeUI }) {
	const { gallery, isShowAsList } = attributes;
	const ids = gallery && gallery.length > 0 && gallery.map((el) => el.id);
	// const ids4Mp = [];
	// if (gallery && gallery.length > 0)
	// 	gallery.forEach((el) => ids4Mp.push({ id: el.id }));

	const onSelectImage = (media) => {
		if ( !media ) {
			setAttributes({ gallery: [] });
			return;
		}

		const images = [];
		media.forEach((el) => {
			images.push({
				id: el.id,
				url: el.url,
				alt: el.alt,
			});
		});

		setAttributes({
			gallery: images,
		});
	};

	const flickityOptions = {
		cellAlign: 'center',
		draggable: true,
		contain: true,
		wrapAround: true,
	};

	const onUploadError = (message) => {
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice(message);
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Image List Settings', 'cm-image-list')}>
					<ToggleControl
						label="Show all images"
						help={
							isShowAsList
								? 'Is show all images.'
								: 'Is show as carousel.'
						}
						onChange={(bool) => {
							setAttributes({ isShowAsList: bool });
						}}
						checked={isShowAsList}
					/>
				</PanelBody>
			</InspectorControls>
			{gallery && gallery.length > 0 && (
				<BlockControls group="inline">
					<MediaUploadCheck>
						<MediaUpload
							onSelect={onSelectImage}
							allowedTypes={['image']}
							value={ids}
							render={({ open }) => (
								<Button onClick={open}>
									{__('Edit Gallery', 'cm-image-list')}
								</Button>
							)}
							multiple
							gallery
						/>
					</MediaUploadCheck>
					<ToolbarButton
						onClick={() => {
							setAttributes({
								gallery: [],
							});
						}}
					>
						{__('Remove Gallery', 'cm-image-list')}
					</ToolbarButton>
				</BlockControls>
			)}
			<div {...useBlockProps()}>
				{/* TODO: HOW to optimize the code?  */}
				{isShowAsList && (
					<>
						{gallery &&
							gallery.length > 0 &&
							gallery.map((el) => (
								<>
									<img src={el.url} alt={el.alt} />
									{isBlobURL(el.url) && <Spinner />}
								</>
							))}
					</>
				)}

				{!isShowAsList && (
					<>
						{gallery && gallery.length > 0 && (
							<Flickity
								className={
									'wp-block-cm-block-cm-image-list__carousel'
								}
								options={flickityOptions}
							>
								{gallery.map((el) => (
									<>
										<div className={'carousel-cell'}>
											<img
												src={el.url}
												alt={el.alt}
											/>
											{isBlobURL(el.url) && (
												<Spinner />
											)}
										</div>
									</>
								))}
							</Flickity>
						)}
					</>
				)}

				{ ( !gallery || ( gallery && (gallery.length === undefined || gallery.length === 0 ))) && (
					<MediaPlaceholder
						icon="image"
						onSelect={onSelectImage}
						// onSelectURL={onSelectURL}
						onError={onUploadError}
						accept="image/*"
						allowedTypes={['image']}
						// disableMediaButtons={ imgURL }
						// value={ [{id: 770}, {id: '768'}, {id: 807}, {id: 769}] }
						// value={ids4Mp}
						gallery
						multiple
						notices={noticeUI}
					/>
				)}
			</div>
		</>
	);
}

export default withNotices(Edit);
