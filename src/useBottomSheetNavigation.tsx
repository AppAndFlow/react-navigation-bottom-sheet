import { useNavigation } from '@react-navigation/native';
import type { ParamListBase } from '@react-navigation/native';
import { useCallback } from 'react';
import { BottomSheetActions } from './BottomSheetRouter';
import type { BottomSheetNavigationProp } from './types';

export function useBottomSheetNavigation<
  T extends ParamListBase = ParamListBase,
>(): BottomSheetNavigationProp<T> {
  const navigation = useNavigation<BottomSheetNavigationProp<T>>();

  // Manually add the snapTo helper if it doesn't exist
  const snapTo = useCallback(
    (index: number) => {
      navigation.dispatch(BottomSheetActions.snapTo(index));
    },
    [navigation]
  );

  // Return navigation with snapTo helper
  return {
    ...navigation,
    snapTo,
  } as BottomSheetNavigationProp<T>;
}
