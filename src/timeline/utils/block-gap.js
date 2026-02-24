/**
 * Convert a WP blockGap value to a usable CSS value.
 *
 * Handles both raw values ("20px", "2rem") and WP preset format
 * ("var:preset|spacing|50" → "var(--wp--preset--spacing--50)").
 *
 * @param {string|undefined} gap Raw blockGap attribute value.
 * @return {string|undefined} CSS-ready gap value, or undefined.
 */
export function getGapCssValue( gap ) {
	if ( ! gap ) {
		return undefined;
	}

	// Convert WP preset format to CSS var().
	if ( gap.startsWith( 'var:' ) ) {
		return 'var(--wp--' + gap.slice( 4 ).replaceAll( '|', '--' ) + ')';
	}

	return gap;
}
