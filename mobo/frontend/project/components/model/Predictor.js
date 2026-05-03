import React, { useState } from 'react';
import {
  ActivityIndicator, Alert, SafeAreaView, ScrollView, StyleSheet,
  Text, TextInput, TouchableOpacity, View,
} from 'react-native';

const API_URL = 'https://heart-disease-cz0u.onrender.com';

const fields = [
  { key: 'age', label: 'Age', placeholder: 'e.g. 52', type: 'input' },
  { key: 'sex', label: 'Sex', type: 'dropdown', options: [{ label: 'Female', value: '0' }, { label: 'Male', value: '1' }] },
  { key: 'cp', label: 'Chest Pain Type', type: 'dropdown', options: [{ label: 'Typical', value: '0' }, { label: 'Atypical', value: '1' }, { label: 'Non-anginal', value: '2' }, { label: 'Asymptomatic', value: '3' }] },
  { key: 'trestbps', label: 'Resting BP', placeholder: '80 mm Hg', type: 'input' },
  { key: 'chol', label: 'Cholesterol', placeholder: '200 mg/dl', type: 'input' },
  { key: 'fbs', label: 'Fasting Blood Sugar (>120)', type: 'dropdown', options: [{ label: 'No', value: '0' }, { label: 'Yes', value: '1' }] },
  { key: 'restecg', label: 'Rest ECG', type: 'dropdown',options: [{ label: 'Normal', value: '0' }, { label: 'Abnormal', value: '1' }, { label: 'Hypertrophy', value: '2' }] },
  { key: 'thalach', label: 'Max Heart Rate', placeholder: 'e.g. 150', type: 'input' },
  { key: 'exang', label: 'Exercise Angina', type: 'dropdown', options: [{ label: 'No', value: '0' }, { label: 'Yes', value: '1' }] },
  { key: 'oldpeak', label: 'Old Peak', placeholder: 'e.g. 1.4', type: 'input' },
  { key: 'slope', label: 'Slope', type: 'dropdown', options: [{ label: 'Upsloping', value: '0' }, { label: 'Flat', value: '1' }, { label: 'Downsloping', value: '2' }] },
  { key: 'ca', label: 'Major Vessels', placeholder: '0 - 4', type: 'input' },
  { key: 'thal', label: 'Thal', type: 'dropdown', options: [{ label: 'Normal', value: '1' }, { label: 'Fixed', value: '2' }, { label: 'Reversible', value: '3' }] },
];

export default function Predictor({ navigation }) {
  const [formData, setFormData] = useState(Object.fromEntries(fields.map(f => [f.key, ''])));
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handlePredict = async () => {
    if (Object.values(formData).some(val => val === '')) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(Object.entries(formData).map(([k, v]) => [k, parseFloat(v)]))),
      });
      const data = await response.json();
      setResult(data);
    } catch (e) {
      Alert.alert('Error', 'Server is sleeping or offline.');
    } finally { setLoading(false); }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Heart Predictor</Text>
        <View style={styles.formCard}>
          {fields.map((field) => (
            <View key={field.key} style={styles.fieldWrap}>
              <Text style={styles.label}>{field.label}</Text>
              {field.type === 'input' ? (
                <TextInput
                  style={styles.input}
                  placeholder={field.placeholder}
                  keyboardType="numeric"
                  value={formData[field.key]}
                  onChangeText={(val) => setFormData({ ...formData, [field.key]: val })}
                />
              ) : (
                <View style={styles.dropdownContainer}>
                  {field.options.map(opt => (
                    <TouchableOpacity 
                      key={opt.value} 
                      style={[styles.optButton, formData[field.key] === opt.value && styles.optSelected]}
                      onPress={() => setFormData({ ...formData, [field.key]: opt.value })}
                    >
                      <Text style={[styles.optText, formData[field.key] === opt.value && styles.optTextSelected]}>{opt.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          ))}
          <TouchableOpacity style={styles.button} onPress={handlePredict} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>ANALYZE RISK</Text>}
          </TouchableOpacity>
          {result && (
            <View style={[styles.resultBox, styles[result.risk_level?.split(' ')[0].toLowerCase()] || styles.low]}>
              <Text style={styles.resultText}>{result.risk_level}</Text>
              <Text>Probability: {result.probability}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f0f8fb' },
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  formCard: { backgroundColor: '#fff', borderRadius: 10, padding: 16, elevation: 3 },
  fieldWrap: { marginBottom: 15 },
  label: { fontWeight: '700', marginBottom: 8, color: '#333' },
  input: { backgroundColor: '#f7fbfd', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#d8e9f0' },
  dropdownContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  optButton: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, borderWidth: 1, borderColor: '#007bff' },
  optSelected: { backgroundColor: '#007bff' },
  optText: { color: '#007bff', fontSize: 12 },
  optTextSelected: { color: '#fff' },
  button: { backgroundColor: '#007bff', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  resultBox: { marginTop: 20, padding: 15, borderRadius: 10, alignItems: 'center' },
  low: { backgroundColor: '#d4edda' },
  medium: { backgroundColor: '#fff3cd' },
  high: { backgroundColor: '#f8d7da' },
  resultText: { fontSize: 18, fontWeight: 'bold' }
});
