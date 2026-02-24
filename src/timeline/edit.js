import { useBlockProps, useInnerBlocksProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { ColorControl } from './components/color-control';
import { getGapCssValue } from './utils/block-gap';

const ALLOWED_BLOCKS = [ 'flashblocks/timeline-story' ];

const TEMPLATE = [
	[ 'flashblocks/timeline-story', { date: 'Early 1970s' } ],
	[ 'flashblocks/timeline-story', { date: 'Late 1970s' } ],
];

const ALIGNMENT_OPTIONS = [
	{ label: __( 'Top', 'flashblocks-timeline' ), value: 'top' },
	{ label: __( 'Center', 'flashblocks-timeline' ), value: 'center' },
	{ label: __( 'Bottom', 'flashblocks-timeline' ), value: 'bottom' },
];

export default function Edit( { attributes, setAttributes } ) {
	const { lineColor, dotColor, storyAlignment, style } = attributes;
	const gapValue = getGapCssValue( style?.spacing?.blockGap );

	const blockProps = useBlockProps( {
		className: `align-${ storyAlignment }`,
		style: {
			'--fb-timeline-line-color': lineColor,
			'--fb-timeline-dot-color': dotColor,
			gap: gapValue,
		},
	} );

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		template: TEMPLATE,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Timeline Settings', 'flashblocks-timeline' ) }>
					<SelectControl
						label={ __( 'Story Alignment', 'flashblocks-timeline' ) }
						value={ storyAlignment }
						options={ ALIGNMENT_OPTIONS }
						onChange={ ( val ) => setAttributes( { storyAlignment: val } ) }
					/>
					<ColorControl
						label={ __( 'Line Color', 'flashblocks-timeline' ) }
						value={ lineColor }
						onChange={ ( val ) => setAttributes( { lineColor: val } ) }
					/>
					<ColorControl
						label={ __( 'Dot Color', 'flashblocks-timeline' ) }
						value={ dotColor }
						onChange={ ( val ) => setAttributes( { dotColor: val } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...innerBlocksProps } />
		</>
	);
}
