import { Producer } from "@rbxts/reflex";
import { createContext } from "@rbxts/roact";

const ReflexContext = createContext<Producer>(undefined!);

export default ReflexContext;
