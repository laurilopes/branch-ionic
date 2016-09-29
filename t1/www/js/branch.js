"use strict";

var branchlog = document.getElementById('data');
function updateBranchLog(text) {
    console.log('Trigger updateBranchLog()');

    console.log(text);
    if ('textContent' in branchlog) {
        branchlog.textContent = text;
    } else {
        branchlog.innerText = text;
    }
}

function DeepLinkHandler(data) {
    console.log('Trigger DeepLinkHandler()');

    if (data) {
        updateBranchLog(JSON.stringify(data));
    } else {
        updateBranchLog('No data found');
    }
}

function NonBranchLinkHandler(data) {
    console.log('Trigger NonBranchLinkHandler()');

    if (data) {
        alert('Non-branch link found: ' + JSON.stringify(data));
    }
}

function SetDebug(isEnabled) {
    console.log('Trigger SetDebug()');

    Branch.setDebug(isEnabled);

    alert('Debug mode enabled');
}

function InitSession() {
    console.log('Trigger InitSession()');

    Branch.setMixpanelToken('<your-mixpanel-token-here>');
    Branch.debugMode = true;
    Branch.initSession().then(function (res) {
        updateBranchLog(JSON.stringify(res));
        alert('Response: ' + JSON.stringify(res));
    }).catch(function (err) {
        updateBranchLog(err);
        alert('Error: ' + JSON.stringify(err));
    });
}

function CustomAction() {
    console.log('Trigger CustomAction()');

    var action = document.getElementById('custom-action').value;

    Branch.userCompletedAction(action).then(function (res) {
        console.log(res);
        alert('Response: ' + JSON.stringify(res));
    }).catch(function (err) {
        console.error(err);
        alert('Error: ' + JSON.stringify(err));
    });
}

function GetLatestReferringParams() {
    console.log('Trigger GetLatestReferringParams()');

    Branch.getLatestReferringParams().then(function (res) {
        console.log(res);
        alert('Response: ' + JSON.stringify(res));
    }).catch(function (err) {
        console.error(err);
        alert('Error: ' + JSON.stringify(err));
    });
}

function GetFirstReferringParams() {
    console.log('Trigger GetFirstReferringParams()');

    Branch.getFirstReferringParams().then(function (res) {
        alert('Response: ' + JSON.stringify(res));
        console.log(res);
    }).catch(function (err) {
        alert('Error: ' + JSON.stringify(err));
        console.error(err);
    });
}

function SetIdentity() {
    console.log('Trigger SetIdentity()');

    var newIdentity = document.getElementById('identity').value;

    Branch.setIdentity(newIdentity).then(function (res) {
        console.log(res);
        alert('Response: ' + JSON.stringify(res));
    }).catch(function (err) {
        console.error(err);
        alert('Error: ' + JSON.stringify(err));
    });
}

function Logout() {
    console.log('Trigger Logout()');

    Branch.logout().then(function (res) {
        console.log(res);
        alert('Response: ' + JSON.stringify(res));
    }).catch(function (err) {
        console.error(err);
        alert('Error: ' + JSON.stringify(err));
    });
}

var branchUniversalObj = null;

function CreateBranchUniversalObject() {

    console.log('Trigger CreateBranchUniversalObject()');

    var properties = {
        canonicalIdentifier: 'testbed',
        title: 'Here is some content',
        contentDescription: 'Here is a content description',
        contentImageUrl: 'https://imgflip.com/s/meme/Derp.jpg',
        contentIndexingMode: 'public',
        contentMetadata: {}
    };

    Branch.createBranchUniversalObject(properties).then(function (res) {
        console.log(res);
        alert('Response: ' + JSON.stringify(res));
        branchUniversalObj = res;
    }).catch(function (err) {
        console.error(err);
        alert('Error: ' + JSON.stringify(err));
    });
}

function RegisterView() {
    console.log('Trigger RegisterView()');

    branchUniversalObj.registerView().then(function (res) {
        console.log(res);
        alert('Response: ' + JSON.stringify(res));
    }).catch(function (err) {
        console.error(err);
        alert('Error: ' + JSON.stringify(err));
    });;
}

function GenerateShortUrl() {
    console.log('Trigger GenerateShortUrl()');

    var properties = {
        feature: 'test',
        channel: 'test',
        stage: 'test',
        duration: 10000
    };
    var controlParams = { };

    branchUniversalObj.generateShortUrl(properties, controlParams).then(function (res) {
        console.log(res);
        document.getElementById('generated-url').value = res.url;
    }).catch(function (err) {
        console.error(err);
        alert('Error: ' + JSON.stringify(err));
    });
}

function ShowShareSheet() {
    console.log('Trigger ShowShareSheet()');

    var properties = {
        feature: 'test',
        channel: 'test',
        stage: 'test'
    };
    var controlParams = { };

    console.log(branchUniversalObj);

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

    branchUniversalObj.showShareSheet(properties, controlParams, 'Custom Text');
}

function ListOnSpotlight() {
    console.log('Trigger ListOnSpotlight()');
    branchUniversalObj.listOnSpotlight().then(function (res) {
        console.log(res);
        alert('Response: ' + JSON.stringify(res));
    }).catch(function (err) {
        console.error(err);
        alert('Error: ' + JSON.stringify(err));
    });
}

function LoadRewards() {
    console.log('Trigger LoadRewards()');
    Branch.loadRewards().then(function (res) {
        console.log(res);
        alert('Response: ' + JSON.stringify(res));
    }).catch(function (err) {
        console.error(err);
        alert('Error: ' + JSON.stringify(err));
    });
}

function RedeemRewards() {
    console.log('Trigger RedeemRewards()');
    var reward = 1000;

    Branch.redeemRewards(reward).then(function (res) {
        console.log(res);
        alert('Response: ' + JSON.stringify(res));
    }).catch(function (err) {
        console.error(err);
        alert('Error: ' + JSON.stringify(err));
    });
}

function CreditHistory() {
    console.log('Trigger CreditHistory()');
    Branch.creditHistory().then(function (res) {
        console.log(res);
        alert('Response: ' + JSON.stringify(res));
    }).catch(function (err) {
        console.error(err);
        alert('Error: ' + JSON.stringify(err));
    });
}