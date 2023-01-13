const textarea = document.querySelector("textarea");
const select = document.querySelector("select");
const button = document.querySelector("button");

let synth = speechSynthesis;
isSpeaing = true;

function voices() {
    for(let voice of synth.getVoices()) {
        let selected = voice.name === "Goole US English" ? "selected" : "";
        let option = `<option value="${voice.name}" ${selected}>${voice.name} ${voice.lang} </option>`
        select.insertAdjacentHTML("beforeend", option);
    }
}
voices();

synth.addEventListener("voiceschanged" ,voices);


function textToSpeech(text) {
    let utternance = new SpeechSynthesisUtterance(text);
    synth.speak(utternance);
    for(let voice of synth.getVoices()) {
        if(voice.name === select.value) {
            utternance.value = voice;
        }
    }
    synth.speak(utternance);
}

button.addEventListener("click" , e => {
    e.preventDefault();
    if(textarea.value !== "") {
        if(!synth.speaking){ 
        textToSpeech(textarea.value);
    }
    if(textarea.value.length > 80) {

        if(isSpeaing) {
            synth.resume();
            isSpeaing = false;
            button.innerText = "Pause Speech";
        }else {
            synth.pause();
            isSpeaing = true;
            button.innerText = "Resume Speech";
        }

        setInterval(() => {
            if(!synth.speaking && !isSpeaing) {
                isSpeaing = true;
                button.innerText = "Convert to Speech";
            }
        })
    }else {
        button.innerText = "Resume Speech";
    }
    }
});
