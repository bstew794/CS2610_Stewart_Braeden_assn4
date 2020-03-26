const priceURL = 'https://www.quandl.com/api/v3/datasets/LBMA/GOLD.json?column_index=2&start_date=2020-03-19&end_date=20-03-24&api_key=a8983iSQs9CoKF_mgKkE'
var message = "The current price of gold is $";
var price = 0;

fetch(priceURL)
    .then((response)=> {return response.json();})
    .then((data) => {
        var priceSet = data.dataset.data[0];
        price = priceSet[1];

        message += price + " per troy ounce.";

        document.getElementById("display").innerHTML = message;
    })
    .catch(function(err) {
        console.log("Something went wrong here...", err);
    });

document.getElementById("compute_butt").onclick = function(){addOutput(document.getElementById("weight_in").value,
    document.getElementById("units_select").value)
}
var outputDiv = document.createElement("DIV");
document.body.appendChild(outputDiv);

function getDateTime(){
    var today = new Date();
    var date = (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    return date + " " + time;
}

function addOutput(num, units){
    var outputEl = document.createElement("DIV");
    outputEl.className = "TODO";
    outputEl.onclick = function(e) {this.parentNode.removeChild(this)};
    outputDiv.insertBefore(outputEl, outputDiv.childNodes[0]);

    var timestamp = document.createElement("P");
    timestamp.style.display = "inline";
    timestamp.innerHTML = getDateTime();
    timestamp.className = "timestamp";
    outputEl.appendChild(timestamp);

    if(!(num === "")){
        var convertURL = "http://localhost:8000/unitconv/convert?from=" + units + "&to=t_oz&value=" + num;

        fetch(convertURL)
            .then((response) => {return response.json();})
            .then((data) => {
                var worth = price * data.value;

                var goodMessage = "You are worth: $" + worth.toFixed(2);

                var resultDisplay = document.createElement("P");
                resultDisplay.style.display = "inline";
                resultDisplay.innerHTML = goodMessage;
                outputEl.appendChild(resultDisplay);
            })
            .catch(function(err) {
                console.log("Something went wrong here...", err);
            });
    }
    else{
        var resultDisplay = document.createElement("P");
        resultDisplay.style.display = "inline";
        resultDisplay.innerHTML = "Error! Not a valid number...";
        outputEl.appendChild(resultDisplay);
    }
}