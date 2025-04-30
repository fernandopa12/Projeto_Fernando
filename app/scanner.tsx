import { View, Text, StyleSheet } from 'react-native';

export default function ScannerScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela de Scanner QR</Text>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#0A0F2C',
      padding: 20,
    },
    text: {
      fontSize: 20,
      color: '#00BFFF',
      fontWeight: '500',
    },
  });