import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const API_URL = 'https://heart-disease-cz0u.onrender.com';

const getBotReply = (data) => {
  if (!data) return '';

  if (typeof data === 'string') return data;

  return (
    data.reply ||
    data.response ||
    data.answer ||
    data.message ||
    data.text ||
    data.result ||
    ''
  );
};

export default function ChatBot({ navigation }) {
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your health assistant. How can I help?", type: 'bot' },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef();

  const handleSend = async () => {
    if (!inputText.trim() || loading) return;

    const messageText = inputText.trim();
    const loadingMessage = { text: 'Thinking...', type: 'bot', loading: true };

    setMessages((prev) => [
      ...prev,
      { text: messageText, type: 'user' },
      loadingMessage,
    ]);
    setInputText('');
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: messageText }),
      });

      if (!res.ok) {
        throw new Error(`Chat request failed with status ${res.status}`);
      }

      const data = await res.json();
      const reply = getBotReply(data) || 'I received a response, but it did not include a readable message.';

      setMessages((prev) => [
        ...prev.filter((message) => !message.loading),
        { text: reply, type: 'bot' },
      ]);
    } catch (e) {
      setMessages((prev) => [
        ...prev.filter((message) => !message.loading),
        { text: "Sorry, I'm offline or the server is waking up. Please try again.", type: 'bot' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <View style={styles.headerTextWrap}>
            <Text style={styles.title}>Health Assistant</Text>
            <Text style={styles.subtitle}>Ask quick health questions</Text>
          </View>
        </View>

        <View style={styles.chatCard}>
          <ScrollView
            ref={scrollViewRef}
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
            contentContainerStyle={styles.messagesContent}
            style={styles.window}
          >
            {messages.map((m, i) => (
              <View
                key={`${m.type}-${i}`}
                style={[styles.bubble, m.type === 'user' ? styles.userBubble : styles.botBubble]}
              >
                {m.loading ? (
                  <View style={styles.loadingRow}>
                    <ActivityIndicator size="small" color="#007bff" />
                    <Text style={[styles.botText, styles.loadingText]}>{m.text}</Text>
                  </View>
                ) : (
                  <Text style={m.type === 'user' ? styles.userText : styles.botText}>{m.text}</Text>
                )}
              </View>
            ))}
          </ScrollView>

          <View style={styles.inputBar}>
            <TextInput
              style={styles.input}
              placeholder="Type message..."
              placeholderTextColor="#7a8794"
              value={inputText}
              onChangeText={setInputText}
              returnKeyType="send"
              onSubmitEditing={handleSend}
              editable={!loading}
            />
            <TouchableOpacity
              style={[styles.sendBtn, loading && styles.sendBtnDisabled]}
              onPress={handleSend}
              disabled={loading}
            >
              <Text style={styles.sendText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f0f8fb' },
  chatContainer: { flex: 1, paddingHorizontal: 18, paddingTop: 18, paddingBottom: 14 },
  header: { flexDirection: 'row', alignItems: 'center', marginTop: 18, marginBottom: 18 },
  backButton: { backgroundColor: 'lightblue', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8 },
  backText: { color: '#16313f', fontWeight: '700' },
  headerTextWrap: { flex: 1, marginLeft: 14 },
  title: { color: '#1f2d3d', fontSize: 22, fontWeight: 'bold' },
  subtitle: { color: '#5f6f7a', fontSize: 14, marginTop: 2 },
  chatCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#dceef5',
  },
  window: { flex: 1 },
  messagesContent: { paddingVertical: 8 },
  bubble: { padding: 12, borderRadius: 15, marginVertical: 6, maxWidth: '82%' },
  userBubble: { alignSelf: 'flex-end', backgroundColor: '#007bff' },
  botBubble: { alignSelf: 'flex-start', backgroundColor: '#e8f6fb' },
  userText: { color: '#fff' },
  botText: { color: '#24333f' },
  loadingRow: { flexDirection: 'row', alignItems: 'center' },
  loadingText: { marginLeft: 8 },
  inputBar: {
    flexDirection: 'row',
    paddingTop: 12,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#edf3f6',
  },
  input: {
    flex: 1,
    backgroundColor: '#f7fbfd',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 44,
    borderWidth: 1,
    borderColor: '#d8e9f0',
  },
  sendBtn: {
    backgroundColor: '#007bff',
    minWidth: 64,
    height: 44,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    paddingHorizontal: 14,
  },
  sendBtnDisabled: { opacity: 0.7 },
  sendText: { color: '#fff', fontWeight: '700' },
});
