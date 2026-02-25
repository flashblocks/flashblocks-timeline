import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import { PanelBody, TextareaControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

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
	const { date, iconSvg } = attributes;

	const blockProps = useBlockProps();

	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'fbt-content' },
		{
			template: TEMPLATE,
		}
	);

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Story Settings', 'flashblocks-timeline' ) }>
					<TextareaControl
						label={ __( 'Icon SVG', 'flashblocks-timeline' ) }
						help={ __( 'Paste raw SVG markup. Use fill="currentColor" to inherit the dot color.', 'flashblocks-timeline' ) }
						value={ iconSvg }
						onChange={ ( val ) => setAttributes( { iconSvg: val } ) }
						rows={ 4 }
					/>
				</PanelBody>
			</InspectorControls>
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
					{ iconSvg && (
						<span
							className="fbt-icon"
							dangerouslySetInnerHTML={ { __html: iconSvg } }
						/>
					) }
				</div>
				<div className="fbt-dot" />
				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}
