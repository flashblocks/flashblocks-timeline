/**
 * Positions the timeline line to start at the first dot and end at the last dot.
 */
function updateLinePositions() {
	document
		.querySelectorAll( '.wp-block-flashblocks-timeline' )
		.forEach( ( timeline ) => {
			const dots = timeline.querySelectorAll( '.fbt-dot' );
			if ( dots.length < 2 ) {
				return;
			}

			const rect = timeline.getBoundingClientRect();
			const firstDot = dots[ 0 ].getBoundingClientRect();
			const lastDot = dots[ dots.length - 1 ].getBoundingClientRect();

			const firstCenter =
				firstDot.top + firstDot.height / 2 - rect.top;
			const lastCenter =
				lastDot.top + lastDot.height / 2 - rect.top;

			timeline.style.setProperty(
				'--fb-timeline-dot-top',
				`${ firstCenter }px`
			);
			timeline.style.setProperty(
				'--fb-timeline-dot-bottom',
				`${ rect.height - lastCenter }px`
			);
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
