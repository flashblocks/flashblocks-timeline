import {
	useBlockProps,
	useInnerBlocksProps,
	RichText,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

const ALLOWED_BLOCKS = [
	'core/image',
	'core/heading',
	'core/paragraph',
	'core/group',
	'core/buttons',
];

const TEMPLATE = [
	[ 'core/image', {} ],
	[
		'core/heading',
		{
			level: 3,
			placeholder: 'Story Title',
		},
	],
	[
		'core/paragraph',
		{
			placeholder: 'Describe this milestone…',
		},
	],
];

export default function Edit( { attributes, setAttributes } ) {
	const { date } = attributes;

	const blockProps = useBlockProps();

	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'fbt-content' },
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
		}
	);

	return (
		<div { ...blockProps }>
			<div className="fbt-label">
				<RichText
					tagName="span"
					className="fbt-date"
					value={ date }
					onChange={ ( val ) => setAttributes( { date: val } ) }
					placeholder={ __( 'Date…', 'flashblocks-timeline' ) }
					allowedFormats={ [] }
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
