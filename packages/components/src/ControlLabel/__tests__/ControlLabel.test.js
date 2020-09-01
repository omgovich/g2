import { render } from '@testing-library/react';
import React from 'react';

import { ControlLabel } from '../index';

describe('props', () => {
	test('should render correctly', () => {
		const { container } = render(<ControlLabel>Label</ControlLabel>);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render htmlFor', () => {
		const { container } = render(
			<ControlLabel htmlFor="Field">Label</ControlLabel>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render size', () => {
		const { container } = render(
			<ControlLabel size="small">Label</ControlLabel>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});

	test('should render no truncate', () => {
		const { container } = render(
			<ControlLabel truncate={false}>Label</ControlLabel>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
