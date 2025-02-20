//-------------------------------------------------------------------------------------------------------------
//Index Page

function generateTopCarCards(ele, obj){
    let {carname, price, seats, mode, fuel, type, imgpath} = obj;
    ele.innerHTML += 
    `<div class="card">
        <img src=${imgpath} class="card-img-top" alt="...">
        <div class="card-body">
            <h4 class="card-title">${carname}</h4>
            <p class="Starting-from">Starting from:</p>
            <h5>₹ ${price} <span style="font-size: 0.8rem;"> per day</span></h5>
            <section class="specs-section">
                <section class="specs-element"> 
                    <img src="/sources/Icons/seat.png" alt="" class="icon-images">
                    <span>${seats} Seater</span>
                </section>
                <section class="specs-element">
                    <img src="/sources/Icons/gearbox.png" alt="" class="icon-images">
                    <span>${mode}</span>
                </section>
                <section class="specs-element">
                    <img src="/sources/Icons/fuel.png" alt="" class="icon-images">
                    <span>${fuel}</span>
                </section>
                <section class="specs-element">
                    <img src="/sources/Icons/vehicle.png" alt="" class="icon-images">
                    <span>${type}</span>
                </section>
            </section>
        </div>
    </div>`
}

async function getBestSellers(ele){
    const response = await fetch("http://127.0.0.1:4050/cars/data/top5");
    const data = await response.text();
    const cardata = JSON.parse(data);
    //console.log(cardata);

    for(let i=0; i<cardata.data.length; i++){
        generateTopCarCards(ele, cardata.data[i]);
    }
}

if(document.getElementById("bestseller-container")){
    let container = document.getElementById("bestseller-container");
    getBestSellers(container);
}

//-------------------------------------------------------------------------------------------------------------
//Searching

async function getSearchedCarids(city, type){
    const response = await fetch(`http://127.0.0.1:4050/cars/data/search/${city}/${type}`);
    const data = await response.text();
    const carids = JSON.parse(data);

    console.log(carids);
    localStorage.setItem("searchedIds", data);
    location.href="listing.html";
}


function searchRides(){
    let city = document.getElementById("city-search").value.toLowerCase();
    let type = document.getElementById("vehicle-search").value;
    //console.log("value",type);
    getSearchedCarids(city, type);
}

//-------------------------------------------------------------------------------------------------------------
//Listing


function generateSearchedCarCards(ele, obj){
    let {carid, carname, model, price, refundable, seats, mode, fuel, type, imgpath} = obj;

    if(refundable==true){
        refundable = "Refundable";
    }else{
        refundable = "Non Refundable";
    }

    ele.innerHTML += 
    `<div class="card mb-3" style="max-width: 100%;">
        <div class="row g-0">
            <div class="col-md-4">
                <img src=${imgpath} class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                <h5 class="card-title">${carname}</h5>
                <h6 class="model-name" style="margin-bottom: 1rem;">${model}</h6>
                <section class="Specs" style="margin-bottom: 1rem;">
                    <section style="display: inline-block; margin-right: 1rem;"> 
                        <img src="/sources/Icons/seat.png" alt="" style = "width: 1.5rem; height: 1.5rem">
                        <span>${seats} Seater</span>
                    </section>
                    <section style="display: inline-block; margin-right: 1rem;">
                        <img src="/sources/Icons/gearbox.png" alt="" style = "width: 1.5rem; height: 1.5rem">
                        <span>${mode}</span>
                    </section>
                    <section style="display: inline-block; margin-right: 1rem;">
                        <img src="/sources/Icons/fuel.png" alt="" style = "width: 1.5rem; height: 1.5rem">
                        <span>${fuel}</span>
                    </section>
                    <section style="display: inline-block; margin-right: 1rem;">
                        <img src="/sources/Icons/vehicle.png" alt="" style = "width: 1.5rem; height: 1.5rem">
                        <span>${type}</span>
                    </section>
                </section>
                <p class="card-text" class="text-body-primary">${refundable}</p>
                <h5 style="margin-bottom: 1rem;">₹ ${price} <span style="font-size: 0.8rem;"> per day</span></h5>
                <button type="submit" id="${carid}" onclick="getSelectedRide(this.id)">Book Now</button>
                </div>
            </div>
        </div>
    </div>`;
}

async function getSearchedCarData(carids){
    const response = await fetch('http://127.0.0.1:4050/cars/data/search/cardata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(carids)
      })
    const data = await response.text();
    const cardata = JSON.parse(data);

    for(let i=0; i<cardata.data.length; i++){
        generateSearchedCarCards(listContainer, cardata.data[i]);
    }
}

if(document.getElementById("listing-container")){
    var sr = localStorage.getItem("searchedIds");
    const result = JSON.parse(sr);

    var listContainer = document.getElementById("listing-container");

    if(result.data.length==0){
        listContainer.innerHTML = `<p class="h3 mb-3" id="listing-title">No Results Found</p>`
    }
    else if(result.data.length>0){
        getSearchedCarData(result);
    }
}

function getSelectedRide(id){
    const obj = {"data" : [{ "carid": parseInt(id) }]};
    localStorage.setItem("selectedRideidx", JSON.stringify(obj));
    location.href="booking.html";
}

//-------------------------------------------------------------------------------------------------------------
//Booking Card

function generateSelectedCarCard(ele, obj){
    let {carname, model, price, refundable, seats, mode, fuel, type, imgpath} = obj;

    if(refundable==true){
        refundable = "Refundable";
    }else{
        refundable = "Non Refundable";
    }

    ele.innerHTML = 
    `<div class="card mb-3" style="max-width: 100%;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src=${imgpath} class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${carname}</h5>
                        <h6 class="model-name" style="margin-bottom: 1rem;">${model}</h6>
                        <section class="Specs" style="margin-bottom: 1rem;">
                            <section style="display: inline-block; margin-right: 1rem;"> 
                                <img src="/sources/Icons/seat.png" alt="" style = "width: 1.5rem; height: 1.5rem">
                                <span>${seats} Seater</span>
                            </section>
                            <section style="display: inline-block; margin-right: 1rem;">
                                <img src="/sources/Icons/gearbox.png" alt="" style = "width: 1.5rem; height: 1.5rem">
                                <span>${mode}</span>
                            </section>
                            <section style="display: inline-block; margin-right: 1rem;">
                                <img src="/sources/Icons/fuel.png" alt="" style = "width: 1.5rem; height: 1.5rem">
                                <span>${fuel}</span>
                            </section>
                            <section style="display: inline-block; margin-right: 1rem;">
                                <img src="/sources/Icons/vehicle.png" alt="" style = "width: 1.5rem; height: 1.5rem">
                                <span>${type}</span>
                            </section>
                        </section>
                        <p class="card-text" class="text-body-primary">${refundable}</p>
                        <h5 style="margin-bottom: 1rem;">₹ <span id="base-price">${price}</span> <span style="font-size: 0.8rem;"> per day</span></h5>
                    </div>
                </div>
            </div>
        </div>`;
}

async function getSearchedIdxCarData(carids){
    const response = await fetch('http://127.0.0.1:4050/cars/data/search/cardata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(carids)
    });
    const data = await response.text();
    const cardata = JSON.parse(data);

    localStorage.setItem("tempdata", JSON.stringify(cardata));

    for(let i=0; i<cardata.data.length; i++){
        generateSelectedCarCard(selected, cardata.data[i]);
    }
}

if(document.getElementById("selected-card-container")){
    const idx = localStorage.getItem("selectedRideidx");
    const selectedCardata = JSON.parse(idx);
    var selected = document.getElementById("selected-card-container");
    getSearchedIdxCarData(selectedCardata)
}

//-------------------------------------------------------------------------------------------------------------
//Booking Bill Generation & Booking

function generateBillData(ele, obj){
    let {baseRent, days, totalRent, gst, totalAmount} = obj;

    ele.innerHTML = 
    `<h3>Billing Details</h3>
    <table>
        <tr>
            <td>Base Rent</td>
            <td>${baseRent}</td>
        </tr>
        <tr>
            <td>Days</td>
            <td>${days}</td>
        </tr>
        <tr>
            <td>Total Rent</td>
            <td>${totalRent}</td>
        </tr>
        <tr>
            <td>GST (18%)</td>
            <td>${gst}</td>
        </tr>
        <tr>
            <td colspan="2"><hr></td>
        </tr>
        <tr>
            <td><strong>Total Bill</strong></td>
            <td><strong>${totalAmount}</strong></td>
        </tr>
    </table>`

}

function validiateAndGenerate(){
    const form = document.getElementById("myForm");
    const fullName = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const startDate = new Date(document.getElementById("start-date").value);
    const endDate = new Date(document.getElementById("end-date").value);
    const contact = document.getElementById("contact").value.trim();
    const age = parseInt(document.getElementById("age").value, 10);

    // Initialize an error message variable
    let errorMessage = "";

    // Check Full Name
    if (fullName === "") {
        errorMessage += "Full Name is required.\n";
    }

    // Check Email
    if (!form.email.checkValidity()) {
        errorMessage += "Please enter a valid email.\n";
    }

    // Check Start and End Dates
    if (startDate >= endDate) {
        errorMessage += "Start Date must be before End Date.\n";
    }

    // Check Contact Number (exactly 10 digits)
    if (!/^\d{10}$/.test(contact)) {
        errorMessage += "Contact number must be exactly 10 digits.\n";
    }

    // Check Age (positive integer)
    if (isNaN(age) || age <= 0) {
        errorMessage += "Please enter a valid age.\n";
    }

    if (errorMessage) {
        alert(errorMessage); // Display all error messages
    }else{
        billGenerate();
    }
}

function billGenerate(){
    let billContainer = document.getElementById("bill-container");
    let baseRent = parseInt(document.getElementById("base-price").innerHTML);
    let startDate = new Date(document.getElementById("start-date").value);
    let endDate = new Date(document.getElementById("end-date").value);

    let days = (endDate.getDate() - startDate.getDate())+1; 
    console.log(days, baseRent);

    let totalRent = baseRent * days;
    let gst = totalRent * 0.18;

    let totalAmount = totalRent + gst;

    localStorage.setItem("tempBill", totalAmount.toString());

    const billData = {baseRent, days, totalRent, gst, totalAmount};

    generateBillData(billContainer, billData);

    let submitBtn = document.getElementById("book-btn");

    submitBtn.disabled = false;

}

function bookRide(){
    let tempdata = JSON.parse(localStorage.getItem("tempdata"));

    tempdata.data[0].name = document.getElementById("fullname").value;
    tempdata.data[0].age = document.getElementById("age").value;
    tempdata.data[0].startdate = document.getElementById("start-date").value;
    tempdata.data[0].enddate = document.getElementById("end-date").value;
    tempdata.data[0].email = document.getElementById("email").value;
    tempdata.data[0].contact = document.getElementById("contact").value;

    tempdata.data[0].amount = parseInt(localStorage.getItem("tempBill"));

    //let bookingData = {bookingName, bookingAge, bookingStartDate, bookingEndDate, bookingEmail, bookingContactNo, finalAmount};

    localStorage.setItem("tempdata", JSON.stringify(tempdata));
    location.href="confirm.html";
}

//-------------------------------------------------------------------------------------------------------------
//Confirmation

function generateConfirmDetailsCard(ele, obj){
    let {name, age, startdate, enddate, email, contact, amount, carname, model} = obj;
    ele.innerHTML = 
    `<p><strong>Vehicle:</strong> ${carname}</p>
    <p><strong>Model Name:</strong> ${model}</p>
    <p><strong>Amount to be paid:</strong> ₹${amount}</p>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Age:</strong> ${age}</p>
    <p><strong>Start Date:</strong> ${startdate}</p>
    <p><strong>End Date:</strong> ${enddate}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Contact No:</strong> ${contact}</p>`;
}

if(document.getElementById("confirm-details")){
    let x = localStorage.getItem("tempdata");
    const details = JSON.parse(x).data[0];
    let confirmDetails = document.getElementById("confirm-details");
    generateConfirmDetailsCard(confirmDetails, details);
}

async function changeCarStatus(obj){
    let promise = await fetch(`http://127.0.0.1:4050/cars/data/changeflag`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
    });
    let data = await promise.text();
    console.log(data);
}

async function addOrderData(details){
    let response = await fetch("http://127.0.0.1:4050/orders/data/add", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(details),
    });

    let resdata = await response.text();
    console.log(resdata);
}

async function addBooking(details){
    await addOrderData(details);
    const carstatus = {"carid":details.carid, "flag":"true"};
    await changeCarStatus(carstatus);

    location.href = "final.html";
}

//After submit
function finalBook(){
    let data = localStorage.getItem("tempdata");
    const details = JSON.parse(data);
    addBooking(details.data[0]);
}

//-------------------------------------------------------------------------------------------------------------
//Ticket Booked

function generateBookedTicket(ele, obj){
    let {name, age, startdate, enddate, email, contact, amount, carname, model} = obj;
    ele.innerHTML = 
    `<div class="ticket">
        <h1>Rentify.com</h1>
        <hr>
        <h2>Vehicle Details</h2>
        <hr class="thin-line">
        <p><strong>Car Name:</strong> ${carname}</p><br>
        <p><strong>Model Name:</strong> ${model}</p><br>
        <p><strong>Dates:</strong> ${startdate} - ${enddate}</p><br>
        <p><strong>Payment:</strong> ${amount} Rs</p><br>
        <p><strong>Status:</strong> Booked</p><br>
        <hr class="section-divider">
        <h2>Personal Details</h2>
        <hr class="thin-line">
        <p><strong>Name:</strong> ${name}</p><br>
        <p><strong>Age:</strong> ${age}</p><br>
        <p><strong>Email:</strong> ${email}</p><br>
        <p><strong>Contact No:</strong> ${contact}</p><br>
    </div>`
}

if(document.getElementById("final-page")){
    let x = localStorage.getItem("tempdata");
    const orders = JSON.parse(x).data;
    getTicket(orders[0]);

}

function getTicket(carObj){
    const ticketContainer = document.getElementById("ticket-container");
    generateBookedTicket(ticketContainer, carObj);
    localStorage.setItem("searchedIds", "{}");
    localStorage.setItem("selectedRideidx", "{}");
    localStorage.setItem("tempBill", "{}");
    localStorage.setItem("tempdata", "{}");
}

//-------------------------------------------------------------------------------------------------------------
//Print Booked

function printTicket(){
    let btn = document.getElementById("print-btn");
    let link = document.getElementById("back-link");

    btn.style.display = "none";
    link.style.display = "none";

    window.print();

    btn.style.display = "block";
    link.style.display = "inline-block";
}

//-------------------------------------------------------------------------------------------------------------
//Booking Listing

function generateBookedCarCards(ele, obj){
    let {carid, name, startdate, enddate, contact, carname} = obj;
    startdate = startdate.slice(0, startdate.indexOf('T'));
    enddate = enddate.slice(0, enddate.indexOf('T'));

    ele.innerHTML += 
    `<div class="card text-center mb-3 mx-3" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${carname}</h5>
            <p class="card-text mb-0">Name: ${name}</p>
            <p class="card-text mb-0">Dates: ${startdate} - ${enddate}</p>
            <p class="card-text mb-2">Contact Details: ${contact}</p>
            <button class="btn btn-primary" id="${carid}" onclick="cancelBooking(this.id)">Cancel Booking</button>
        </div>
    </div>`;
}

async function getOrdersData(){
    const response = await fetch("http://127.0.0.1:4050/orders/data/get");
    const datastr = await response.text();
    const orders = JSON.parse(datastr);

    if(orders.data.length==0){
        booklistContainer.innerHTML = `<p class="h3">No Orders Placed</p>`;
    }
    else{
        booklistContainer.innerHTML = ``;
        for(let i=0; i<orders.data.length; i++){
            generateBookedCarCards(booklistContainer, orders.data[i]);
        }
    }

}

if(document.getElementById("booking-list-container")){
    var booklistContainer = document.getElementById("booking-list-container");
    getOrdersData();
}

//-------------------------------------------------------------------------------------------------------------
//Cancel Booking

async function deleteOrder(orderidx){
    const response = await fetch("http://127.0.0.1:4050/orders/data/delete", {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderidx),
    });
    const message = await response.text();
    console.log(message)
}

function cancelBooking(id){
    let idx = parseInt(id);
    let orderidx = {"carid": idx};
    if (confirm("Would you like to cancel the order?")) {
        deleteOrder(orderidx);

        const carstatus = {"carid":idx, "flag":"false"};
        changeCarStatus(carstatus);

        location.href = "booklisting.html";
    }
}
