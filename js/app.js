var config = {
  apiKey: "AIzaSyBpn-7MD6dltbxv3mWG_YAd_C1UG_V472c",
  authDomain: "unified-surf-122216.firebaseapp.com",
  databaseURL: "https://unified-surf-122216.firebaseio.com",
  projectId: "unified-surf-122216",
  storageBucket: "unified-surf-122216.appspot.com",
  messagingSenderId: "810627775231"
};
firebase.initializeApp(config);

var db = firebase.firestore();

firebase.firestore().enablePersistence()
    .then(function() {
        // Initialize Cloud Firestore through firebase
        db = firebase.firestore();
    })
    .catch(function(err) {
        if (err.code == 'failed-precondition') {
            // Multiple tabs open, persistence can only be enabled
            // in one tab at a a time.
            // ...
        } else if (err.code == 'unimplemented') {
            // The current browser does not support all of the
            // features required to enable persistence
            // ...
        }
    });

function signoutUser() {
  firebase.auth().signOut().then(function () {
    // Sign-out successful.
    alertDialog("Sucessfully logged out");
  }).catch(function (error) {
    // An error happened.
  });
}

function readBill() {
  db.collection("transaction").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(`${doc.data().bill[0].present} => ${doc.id}`);
    });
  });
}

function checkEmployee(){
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      var employeeRef = db.collection('Workers').doc(String(user.phoneNumber));
      var df = employeeRef.get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No employee record');
          window.location = '../index.html';
        } else {
          console.log('employee record');
        }
      })
      .catch(err => {
        console.log('Error getting document', err);
      });
    } else {
      // No user is signed in.
    }
  });
}
