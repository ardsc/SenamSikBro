import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  // Image,
  //  Dimensions
} from 'react-native';
import {getAlarm, snoozeAlarm, stopAlarm} from '../alarm';
import Button from '../components/Button';
import {colors, globalStyles} from '../global';
// import bg from '../assets/ring.jpeg';

export default function ({route, navigation}) {
  const [alarm, setAlarm] = useState(null);

  useEffect(() => {
    const alarmUid = route.params.alarmUid;
    // const alarmUid = 'd447953a-2998-4ff5-9176-401ae5ea50b9';

    (async function () {
      const alarm = await getAlarm(alarmUid);
      setAlarm(alarm);
    })();
  }, []);

  if (!alarm) {
    return <View />;
  }

  return (
    <View style={globalStyles.container}>
      <View style={[globalStyles.innerContainer, styles.container]}>
        <View style={styles.textContainer}>
          <Text style={styles.clockText}>
            {alarm.getTimeString().hour} : {alarm.getTimeString().minutes}
          </Text>
          <Text style={styles.title}>{alarm.title}</Text>
        </View>
        {/* <Image
          source={bg}
          style={{
            width: '60%',
            height: '40%',
          }}
        /> */}
        <View style={styles.buttonContainer}>
          <Button
            title={'Snooze'}
            onPress={async () => {
              await snoozeAlarm();
              navigation.goBack();
            }}
          />
          <Button
            title={'Stop'}
            onPress={async () => {
              await stopAlarm();
              navigation.replace('Senam');
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  clockText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 50,
  },
  textContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.BLUE,
  },
});
