import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';

const NUM_ROWS = 10;
const NUM_COLUMNS = 4;

const generateLabels = (): string[] => {
  const labels: string[] = [];
  for (let i = 1; i <= NUM_ROWS * NUM_COLUMNS; i++) {
    labels.push(`MD${i.toString().padStart(2, '0')}`);
  }
  return labels;
};

const Mapa: React.FC = () => {
  const labels = generateLabels();

  const renderItem = ({ item }: { item: string }) => (
    <View style={styles.box}>
      <Text style={styles.text}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={labels}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        numColumns={NUM_COLUMNS}
        contentContainerStyle={styles.grid}
        scrollEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: 'black',
  },
  grid: {
    alignItems: 'center',
  },
  box: {
    width: Dimensions.get('window').width / NUM_COLUMNS - 20,
    height: 70,
    borderWidth: 1,
    borderColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    backgroundColor: '#f9f9f9',
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Mapa;
