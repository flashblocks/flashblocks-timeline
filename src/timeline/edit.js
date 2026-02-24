import { useBlockProps, useInnerBlocksProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { ColorControl } from './components/color-control';

const ALLOWED_BLOCKS = [ 'flashblocks/timeline-story' ];

const TEMPLATE = [
	[ 'flashblocks/timeline-story', { date: 'Early 1970s' } ],
	[ 'flashblocks/timeline-story', { date: 'Late 1970s' } ],
];

export default function Edit( { attributes, setAttributes } ) {
	const { lineColor, dotColor } = attributes;

	const blockProps = useBlockProps( {
		className: 'fb-timeline',
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
				<PanelBody title={ __( 'Timeline Colors', 'flashblocks-timeline' ) }>
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
