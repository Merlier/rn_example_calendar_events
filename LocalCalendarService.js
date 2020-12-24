import RNCalendarEvents from 'react-native-calendar-events';

export const listCalendars = async () => {
  let permissions;
  let calendars = [];
  try {
    permissions = await RNCalendarEvents.checkPermissions();
    if (permissions !== 'authorized') {
      permissions = await RNCalendarEvents.requestPermissions();
    }

    if (permissions !== 'authorized') {
      throw 'Access calendar not authorized';
    }

    calendars = await RNCalendarEvents.findCalendars();
  } catch {}

  return calendars;
};

export const addCalendarEvent = async (event, calendar) => {
  let permissions;
  let createdEvent = false;
  try {
    permissions = await RNCalendarEvents.checkPermissions();
    if (permissions !== 'authorized') {
      permissions = await RNCalendarEvents.requestPermissions();
    }

    if (permissions !== 'authorized') {
      throw 'Access calendar not authorized';
    }

    const eventTmp = {...event};
    eventTmp.calendarId = calendar.id;

    createdEvent = await RNCalendarEvents.saveEvent(event.title, eventTmp);
  } catch (e) {
    console.log(e);
  }

  return createdEvent;
};
