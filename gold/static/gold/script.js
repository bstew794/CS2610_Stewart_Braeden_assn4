// The following variables store parts of the URL used to acess the most recent Gold price (per troy ounce).
const priceParams = "column_index=2&limit=5&api_key=a8983iSQs9CoKF_mgKkE";
const priceURL = 'https://www.quandl.com/api/v3/datasets/LBMA/GOLD.json?' + priceParams;

// These variables aren't used till the request to the unitconv API, but they store the message that the user will see.
var message = "The current price of gold is $";
var price = 0;

// Fetch the most recent gold price using quandl.com's API
fetch(priceURL)
    // return response as a JSON and then access the body of the JSON
    .then((response)=> {return response.json();})
    .then((data) => {
        //grab the most recent date:price pair from data.dataset.data (we know the the API will work with these).
        var priceSet = data.dataset.data[0];
        price = priceSet[1]; // grab the latest gold price

        message += price + " per troy ounce.";

        document.getElementById("display").innerHTML = message; // change the "Please Wait... to our message
    })
    .catch(function(err) {
        console.log("Something went wrong here...", err);
    });

// make it so pressing "Compute" will start the process to access the unitconv API
document.getElementById("compute_butt").onclick = function(){addOutput(document.getElementById("weight_in").value,
    document.getElementById("units_select").value)
}
// create empty div to store the new divs being made in addOutput()
var outputDiv = document.createElement("DIV");
document.body.appendChild(outputDiv);

/**
returns the current time and date
**/
function getDateTime(){
    var today = new Date();
    var date = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    return date + " " + time;
}

/**
adds a new output div to the document
**/
function addOutput(num, units){
    var outputEl = document.createElement("DIV");
    outputEl.onclick = function(e) {this.parentNode.removeChild(this)}; // removes div when clicked on
    outputDiv.insertBefore(outputEl, outputDiv.childNodes[0]); // place newest divs at the top

    // create timestamp and add it to output div
    var timestamp = document.createElement("P");
    timestamp.style.display = "inline";
    timestamp.innerHTML = getDateTime();
    timestamp.className = "timestamp";
    outputEl.appendChild(timestamp);

    if(!(num === "")){
        var convertURL = "http://" + locHost + "/unitconv/convert?from=" + units + "&to=t_oz&value=" + num;
        console.log(convertURL);

        // fetch the conversion of the num in units to troy ounces
        fetch(convertURL)
            .then((response) => {return response.json();})
            .then((data) => {
                // calculate worth in US$ and add resulting message to output div
                var worth = price * data.value;
                var goodMessage = "You are worth: $" + worth.toFixed(2);

                outputEl.className = "stuff-box green";
                var resultDisplay = document.createElement("P");
                resultDisplay.style.display = "inline";
                resultDisplay.innerHTML = goodMessage;
                outputEl.appendChild(resultDisplay);
            })
            .catch(function(err) {
                console.log("Something went wrong here...", err);
            });
    }
    // if the integer field is left empty (which could mean that a user tried to enter a string) then return an error
    else{
        outputEl.className = "stuff-box red";
        var resultDisplay = document.createElement("P");
        resultDisplay.style.display = "inline";
        resultDisplay.innerHTML = "Error! Not a valid number...";
        outputEl.appendChild(resultDisplay);
    }
}