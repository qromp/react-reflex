import { InferState, Producer } from "@rbxts/reflex";
import { useEffect, useRef, useState } from "@rbxts/react";
import { useProducer } from "./use-producer";

/**
 * A hook that returns the result of a selector function that is called
 * with the current state of the producer.
 *
 * This type is typically not necessary if your selector function is created
 * with an explicitly typed `state` parameter.
 *
 * @example
 * // reflex-hooks.ts
 * export const useAppSelector: UseSelectorHook<RootProducer> = useSelector;
 *
 * // MyComponent.tsx
 * const counter = useAppSelector((state) => state.counter);
 *
 * @param selector A function that takes the current state of the producer
 * and returns a value to be used in the component.
 * @param equalityFn An optional function that takes the previous and new
 * values returned by the selector and returns true if the new value should
 * be used in the component.
 * @returns The result of the selector function.
 */
export type UseSelectorHook<T extends Producer> = <Selection>(
	selector: (state: InferState<T>) => Selection,
	equalityFn?: (a: Selection, b: Selection) => boolean,
) => Selection;

/**
 * Returns the result of a selector function that is called with the current
 * state of the producer.
 *
 * Accepts a generic type parameter to narrow the type of the producer, but it
 * is typically not necessary if your selector function is created with an
 * explicitly typed `state` parameter.
 *
 * @example
 * const selectCounter = (state: RootState) => state.counter;
 * const counter = useSelector(selectCounter);
 *
 * @param selector A function that takes the current state of the producer
 * and returns a value to be used in the component.
 * @param equalityFn An optional function that takes the previous and new
 * values returned by the selector and returns true if the new value should
 * be used in the component.
 * @returns The result of the selector function.
 */
export function useSelector<T>(selector: (state: any) => T, equalityFn?: (a: T, b: T) => boolean): T {
	const producer = useProducer();
	const latestSelector = useRef(selector);
	const isMount = useRef(true);

	const [selection, setSelection] = useState(() => {
		return producer.getState(selector);
	});

	useEffect(() => {
		if (isMount.current) {
			isMount.current = false;
			return;
		}

		setSelection(producer.getState(selector));
		latestSelector.current = selector;
	}, [selector]);

	useEffect(() => {
		let prevSelection = selection;

		return producer.subscribe((newState) => {
			const newSelection = latestSelector.current(newState);

			if (equalityFn ? !equalityFn(newSelection, prevSelection) : newSelection !== prevSelection) {
				prevSelection = newSelection;
				setSelection(newSelection);
			}
		});
	}, [producer]);

	return selection;
}
