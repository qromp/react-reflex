import { UseProducerHook, useProducer } from "@rbxts/roact-reflex";
import { RootProducer } from "../producer";

export const useAppProducer: UseProducerHook<RootProducer> = useProducer;
