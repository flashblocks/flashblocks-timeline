<?php
/**
 * Plugin Name:       Flashblocks Timeline
 * Description:       A vertical timeline container with individual story blocks.
 * Version:           0.1.0
 * Requires at least: 6.8
 * Requires PHP:      7.4
 * Author:            Fleenor Security
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       flashblocks-timeline
 *
 * @package FlashblocksTimeline
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function flashblocks_timeline_block_init() {
	wp_register_block_types_from_metadata_collection(
		__DIR__ . '/build',
		__DIR__ . '/build/blocks-manifest.php'
	);
}
add_action( 'init', 'flashblocks_timeline_block_init' );
