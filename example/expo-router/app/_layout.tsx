import { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { createBottomSheetNavigator } from '@appandflow/react-navigation-bottom-sheet';
import { withLayoutContext } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import type { BottomSheetParamList } from '../lib/types';

const BottomSheetNavigator = createBottomSheetNavigator<BottomSheetParamList>();

const BottomSheet = withLayoutContext(BottomSheetNavigator.Navigator);

const renderBackdrop = (props: BottomSheetBackdropProps) => (
  <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
);

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <BottomSheet
        screenOptions={{
          backdropComponent: renderBackdrop,
          enableDynamicSizing: false,
        }}
      >
        <BottomSheet.Screen name="index" />
        <BottomSheet.Screen name="sheet" />
        <BottomSheet.Screen
          name="big-sheet"
          options={{
            snapPoints: ['60%', '80%'],
          }}
        />
      </BottomSheet>
    </GestureHandlerRootView>
  );
}
