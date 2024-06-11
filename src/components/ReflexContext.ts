import { Producer } from "@rbxts/reflex";
import { createContext } from "@rbxts/react";

const ReflexContext = createContext<Producer>(undefined!);

export default ReflexContext;
