import React, { PropsWithChildren, useMemo } from "@rbxts/react";
import { Producer } from "@rbxts/reflex";
import ReflexContext from "./ReflexContext";

interface ReflexProviderProps<S> extends PropsWithChildren {
	/**
	 * The single Producer in your client.
	 */
	producer: Producer<S, any>;

	/**
	 * An optional state snapshot. Will be used to hydrate the state of the
	 * producer during the first render.
	 */
	initialState?: Partial<S>;
}

function ReflexProvider<S>({ producer, initialState, children }: ReflexProviderProps<S>) {
	useMemo(() => {
		// Run in useMemo to set the state before rendering children
		if (initialState === undefined) {
			return;
		}

		producer.setState({
			...producer.getState(),
			...initialState,
		});
	}, []);

	return <ReflexContext.Provider value={producer}>{children}</ReflexContext.Provider>;
}

export default ReflexProvider
