
import { Pressable, StyleSheet, Text } from 'react-native';

type Props = {
  label: string;
  onPress: () => void;
  theme?: 'primary';
};

export default function Button({ label, onPress, theme }: Props) {
  return (
    <Pressable
      style={[
        styles.button,
        theme === 'primary' && styles.primaryButton,
      ]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginVertical: 8,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#687076',
  },
  buttonText: {
    color: '#25292e',
    fontWeight: 'bold',
  },
});
