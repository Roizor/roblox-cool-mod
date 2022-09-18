const fs = require('fs');
const os = require('os');
let rcmVer = Math.sin(0)^2+Math.cos(0)^2;
const robloxHome = os.homedir()+"\\AppData\\Local\\Roblox\\Versions";
if(fs.existsSync(robloxHome)) {
    let foundRoblox = false;
    let robloxFolder = {short:null,long:null};
    fs.readdirSync(robloxHome).forEach(filea => {
        if(filea.includes(".exe")) return;
        if(fs.lstatSync(robloxHome+"\\"+filea).isDirectory) { 
            fs.readdirSync(robloxHome+"\\"+filea).forEach(file => {
                if(foundRoblox == true) return;
                if(file.includes("RobloxPlayerBeta")) {
                    robloxFolder.short=filea;
                    robloxFolder.long=robloxHome+"\\"+filea;
                    foundRoblox = true;
                }
            })
        }
    })
    if(foundRoblox == true) {
        console.log("Roblox version found! Attempting patch on "+robloxFolder.short);
        patch(robloxFolder)
    }
}

function patch(robloxFolder={short:null,long:null,nodata:true}) {
    if(robloxFolder.nodata) {
        throw Error("No Roblox folder data!")
    }
    fontPath = robloxFolder.long+"\\content\\fonts";
    if(fs.existsSync(".\\mods\\rcm.json")) {
        json = require("./mods/rcm.json")
        keepFiles = false;
        Object.keys(json).forEach(type => {
            if(type == "$rcm") {
                console.log("Configuring RCM..")
                if(json["$rcm"].keepFiles == true) {
                    keepFiles = true;
                    console.log("Configuration: Keep files")
                } else {
                    console.log("Configuration: Delete files")
                }
                if(json["$rcm"].format != rcmVer) {
                    console.log("Outdated format ("+json["$rcm"].format+" > "+rcmVer+")! Here be dragons.")
                }
                return;
            }
            abc = type+".ttf";
            if(fs.existsSync(fontPath+"\\"+abc)) fs.unlinkSync(fontPath+"\\"+abc);
            if(keepFiles == true) {
                fs.copyFileSync("./mods/"+json[type], "./mods/"+json[type]+"-c")
                fs.renameSync("./mods/"+json[type]+"-c", fontPath+"\\"+abc)
            } else {
                fs.renameSync("./mods/"+json[type], fontPath+"\\"+abc)
            }
            console.log("Patched "+type+".ttf")
        })
    }
}