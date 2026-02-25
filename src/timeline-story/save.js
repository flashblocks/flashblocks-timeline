import { useBlockProps, useInnerBlocksProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { date, iconSvg } = attributes;

	const blockProps = useBlockProps.save();

	const innerBlocksProps = useInnerBlocksProps.save( {
		className: 'fbt-content',
	} );

	return (
		<div { ...blockProps }>
			<div className="fbt-label">
				<RichText.Content
					tagName="span"
					className="fbt-date"
					value={ date }
				/>
				{ iconSvg && (
					<span className="fbt-icon">
						<RichText.Content value={ iconSvg } />
					</span>
				) }
			</div>
			<div className="fbt-dot" />
			<div { ...innerBlocksProps } />
		</div>
	);
}
