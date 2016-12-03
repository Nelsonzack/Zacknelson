/************************************
 * Setup
************************************/

function elfFireConfig01() {
    var config = {
      apiKey: "AIzaSyDpck_Pwi7hvySha07ooxgKyE-_BJkjShQ",
      authDomain: "prog270-nelson.firebaseapp.com",
      databaseURL: "https://prog270-nelson.firebaseio.com",
      storageBucket: "prog270-nelson.appspot.com",
      messagingSenderId: "48645528422"
    };
    firebase.initializeApp(config);
}


// We are not using elfFireConfig02 at this time.
function elfFireConfig02() {
    var config = {
      apiKey: "YOUR KEY",
      authDomain: "YOUR DOMAIN",
      databaseURL: "YOUR URL",
      storageBucket: "YOUR BUCKET",
      messagingSenderId: "YOUR ID"
    };
    firebase.initializeApp(config);
}

function elfFireStart() {
    elfFireConfig01();
    $('#elfDatabasePush').click(elfFireDataPush);
    $('#elfDatabaseGet').click(elfFireDataGet);
    $('#elfDatabaseGetAllQux').click(elfFireDatabaseGetAllQux);
    $('#elfGetCurrentUser').click(elfFireGetCurrentUser);
    $('#sign-in').click(elfFireSignOut);
    $('#elfInput').click(elfFireDynamicPush);

    elfFireDynamicData();
}

/************************************
 * Users
 ************************************/

function elfFireGetCurrentUser() {
    var user = firebase.auth().currentUser;
    var userName;
    var userEmail;
    var userPhotoUrl;
    var userId;

    if (user != null) {
        userName = user.displayName;
        userEmail = user.email;
        userPhotoUrl = user.photoURL;
        userId = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
        // this value to authenticate with your backend server, if
        // you have one. Use User.getToken() instead.
    }

    $('#userName').html(userName);
    $('#userEmail').html(userEmail);
    $('#userPhotoUrl').html(userPhotoUrl);
    $('#userId').html(userId);
    $('#userImg').attr('src', userPhotoUrl);
}

/************************************
 * Database
 ************************************/

var elfOldInput = [];

function elfFireDataGet() {
    return firebase.database().ref('/bar/foo').once('value').then(function(snapshot) {
        var userName = snapshot.val();
        console.log(userName);
    });
}

function elfFireDatabaseGetAllQux() {
    return firebase.database().ref('/bar/qux').once('value').then(function(snapshot) {
        var userName = snapshot.val();
        console.log(userName);
    });
}

function elfFireDynamicData() {
    var list = $('#userInputList');
    var starCountRef = firebase.database().ref('bar/qux');
    starCountRef.on('value', function(snapshot) {
      var userVal = snapshot.val()
      console.log(userVal);
      if (userVal) {
        list.append('<li>' + userVal.userInput + '</li>');
        elfOldInput = userVal.oldInput;
      }
    });
}

function elfFireDynamicPush() {

    function writeUserData() {
        var userInput = $('#userInput').val();
        if (userInput === '') {
            userInput = 'No input from user.';
        }

        if (!Array.isArray(elfOldInput)) {
            elfOldInput = [];
        }
        elfOldInput.push(userInput);
        firebase.database().ref('bar/qux').set({
            userInput: userInput,
            oldInput: elfOldInput
        });
    }

    writeUserData();
}

function elfFireDataPush() {

    function writeUserData(userId, name, email, imageUrl) {
        firebase.database().ref('bar/foo').set({
            foo: 'foobar',
        });
    }

    writeUserData();
}

/************************************
 * Authentication (Sign-In)
 ************************************/

function elfFireSignOut() {
    firebase.auth().signOut();
    window.location.href = '/';
}

function elfFireConfig() {
    // FirebaseUI config.
    var uiConfig = {
        'signInSuccessUrl': 'start.html',
        'signInOptions': [
            // Leave the lines as is for the providers you want to offer your users.
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            //firebase.auth.GithubAuthProvider.PROVIDER_ID,
            //firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        'tosUrl': '<your-tos-url>',
    };

    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);

}

function elfFireInitPage() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var uid = user.uid;
            var providerData = user.providerData;
            user.getToken().then(function(accessToken) {
                document.getElementById('sign-in-status').textContent = 'Signed in';
                document.getElementById('sign-in').textContent = 'Sign out';
                document.getElementById('account-details').textContent = JSON.stringify({
                    displayName: displayName,
                    email: email,
                    emailVerified: emailVerified,
                    photoURL: photoURL,
                    uid: uid,
                    accessToken: accessToken,
                    providerData: providerData
                }, null, '  ');
            });
        } else {
            // User is signed out.
            document.getElementById('sign-in-status').textContent = 'Signed out';
            document.getElementById('sign-in').textContent = 'Sign in';
            document.getElementById('account-details').textContent = 'null';
        }
    }, function(error) {
        console.log(error);
    });
};

$(document).ready(function() {
    $('table').addClass('table table-striped table-hover');
});
