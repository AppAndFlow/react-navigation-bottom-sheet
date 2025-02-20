import * as React from 'react'
import {
  BottomSheetModal,
  type BottomSheetModalProps,
  BottomSheetModalProvider,
  BottomSheetView as RNBottomSheetView,
} from '@gorhom/bottom-sheet'
import { type ParamListBase, useTheme } from '@react-navigation/native'
import { Platform, StyleSheet } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { FullWindowOverlay } from 'react-native-screens'

import type {
  BottomSheetDescriptorMap,
  BottomSheetNavigationConfig,
  BottomSheetNavigationHelpers,
  BottomSheetNavigationProp,
  BottomSheetNavigationState,
} from './types'

type BottomSheetModalScreenProps = BottomSheetModalProps & {
  navigation: BottomSheetNavigationProp<ParamListBase>
}

function Overlay({ children }: { children: React.ReactNode }) {
  if (Platform.OS === 'ios') {
    return (
      <FullWindowOverlay>
        <SafeAreaProvider style={styles.safeAreaProvider}>
          {children}
        </SafeAreaProvider>
      </FullWindowOverlay>
    )
  } else {
    return <>{children}</>
  }
}

function BottomSheetModalScreen({
  index,
  navigation,
  enableDynamicSizing,
  children,
  ...props
}: BottomSheetModalScreenProps) {
  const ref = React.useRef<BottomSheetModal>(null)
  const lastIndexRef = React.useRef(index)

  // Present on mount
  React.useEffect(() => {
    ref.current?.present()
  }, [])

  const isMounted = React.useRef(true)
  React.useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  React.useEffect(() => {
    if (index != null && lastIndexRef.current !== index) {
      ref.current?.snapToIndex(index)
    }
  }, [index])

  const onChange = React.useCallback(
    (newIndex: number) => {
      lastIndexRef.current = newIndex
      if (newIndex >= 0) {
        navigation.snapTo(newIndex)
      }
    },
    [navigation]
  )

  const onDismiss = React.useCallback(() => {
    // BottomSheetModal will call onDismiss on unmount, but we do not want that
    // because we already popped the screen in other cases
    if (isMounted.current) {
      navigation.goBack()
    }
  }, [navigation])

  let content: React.ReactNode
  if (typeof children === 'function') {
    content = children({})
  } else {
    // It's a normal ReactNode
    content = children
  }

  return (
    <BottomSheetModal
      ref={ref}
      index={index}
      enableDynamicSizing={enableDynamicSizing}
      onChange={onChange}
      onDismiss={onDismiss}
      {...props}
    >
      {enableDynamicSizing ? (
        <RNBottomSheetView>{content}</RNBottomSheetView>
      ) : (
        children
      )}
    </BottomSheetModal>
  )
}

const DEFAULT_SNAP_POINTS = ['66%']

type Props = BottomSheetNavigationConfig & {
  state: BottomSheetNavigationState<ParamListBase>
  navigation: BottomSheetNavigationHelpers
  descriptors: BottomSheetDescriptorMap
}

export function BottomSheetView({ state, descriptors }: Props) {
  const { colors } = useTheme()

  const themeBackgroundStyle = React.useMemo(
    () => ({
      backgroundColor: colors.card,
    }),
    [colors.card]
  )

  const themeHandleIndicatorStyle = React.useMemo(
    () => ({
      backgroundColor: colors.border,
    }),
    [colors.border]
  )

  // Use the first route to render the "base" screen under the bottom sheets
  const firstRoute = state.routes[0]
  if (!firstRoute) {
    // no routes at all, probably shouldn't happen, but let's be defensive
    return null
  }

  const firstDescriptor = descriptors[firstRoute.key]
  if (!firstDescriptor) {
    // if we don't have a descriptor for the first route, bail out
    return null
  }

  // If we only have 1 route, we won't render the provider
  // But if a second route is pushed, then we start rendering the provider
  const shouldRenderProvider = React.useRef(false)
  if (state.routes.length > 1) {
    shouldRenderProvider.current = true
  }

  return (
    <>
      {firstDescriptor.render?.()}

      <Overlay>
        {shouldRenderProvider.current && (
          <BottomSheetModalProvider>
            {state.routes.slice(1).map((route) => {
              const descriptor = descriptors[route.key]
              if (!descriptor) {
                return null
              }

              const { options, navigation, render } = descriptor

              const {
                index,
                backgroundStyle,
                handleIndicatorStyle,
                snapPoints,
                enableDynamicSizing,
                ...sheetProps
              } = options

              const snapIndex = Math.min(
                route.snapToIndex ?? index ?? 0,
                snapPoints != null ? snapPoints.length - 1 : 0
              )

              return (
                <BottomSheetModalScreen
                  key={route.key}
                  index={snapIndex}
                  snapPoints={
                    snapPoints == null && !enableDynamicSizing
                      ? DEFAULT_SNAP_POINTS
                      : snapPoints
                  }
                  enableDynamicSizing={enableDynamicSizing}
                  navigation={navigation}
                  backgroundStyle={[themeBackgroundStyle, backgroundStyle]}
                  handleIndicatorStyle={[
                    themeHandleIndicatorStyle,
                    handleIndicatorStyle,
                  ]}
                  {...sheetProps}
                >
                  {render?.()}
                </BottomSheetModalScreen>
              )
            })}
          </BottomSheetModalProvider>
        )}
      </Overlay>
    </>
  )
}

const styles = StyleSheet.create({
  safeAreaProvider: { flex: 1, pointerEvents: 'box-none' },
})
