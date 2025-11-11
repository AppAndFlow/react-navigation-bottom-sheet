import { Button, Text, View } from 'react-native';
import { useBottomSheetNavigation } from '@appandflow/react-navigation-bottom-sheet';
import { styles } from '../lib/styles';
import type { BottomSheetParamList } from '../lib/types';
import { useLocalSearchParams, usePathname, useRouter } from 'expo-router';

export default function SheetScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const navigation = useBottomSheetNavigation<BottomSheetParamList>();
  const pathname = usePathname();
  return (
    <View style={[styles.container, styles.content]}>
      <Text>Sheet Screen {id}</Text>
      <View style={styles.spacer} />
      <Button
        title="Open new sheet"
        onPress={() => {
          router.push({
            pathname: '/sheet',
            params: { id: Number(id) + 1 },
          });
        }}
      />
      <View style={styles.spacer} />
      <Button
        title="Open new big sheet"
        onPress={() => {
          router.navigate(`/big-sheet?id=${Number(id) + 1}`);
        }}
      />
      <View style={styles.spacer} />
      <Button
        title="Close this sheet"
        onPress={() => {
          router.back();
        }}
      />
      {pathname.includes('big-sheet') && (
        <>
          <View style={styles.spacer} />
          <Button
            title="Snap to top"
            onPress={() => {
              navigation.snapTo(1);
            }}
          />
        </>
      )}
    </View>
  );
}
