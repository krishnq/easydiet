//-----------------Release Configuration------------------
var config = {
  apiKey: "AIzaSyAbuHT4FwyNj3FQuOLrVOG2WPaPmUZL8ho",
  authDomain: "prakrithi-e1b6c.firebaseapp.com",
  databaseURL: "https://prakrithi-e1b6c.firebaseio.com",
  projectId: "prakrithi-e1b6c",
  storageBucket: "prakrithi-e1b6c.appspot.com",
  messagingSenderId: "1078624283929"
};


//-----------------Tester Configuration------------------
/*var config = {
  apiKey: "AIzaSyAH5MTZqWvAapQtOHijz5E4tMpDccpJJzs",
  authDomain: "prakrititester.firebaseapp.com",
  databaseURL: "https://prakrititester.firebaseio.com",
  projectId: "prakrititester",
  storageBucket: "prakrititester.appspot.com",
  messagingSenderId: "173929326447"
};
*/
firebase.initializeApp(config);


const db = firebase.firestore();
const settings = {
  /* your settings... */
  timestampsInSnapshots: true
};
db.settings(settings);

const storage = firebase.storage();
const storageRef = storage.ref();

function signup(email, password) {
  $.blockUI({
    message: '<h3><img src="images/loading.gif" width="75px" height="75px"/> Working in Background....</h3>'
  });
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
      var user = firebase.auth().currentUser;

      $.unblockUI();
      /*
            user.sendEmailVerification().then(function () {
              // Email sent.
              firebase.auth().signOut();
              
              alert("Please verify the email and login again.");

            }).catch(function (error) {
              // An error happened.
            });*/

    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
      $.unblockUI();
    });

}

function signin(email, password) {
  $.blockUI({
    message: '<h3><img src="images/loading.gif" width="75px" height="75px"/> Working in Background....</h3>'
  });
  firebase.auth().signInWithEmailAndPassword(email, password).then(function () {

    var det = firebase.auth().currentUser;
    $.unblockUI();
    window.location.replace("home/index.html");
    /*
        if (det.emailVerified === true) {
          console.log("email verified");
          //checkPincode();
          
        } else {
          alert("An email has been sent to your email, for verification.")
          alert("Please click the link in email to confirm.");
          alert("After confirming, please signin here again");
          firebase.auth().signOut();
        }*/
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === 'auth/wrong-password') {
      alert('Wrong password.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
  });


}

function signout() {
  firebase.auth().signOut().then(function () {
    // Sign-out successful.
    console.log("Signed out")
  }).catch(function (error) {
    // An error happened.
  });
}

function resetPassword(email) {
  var actionCodeSettings = {
    url: 'https://www.example.com/?email=user@example.com',
    iOS: {
      bundleId: 'com.example.ios'
    },
    android: {
      packageName: 'com.example.android',
      installApp: true,
      minimumVersion: '12'
    },
    handleCodeInApp: true
  };

  firebase.auth().sendPasswordResetEmail(
      email, actionCodeSettings)
    .then(function () {
      // Password reset email sent.
    })
    .catch(function (error) {
      if (error.code === 'auth/invalid-email') {
        alert("please provide appropriate email id");
      } else if (error.code === 'auth/user-not-found') {
        alert("no user exists with this email id");
      }
      // Error occurred. Inspect error.code.
    });
}

function getDetails() {
  var user = firebase.auth().currentUser;
  var docRef = db.collection("details").doc(user.uid);
  docRef.get().then(function (doc) {
    if (doc.exists) {
      console.log(doc.data().type);
      return doc.data();
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }).catch(function (error) {
    console.log("Error getting document:", error);
  });

}

function updatePassword(newPassword) {
  var user = firebase.auth().currentUser;
  //var newPassword = getASecureRandomPassword();

  user.updatePassword(newPassword).then(function () {
    // Update successful.
  }).catch(function (error) {
    // An error happened.
  });
}

function printDetails() {
  var user = firebase.auth().currentUser;

  if (user != null) {
    user.providerData.forEach(function (profile) {
      console.log("Sign-in provider: " + profile.providerId);
      console.log("  Provider-specific UID: " + profile.uid);
      console.log("  Name: " + profile.displayName);
      console.log("  Email: " + profile.email);
      console.log("  Email: " + user.email);
      console.log("  Email Verified: " + user.emailVerified);
      console.log("  Photo URL: " + profile.photoURL);
    });
  }
}

function addItem() {

  var user = firebase.auth().currentUser;
  var uid;
  if (true) {
    //$.blockUI({message: '<h1><img src="images/loading.gif" width="75px" height="75px"/> Adding New Item...</h1>'});
    //db.collection("shops").doc(user.uid).get().then(function(doc){
    db.collection("mrittica").add({
      pincode: "sdff" //doc.data().pincode
    }).then(function (docRef) {
      console.log(docRef.id);
      db.collection("mrittica").doc(user.uid).collection("items").doc(docRef.id).set({

      }).then(function () {
        $.unblockUI();
        //window.location.replace("addItem.html");
        //openBox = false;
      });
      $.unblockUI();
    });
    //}).catch(function(error){
    //alert(error.message);

    //});

  } else if (user == null) {
    $.unblockUI();
    alert("Please Login First");
    window.location.replace("index.html");


  } else {
    alert("Please fill Details");
  }
}