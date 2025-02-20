import {
  createNavigatorFactory,
  useNavigationBuilder,
  type ParamListBase,
  type StaticConfig,
  type TypedNavigator,
  type NavigatorTypeBagBase,
} from '@react-navigation/native'
import {
  BottomSheetRouter,
  type BottomSheetRouterOptions,
} from './BottomSheetRouter'
import { BottomSheetView } from './BottomSheetView'
import type {
  BottomSheetActionHelpers,
  BottomSheetNavigationEventMap,
  BottomSheetNavigationOptions,
  BottomSheetNavigationState,
  BottomSheetNavigatorProps,
  BottomSheetNavigationProp,
} from './types'

function BottomSheetNavigator({
  id,
  children,
  screenListeners,
  screenOptions,
  ...rest
}: BottomSheetNavigatorProps) {
  const { state, descriptors, navigation, NavigationContent } =
    useNavigationBuilder<
      BottomSheetNavigationState<ParamListBase>,
      BottomSheetRouterOptions,
      BottomSheetActionHelpers<ParamListBase>,
      BottomSheetNavigationOptions,
      BottomSheetNavigationEventMap
    >(BottomSheetRouter, {
      id,
      children,
      screenListeners,
      screenOptions,
    })

  return (
    <NavigationContent>
      <BottomSheetView
        {...rest}
        state={state}
        navigation={navigation}
        descriptors={descriptors}
      />
    </NavigationContent>
  )
}

export function createBottomSheetNavigator<
  const ParamList extends ParamListBase,
  const NavigatorID extends string | undefined = undefined,
  // We'll define a type bag specialized for bottom sheets:
  const TypeBag extends NavigatorTypeBagBase = {
    // The param list from the user
    ParamList: ParamList
    // Optional ID for this navigator
    NavigatorID: NavigatorID
    // The state shape
    State: BottomSheetNavigationState<ParamList>
    // The screen options
    ScreenOptions: BottomSheetNavigationOptions
    // The event map
    EventMap: BottomSheetNavigationEventMap
    // The type of the "navigation" object used by each screen in the navigator
    NavigationList: {
      [RouteName in keyof ParamList]: BottomSheetNavigationProp<
        ParamList,
        RouteName,
        NavigatorID
      >
    }
    // The navigator component
    Navigator: typeof BottomSheetNavigator
  },
  // The static config allows for "static" route config
  const Config extends StaticConfig<TypeBag> = StaticConfig<TypeBag>,
>(config?: Config): TypedNavigator<TypeBag, Config> {
  // We call `createNavigatorFactory` with our un-typed navigator
  // but pass in the config to get the typed container
  return createNavigatorFactory(BottomSheetNavigator)(config)
}
