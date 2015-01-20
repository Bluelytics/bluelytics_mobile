#!/bin/bash

rm platforms/android/ant-build/Bluelytics.apk
cordova build --release android && jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ../mobile_release.keystore platforms/android/ant-build/CordovaApp-release-unsigned.apk bluekey && /home/sicarul/adt-bundle-linux-x86_64-20140702/sdk/build-tools/android-4.4W/zipalign -v 4 platforms/android/ant-build/CordovaApp-release-unsigned.apk platforms/android/ant-build/Bluelytics.apk
