/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
} from 'react-native';
import LocalCalendarModalComponent from './LocalCalendarModalComponent';
import {addCalendarEvent} from './LocalCalendarService';

const App: () => React$Node = () => {
  const [isVisibleCalendars, setIsVisibleCalendars] = useState(false);
  const [event, setEvent] = useState(null);

  const [title, setTitle] = useState('');
  const [startDateStr, setStartDateStr] = useState('');
  const [endDateStr, setEndDateStr] = useState('');

  const openLocalCalendarModal = () => setIsVisibleCalendars(true);

  const closeLocalCalendarModal = () => setIsVisibleCalendars(false);

  const saveEvent = async (calendar) => {
    await addCalendarEvent(event, calendar);
    closeLocalCalendarModal();
  };

  const saveEventCalendar = async () => {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    const event = {
      title: title,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      allDay: true,
    };

    setEvent(event);
    openLocalCalendarModal();
  };

  return (
    <SafeAreaView style={styles.container}>
      <LocalCalendarModalComponent
        isVisible={isVisibleCalendars}
        closeModal={closeLocalCalendarModal}
        handleCalendarSelected={saveEvent}
        label={'Select a calendar'}
      />
      <View style={styles.form}>
        <Text style={styles.title}>Save calendar event</Text>
        <TextInput
          style={styles.textInput}
          placeholder={'Title'}
          onChangeText={setTitle}
          value={title}
        />
        <TextInput
          style={styles.textInput}
          placeholder={'Start date YYYY-mm-dd'}
          onChangeText={setStartDateStr}
          value={startDateStr}
        />
        <TextInput
          style={styles.textInput}
          placeholder={'End date YYYY-mm-dd'}
          onChangeText={setEndDateStr}
          value={endDateStr}
        />
        <Button onPress={saveEventCalendar} title={'Save'} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  form: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  textInput: {
    backgroundColor: '#fff',
    marginBottom: 5,
  },
});

export default App;
