import { BaseView } from '@wp-g2/css';
import { ComponentsProvider } from '@wp-g2/provider';
import React from 'react';

import {
	Grid,
	InputControl,
	Panel,
	PanelBody,
	PanelHeader,
	Scrollable,
	Spacer,
	Text,
} from '../index';

export default {
	title: 'Example/Sidebar',
};

const InputSuffix = (props) => (
	<Text
		isBlock
		lineHeight={1}
		size={11}
		sx={{ userSelect: 'none' }}
		variant="muted"
		{...props}
	/>
);

const PanelExample = () => {
	return (
		<Panel visible>
			<PanelHeader title="Title" />
			<PanelBody>
				<Spacer>
					<Grid columns={2}>
						<InputControl
							suffix={<InputSuffix>W</InputSuffix>}
							value={300}
						/>
						<InputControl
							suffix={<InputSuffix>H</InputSuffix>}
							value={200}
						/>
					</Grid>
				</Spacer>
				<Spacer>
					<Grid columns={3}>
						<InputControl suffix={<InputSuffix>X</InputSuffix>} />
						<InputControl suffix={<InputSuffix>Y</InputSuffix>} />
						<InputControl suffix={<InputSuffix>Z</InputSuffix>} />
					</Grid>
				</Spacer>
				<Spacer>
					<Grid templateColumns="2fr 1fr">
						<InputControl />
						<InputControl suffix={<InputSuffix>%</InputSuffix>} />
					</Grid>
				</Spacer>
			</PanelBody>
		</Panel>
	);
};

export const _default = () => {
	return (
		<BaseView
			sx={{
				borderLeft: '1px solid #eee',
				bottom: 0,
				height: '100vh',
				maxWidth: 300,
				position: 'fixed',
				right: 0,
				top: 0,
			}}
		>
			<Scrollable>
				<ComponentsProvider
					value={{
						Grid: { spacing: 2 },
						InputControl: { size: 'small' },
					}}
				>
					<PanelExample />
					<PanelExample />
					<PanelExample />
					<PanelExample />
					<PanelExample />
				</ComponentsProvider>
			</Scrollable>
		</BaseView>
	);
};
