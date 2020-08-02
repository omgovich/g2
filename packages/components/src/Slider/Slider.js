import { connect } from '@wp-g2/provider';
import { clamp, noop, useControlledState } from '@wp-g2/utils';
import React from 'react';

import * as styles from './Slider.styles';

const { SliderView } = styles;

function Slider({
	onChange = noop,
	max = 100,
	min = 0,
	size = 'medium',
	style,
	value: valueProp,
	...props
}) {
	const [value, setValue] = useControlledState(valueProp);

	const handleOnChange = (event) => {
		setValue(event.target.value);
		onChange(event.target.value, { event });
	};

	const currentValue = value ? clamp(value, min, max) : 50;
	const componentStyles = {
		...style,
		'--progress': `${currentValue}%`,
	};

	const cx = [styles[size]];

	return (
		<SliderView
			{...props}
			cx={cx}
			onChange={handleOnChange}
			style={componentStyles}
			type="range"
			value={value}
		/>
	);
}

export default connect(Slider);
