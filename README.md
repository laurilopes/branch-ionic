# Guide for Integrating Branch with Ionic
*questions? contact us at: support@branch.io*

  1. [Cordova Dependencies](#cordova-dependencies)
  1. [Ionic Setup](#ionic-setup)
  1. [Branch Configure](#branch-configure)
  1. [Branch Setup](#branch-setup)
  1. [Ionic Test](#ionic-test)
  1. [Branch Test](#branch-test)

## Cordova Dependencies

- **install node**

    ```sh
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)";
    brew update;
    brew install node;
    ```

- **install xcode**
    - install [xcode](https://developer.apple.com/download/)
    - open xcode -> agree to SDK license agreement
    - open xcode -> create new xcode project -> run simulator -> agree to developer mode on mac

- **install android studio**
    - read [instructions](https://developer.android.com/studio/install.html)
    - install [JVM](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
    - install [Android Studio](https://developer.android.com/studio/index.html)
    - open android studio -> configure -> appearance/system settings/android sdk -> android 6.0 -> okay
    - open android studio -> new project -> ... -> run -> create new emulator -> Nexus 6p 23 -> finish

    ```sh
    sudo cat >> ~/.bash_profile <<EOF

    export ANDROID_HOME=$HOME/Library/Android/sdk
    export PATH=$ANDROID_HOME/tools:$PATH
    export PATH=$ANDROID_HOME/platform-tools:$PATH
    EOF
    source ~/.bash_profile;
    ```
    
    ```sh
    android update sdk;
    ```
    
    - install Android SDK build-tools 24.0.1

- **install genymotion** *(optional Android Simulator)*
    - install [virtual box](https://www.virtualbox.org/wiki/Downloads)  
    - install [genymotion](https://www.genymotion.com/download/)
    - Genymotion -> add virtual device -> Google Nexus 6P - 6.0.0 - API 23 -> Next


## Ionic Setup

- **install ionic** *(optional if you already have installed)*

    ```sh
    cd APP_LOCATION;
    npm install -g cordova ionic;
    ionic start APP_NAME tabs;
    cd APP_NAME;
    npm install -g ios-sim;
    ionic platform add ios;
    ionic platform add android;
    ```

## Branch Configure

- **setup Branch**
    - sign up to [Branch](https://dashboard.branch.io/)
    - navigate to [Branch Dashboard Settings](https://dashboard.branch.io/    settings)
    - add `App Name`
    - press `Save Settings` button at the bottom
        - ![image](http://i.imgur.com/MVrwf0t.png)

- **update Branch**
    - navigate to [Branch Dashboard Link Settings](https://dashboard.branch.io/settings/link)
    - check `Always try to open app`
    - iOS
        - check `I have an iOS App`
        - add a unique alphanumeric `iOS URI Scheme`
        - select either `Apple Store Search` or `Custom URL`
        - check `Enable Universal Links`
        - add `Bundle Identifer` (can be found in the [General Settings](http://    i.imgur.com/lnpzNH9.png) of your app) 
        - add `Apple App Prefix` (also known as the `Team ID Prefix`) (can be found in the [Developer Portal](https://developer.apple.com/account) of your [App](http://i.imgur.com/NA81ci7.png))
    - Android
        - check `I have an Android App`
        - add a unique alphanumeric `Android URI Scheme`
        - select either `Google Store Search` or `Custom URL`
        - check `Enable Universal Links`
        - add `Bundle Identifer` (can be found in the [AndroidManifest.xml](http://i.imgur.com/D7vxhta.png) of your app) 
    - Hybrid *(ignore if not a hybrid app)*
        - `iOS URI Scheme` and `Android URI Scheme` must be the same
        - `Bundle Identifer` must be the same for iOS and Android (can be found in the [config.xml](http://i.imgur.com/8OyHsjm.png) of your app) 
    - press `Save` button at the bottom 
        - ![image](http://i.imgur.com/UMG1Dmh.png)
        - ![image](http://i.imgur.com/f0dSbJC.png)

## Branch Setup

- **install branch sdk** *(values should reflect [Branch Dashboard](https://dashboard.branch.io/settings/link))*
    - replace `xxxx` with your `Branch Key` and `URI Scheme`
    
    ```sh
    cd APP_NAME;
    cordova plugin add branch-cordova-sdk --variable BRANCH_KEY=xxxx --variable URI_SCHEME=xxxx;
    ```

- **update config.xml** *(values should reflect [Branch Dashboard](https://dashboard.branch.io/settings/link))*
    - replace `xxxx` with your `Apple App Prefix` and `Link Domain`
    
    ```html
  <widget id="com.eneff.branch.example" version="0.0.1" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
        <branch-config>
          <ios-team-id value="xxxx"/>
          <host name="xxxx.app.link" scheme="https"/>
          <host name="xxxx-alternate.app.link" scheme="https"/>
        </branch-config>
    ```

- **append branch javascript wrappers**
    - APP_NAME/www/templates/tab-dash.html *(optional logging test code)*

        ```html
        <button class="button button-full button-positive" ng-click="buttonPressed()">test</button>
        ```
    
    - APP_NAME/www/js/controller.js *(optional logging test code)*

        ```javascript
        .controller('DashCtrl', function($scope) {
          $scope.buttonPressed = function() {
            console.log("test");
          };
        })
        ```

    - APP_NAME/www/js/app.js *(`InitSession();` is required and `SetDebug(true);` is optional)*

        ```javascript
        .run(function($ionicPlatform) {
          $ionicPlatform.ready(function() {
            $ionicPlatform.on('deviceready', function(){
              console.log("install");
              SetDebug(true);
              InitSession();
            });

            $ionicPlatform.on('resume', function(){
              console.log("open");
            });

            $ionicPlatform.on('pause', function(){
              console.log("close");
            });
          });
        })
        ```
        
    - APP_NAME/js/branch.js
      - create `branch.js` with this [code](https://gist.github.com/ethanneff/3ee546fdb196ab184f06d896b37a94be)
    - APP_NAME/www/index.html
    
        ```html
        <script type="text/javascript" src="js/branch.js"></script>
        ```

## Ionic Test

- **test browser**

    ```sh
    cd APP_NAME;
    ionic serve --lab;
    ```
    
- **test ios simulator**
    
    ```sh
    cd APP_NAME;
    ionic build ios;
    ionic run ios;
    ```
    
    - Safari -> Preferences -> Advance -> Show Develop menu in menu bar
    - Safari -> Develop -> Simulator -> index.html -> Console
    - may need to unplug and replug device
    - may need to open Xcode and update provisioning profile

- **test ios device**

  ```sh
    cd APP_NAME;
    ionic build ios;
    ```

    - Xcode -> APP_LOCATION/platforms/ios/APP_NAME.xcodeproj
    - add team
    - simulate on device
    - view xcode console logs

- **test android**
  
    ```sh
    cd APP_NAME;
    ionic build android;
    ionic run android;
    ```
    - TODO: genymotion setup

## Branch Test

- ...

## Test
  ```bash
  ionic start t2 tabs;
  cd t2;
  ionic platform add ios;
  ionic platform add android;
  ionic resources;
  cordova plugin remove io.branch.sdk;
  cordova plugin add https://github.com/BranchMetrics/Cordova-Ionic-PhoneGap-Deferred-Deep-Linking-SDK.git --variable BRANCH_KEY=key_live_jnBhaHwt5K8xtn4g4hblHoleqsocI6C2 --variable URI_SCHEME=branchionic;
  ionic build ios; ionic emulate ios;
  # add branch code

  # Branch.initSession() is failing because Branch is undefined
  if (!ionic.platform.isWebView()) {}
  ```
