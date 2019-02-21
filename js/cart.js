var perPieceCosts = [];

function setSum() {
    let clothNames = document.getElementsByClassName('clothName');
    let leastCounts = document.getElementsByClassName('leastCount');
    let presCounts = document.getElementsByClassName('presCount');

    let totalPieces = document.getElementsByClassName('totalPiece');
    let totalCosts = document.getElementsByClassName('totalCost');
    let totSum = 0;
    for (let i = 0; i < clothNames.length; i++) {
        let sum = 0;
        let temp = (parseInt(presCounts[i].value) + parseInt(leastCounts[i].innerHTML));
        sum = sum + (temp * (parseInt(perPieceCosts[i])));
        console.log("called" + perPieceCosts);
        totalCosts[i].innerHTML = sum;
        totalPieces[i].innerHTML = temp;
        totSum = totSum + sum;
    }
    document.getElementById('totalSum').innerHTML = "Total : " + totSum.toString();
    console.log(totSum);
}

function populateClothes() {

    let url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    for (let i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = tmp[1];
    }
    db.doc("hotels/" + String(data.phno)).get()
        .then(function (doc) {
            let bill = doc.data().balsheet;
            console.log(bill);
            for (let i = 0; i < bill.length; i++) {
                perPieceCosts[i] = bill[i].cost;
                console.log("set" + perPieceCosts[i]);
                let rowlay = `<tr>
                    <td><p class="clothName">${bill[i].clothtype}</p> (Rs.${bill[i].cost})</td>
                    <td class="leastCount">${bill[i].balance}</td>
                    <td><input type="number" onchange="setSum()" min="0" value="0" class="form-control input-sm presCount"/></td>
                    <td class="totalPiece">12</td>
                    <td class="totalCost">0</td>
                </tr>`;
                $("#clothtype").append(rowlay);
            }
            setSum();
            $.unblockUI();
        });

}

function submitPickUpDetails() {
  $.blockUI({message: '<h1><img src="../gifs/loading.gif" width="75px" height="75px"/> Just a moment...</h1>'});
    let url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    for (let i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = tmp[1];
    }
    db.doc("hotels/"+String(data.phno)).get().then(function(doc){
      data = doc.data();
      let clothNames = document.getElementsByClassName('clothName');
      let leastCounts = document.getElementsByClassName('leastCount');
      let presCounts = document.getElementsByClassName('presCount');
      let bill = [];
      for (i = 0; i < clothNames.length; i++) {
          let row = {};
          row['balance'] = parseInt(leastCounts[i].innerHTML.trim());
          row['present'] = parseInt(presCounts[i].value.trim());
          row['cost/piece'] = parseInt(perPieceCosts[i]);
          row['clothtype'] = clothNames[i].innerHTML.trim();
          bill.push(row);
      }
      //console.log(bill.shirt.present);
      console.log(data);
      db.collection("transaction").doc(Date.now() + "VIN" + data.phno.substr(1)).set({
          employee: firebase.auth().currentUser.phoneNumber + "",
          user: data.phno,
          type: 'pickup',
          isVerified: false,
          bill: bill,
          date: new Date().toLocaleString('en-IN'),

          hotelname: data.name,
      }).then(function () {
          $.unblockUI();
          console.log("Document successfully written!");
          window.location = "index.html"
      })
          .catch(function (error) {
              console.error("Error writing document: ", error);
          });
    });

}
