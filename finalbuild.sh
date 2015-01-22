#!/bin/bash

rm platforms/android/ant-build/Bluelytics.apk
gulp build && cordova build --release android && jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ../mobile_release.keystore platforms/android/ant-build/CordovaApp-release-unsigned.apk bluekey && zipalign -v 4 platforms/android/ant-build/CordovaApp-release-unsigned.apk platforms/android/ant-build/Bluelytics.apk
