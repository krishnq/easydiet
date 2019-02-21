var hotelsList = [];
var currentPage = -1;
var perPage = 3;

function fetchHotels() {
    db.collection("hotels")
        .orderBy("name")
        .get()
        .then((querySnapshot) => {
            console.log(querySnapshot.size);
            showPagerNums(Math.ceil(querySnapshot.size / perPage));
            querySnapshot.forEach((doc) => {
                //console.log(`${doc.data().name} => ${doc.id}`);
                let hotel = {};
                hotel["id"] = doc.id;
                hotel["name"] = doc.data().name;
                hotel["phno"] = doc.data().phno;
                hotel["address"] = doc.data().address;
                hotel["location"] = doc.data().location;
                hotelsList.push(hotel);
            });
            populateHotelsList(1);
            $.unblockUI();
        });

}

function populateHotelsList(pageNum) {
    console.log("function called",currentPage,pageNum);

    if (pageNum <= 0) pageNum = 1;
    if (pageNum >= hotelsList.length / perPage) pageNum = Math.ceil(hotelsList.length / perPage);

    if (currentPage !== pageNum) {
        currentPage = pageNum;
        console.log("update",currentPage,pageNum);
        $("#hotelContainer").html("");
        console.log("page cleared");
        console.log('pno' + pageNum);
        let n = (hotelsList.length - ((pageNum - 1) * perPage));
        console.log('n:' + n);
        n = n > perPage ? 3 : n;
        console.log('n:' + n);
        for (let k = 0; k < n; k++) {
            let idx = (pageNum - 1) * perPage + k;
            let rowlay =
                `<div class="row small-padding-bg" style="color: white;">
                        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-5">
                            <div class="image-size"><img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgAeHxtQ6u197gxDbO0dCrmIOoARgKHnMCjK4E3Wua-1k_ygzA"/>
                            </div>
                        </div>

                        <h3 class="col-lg-5 col-md-5 col-sm-8 col-xs-5">${hotelsList[idx].name}</h3>

                        <div class="col-lg-5 col-md-5 col-sm-8 col-xs-7">
                            <p class="col-lg-12 col-md-12 col-sm-6 col-xs-12 "><span><i class="fa fa-mobile" aria-hidden="true"></i></span>Owner
                                Name</p>
                            <p class="col-lg-12 col-md-12 col-sm-6 col-xs-12"><span><i class="fa fa-mobile" aria-hidden="true"></i></span>${hotelsList[idx].phno}
                            </p>
                            <p class="col-lg-12 col-md-12 col-sm-6 col-xs-12">  <span><i class="fa fa-mobile" aria-hidden="true"></i></span>${hotelsList[idx].location}
                            </p>
                        </div>

                        <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                <a href="cart.html?phno=${hotelsList[idx].phno}&&name=${hotelsList[idx].name}" class="btn_orange medium customs-margin">Pickup</a>
                            </div>

                            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                <a href="deliver.html?phno=${hotelsList[idx].phno}&&name=${hotelsList[idx].name}" class="btn_orange medium customs-margin">Deliver</a>
                            </div>

                        </div>
                    </div>`;
            $("#hotelContainer").append(rowlay);
            console.log("hotel appended " + idx);
        }
        window.scrollTo(0, 0);
    }
}

function showPagerNums(numPages) {
    let pageIndic = `<li class="page-item"><a class="page-link" onclick="populateHotelsList(${currentPage - 1})">Previous</a></li>`;
    for (let i = 1; i <= numPages; i++) {
        pageIndic += `<li class="page-item"><a class="page-link" onclick="populateHotelsList(${i})">${i}</a></li>`;
    }
    pageIndic += `<li class="page-item"><a class="page-link" onclick="populateHotelsList(${currentPage + 1})">Next</a></li>`;
    $("#page-number").html(pageIndic);
}

function search(event) {
    if (event.key === "Enter") { // enter key
        //console.log("searched"); // do nothing
        let search = document.getElementById("searchbox").value;
        if (search != null && search.toString().length >= 2) {
            let i = 0, n = 0;
            showingList = [];
            while (i < hotelsList.length) {
                console.log(" hotel " + hotelsList[i]);

                if (hotelsList[i].name.match(search)) {
                    console.log(" matched " + search);
                    showingList[n] = hotelsList[i];
                    n++;
                }
                i++;
            }
            populateHotelsList(1);
            //showPagerNums();
        }
    }
}