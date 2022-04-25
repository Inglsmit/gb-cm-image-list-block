import '../assets/lib/flickity/flickity.pkgd.min.js';

// let elem = document.querySelector('.main-carousel');
// let flkty = new Flickity( '.wp-block-cm-block-cm-image-list', {
//     // options
//     cellAlign: 'left',
//     contain: true
//   });

// eslint-disable-next-line no-undef
jQuery('.wp-block-cm-block-cm-image-list__carousel').flickity({
	// options
	cellAlign: 'center',
	draggable: true,
	contain: true,
	wrapAround: true,
	autoPlay: 1900,
	pauseAutoPlayOnHover: true,
});

// do something here ...
