import { createProducer } from "@rbxts/reflex";

export interface CounterState {
	count: number;
}

const initialState: CounterState = {
	count: 0,
};

export const counterProducer = createProducer(initialState, {
	increment: (state) => ({ ...state, count: state.count + 1 }),
	decrement: (state) => ({ ...state, count: state.count - 1 }),
	reset: () => ({ ...initialState }),
});

export const selectClientCount = (state: { counter: CounterState }) => state.counter.count;
