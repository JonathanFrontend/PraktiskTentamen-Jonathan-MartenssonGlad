/* Skriv din kod här */
const url = 'https://restcountries.eu/rest/v2/all';

//Land-kontruktorn
function Country(_name, _flag, _timezone, _order) {
    this.name = _name;
    this.flag = _flag;
    this.timezone = _timezone; //UTC

    this.o = _order; //För att presentera informationen i rätt ordning i HTML-filen
}
Country.prototype.getTime = function(){ //Får fram rätt tid
    let date = new Date();

    console.log(this.timezone);

    let tzHour;
    /* Adderar/subtraherar timmar enligt UTC */
    if (this.timezone == "UTC") { //Ifall tiden är UTC+0;
        tzHour = 0;
    } else {
        tzHour = parseInt(this.timezone.substr(3, 6)); //Tar så mycket som skilljer sig från neutral UTC.
    }
    console.log(tzHour)
    let hours = date.getUTCHours() + tzHour;
    let minutes = date.getMinutes();

    if (hours < 0) {
        hours = 24 + hours; // För att undvika att det står ett minustecken på tiden. 
    }
    else if (hours >= 24) {
        hours = 0 + (hours - 24); //Så att det står den korrekta tiden.
    }

    /* För att tim- och minutvisarna alltid ska vara tvåsiffriga */
    minutes = ('0' + minutes).slice(-2);
    hours = ('0' + hours).slice(-2);

    return `${hours}:${minutes}`;
}
Country.prototype.presentInfo = function(){
    const section = document.querySelectorAll('section');
    const img = section[this.o].children[0];
    const h1 = section[this.o].children[1];
    const h3 = section[this.o].children[2];

    img.src = this.flag;
    h1.innerText = this.name;
    h3.innerText = this.getTime();
}

fetch(url).then(
    response => {
        console.log(response);
        if (response.status >= 200 && response.status < 300) {
            return response.json();
        }
        else {
            throw `${response.status}: Ett fel uppstod.`;
        }
    }
).then(
    data => {
        console.log(data)

        let countries = [];

        for (let i = 0; i < 3; i++){
            let r = Math.floor(data.length * Math.random());
            
            countries.push(
                new Country(data[r].name, data[r].flag, data[r].timezones[0], i)
            )
            console.log(countries[i]);
        }

        for (let country of countries){
            country.presentInfo();
        }
    }
).catch(
    error => {
        console.log(error);
    }
);