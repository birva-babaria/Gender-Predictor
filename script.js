const URL = "https://api.genderize.io?name=";

let nameField = document.getElementById("name");
let predictBtn = document.getElementById("predict");
let wrapper = document.getElementById("wrapper");

let predictGender = async () => {
    let name = nameField.value;
    let error = document.getElementById("error");
    wrapper.innerHTML = "";
    error.innerText = "";

    let regex = /^[a-zA-Z]+$/;
    if(name && regex.test(name)){
        let response = await fetch(URL+name);
        let data = await response.json();
        let div = document.createElement("div");
        div.setAttribute("id", "information");
        div.innerHTML = `<h2 id="output-name">${data.name}</h2><img src="" id="gender-icon"/><h1 id="gender">${data.gender}</h1><h4 id="probability">Probability: ${data.probability}</h4>`;
        wrapper.append(div);

        if(data.gender == "female"){
            div.classList.add("female");
            document.getElementById("gender-icon").setAttribute("src", "female.svg")
        }
        else if(data.gender == "male"){
            div.classList.add("male");
            document.getElementById("gender-icon").setAttribute("src", "male.svg");
        }
        else{
            wrapper.innerHTML = "";
            error.innerText = "We were not able to predict the gender :(";
        }
    }
    else{
        error.innerText = "Please enter a valid name :)";
    }

}

predictBtn.addEventListener("click", predictGender);
window.addEventListener("load", predictGender);