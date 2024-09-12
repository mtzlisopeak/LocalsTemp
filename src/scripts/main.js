document.addEventListener("DOMContentLoaded", () => {
    let inputCity = document.querySelector("#inputCidade");
    let btnBuscar = document.querySelector("#btnBuscar");
    let apiKey = "52eb3d56fe16f59e2fd9232cc7c52acf";
    let details = document.querySelectorAll("#list li p");
    let itemList = document.querySelectorAll("#list li p");
    let icons = document.querySelectorAll("#list li i");
    let message = document.querySelector("#message");
    let loader = document.querySelector(".spinner-border")
    let today = new Date;

    let clearInput = () => inputCity.value = ""
    let clearIcons = () => icons.forEach(el => el.classList.add("d-none"))
    let clearDetails = () => details.forEach(detail => detail.textContent = "") 
    let clearMessage = () => message.textContent = ""
    let removeDnone = () => icons.forEach(icon => icon.classList.remove("d-none"))
    let showMessage = (text, type)=>{message.textContent = text; message.className=type;}
    let toggleLoader = () => loader.classList.toggle("d-none")
    let updateDetails = (response) => {
        itemList[0].textContent = `Location: ${response.name}`;
        itemList[1].textContent = `Current temperature: ${response.main.temp}°C`;
        itemList[2].textContent = `Date: ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    }
    function makeRequisition() {
        let endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&appid=${apiKey}&units=metric`;
        let xhttp = new XMLHttpRequest();

        xhttp.open("GET", endpoint);
        xhttp.onload = () => {
            if (xhttp.status === 200) {
                clearInput();
                clearMessage()
                toggleLoader()
                setTimeout(function(){
                    let response = JSON.parse(xhttp.responseText);
                    clearIcons();
                    clearDetails();
                    updateDetails(response)
                    removeDnone();
                    toggleLoader();
                }, 500)
            } 
            else if (xhttp.status === 404) {
                clearInput()
                showMessage("Location not found.", "text-warning")
            }
            else {
                clearInput()    
                showMessage(`Error ${xhttp.status}: ${xhttp.statusText}`, "text-danger")
            }
        };
        xhttp.onerror = () => {
            clearInput()
            showMessage("Request failed. Check your network connection.", "text-danger")
        };
        xhttp.send();
    }

    if (btnBuscar) {
        btnBuscar.addEventListener("click", () => {
            if (inputCity.value.trim() === ""){
                clearDetails();
                clearIcons();
                showMessage("Type a location", "text-warning")
            }
            else {
                makeRequisition();
            }
        });
    }
});
