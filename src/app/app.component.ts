import { Component } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Network } from '@ionic-native/network';
import { ValueProvider } from '../providers/value/value';
// import { ApiProvider } from '../providers/api/api';
import { Storage } from '@ionic/storage';

import { MasukPage } from '../pages/masuk/masuk';
import { TabsPage } from '../pages/tabs/tabs';
import { NonetworkPage } from '../pages/nonetwork/nonetwork';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(
    private platform: Platform,
    private sql: Storage,
    // private api: ApiProvider,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private bgmode: BackgroundMode,
    private network: Network,
    private value: ValueProvider,
    private androidPermissions: AndroidPermissions,
    public toast: ToastController
  ) {

    this.cekKoneksi();

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.cekTokenAktif();

      this.addPermission();

    });

    if (!this.bgmode.isEnabled) {

      this.bgmode.enable();

    }

  }

  // cek koneksi diskonek
  cekKoneksi() {
    this.network.onDisconnect().subscribe(() => {

      toast.present();
      this.rootPage = NonetworkPage;

    });

    const toast = this.toast.create({

      message: this.value.valApp.errInternet,
      // duration: 10000,
      position: 'top',
      showCloseButton: true,
      closeButtonText: this.value.valButtons.ok

    });
  }

  // cek token user
  cekTokenAktif() {

    this.sql.get('tokenAPIuser').then(tokenku => {

      if (tokenku) {

        this.rootPage = TabsPage;

      }

      if (tokenku == null) {

        this.sql.clear();
        this.rootPage = MasukPage;

      }

    }).catch(() => {

      this.rootPage = MasukPage;

    });

  }

  // ad permission
  addPermission() {
    if (this.platform.is('android')) {
        this.androidPermissions.requestPermissions(
            [
                this.androidPermissions.PERMISSION.CAMERA,
                this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE,
                // this.androidPermissions.PERMISSION.SEND_SMS,
                this.androidPermissions.PERMISSION.GET_ACCOUNTS,
                // this.androidPermissions.PERMISSION.LOCATION_HARDWARE,
                // this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION,
                // this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION,
                this.androidPermissions.PERMISSION.CHANGE_WIFI_STATE,
                this.androidPermissions.PERMISSION.INTERNET
            ]
        );
    }
}

/**
 * Daftar Permission LOL banget :D
 * Kebanyak ternyata
 * ship lah :D
 * by Onyet
 * ============================== *
  // String	ACCEPT_HANDOVER
  // Allows a calling app to continue a call which was started in another app.

  // String	ACCESS_CHECKIN_PROPERTIES
  // Allows read/write access to the "properties" table in the checkin database, to change values that get uploaded.

  // String	ACCESS_COARSE_LOCATION
  // Allows an app to access approximate location.

  // String	ACCESS_FINE_LOCATION
  // Allows an app to access precise location.

  // String	ACCESS_LOCATION_EXTRA_COMMANDS
  // Allows an application to access extra location provider commands.

  // String	ACCESS_NETWORK_STATE
  // Allows applications to access information about networks.

  // String	ACCESS_NOTIFICATION_POLICY
  // Marker permission for applications that wish to access notification policy.

  // String	ACCESS_WIFI_STATE
  // Allows applications to access information about Wi-Fi networks.

  // String	ACCOUNT_MANAGER
  // Allows applications to call into AccountAuthenticators.

  // String	ADD_VOICEMAIL
  // Allows an application to add voicemails into the system.

  // String	ANSWER_PHONE_CALLS
  // Allows the app to answer an incoming phone call.

  // String	BATTERY_STATS
  // Allows an application to collect battery statistics

  // String	BIND_ACCESSIBILITY_SERVICE
  // Must be required by an AccessibilityService, to ensure that only the system can bind to it.

  // String	BIND_APPWIDGET
  // Allows an application to tell the AppWidget service which application can access AppWidget's data.

  // String	BIND_AUTOFILL_SERVICE
  // Must be required by a AutofillService, to ensure that only the system can bind to it.

  // String	BIND_CARRIER_MESSAGING_SERVICE
  // This constant was deprecated in API level 23. Use BIND_CARRIER_SERVICES instead

  // String	BIND_CARRIER_SERVICES
  // The system process that is allowed to bind to services in carrier apps will have this permission.

  // String	BIND_CHOOSER_TARGET_SERVICE
  // Must be required by a ChooserTargetService, to ensure that only the system can bind to it.

  // String	BIND_CONDITION_PROVIDER_SERVICE
  // Must be required by a ConditionProviderService, to ensure that only the system can bind to it.

  // String	BIND_DEVICE_ADMIN
  // Must be required by device administration receiver, to ensure that only the system can interact with it.

  // String	BIND_DREAM_SERVICE
  // Must be required by an DreamService, to ensure that only the system can bind to it.

  // String	BIND_INCALL_SERVICE
  // Must be required by a InCallService, to ensure that only the system can bind to it.

  // String	BIND_INPUT_METHOD
  // Must be required by an InputMethodService, to ensure that only the system can bind to it.

  // String	BIND_MIDI_DEVICE_SERVICE
  // Must be required by an MidiDeviceService, to ensure that only the system can bind to it.

  // String	BIND_NFC_SERVICE
  // Must be required by a HostApduService or OffHostApduService to ensure that only the system can bind to it.

  // String	BIND_NOTIFICATION_LISTENER_SERVICE
  // Must be required by an NotificationListenerService, to ensure that only the system can bind to it.

  // String	BIND_PRINT_SERVICE
  // Must be required by a PrintService, to ensure that only the system can bind to it.

  // String	BIND_QUICK_SETTINGS_TILE
  // Allows an application to bind to third party quick settings tiles.

  // String	BIND_REMOTEVIEWS
  // Must be required by a RemoteViewsService, to ensure that only the system can bind to it.

  // String	BIND_SCREENING_SERVICE
  // Must be required by a CallScreeningService, to ensure that only the system can bind to it.

  // String	BIND_TELECOM_CONNECTION_SERVICE
  // Must be required by a ConnectionService, to ensure that only the system can bind to it.

  // String	BIND_TEXT_SERVICE
  // Must be required by a TextService (e.g.

  // String	BIND_TV_INPUT
  // Must be required by a TvInputService to ensure that only the system can bind to it.

  // String	BIND_VISUAL_VOICEMAIL_SERVICE
  // Must be required by a link VisualVoicemailService to ensure that only the system can bind to it.

  // String	BIND_VOICE_INTERACTION
  // Must be required by a VoiceInteractionService, to ensure that only the system can bind to it.

  // String	BIND_VPN_SERVICE
  // Must be required by a VpnService, to ensure that only the system can bind to it.

  // String	BIND_VR_LISTENER_SERVICE
  // Must be required by an VrListenerService, to ensure that only the system can bind to it.

  // String	BIND_WALLPAPER
  // Must be required by a WallpaperService, to ensure that only the system can bind to it.

  // String	BLUETOOTH
  // Allows applications to connect to paired bluetooth devices.

  // String	BLUETOOTH_ADMIN
  // Allows applications to discover and pair bluetooth devices.

  // String	BLUETOOTH_PRIVILEGED
  // Allows applications to pair bluetooth devices without user interaction, and to allow or disallow phonebook access or message access.

  // String	BODY_SENSORS
  // Allows an application to access data from sensors that the user uses to measure what is happening inside his/her body, such as heart rate.

  // String	BROADCAST_PACKAGE_REMOVED
  // Allows an application to broadcast a notification that an application package has been removed.

  // String	BROADCAST_SMS
  // Allows an application to broadcast an SMS receipt notification.

  // String	BROADCAST_STICKY
  // Allows an application to broadcast sticky intents.

  // String	BROADCAST_WAP_PUSH
  // Allows an application to broadcast a WAP PUSH receipt notification.

  // String	CALL_PHONE
  // Allows an application to initiate a phone call without going through the Dialer user interface for the user to confirm the call.

  // String	CALL_PRIVILEGED
  // Allows an application to call any phone number, including emergency numbers, without going through the Dialer user interface for the user to confirm the call being placed.

  // String	CAMERA
  // Required to be able to access the camera device.

  // String	CAPTURE_AUDIO_OUTPUT
  // Allows an application to capture audio output.

  // String	CAPTURE_SECURE_VIDEO_OUTPUT
  // Allows an application to capture secure video output.

  // String	CAPTURE_VIDEO_OUTPUT
  // Allows an application to capture video output.

  // String	CHANGE_COMPONENT_ENABLED_STATE
  // Allows an application to change whether an application component (other than its own) is enabled or not.

  // String	CHANGE_CONFIGURATION
  // Allows an application to modify the current configuration, such as locale.

  // String	CHANGE_NETWORK_STATE
  // Allows applications to change network connectivity state.

  // String	CHANGE_WIFI_MULTICAST_STATE
  // Allows applications to enter Wi-Fi Multicast mode.

  // String	CHANGE_WIFI_STATE
  // Allows applications to change Wi-Fi connectivity state.

  // String	CLEAR_APP_CACHE
  // Allows an application to clear the caches of all installed applications on the device.

  // String	CONTROL_LOCATION_UPDATES
  // Allows enabling/disabling location update notifications from the radio.

  // String	DELETE_CACHE_FILES
  // Old permission for deleting an app's cache files, no longer used, but signals for us to quietly ignore calls instead of throwing an exception.

  // String	DELETE_PACKAGES
  // Allows an application to delete packages.

  // String	DIAGNOSTIC
  // Allows applications to RW to diagnostic resources.

  // String	DISABLE_KEYGUARD
  // Allows applications to disable the keyguard if it is not secure.

  // String	DUMP
  // Allows an application to retrieve state dump information from system services.

  // String	EXPAND_STATUS_BAR
  // Allows an application to expand or collapse the status bar.

  // String	FACTORY_TEST
  // Run as a manufacturer test application, running as the root user.

  // String	FOREGROUND_SERVICE
  // Allows a regular application to use Service.startForeground.

  // String	GET_ACCOUNTS
  // Allows access to the list of accounts in the Accounts Service.

  // String	GET_ACCOUNTS_PRIVILEGED
  // Allows access to the list of accounts in the Accounts Service.

  // String	GET_PACKAGE_SIZE
  // Allows an application to find out the space used by any package.

  // String	GET_TASKS
  // This constant was deprecated in API level 21. No longer enforced.

  // String	GLOBAL_SEARCH
  // This permission can be used on content providers to allow the global search system to access their data.

  // String	INSTALL_LOCATION_PROVIDER
  // Allows an application to install a location provider into the Location Manager.

  // String	INSTALL_PACKAGES
  // Allows an application to install packages.

  // String	INSTALL_SHORTCUT
  // Allows an application to install a shortcut in Launcher.

  // String	INSTANT_APP_FOREGROUND_SERVICE
  // Allows an instant app to create foreground services.

  // String	INTERNET
  // Allows applications to open network sockets.

  // String	KILL_BACKGROUND_PROCESSES
  // Allows an application to call ActivityManager.killBackgroundProcesses(String).

  // String	LOCATION_HARDWARE
  // Allows an application to use location features in hardware, such as the geofencing api.

  // String	MANAGE_DOCUMENTS
  // Allows an application to manage access to documents, usually as part of a document picker.

  // String	MANAGE_OWN_CALLS
  // Allows a calling application which manages it own calls through the self-managed ConnectionService APIs.

  // String	MASTER_CLEAR
  // Not for use by third-party applications.

  // String	MEDIA_CONTENT_CONTROL
  // Allows an application to know what content is playing and control its playback.

  // String	MODIFY_AUDIO_SETTINGS
  // Allows an application to modify global audio settings.

  // String	MODIFY_PHONE_STATE
  // Allows modification of the telephony state - power on, mmi, etc.

  // String	MOUNT_FORMAT_FILESYSTEMS
  // Allows formatting file systems for removable storage.

  // String	MOUNT_UNMOUNT_FILESYSTEMS
  // Allows mounting and unmounting file systems for removable storage.

  // String	NFC
  // Allows applications to perform I/O operations over NFC.

  // String	NFC_TRANSACTION_EVENT
  // Allows applications to receive NFC transaction events.

  // String	PACKAGE_USAGE_STATS
  // Allows an application to collect component usage statistics

  // Declaring the permission implies intention to use the API and the user of the device can grant permission through the Settings application.

  // String	PERSISTENT_ACTIVITY
  // This constant was deprecated in API level 9. This functionality will be removed in the future; please do not use. Allow an application to make its activities persistent.

  // String	PROCESS_OUTGOING_CALLS
  // Allows an application to see the number being dialed during an outgoing call with the option to redirect the call to a different number or abort the call altogether.

  // String	READ_CALENDAR
  // Allows an application to read the user's calendar data.

  // String	READ_CALL_LOG
  // Allows an application to read the user's call log.

  // String	READ_CONTACTS
  // Allows an application to read the user's contacts data.

  // String	READ_EXTERNAL_STORAGE
  // Allows an application to read from external storage.

  // String	READ_FRAME_BUFFER
  // Allows an application to take screen shots and more generally get access to the frame buffer data.

  // String	READ_INPUT_STATE
  // This constant was deprecated in API level 16. The API that used this permission has been removed.

  // String	READ_LOGS
  // Allows an application to read the low-level system log files.

  // String	READ_PHONE_NUMBERS
  // Allows read access to the device's phone number(s).

  // String	READ_PHONE_STATE
  // Allows read only access to phone state, including the phone number of the device, current cellular network information, the status of any ongoing calls, and a list of any PhoneAccounts registered on the device.

  // String	READ_SMS
  // Allows an application to read SMS messages.

  // String	READ_SYNC_SETTINGS
  // Allows applications to read the sync settings.

  // String	READ_SYNC_STATS
  // Allows applications to read the sync stats.

  // String	READ_VOICEMAIL
  // Allows an application to read voicemails in the system.

  // String	REBOOT
  // Required to be able to reboot the device.

  // String	RECEIVE_BOOT_COMPLETED
  // Allows an application to receive the Intent.ACTION_BOOT_COMPLETED that is broadcast after the system finishes booting.

  // String	RECEIVE_MMS
  // Allows an application to monitor incoming MMS messages.

  // String	RECEIVE_SMS
  // Allows an application to receive SMS messages.

  // String	RECEIVE_WAP_PUSH
  // Allows an application to receive WAP push messages.

  // String	RECORD_AUDIO
  // Allows an application to record audio.

  // String	REORDER_TASKS
  // Allows an application to change the Z-order of tasks.

  // String	REQUEST_COMPANION_RUN_IN_BACKGROUND
  // Allows a companion app to run in the background.

  // String	REQUEST_COMPANION_USE_DATA_IN_BACKGROUND
  // Allows a companion app to use data in the background.

  // String	REQUEST_DELETE_PACKAGES
  // Allows an application to request deleting packages.

  // String	REQUEST_IGNORE_BATTERY_OPTIMIZATIONS
  // Permission an application must hold in order to use Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS.

  // String	REQUEST_INSTALL_PACKAGES
  // Allows an application to request installing packages.

  // String	RESTART_PACKAGES
  // This constant was deprecated in API level 8. The ActivityManager.restartPackage(String) API is no longer supported.

  // String	SEND_RESPOND_VIA_MESSAGE
  // Allows an application (Phone) to send a request to other applications to handle the respond-via-message action during incoming calls.

  // String	SEND_SMS
  // Allows an application to send SMS messages.

  // String	SET_ALARM
  // Allows an application to broadcast an Intent to set an alarm for the user.

  // String	SET_ALWAYS_FINISH
  // Allows an application to control whether activities are immediately finished when put in the background.

  // String	SET_ANIMATION_SCALE
  // Modify the global animation scaling factor.

  // String	SET_DEBUG_APP
  // Configure an application for debugging.

  // String	SET_PREFERRED_APPLICATIONS
  // This constant was deprecated in API level 7. No longer useful, see PackageManager.addPackageToPreferred(String) for details.

  // String	SET_PROCESS_LIMIT
  // Allows an application to set the maximum number of (not needed) application processes that can be running.

  // String	SET_TIME
  // Allows applications to set the system time.

  // String	SET_TIME_ZONE
  // Allows applications to set the system time zone.

  // String	SET_WALLPAPER
  // Allows applications to set the wallpaper.

  // String	SET_WALLPAPER_HINTS
  // Allows applications to set the wallpaper hints.

  // String	SIGNAL_PERSISTENT_PROCESSES
  // Allow an application to request that a signal be sent to all persistent processes.

  // String	STATUS_BAR
  // Allows an application to open, close, or disable the status bar and its icons.

  // String	SYSTEM_ALERT_WINDOW
  // Allows an app to create windows using the type WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY, shown on top of all other apps.

  // String	TRANSMIT_IR
  // Allows using the device's IR transmitter, if available.

  // String	UNINSTALL_SHORTCUT
  // This permission is no longer supported.

  // String	UPDATE_DEVICE_STATS
  // Allows an application to update device statistics.

  // String	USE_BIOMETRIC
  // Allows an app to use device supported biometric modalities.

  // String	USE_FINGERPRINT
  // This constant was deprecated in API level 28. Applications should request USE_BIOMETRIC instead

  // String	USE_SIP
  // Allows an application to use SIP service.

  // String	VIBRATE
  // Allows access to the vibrator.

  // String	WAKE_LOCK
  // Allows using PowerManager WakeLocks to keep processor from sleeping or screen from dimming.

  // String	WRITE_APN_SETTINGS
  // Allows applications to write the apn settings.

  // String	WRITE_CALENDAR
  // Allows an application to write the user's calendar data.

  // String	WRITE_CALL_LOG
  // Allows an application to write (but not read) the user's call log data.

  // String	WRITE_CONTACTS
  // Allows an application to write the user's contacts data.

  // String	WRITE_EXTERNAL_STORAGE
  // Allows an application to write to external storage.

  // String	WRITE_GSERVICES
  // Allows an application to modify the Google service map.

  // String	WRITE_SECURE_SETTINGS
  // Allows an application to read or write the secure system settings.

  // String	WRITE_SETTINGS
  // Allows an application to read or write the system settings.

  // String	WRITE_SYNC_SETTINGS
  // Allows applications to write the sync settings.

  // String	WRITE_VOICEMAIL
  // Allows an application to modify and remove existing voicemails in the system.
 */

}
