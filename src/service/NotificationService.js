import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";

export default class NotificationService {

    constructor(onNotification) {
        this.configure(onNotification);
        this.lastId = 0;
      }
      configure() {
PushNotification.configure({

  onNotification: function (notification) {
    //console.log('notification clicked')
    console.log("NOTIFICATION:", notification);
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },


  popInitialNotification: false,

  requestPermissions: true,
  requestPermissions: Platform.OS === 'ios'
});
}

createChannel=(channel)=>{
    PushNotification.createChannel(
        {
          channelId: channel, // (required)
          channelName: "My channel", // (required)
          channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
          playSound: false, // (optional) default: true
          soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
          importance: 4, // (optional) default: 4. Int value of the Android notification importance
          vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
        },
        (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
      );
}
   //Appears right away 
   localNotification(value) {
    console.log('method invoked')
  this.lastId++;
  this.configure()
  this.createChannel(""+this.lastId)
  PushNotification.localNotification({
    channelId: ""+this.lastId,
    title: value, 
    message: "My Notification Message", 

    ticker: "My Notification Ticker", // (optional)
    showWhen: true, // (optional) default: true
      autoCancel: true, // (optional) default: true
    largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
    largeIconUrl: "https://miro.medium.com/fit/c/262/262/1*9IX47JGFIZ8J2Qg3CX3KYg.jpeg", // (optional) default: undefined
    smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
    bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
    subText: "This is a subText", // (optional) default: none
    bigPictureUrl: "https://miro.medium.com/fit/c/262/262/1*9IX47JGFIZ8J2Qg3CX3KYg.jpeg", // (optional) default: undefined
    bigLargeIconUrl: "https://miro.medium.com/fit/c/262/262/1*9IX47JGFIZ8J2Qg3CX3KYg.jpeg", // (optional) default: undefined
    color: "red", // (optional) default: system default
    vibrate: true, // (optional) default: true
      tag: "some_tag", // (optional) add tag to message
    group: "group", // (optional) add group to message
    groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
    ongoing: false, // (optional) set whether this is an "ongoing" notification
    priority: "high", // (optional) set notification priority, default: high

      visibility: "private", // (optional) set notification visibility, default: private
    ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
    shortcutId: "shortcut-id", // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
    onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false

    when: null, // (optional) Add a timestamp (Unix timestamp value in milliseconds) pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
    usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
    timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null
    
    messageId: "google:message_id",

    actions: ["Open", "Close"], // (Android only) See the doc for notification actions to know more
    invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

    category: "", // (optional) default: empty string
 
    id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID

    userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
    playSound: false, // (optional) default: true
   soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
   number: 3, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
  });
}

  //Appears after a specified time. App does not have to be open.
scheduleNotification() {
  this.lastId++;
  this.configure()
  this.createChannel(""+this.lastId)
  PushNotification.localNotificationSchedule({
    date: new Date(Date.now() + 30 * 1000), // in 30 secs

    /* Android Only Properties */
    channelId: ""+this.lastId, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
    ticker: "My Notification Ticker", // (optional)
    autoCancel: true, // (optional) default: true
    largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
    smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
    bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
    subText: "This is a subText", // (optional) default: none
    color: "blue", // (optional) default: system default
    vibrate: true, // (optional) default: true
    vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
    tag: "some_tag", // (optional) add tag to message
    group: "group", // (optional) add group to message
    ongoing: false, // (optional) set whether this is an "ongoing" notification

    /* iOS only properties */
    alertAction: "view", // (optional) default: view
    category: null, // (optional) default: null
    userInfo: null, // (optional) default: null (object containing additional notification data)

    /* iOS and Android properties */
    title: "Scheduled Notification"+this.lastId, // (optional)
    message: "My Notification Message", // (required)
    playSound: true, // (optional) default: true
    soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    actions: '["Yes", "No"]', // (Android only) See the doc for notification actions to know more
    foreground: false, // BOOLEAN: If the notification was received in foreground or not
    userInteraction: true, // BOOLEAN: If the notification was opened by the user from the notification area or not
    data: { type: "test" } // OBJECT: The push data
  });
}

checkPermission(cbk) {
  return PushNotification.checkPermissions(cbk);
}

cancelNotif() {
  console.log( 'cancelling: '+this.lastId)
  PushNotification.cancelLocalNotifications({id: ''+this.lastId});

}

cancelAll() {
  console.log( 'cancelling: '+this.lastId)
  PushNotification.cancelAllLocalNotifications();
}
}