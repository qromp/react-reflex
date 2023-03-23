import { InferDispatchers, InferState, applyMiddleware, combineProducers, loggerMiddleware } from "@rbxts/reflex";
import { counterProducer } from "./counter.producer";

export type RootProducer = typeof producer;
export type RootState = InferState<RootProducer>;
export type RootDispatchers = InferDispatchers<RootProducer>;

export const producer = combineProducers({
	counter: counterProducer,
}).enhance(applyMiddleware(loggerMiddleware));
