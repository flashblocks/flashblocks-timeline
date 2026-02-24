import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { lineColor, dotColor, storyAlignment } = attributes;

	const blockProps = useBlockProps.save( {
		className: `fb-timeline fb-timeline--align-${ storyAlignment }`,
		style: {
			'--fb-timeline-line-color': lineColor,
			'--fb-timeline-dot-color': dotColor,
		},
	} );

	const innerBlocksProps = useInnerBlocksProps.save( {
		className: 'fb-timeline__stories',
	} );

	return (
		<div { ...blockProps }>
			<div { ...innerBlocksProps } />
		</div>
	);
}
