// 1. MODULES (Checks if already in memory)
if (typeof storage === 'undefined') var storage = require("storage");
if (typeof display === 'undefined') var display = require("display");
if (typeof keyboard === 'undefined') var keyboard = require("keyboard");
if (typeof wifi === 'undefined') var wifi = require("wifi");

// 2. GLOBALS & PERSISTENCE CONFIG
var dbPath = "/passport.json";
var MAX_MEMORY = 15; 
var COLOR_ORANGE = display.color(255, 140, 0);
var COLOR_BLACK = display.color(0, 0, 0);

var emotions = {
    "Admiration": "(o . o)", "Anger": "(> _ <)", "Boredom": "(- _ -)",
    "Disappointment": "(u _ u)", "Distress": "(o _ o)", "Fear": "(0 _ 0)",
    "Gloating": "(> u <)", "Gratitude": "(: _ :)", "Happy-for": "(^ _ ^)",
    "Hate": "(x _ x)", "Hope": "(o v o)", "Love": "(< 3 )", 
    "Mildness": "(. _ .)", "Pity": "(o . o)", "Pride": "(p _ p)", 
    "Relief": "(- v -)", "Reproach": "(o _ -)", "Resentment": "(; _ ;)", 
    "Satisfaction": "(: - )", "Shame": "(. / .)"
};

// 3. HARDWARE-BASED UNIQUE ID GENERATOR
function generateUniqueID() {
    var charset = "qwertyuiopasdfghjklzxcvbnm1234567890!@_";
    var macAddr = "";
    try {
        macAddr = (wifi.getMac ? wifi.getMac() : "HW" + Math.random());
    } catch(err_mac) { macAddr = "ID" + Date.now(); }
    
    var finalName = "";
    for (var k = 0; k < 10; k++) {
        var charIdx = (macAddr.charCodeAt(k % macAddr.length) + k) % charset.length;
        finalName += charset.charAt(charIdx);
    }
    return finalName.toUpperCase();
}

// 4. PASSPORT OBJECT (The "Brain")
function Passport(data) {
    // If 'data' exists, the pet "wakes up" with its old memories
    this.name = (data && data.name) ? data.name : generateUniqueID();
    this.level = (data && data.level) ? data.level : 1;
    this.fullness = (data && data.fullness !== undefined) ? data.fullness : 50;
    this.mood = (data && data.mood) ? data.mood : "Hope";
    this.captured = (data && data.captured) ? data.captured : [];
}

// THE SAVE FUNCTION (Writes to internal Flash)
Passport.prototype.save = function() {
    var payload = { 
        name: this.name, 
        level: this.level,
        fullness: this.fullness, 
        mood: this.mood, 
        captured: this.captured 
    };
    // Format JSON with 4-space indent for readability
    var organizedJson = JSON.stringify(payload, null, 4);
    storage.write(dbPath, organizedJson);
};

Passport.prototype.eatSignal = function(id) {
    for (var m = 0; m < this.captured.length; m++) {
        if (this.captured[m] === id) return false; 
    }
    if (this.captured.length >= MAX_MEMORY) this.captured.shift(); 
    this.captured.push(id);
    this.fullness = Math.min(100, this.fullness + 5);
    this.level++;
    this.mood = "Satisfaction";
    return true;
};

// 5. UI RENDERING
var floatY = 0; var floatDir = 1;
function drawUI(p, face, msg) {
    display.fill(COLOR_ORANGE);
    display.setTextColor(COLOR_BLACK);
    floatY += floatDir;
    if (floatY > 2 || floatY < -2) floatDir *= -1;

    display.setTextSize(4);
    display.drawString(face || emotions[p.mood], 20, 25 + floatY);
    display.setTextSize(1);
    display.drawString("MOOD: " + p.mood.toUpperCase(), 20, 65);
    display.setTextSize(2);
    display.drawString("Name: " + p.name, 20, 85);
    display.setTextSize(1);
    display.drawString("LVL: " + p.level + " | FULL: " + p.fullness + "%", 20, 115);
    display.drawString(msg || "CW: EAT | CCW: EXIT", 20, 145);
}

// 6. INITIALIZATION (The "Load" sequence)
var pet;
try {
    var raw = storage.read(dbPath);
    // If the file exists, parse it; otherwise, make a new pet
    pet = new Passport(raw ? JSON.parse(raw) : null);
} catch (err_load) { 
    pet = new Passport(); 
}

// 7. MAIN LOOP
while (true) {
    // CLOCKWISE - EAT & AUTO-SAVE
    if (keyboard.getNextPress()) {
        var nets = [];
        try { 
            nets = wifi.scan() || []; 
        } catch(err_scan) { nets = []; }
        
        var eatenCount = 0;
        for (var n = 0; n < nets.length; n++) {
            var signalId = nets[n].MAC || nets[n].SSID; 
            if (pet.eatSignal(signalId)) eatenCount++;
        }
        
        drawUI(pet, (eatenCount > 0 ? "(^ u ^)" : "(u _ u)"), (eatenCount > 0 ? "ATE " + eatenCount + " NEW!" : "NO NEW DATA"));
        
        // Critical: Save after every successful interaction
        pet.save(); 
        delay(800);
    } 
    
    // COUNTER-CLOCKWISE - SAVE & EXIT
    if (keyboard.getPrevPress()) {
        pet.save();
        break;
    }

    drawUI(pet);
    delay(100); 
}

// 8. FINAL EXIT
display.fill(COLOR_BLACK);
throw "saved";
