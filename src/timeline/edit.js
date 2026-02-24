import { useBlockProps, useInnerBlocksProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { ColorControl } from './components/color-control';

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
	const { lineColor, dotColor, storyAlignment } = attributes;

	const blockProps = useBlockProps( {
		className: `fb-timeline fb-timeline--align-${ storyAlignment }`,
		style: {
			'--fb-timeline-line-color': lineColor,
			'--fb-timeline-dot-color': dotColor,
		},
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'fb-timeline__stories' },
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			renderAppender: () => null,
		}
	);

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
			<div { ...blockProps }>
				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}
