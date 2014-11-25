#!/bin/bash

cordova build --release android
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ../mobile_release.keystore platforms/android/ant-build/CordovaApp-release-unsigned.apk bluekey
/home/sicarul/android-sdk-linux/build-tools/21.0.2/zipalign -v 4 platforms/android/ant-build/CordovaApp-release-unsigned.apk platforms/android/ant-build/Bluelytics.apk
