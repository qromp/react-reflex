import { Producer } from "@rbxts/reflex";
import { createContext } from "@rbxts/roact";

export interface ReflexContextValue {
	producer: Producer<any, any>;
}

const ReflexContext = createContext<ReflexContextValue>({} as ReflexContextValue);

export default ReflexContext;
