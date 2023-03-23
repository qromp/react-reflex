<h1 align="center">
	<a href="https://www.npmjs.com/package/@rbxts/roact-reflex">
		<img src="public/logo.png" alt="Reflex" width="200" />
	</a>
	<br />
	<b>Reflex for Roact</b>
</h1>

<div align="center">

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/littensy/roact-reflex/ci.yml?branch=master&style=for-the-badge&logo=github)
[![npm version](https://img.shields.io/npm/v/@rbxts/roact-reflex.svg?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/@rbxts/roact-reflex)
[![npm downloads](https://img.shields.io/npm/dt/@rbxts/roact-reflex.svg?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/@rbxts/roact-reflex)
[![GitHub license](https://img.shields.io/github/license/littensy/roact-reflex?style=for-the-badge)](LICENSE.md)

</div>

---

&nbsp;

## ♻️ Reflex

**Reflex** is a simple state container inspired by [Rodux](https://github.com/roblox/rodux) and [Silo](https://github.com/sleitnick/rbxts-silo), designed to be an all-in-one solution for managing and reacting to state in Roblox games.

This package provides Reflex bindings for Roact using [`@rbxts/roact-hooked`](https://npmjs.com/package/@rbxts/roact-hooked).

&nbsp;

## 📦 Installation

```console
$ npm install @rbxts/roact-reflex
```

```console
$ pnpm add @rbxts/roact-reflex
```

&nbsp;

## 📚 Usage

Reflex offers support for [`@rbxts/roact-hooked`](https://npmjs.com/package/@rbxts/roact-hooked) with the `useSelector()` and `useProducer()` hooks. Using them requires including `ReflexProvider` at the root of your Roact tree.

If you don't want to use generics to get the Producer type you want, Reflex exports the `UseSelectorHook` and `UseProducerHook` types to make it easier:

```tsx
// use-app-producer.ts
export const useAppProducer: UseProducerHook<AppProducer> = useProducer;
```

```tsx
// App.tsx
export default function App() {
	const { increment, decrement } = useAppProducer();

	const count = useSelector(selectCount);

	return (
		<textbutton
			Text={`Count: ${count}`}
			AnchorPoint={new Vector2(0.5, 0.5)}
			Size={new UDim2(0, 100, 0, 50)}
			Position={new UDim2(0.5, 0, 0.5, 0)}
			Event={{
				Activated: increment,
				MouseButton2Click: decrement,
			}}
		/>
	);
}
```

```tsx
// main.client.tsx
Roact.mount(
	<ReflexProvider producer={myProducer}>
		<App />
	</ReflexProvider>,
);
```

When using selector creators, you should avoid calling them in your render method (i.e. `useSelector(createSelectWord("E"))`), since it creates a new selector every time the component renders and risks excessive re-renders. Instead, you can use the `useSelectorCreator()` hook to memoize the selector:

```tsx
const createSelectWord = (word: string) => {
	return createSelector([selectCount] as const, (count) => {
		return word.rep(count);
	});
};
```

```ts
const word = useSelectorCreator(createSelectWord, "E");
```

&nbsp;

## 📝 License

Reflex is licensed under the [MIT License](LICENSE.md).
