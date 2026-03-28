🦈 Bruce-Passport 📟
The Ultimate WiFi-Consuming Virtual Pet for Microcontrollers 🌌

Flipper-JS-Passport is a feature-rich, persistent digital companion inspired by the iconic Flipper Zero Passport system. Written in JavaScript for the Espruino ecosystem, this project transforms your development board (ESP32, M5Stack, Cardputer) into a living, breathing "Tamagotchi-for-hackers." 🦾✨

Your pet doesn’t eat kibble—it eats data. 📶 By scanning nearby WiFi networks, your pet "consumes" unique MAC addresses and SSIDs to gain XP, level up, and evolve its personality. 🍩

✨ Core Features 🚀

🆔 Hardware-Locked Identity
- Every pet is born with a unique soul.
- Uses a custom Unique ID Generator that scrapes your device’s physical MAC address to craft a permanent, 10-character name.
- No two devices will ever host the same pet! 🧠

📶 Signal Consumption (The Diet)
- Your pet stays healthy by "eating" nearby signals.
- WiFi Scanning: Actively probes for access points.
- XP System: Consuming a new, unique signal increases Level and Fullness.
- Memory: Remembers the last 15 signals it ate, ensuring it only craves "fresh" data! 🍎

🎭 Advanced Emotion Engine
- Over 19+ dynamic emotional states.
- Reacts in real-time to your care.
- Examples: Admiration (o . o), Gloating (> u <), Resentment (; _ ;)
- ASCII-based UI shifts to reflect current mood and fullness. 📈

💾 Persistence & Flash Storage
- Never lose progress!
- Robust Save/Load system serializes your pet’s entire state: Name, Level, Fullness, Mood, and History.
- Stores in passport.json on internal Flash memory.
- Survives reboots and battery swaps! 🔋🔋

🎨 Modern Retro UI
- Floating Animations: Smooth, 1Hz vertical bobbing for the pet’s face.
- High-Contrast Graphics: Optimized for small TFT/LCD screens.
- Interactive HUD: Real-time stats for Level, Fullness, and Mood.

🛠️ Technical Specifications ⚙️
Feature       | Detail
------------- | ---------------------------------------
Language      | JavaScript (Espruino / M.JS) ⌨️
Runtime       | Espruino Engine ⚡️
Storage       | Internal Flash (via storage module) 📂
I/O           | Supports Display, Keyboard, and WiFi modules 🔧
Format        | JSON-based flat-file database (passport.json) 📝

🕹️ Controls
- CW / Next Press 🔍: Scan & Eat. Triggers a WiFi scan; your pet eats new signals and levels up!
- CCW / Prev Press 💾: Save & Exit. Manually saves your pet's state and closes the app.
- Auto-Save 🍩: Automatically saves after every successful meal.

🚀 Quick Installation
1. Ensure your board is running Espruino.
2. Open the Espruino Web IDE.
3. Copy the code from passport.js into the editor.
4. Click Upload to Flash.
5. Enjoy your new digital companion! 🐬💨

🤝 Contributing
- Have ideas for new "foods" (Bluetooth? Sub-GHz?) or more complex emotions?
- Fork the repo and submit a PR!
- Let’s build the best JS-based cyber-pet together. 🌟

Inspired by the Flipper Zero. Built for the community. 🤘
