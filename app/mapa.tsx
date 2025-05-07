import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions} from 'react-native';
import { Picker } from '@react-native-picker/picker';

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
  const [selectedOption, setSelectedOption] = useState('MANUTENCAO');
  const labels = generateLabels();

  const renderItem = ({ item }: { item: string }) => {
    // Define the background color based on the selected option
    const backgroundColor = selectedOption === 'MANUTENCAO' ? 'green' : 'red';
    
    return (
      <View style={[styles.box, { backgroundColor }]}>
        <Text style={styles.text}>{item}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escolha a Opção:</Text>
      <Picker
        selectedValue={selectedOption}
        onValueChange={(itemValue) => setSelectedOption(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Manutenção" value="MANUTENCAO" />
        <Picker.Item label="Recuperação" value="RECUPERACAO" />
      </Picker>

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
    flexGrow: 1,
    backgroundColor: '#000',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#00BFFF',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    backgroundColor: '#1a1a1a',
    borderColor: '#00BFFF',  // Borda na cor azul
    borderWidth: 1,
    marginBottom: 10,
    padding: 12,
    borderRadius: 8,
    fontSize: 15,
    color: '#fff',
  },
  pickerContainer: {
    backgroundColor: '#1a1a1a',
    borderColor: '#00BFFF',  // Borda na cor azul
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
  },
  picker: {
    color: '#fff',
    height: 50,
    width: '100%',
  },
  button: {
    backgroundColor: '#00BFFF',
    padding: 14,
    borderRadius: 10,
    width: '100%',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  clearButtonText: {
    color: '#fff',
    marginLeft: 6,
    fontSize: 15,
  },
  previewBox: {
    marginTop: 25,
    backgroundColor: '#111',
    padding: 15,
    borderRadius: 10,
    width: '100%',
  },
  previewTitle: {
    color: '#00BFFF',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  previewText: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 3,
  },
  editButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#555',
    borderRadius: 6,
  },
});

export default Mapa;
