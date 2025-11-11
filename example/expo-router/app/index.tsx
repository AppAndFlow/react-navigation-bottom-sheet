import { Button, Text, View } from 'react-native';
import { styles } from '../lib/styles';
import { Link, useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <View style={styles.spacer} />
      {/* @ts-expect-error comment - Suppress the error since the runtime will work fine */}
      <Link href="/sheet?id=1" asChild>
        <Button title="Open sheet" />
      </Link>
      <View style={styles.spacer} />
      <Button
        title="Open a big sheet"
        onPress={() => {
          router.push('/big-sheet?id=1');
        }}
      />
    </View>
  );
}
