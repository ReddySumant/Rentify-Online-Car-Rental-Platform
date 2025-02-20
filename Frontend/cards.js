export function generateTopCarCards(ele, obj){
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

export function generateSearchedCarCards(ele, obj, i){
    let {carname, model, price, refundable, seats, mode, fuel, type, imgpath} = obj;

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
                <button type="submit" id="${i}" onclick="getSelectedRide(this.id)">Book Now</button>
                </div>
            </div>
        </div>
    </div>`;
}

export function generateSelectedCarCard(ele, obj){
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
                    </div>
                </div>
            </div>
        </div>`;
}

export function generateBillData(ele, obj){
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

export function generateConfirmDetailsCard(ele, obj){
    let {bookingName, bookingAge, bookingStartDate, bookingEndDate, bookingEmail, bookingContactNo, finalAmount, carName, modelName} = obj;
    ele.innerHTML = 
    `<p><strong>Vehicle:</strong> ${carName}</p>
    <p><strong>Model Name:</strong> ${modelName}</p>
    <p><strong>Amount to be paid:</strong> ₹${finalAmount}</p>
    <p><strong>Name:</strong> ${bookingName}</p>
    <p><strong>Age:</strong> ${bookingAge}</p>
    <p><strong>Start Date:</strong> ${bookingStartDate}</p>
    <p><strong>End Date:</strong> ${bookingEndDate}</p>
    <p><strong>Email:</strong> ${bookingEmail}</p>
    <p><strong>Contact No:</strong> ${bookingContactNo}</p>`;
}

export function generateBookedTicket(ele, obj){
    let {bookingName, bookingAge, bookingStartDate, bookingEndDate, bookingEmail, bookingContactNo, finalAmount, carName, modelName} = obj;
    ele.innerHTML = 
    `<div class="ticket">
        <h1>Rentify.com</h1>
        <hr>
        <h2>Vehicle Details</h2>
        <hr class="thin-line">
        <p><strong>Car Name:</strong> ${carName}</p><br>
        <p><strong>Model Name:</strong> ${modelName}</p><br>
        <p><strong>Dates:</strong> ${bookingStartDate} - ${bookingEndDate}</p><br>
        <p><strong>Payment:</strong> ${finalAmount} Rs</p><br>
        <p><strong>Status:</strong> Booked</p><br>
        <hr class="section-divider">
        <h2>Personal Details</h2>
        <hr class="thin-line">
        <p><strong>Name:</strong> ${bookingName}</p><br>
        <p><strong>Age:</strong> ${bookingAge}</p><br>
        <p><strong>Email:</strong> ${bookingEmail}</p><br>
        <p><strong>Contact No:</strong> ${bookingContactNo}</p><br>
    </div>`
}

export function generateBookedCarCards(ele, obj, i){
    let {bookingName, bookingStartDate, bookingEndDate, bookingContactNo, carName} = obj;

    ele.innerHTML += 
    `<div class="card text-center mb-3 mx-3" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${carName}</h5>
            <p class="card-text mb-0">Name: ${bookingName}</p>
            <p class="card-text mb-0">Dates: ${bookingStartDate} - ${bookingEndDate}</p>
            <p class="card-text mb-2">Contact Details: ${bookingContactNo}</p>
            <button class="btn btn-primary" id="${i}" onclick="cancelBooking(this.id)">Cancel Booking</button>
        </div>
    </div>`;
}