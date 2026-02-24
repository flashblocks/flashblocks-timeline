/**
 * Positions the timeline line to start at the first dot and end at the last dot.
 */
function updateLinePositions() {
	document.querySelectorAll( '.fb-timeline__stories' ).forEach( ( stories ) => {
		const dots = stories.querySelectorAll( '.fb-timeline-story__dot' );
		if ( dots.length < 2 ) {
			return;
		}

		const storiesRect = stories.getBoundingClientRect();
		const firstDot = dots[ 0 ].getBoundingClientRect();
		const lastDot = dots[ dots.length - 1 ].getBoundingClientRect();

		const firstCenter = firstDot.top + firstDot.height / 2 - storiesRect.top;
		const lastCenter = lastDot.top + lastDot.height / 2 - storiesRect.top;

		stories.style.setProperty( '--fb-timeline-dot-top', `${ firstCenter }px` );
		stories.style.setProperty( '--fb-timeline-dot-bottom', `${ storiesRect.height - lastCenter }px` );
	} );
}

// Run on load and after images settle.
if ( document.readyState === 'complete' ) {
	updateLinePositions();
} else {
	window.addEventListener( 'load', updateLinePositions );
}

// Re-calculate on resize.
window.addEventListener( 'resize', updateLinePositions );
