import { ColorPalette } from '@wordpress/block-editor';
import { BaseControl } from '@wordpress/components';

export function ColorControl( { label, value, onChange } ) {
	return (
		<BaseControl label={ label }>
			<ColorPalette
				value={ value }
				onChange={ onChange }
				clearable={ false }
			/>
		</BaseControl>
	);
}
