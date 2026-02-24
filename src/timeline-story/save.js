import { useBlockProps, useInnerBlocksProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { date } = attributes;

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
				<span className="fbt-icon">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						width="16"
						height="16"
						fill="currentColor"
					>
						<path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" />
					</svg>
				</span>
			</div>
			<div className="fbt-dot" />
			<div { ...innerBlocksProps } />
		</div>
	);
}
