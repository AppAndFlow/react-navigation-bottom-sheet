# @appandflow/react-navigation-bottom-sheet

Bottom sheet navigator for React Navigation.

Can also work with Expo Router [example](./example/expo-router/)

Integrates [@gorhom/bottom-sheet](https://github.com/gorhom/react-native-bottom-sheet) with [React Navigation](https://github.com/react-navigation/react-navigation).

## Installation

```sh
yarn add @appandflow/react-navigation-bottom-sheet @react-navigation/native @gorhom/bottom-sheet
```

If you don't have those already, you will also need to install the [@gorhom/bottom-sheet dependencies](https://gorhom.github.io/react-native-bottom-sheet/#dependencies) react-native-reanimated and react-native-gesture-handler.

## Usage

```js
import { createBottomSheetNavigator } from '@appandflow/react-navigation-bottom-sheet';

// ...

const BottomSheet = createBottomSheetNavigator();

<BottomSheet.Navigator
  // Default options
  screenOptions={{ snapPoints: ['60%', '90%'] }}
>
  {/* The first screen should be your app content */}
  <BottomSheet.Screen name="app" component={MyApp} />
  <BottomSheet.Screen name="firstSheet" component={FirstSheetComponent} />
  <BottomSheet.Screen
    name="secondSheet"
    component={SecondSheetComponent}
    // Can pass any prop from @gorhom/bottom-sheet's BottomSheetModal
    options={{ snapPoints: [200, '100%'], index: 1 }}
  />
</BottomSheet.Navigator>;

// ...

// Open like any regular react-navigation screen.
navigation.navigate('firstSheet', { id: 1 });
```

See the React Navigation [example app](./example/react-navigation/src/SimpleExample.tsx) or the Expo Router example under [`example/expo-router/app`](./example/expo-router/app) for full usage details.

### Running the examples

- `yarn example:react-navigation` – launches the classic React Navigation sample
- `yarn example:expo-router` – launches the Expo Router sample

## API

### Navigation options

#### `snapPoints`

```ts
Array<string | number>;
```

Points for the bottom sheet to snap to, points should be sorted from bottom to top. It accepts array of number and string.

Defaults to `['66%']`.

#### Other options

Most props from `BottomSheetModal` are exposed as navigation options. See the [@gorhom/bottom-sheet website](https://gorhom.github.io/react-native-bottom-sheet/modal/props) for full documentation.

### Navigation helpers

Navigation helpers are available on the `navigation` object.

#### `snapTo`

```ts
(index: number) => void
```

Snaps the current sheet to `index`.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
