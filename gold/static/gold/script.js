const url = 'https://www.quandl.com/api/v3/datasets/LBMA/GOLD.json?column_index=2&start_date=2020-03-19&end_date=20-03-24&api_key=a8983iSQs9CoKF_mgKkE'
var message = "The current price of gold is $";
var price = 0;

fetch(url)
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