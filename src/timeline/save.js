import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { getGapCssValue } from './utils/block-gap';

export default function save( { attributes } ) {
	const { lineColor, dotColor, storyAlignment, dateWidth, timelineWidth, style } = attributes;
	const gapValue = getGapCssValue( style?.spacing?.blockGap );

	const blockProps = useBlockProps.save( {
		className: `align-${ storyAlignment }`,
		style: {
			'--fb-timeline-line-color': lineColor,
			'--fb-timeline-dot-color': dotColor,
			'--fb-timeline-date-width': dateWidth,
			'--fb-timeline-col-width': timelineWidth,
			gap: gapValue,
		},
	} );

	const innerBlocksProps = useInnerBlocksProps.save( blockProps );

	return <div { ...innerBlocksProps } />;
}
