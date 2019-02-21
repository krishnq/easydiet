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
    .then(function () {
        // Initialize Cloud Firestore through firebase
        db = firebase.firestore();
    })
    .catch(function (err) {
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

function getAdminTransactions() {
    let i = 0;
    db.collection("transaction")
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

      <td height="90" style="vertical-align:middle;font-size: 4vmin;text-align:center;" class="cash">${doc.data().date.substring(4, 15)}</td>

      <td height="90" style="vertical-align:middle;font-size: 4vmin;text-align:center;" class="cash">Dell</td>
      <td height="90" style="vertical-align:middle;font-size: 4vmin;text-align:center;" class="cash">IN1930</td>

      </tr>

      <tr style="background-color: gray;padding: 0! important;margin:0" >

      <td colspan="3" height="0" style="padding:0;">
      <div class="user-infos info-divs" id="west${i}">
      <table class="table col-lg-9 col-md-9 col-sm-10 col-xs-10 table-striped">
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
            $('#bill-list').append(element);

            let bill = doc.data().bill;
            //console.log(bill);
            for (let key in bill) {
                //console.log(bill[key]['cost/piece']);
                //let perPieceCosts = key['cost/piece'];
                //console.log("set"+ perPieceCosts,key);
                let rowlay = `<tr>
        <td><p class="clothName">${key}</p> (Rs.${bill[key]['cost/piece']})</td>
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

function addEmployee() {
    let ephno = '+91' + document.getElementById('employeephno').value;
    db.collection('Workers').doc(String(ephno)).set({
        phno: ephno,
        admin: false,
    }).then(function () {
        console.log("employee sucessfully added");
        document.getElementById('employeephno').value = '';
    })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });

}


function getEmployees() {
    $('#emplist').empty();
    db.collection("Workers").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let select = document.getElementById("emplist");
            let el = `<li>${doc.data().phno}</li>`;
            $('#emplist').append(el);
        });
    });
}

function getAdminTransactionsbsDates(var1, var2) {
    var dateOffset = (24 * 60 * 60 * 1000) * 5; //5 days
    var myDate = new Date();
    myDate.setTime(myDate.getTime() - dateOffset);
    let data = [];
    db.collection("transaction")
        .where(firebase.firestore.FieldPath.documentId(), '>', myDate.getTime() + '')
        .get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            let r = doc.data().bill;
            for (let key in r) {
                let t = [];
                t.push(String(doc.data().date).substring(4, 10));
                t.push(key);
                t.push(r[key]['cost/piece']);
                t.push(r[key].present);
                t.push(r[key].balance);
                t.push(r[key].present + r[key].balance);
                data.push(t);
            }
        });
        console.log(data);
        $('#example').DataTable({
            data: data,
            columns: [
                {title: "date"},
                {title: "cloth"},
                {title: "cost/ps"},
                {title: "present"},
                {title: "prev balance"},
                {title: "total"}
            ],
            ordering: true
        });
    });
}
