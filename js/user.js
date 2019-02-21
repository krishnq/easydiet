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

// Create a root reference
var storageRef = firebase.storage().ref();

function signoutUser() {
  firebase.auth().signOut().then(function () {
    // Sign-out successful.
    //  alertDialog("Sucessfully logged out");
    window.location = '../index.html';
  }).catch(function (error) {
    console.log(error);
  });
}

function getTransactions(phno) {
  let i = 0;
  db.collection("transaction")
  .where("user", "==", String(phno))
  .get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      i++;
      //console.log(`${doc.data().bill} => ${doc.id}`);
      /*let rowlay = `<tr>
      <td><p class="clothName">${bill[i].clothtype}</p> (Rs.${bill[i].cost})</td>
      <td class="leastCount">${bill[i].balance}</td>
      <td><input type="number" onchange="setSum()" min="0" value="0" class="form-control input-sm presCount"/></td>
      <td class="totalPiece">12</td>
      <td class="totalCost">0</td>
      </tr>`;
      $("#clothtype").append(rowlay);*/
      let element = `
      <tr onclick="$('#west${i}').slideToggle(200);" style="cursor: pointer;" class="dropdown-user">

      <td height="60" style="vertical-align:middle;font-size: 3vmin;text-align:center;" class="cash">${doc.data().date.substring(0, 9)}</td>

      <td height="60" style="vertical-align:middle;font-size: 3vmin;text-align:center;" class="cash">${doc.data().type}</td>
      <td height="60" style="vertical-align:middle;font-size: 3vmin;text-align:center;" class="cash">${doc.data().employee}</td>

      </tr>

      <tr style="border-bottom: 2px solid #384d48;padding: 0! important;margin:0" >

      <td colspan="3" height="0" style="padding:0;">
      <div class="user-infos info-divs col-lg-12 col-md-12 col-sm-12 col-xs-12 " id="west${i}">
      <table class="table col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
      <thead>
      <tr>
      <th class="col-lg-3 col-md-3 col-sm-3 col-xs-3">Item</th>
      <th class="col-lg-2 col-md-2 col-sm-2 col-xs-2">Previous</th>
      <th class="col-lg-2 col-md-2 col-sm-3 col-xs-3">Count</th>
      <th class="col-lg-2 col-md-2 col-sm-2 col-xs-2">Unit</th>
      <!--<th class="col-lg-2 col-md-2 col-sm-2 col-xs-2">Total</th>-->
      <th class="col-lg-2 col-md-2 col-sm-2 col-xs-2">Total</th>
      </tr>
      </thead>
      <tbody id="clothtype${i}">

      </tbody>
      </table>
      </div>
      </td>
      </tr>
      `;

      console.log("image loading");
      storageRef.child('pickmycart/images/' + doc.data().user + '.jpg').getDownloadURL().then(function(url){
        document.getElementById('profileImage').src = url;
        document.getElementById('profilePic').style.display = "none";
      });
      let subm = `
      <button style="float:right;margin-right: 10px;margin-bottom:10px;transition-duration: .5s;" onclick="approve('${doc.id}')" class="w3-button w3-round-large w3-black w3-hover-gray"><span>Approve</span></button>
      `;
      if (doc.data().isVerified === false) {
        $('#pending-trans').append(element);
        $('#west' + i).append(subm);
      }
      else
      $('#bill-list').append(element);

      let bill = doc.data().bill;
      //console.log(bill);
      for (let key in bill) {
        //console.log(bill[key]['cost/piece']);
        //let perPieceCosts = key['cost/piece'];
        //console.log("set"+ perPieceCosts,key);
        let rowlay = `<tr>
        <td><p class="clothName">${bill[key].clothtype} (Rs.${bill[key]['cost/piece']})</p></td>
        <td class="leastCount">${bill[key].balance}</td>
        <td class="presCount">${bill[key].present}</td>
        <td class="totalPiece">${bill[key].balance + bill[key].present}</td>
        <td class="totalCost">${(bill[key].balance + bill[key].present) * bill[key]['cost/piece']}</td>
        </tr>`;
        $("#clothtype" + i).append(rowlay);
      }
    });
    var panels = $('.user-infos');
    var panelsButton = $('.dropdown-user');
    panels.hide();

  });
}

function checkUser() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      //  var db = firebase.firestore();
      var cityRef = db.collection('hotels').doc(String(user.phoneNumber));
      var getDoc = cityRef.get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No hotels record');
          window.location = '../index.html';
        } else {
          console.log('hotel record');
        }
      })
      .catch(err => {
        console.log('Error getting document', err);
      });

    } else {
      // No user is signed in.
      window.location = '../index.html';
    }
  });
}

function getProfile(phno) {
  var docRef = db.collection("hotels").doc(phno + "");

  docRef.get().then(function (doc) {
    if (doc.exists) {
      var s_name = doc.data().name;
      changeString(document.getElementById('headerName'),s_name);
      document.title = s_name;
      //$('#header-name').append();
      let profile = `
      <tbody>
      <tr>
      <td>Name</td>
      <td><input type="text" value=${doc.data().name} readonly="true" style="border: none;background:black;color:white;" id="Hname" class="profileInputs"/></td>
      </tr>
      <tr>
      <td>Location</td>
      <td>${doc.data().location}</td>
      </tr>
      <tr>
      <td>Address</td>
      <td><textarea  readonly style="border-top:none;border-left:none;border-right:none;background:black;color:white;" id="Hadds" class="profileInputs" cols="30" rows="4">${doc.data().address}</textarea></td>
      </tr>
      <tr>
      <td>Phone No:</td>
      <td>${doc.data().phno}</td>
      </tr>

      </tbody>`;
      $('#tb_profile').append(profile);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }).catch(function (error) {
    console.log("Error getting document:", error);
  });
}

function approve(id) {
  console.log(id);
  db.collection("transaction")
  .doc(String(id))
  .update({
    isVerified: true,
  })
  .then(function () {
    console.log("Document successfully updated!");
  })
  .catch(function (error) {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
  });
}
