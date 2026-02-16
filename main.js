const syllables = [
  "tsu", "ka", "shi", "ru", "zen", "ko", "mi", "ta", "ri", "yo",
  "na", "ha", "chi", "fu", "ke", "sa", "to", "ni", "wa", "ma",
  "ra", "ki", "su", "te", "mo", "yu", "ne", "ho", "mu", "re",
  "no", "ku", "ya", "so", "nu", "he", "ro", "me", "se", "wo",
  "hi", "do", "ga", "ba", "pu", "de", "bo", "gi", "zu", "pe", 
  "vö", "jök", "yksi", "häll", "øy", "fjör", "skål", "björk", "älv", "snö",
  "fjäll", "kär", "ström", "örn", "foss", "köld", "vík", "höfn", "rök", "þór",
  "ást", "úlf", "eyja", "völ", "drög", "fjall", "vatn", "söng", "röst", "ljós",
  "mörk", "hrafn", "völd", "ætt", "gísla", "þung", "hrím", "vindur", "skugga", "dökkur",
  "hvert", "eilíf", "örlög", "móður", "fólk", "sæll", "kirkja", "ferð", "stund", "þjóð",
  "crx", "blp", "wrz", "skr", "tkr", "phl", "vnx", "zph", "qrx", "fkl",
  "drv", "klz", "prx", "tch", "vrt", "xnk", "flx", "grz", "hrp", "jxt",
  "krl", "lmn", "mrz", "nxt", "plk", "qtz", "rvx", "shn", "trk", "vph",
  "wlk", "xrl", "ylz", "znx", "brt", "chx", "dph", "frz", "glk", "hxt",
  "jrp", "kpz", "lrx", "mth", "nkl", "phz", "qrk", "rxt", "shp", "thx",
  "qbit", "flux", "node", "vex", "algo", "byte", "core", "data", "exec", "grid",
  "hash", "init", "kern", "loop", "mem", "null", "proc", "quad", "root", "sync",
  "tech", "unit", "void", "wave", "hex", "bin", "cpu", "disk", "edge", "func",
  "gate", "host", "inet", "join", "key", "link", "mod", "net", "opt", "port",
  "ram", "scan", "term", "unix", "vec", "web", "xml", "zip", "arch", "bit"
];

const others = [
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
  "10", "11", "12", "13", "14", "15", "16", "17", "18", "19",
  "20", "21", "22", "23", "24", "25", "26", "27", "28", "29",
  "30", "31", "32", "33", "34", "35", "36", "37", "38", "39",
  "40", "41", "42", "43", "44", "45", "46", "47", "48", "49",
  "50", "51", "52", "53", "54", "55", "56", "57", "58", "59",
  "60", "61", "62", "63", "64", "65", "66", "67", "68", "69",
  "70", "71", "72", "73", "74", "75", "76", "77", "78", "79",
  "80", "81", "82", "83", "84", "85", "86", "87", "88", "89",
  "90", "91", "92", "93", "94", "95", "96", "97", "98", "99",
  "_", "-", ".", "+", "#", "=", "~", "^", "*", "|",
  "Δ", "∑", "π", "∞", "√", "±", "÷", "×", "∅", "∈",
  "∂", "∇", "∫", "∏", "∪", "∩", "⊕", "⊗", "≈", "≠",
  "(", ")", "[", "]", "<", ">", "{", "}"
];

let totalNamesGenerated = 0;
let secretTriggered = false;

function generate() {
    const length = parseInt(document.getElementById('length').value);
    const chaos = parseInt(document.getElementById('chaos').value);
    const amount = parseInt(document.getElementById('amount').value);
    const customInput = document.getElementById('customInput').value;
    
    const display = document.querySelector('.display');
    
    if (totalNamesGenerated >= 999 && !secretTriggered) {
        secretTriggered = true;
        triggerSecret(display);
        return;
    }
    
    if (secretTriggered) {
        return;
    }
    
    for (let i = 0; i < amount; i++) {
        totalNamesGenerated++;
        
        const name = generateName(length, chaos, customInput);
        
        const nameElement = document.createElement('div');
        nameElement.textContent = name;
        nameElement.classList.add('name');
        
        display.appendChild(nameElement);
        
        if (totalNamesGenerated >= 999) {
            secretTriggered = true;
            triggerSecret(display);
            return;
        }
    }
}

function triggerSecret(display) {
    const allNames = display.querySelectorAll('.name');
    const namesArray = Array.from(allNames);
    
    function deleteRandomName() {
        if (namesArray.length > 0) {
            const randomIndex = Math.floor(Math.random() * namesArray.length);
            const nameToDelete = namesArray[randomIndex];
            nameToDelete.remove();
            namesArray.splice(randomIndex, 1);
            
            setTimeout(deleteRandomName, 25);
        } else {
            typeMessage(display);
        }
    }
    
    deleteRandomName();
}

function typeMessage(display) {
    const message = "kwahzee.com";
    let index = 0;
    
    const messageElement = document.createElement('div');
    messageElement.classList.add('secret-message');
    messageElement.style.fontSize = '60px';
    messageElement.style.textAlign = 'center';
    messageElement.style.marginTop = '200px';
    display.appendChild(messageElement);
    
    function typeNextLetter() {
        if (index < message.length) {
            messageElement.textContent += message[index];
            index++;
            setTimeout(typeNextLetter, 200);
        }
    }
    
    typeNextLetter();
}

function generateName(length, chaos, customInput) {
    const nameParts = [];
    
    for (let i = 0; i < length; i++) {
        const randomChance = Math.random();
        
        let chaosThreshold = 0;
        
        if (chaos === 1) {
            chaosThreshold = 0.25;
        } else if (chaos === 2) {
            chaosThreshold = 0.50;
        } else if (chaos === 3) {
            chaosThreshold = 0.75;
        }
        
        if (randomChance < chaosThreshold) {
            const randomElement = others[Math.floor(Math.random() * others.length)];
            nameParts.push(randomElement);
        } else {
            const randomElement = syllables[Math.floor(Math.random() * syllables.length)];
            nameParts.push(randomElement);
        }
    }
    
    if (customInput) {
        const randomPosition = Math.floor(Math.random() * nameParts.length);
        nameParts.splice(randomPosition, 0, customInput);
    }
    
    return nameParts.join('');
}