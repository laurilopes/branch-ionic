"use strict";

// must be a global function
function DeepLinkHandler(data) {
  if (data) {
    angular.element(document.querySelector('[ng-app]')).injector().get('DeepLink').set(data);
    console.log('Data Link handler response: ' + JSON.stringify(data));
  } else {
    console.error('Data Link handler no data');
  }
}

function NonBranchLinkHandler(data) {
  if (data) {
    console.log('Non Data Link handler response: ' + JSON.stringify(data));
    alert('Non-Branch Link Detected: ' + JSON.stringify(data));
  }
}

function BranchInit(isDebug) {
  Branch.setDebug(isDebug);
  Branch.initSession().then(function (res) {
    console.log(res);
  }).catch(function (err) {
    console.error(err);
  });
}

function BranchEvent(action) {
  Branch.userCompletedAction(action).then(function (res) {
    console.log(res);
  }).catch(function (err) {
    console.error(err);
  });
}

function BranchObject(callback) {
  var properties = {
    canonicalIdentifier: 'testbed',
    title: String(Date()),
    contentDescription: 'Here is a content description',
    contentImageUrl: 'http://lorempixel.com/400/400/',
    contentIndexingMode: 'public',
    contentMetadata: {}
  };

  Branch.createBranchUniversalObject(properties).then(function (res) {
    console.log(res);
    callback(res);
  }).catch(function (err) {
    console.error(err);
    callback(null);
  });
}

function BranchDeepLink(callback) {
  console.log('Trigger BranchDeepLink()');

  // create object
  BranchObject(function(branchUniversalObj) {
    if (!branchUniversalObj) return callback(null);

    // create deep link
    var properties = {
      feature: 'test',
      channel: 'test',
      stage: 'test',
      duration: 10000
    };
    var controlParams = {
      customTime: String(Date.now())
    };

    branchUniversalObj.generateShortUrl(properties, controlParams).then(function (res) {
      console.log(res);
      callback(String(res.url));
    }).catch(function (err) {
      console.error(err);
      callback(null);
    });
  });
}

function BranchShareSheet(text) {
  // create object
  BranchObject(function(branchUniversalObj) {
    if (!branchUniversalObj) return callback(null);

    var properties = {
      feature: 'test',
      channel: 'test',
      stage: 'test'
    };
    var controlParams = {
      customTime: String(Date.now())
    };

    // Set listeners
    branchUniversalObj.onShareSheetLaunched(function () {
      console.log('Share sheet launched');
    });
    branchUniversalObj.onShareSheetDismissed(function () {
      console.log('Share sheet dismissed');
    });
    branchUniversalObj.onLinkShareResponse(function (res) {
      console.log('Share link response: ' + JSON.stringify(res));
    });
    branchUniversalObj.onChannelSelected(function (res) {
      console.log('Channel selected: ' + JSON.stringify(res));
    });

    // create sharesheet
    branchUniversalObj.showShareSheet(properties, controlParams, text);
  });
}
