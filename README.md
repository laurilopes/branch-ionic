# Guide for Ionic
*A mostly reasonable documentation*

  1. [Branch Configure](#branch-configure)
  1. [Ionic Install](#ionic-install) (skip if alreayd have app)
  1. [Ionic Test](#ionic-test) (skip if alreayd have app)
  1. [Branch SDK](#branch-sdk)
  1. [Branch Test](#branch-test)
  
## Branch Configure

- **configure Branch App settings**
  - sign up to [Branch Sign Up](https://dashboard.branch.io/)
  - navigate to [Branch Dashboard Settings](https://dashboard.branch.io/settings)
  - add `App Name`
  - press `Save Settings` button at the bottom
    - ![image](http://i.imgur.com/raClPs8.png)

- **configure Branch iOS settings**
  - navigate to [Branch Dashboard Link Settings](https://dashboard.branch.io/settings/link)
  - check `Always try to open app`
  - check `I have an iOS App`
  - add a unique alphanumeric `iOS URI Scheme`
  - select either `Apple Store Search` or `Customer URL`
  - check `Enable Universal Links`
  - add `Bundle Identifer` (can be found within the [Developer Portal of App](http://i.imgur.com/NA81ci7.png))
  - add `Apple App Prefix` (also known as the Team ID Prefix) (can be found within the [General Settings](http://i.imgur.com/f50iAEr.png) of your app)
  - press `Save` button at the bottom
    - ![image](http://i.imgur.com/RsLR0iB.png)
    - ![image](http://i.imgur.com/f0dSbJC.png)
 
- **configure Branch Android settings**
  - navigate to [Branch Dashboard Link Settings](https://dashboard.branch.io/settings/link)
  - check `I have an Android App`
  - add a custom unique `Android URI Scheme`
  - select either `Apple Store Search` or `Customer URL`
  - ... 

## Ionic Install 
*skip if you already have an app*

- **install node**
    ```sh
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)";
    brew update;
    brew install node;
    ```
    
- **install ionic**
  ```sh
    cd APP_LOCATION;
    npm install -g cordova ionic;
    ionic start APP_NAME tabs;
    ```

- **configure ionic**
  ```html
    <!-- app_name/config.xml -->
    <widget id="com.eneff.branch.ionic" ...>
    ```
    
- **install xcode**
    - install [xcode](https://developer.apple.com/download/)
    - open xcode -> agree to SDK license agreement
    - open xcode -> create new xcode project -> run simulator -> agree to developer mode on mac
    
- **install ionic ios**
    ```sh
    cd APP_NAME;
    npm install -g ios-sim;
    ionic platform add ios;
    ```
    
- **install android studio**
    - read [instructions](https://developer.android.com/studio/install.html)
    - install [JVM](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
    - install [Android Studio](https://developer.android.com/studio/index.html)
    - open android studio -> configure -> appearance/system settings/android sdk -> android 6.0 -> okay
    - open android studio -> new project -> ... -> run -> create new emulator -> Nexus 6p 23 -> finish

- **install cordova android**
    ```sh
    cd APP_NAME;
    ionic platform add android;
    ```

## Ionic Test
*skip if you are already know Ionic*

- **test code**
    ```html
    <!-- www/templates/tab-dash.html -->
    <button class="button button-full button-positive" ng-click="buttonPressed()">test</button>
    ```
    ```javascript
    // www/js/controller.js
    .controller('DashCtrl', function($scope) {
      $scope.buttonPressed = function() {
        console.log("test");
      };
    })
    ```
    ```javascript
    // www/js/app.js
    .run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {
        $ionicPlatform.on('deviceready', function(){
          console.log("install");
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

- **test browser**
    ```sh
    cd APP_NAME;
    ionic serve --lab;
    ```

- **test ios 1**
    ```sh
    cd APP_NAME;
    ionic build ios;
    ionic run ios;
    ```
    ```
    Safari -> Preferences -> Advance -> Show Develop menu in menu bar
    Safari -> Develop -> Simulator -> index.html -> Console
    ```
    
- **test ios 2**
    ```sh
    cd APP_NAME;
    ionic build ios;
    ```
    ```
    Xcode -> APP_LOCATION/APP_NAME/platforms/ios/APP_NAME.xcodeproj -> Run -> Device
    Xcode -> Debug area
    ```

- **test cordova android**
    ```sh
    cd APP_LOCATION;
    cd APP_NAME;
    ```

## Branch SDK

- **install SDK**
    ```sh
    # replace YOUR_BRANCH_KEY and YOUR_APP_URI_SCHEME_WITHOUT_COLON_AND_SLASHES
    cd APP_NAME;
    cordova plugin add https://github.com/BranchMetrics/Cordova-Ionic-PhoneGap-Deferred-Deep-Linking-SDK.git --variable BRANCH_KEY=YOUR_BRANCH_KEY --variable URI_SCHEME=YOUR_APP_URI_SCHEME_WITHOUT_COLON_AND_SLASHES

    cordova plugin add https://github.com/BranchMetrics/Cordova-Ionic-PhoneGap-Deferred-Deep-Linking-SDK.git --variable BRANCH_KEY=key_live_jnBhaHwt5K8xtn4g4hblHoleqsocI6C2 --variable URI_SCHEME=branchionic;
    ```
- **configure SDK**
    ```html
    // APP_NAME/www/config.xml
    <branch-config>
        <ios-team-id value="your_ios_team_id" />
        <host name="READ_FROM_DASHBOARD.app.link" scheme="https" />
        <host name="READ_FROM_DASHBOARD-alternate.app.link" scheme="https" />
    </branch-config>
    ```    
- **add branch code**
    - APP_NAME/js/branch.js
      - create `branch.js` with this [code](https://gist.github.com/ethanneff/3ee546fdb196ab184f06d896b37a94be)
    - APP_NAME/www/index.html
        ```html
        <script type="text/javascript" src="js/branch.js"></script>
        ```

## Branch Test
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
