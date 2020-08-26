import { MenuItem as ReakitMenuItem, useMenuState } from '@wp-g2/a11y';
import {
	Animated,
	Badge,
	Button,
	Card,
	CardFooter,
	CardHeader,
	FlexBlock,
	Heading,
	MenuItem,
	Panel,
	PanelBody,
	PanelHeader,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Scrollable,
	Text,
	View,
	VStack,
} from '@wp-g2/components';
import { FiAperture } from '@wp-g2/icons';
import { ui } from '@wp-g2/styles';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { process } from './processor';
import { isBrowser } from './utils';

export function Hint({ autoAnalyze = true }) {
	const [isAnalyzing, setIsAnalyzing] = useState(false);
	const menu = useMenuState({ visible: true });
	const [issues, setIssues] = useState([]);
	const [didScan, setDidScan] = useState(false);
	const initialAnalyizeTimeoutRef = useRef();
	const didInitialAnalyize = useRef(false);

	const analyze = useCallback(async () => {
		return new Promise((resolve) => {
			const nextIssues = [];

			process({
				onReport: (next) => nextIssues.push(next),
			});

			if (isBrowser) {
				setTimeout(() => {
					setIssues(nextIssues);
					setDidScan(true);
					resolve();
				}, 500);
			}
		});
	}, []);

	useEffect(() => {
		if (!isBrowser) return;

		if (autoAnalyze && !didInitialAnalyize.current) {
			initialAnalyizeTimeoutRef.current = setTimeout(() => {
				analyze();
				setDidScan(true);
				didInitialAnalyize.current = true;
			}, 500);
		}

		return () => {
			if (!isBrowser) return;
			if (initialAnalyizeTimeoutRef.current) {
				clearTimeout(initialAnalyizeTimeoutRef.current);
			}
		};
	}, [autoAnalyze, analyze]);

	const onClick = async () => {
		setIsAnalyzing(true);
		await analyze();
		setIsAnalyzing(false);
	};

	const hasIssues = issues && !!issues.length;

	return (
		<>
			<Card
				css={[
					ui.position.bottomRight,
					{ zIndex: 999999, position: 'fixed' },
					ui.padding(1),
					ui.offset({ x: -16, y: -16 }),
				]}
			>
				<View
					css={[
						ui.background.white,
						ui.borderRadius.circle,
						ui.position.topRight,
						ui.margin.right(-1),
						ui.margin.top(-1),
						{ pointerEvents: 'none', zIndex: 3 },
						ui.scale(hasIssues ? 1 : 0),
						ui.animation.bounce,
					]}
				>
					<Badge color="red" isBold isRounded>
						{issues.length}
					</Badge>
				</View>
				<Popover placement="top-end">
					<PopoverTrigger
						as={Button}
						icon={<FiAperture />}
						variant="primary"
					>
						Hint
					</PopoverTrigger>
					<PopoverContent
						hideOnClickOutside={false}
						maxWidth={300}
						preventBodyScroll={false}
					>
						{hasIssues && (
							<CardHeader>
								<Heading size={5}>
									Issues ({issues.length})
								</Heading>
							</CardHeader>
						)}
						<View css={[ui.padding(1)]}>
							<Scrollable css={[{ maxHeight: '70vh' }]}>
								{!hasIssues && (
									<View css={[ui.padding(8)]}>
										<VStack>
											<Heading align="center" size={4}>
												{didScan
													? 'No Issues'
													: 'Start'}
											</Heading>
											<Text
												align="center"
												isBlock
												variant="muted"
											>
												{didScan
													? 'There are no G2 Component Issues'
													: 'Check for G2 Component issues'}
											</Text>
										</VStack>
									</View>
								)}
								{hasIssues &&
									issues.map((issue, index) => (
										<Animated
											key={index}
											onHoverEnd={() => {
												if (issue.node) {
													issue.node.style.outline = null;
												}
											}}
											onHoverStart={() => {
												if (issue.node) {
													issue.node.style.outline =
														'1px solid rgba(255, 60, 60)';
												}
											}}
										>
											<ReakitMenuItem
												{...menu}
												as={MenuItem}
												css={[ui.padding(1)]}
											>
												<Panel>
													<PanelHeader
														css={[ui.padding.y(1)]}
														title={
															issue.title ||
															issue.name
														}
													/>
													<PanelBody>
														<Text
															size={12}
															variant="muted"
														>
															{issue.message}
														</Text>
													</PanelBody>
												</Panel>
											</ReakitMenuItem>
										</Animated>
									))}
							</Scrollable>
						</View>
						<CardFooter>
							<FlexBlock>
								<Button
									isBlock
									isLoading={isAnalyzing}
									onClick={onClick}
								>
									Analyze
								</Button>
							</FlexBlock>
						</CardFooter>
					</PopoverContent>
				</Popover>
			</Card>
		</>
	);
}
