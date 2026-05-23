// Adding Currency Code in dropdown

let country = document.querySelectorAll(".countries");
for(let key in countryList) {
    let option1 = document.createElement("option");
    option1.setAttribute("value",key);
    option1.innerText = key;

    let option2 = document.createElement("option");
    option2.setAttribute("value",key);
    option2.innerText = key;
    if(key==="USD") option1.selected = true;
    if(key==="INR") option2.selected = true;
    country[0].append(option1);
    country[1].append(option2);
}

// Changing flag images

let flag2 = document.querySelector("#flag2");
let flag1 = document.querySelector("#flag1");

let url1="https://flagsapi.com/"
let url2="/shiny/64.png"

let dropdown1 = document.querySelector("#from");
dropdown1.addEventListener("change", ()=> {
    let countryCode1 = countryList[dropdown1.value];
    flag1.setAttribute("src",url1+countryCode1+url2);
});

let dropdown2 = document.querySelector("#to");
dropdown2.addEventListener("change", ()=> {
    let countryCode2 = countryList[dropdown2.value];
    flag2.setAttribute("src",url1+countryCode2+url2);
});

// Exchange Icon functioning

let icon = document.querySelector("#exIcon");

icon.addEventListener("click",(e) => {
    e.preventDefault();
    [dropdown1.value,dropdown2.value] = [dropdown2.value,dropdown1.value];
    let countryCode1 = countryList[dropdown1.value];
    flag1.setAttribute("src",url1+countryCode1+url2);
    let countryCode2 = countryList[dropdown2.value];
    flag2.setAttribute("src",url1+countryCode2+url2);

});

// Using currency change API, getting the currency exchange rate

async function getExchangeRate(from, to) {
  const res = await fetch(`https://api.frankfurter.dev/v2/rate/${from}/${to}`);
  const data = await res.json();
  return data.rate; 
}

// Displaying the exchange currency amout
let msg = document.querySelector(".msg");

let exBtn = document.querySelector("#getExRate");
console.log("script reached exBtn");
exBtn.addEventListener("click", ()=>{
    let amount = Number(document.querySelector("#amount").value);
    console.log(amount);
    getExchangeRate(dropdown1.value,dropdown2.value).then( (rate) => {
        msg.style.display = "flex";
        msg.innerText = `${(rate * amount).toLocaleString("en-IN", { maximumFractionDigits: 2 })} ${dropdown2.value}`;
    });
});

