import MicroModal from 'micromodal';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc)
dayjs.extend(timezone)

let currentTimezone = "America/Sao_Paulo";

// Functions

function setTime() {
    let now = dayjs().tz(currentTimezone);

    document.querySelector("#full-date").innerHTML = now.format('dddd, D MMM, YYYY');
    document.querySelector("#current-time").innerHTML = now.format('hh:mm:ss');
}


function changeTimezone(e){
    e.preventDefault();
    
    currentTimezone = document.querySelector('#timezone').value;
    document.querySelector('#current-timezone').innerHTML = document.querySelector('#timezone').selectedOptions[0].dataset.name;
    
    MicroModal.close("modal-1");
}

// Events

document.querySelector("#edit-timezone").addEventListener('click', () => MicroModal.show("modal-1"));
document.querySelector("#timezone-form").addEventListener('submit', changeTimezone);

// Start

setTime();
setInterval(setTime, 1000);

// Timezones Options

fetch("https://gist.githubusercontent.com/lugomio/e8d46ed4e3559078bf22c353dd0c1375/raw/ee1a2506a0a39b4718846123103eb797e7aeaa37/timezones.json")
    .then(response => response.json())
    .then(timezones => {
        document.querySelector("#timezone").innerHTML = timezones.sort((a, b) => a.name.localeCompare(b.name)).map(timezone => {
            return `<option value="${timezone.value}" data-name="${timezone.name}">${timezone.name}</option>`
        }).join('');
    });