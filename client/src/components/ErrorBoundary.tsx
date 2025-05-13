import { Component, ReactNode } from "react";
import styles from "./not-found/NotFoundStyles.module.css";

interface ErrorBoundaryProps {
	children: ReactNode;
}

interface ErrorBoundaryStateProps {
	hasError: boolean;
	message?: string;
}

export class ErrorBoundary extends Component<
	ErrorBoundaryProps,
	ErrorBoundaryStateProps
> {
	constructor(props: ErrorBoundaryProps) {
		super(props);

		this.state = {
			hasError: false,
		};
	}

	static getDerivedStateFromError(err: unknown) {
		if (err instanceof Error) {
			return {
				hasError: true,
				message: err.message,
			};
		} else {
			return {
				hasError: true,
				message: "Error occurd!",
			};
		}
	}

	render() {
		if (this.state.hasError) {
			return (
				<div id={styles.wrapper}>
					<h2>Something went wrong!</h2>
					<p>
						Please return to <a href="/">Videos</a>
					</p>
				</div>
			);
		}

		return this.props.children;
	}
}
