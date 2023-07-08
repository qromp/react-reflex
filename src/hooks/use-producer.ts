import { Producer } from "@rbxts/reflex";
import { useContext } from "@rbxts/react-ts";
import ReflexContext from "../components/ReflexContext";

/**
 * A hook that returns the producer from the ReflexProvider.
 *
 * @example
 * // reflex-hooks.ts
 * export const useAppProducer: UseProducerHook<RootProducer> = useProducer;
 *
 * // MyComponent.tsx
 * const producer = useAppProducer();
 * producer.incrementCounter();
 *
 * @returns The producer from the ReflexProvider.
 */
export type UseProducerHook<T extends Producer> = () => T;

/**
 * Returns the producer from the ReflexProvider. Accepts a generic type
 * parameter that can be used to narrow the type of the producer.
 *
 * @example
 * const producer = useProducer<MyProducer>();
 * producer.incrementCounter();
 *
 * @returns The producer from the ReflexProvider.
 */
export function useProducer<T extends Producer>(): T {
	const producer = useContext(ReflexContext);
	assert(producer, "A ReflexProvider must be rendered above this component to use Roact Reflex Hooks.");
	return producer as T;
}
