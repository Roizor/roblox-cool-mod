/**
 * RRRR   CCCC   MM   MM
 * R  R  C       M MMM M
 * RRRR  C       M  M  M
 * RR    C       M     M
 * R R   C       M     M
 * R  R   CCCC   M     M
 * 
 * RCM - Roblox Cool Mod
 * 
 * You don't even have to know how to code to change this string.
 * The action string determines what RCM will do. Here's what to change it to
 * `patch` will patch your files according to rcm.json
 * `recovery` will only work if you have patched your fonts first.
 */
const action = "patch"

















const fs = require('fs');
const os = require('os');
let rcmVer = Math.sin(0) ^ 2 + Math.cos(0) ^ 2;
const robloxHome = os.homedir() + "\\AppData\\Local\\Roblox\\Versions";
if (fs.existsSync(robloxHome)) {
    let foundRoblox = false;
    let robloxFolder = { short: null, long: null };
    fs.readdirSync(robloxHome).forEach(filea => {
        if (filea.includes(".exe")) return;
        if (fs.lstatSync(robloxHome + "\\" + filea).isDirectory) {
            fs.readdirSync(robloxHome + "\\" + filea).forEach(file => {
                if (foundRoblox == true) return;
                if (file.includes("RobloxPlayerBeta")) {
                    robloxFolder.short = filea;
                    robloxFolder.long = robloxHome + "\\" + filea;
                    foundRoblox = true;
                }
            })
        }
    })
    if (foundRoblox == true) {
        if(action == "patch") {
            console.log("Roblox version found! Attempting patch on " + robloxFolder.short);
            patch(robloxFolder)
        } else {
            console.log("Roblox version found! Attempting recovery on " + robloxFolder.short);
            if(fs.existsSync(robloxFolder.long+"\\content\\fonts\\$rcm")) {
                recoverFiles(robloxFolder);
            } else {
                console.log("No backup was found!")
            }
        }
    }
}

function patch(robloxFolder = { short: null, long: null, nodata: true }) {
    let canBackup = true;
    let json = require("./mods/rcm.json");
    if (robloxFolder.nodata) {
        throw Error("No Roblox folder data!")
    }
    let fontPath = robloxFolder.long + "\\content\\fonts";
    if (fs.existsSync(fontPath + "\\$rcm")) {
        console.log("This Roblox version has already been patched atleast once by RCM! No backup will be able to be made.")
        canBackup = false;
    }
    if (canBackup == true) {
        fs.readdirSync(fontPath).forEach(file => {
            if(file == "families") return;
            fs.copyFileSync(fontPath+"\\"+file, fontPath+"\\"+btoa(file)+".rcmBackup")
            fs.writeFileSync(fontPath + "\\" + "$rcm", btoa("rcv:" + json['$rcm'].format + ";used:" + Date.now()))
        })
    }
    if (fs.existsSync(".\\mods\\rcm.json")) {
        keepFiles = false;
        Object.keys(json).forEach(type => {
            if (type == "$rcm") {
                console.log("Configuring RCM..")
                if (json["$rcm"].keepFiles == true) {
                    keepFiles = true;
                    console.log("Configuration: Keep files")
                } else {
                    console.log("Configuration: Delete files")
                }
                if (json["$rcm"].format != rcmVer) {
                    console.log("Outdated format (" + json["$rcm"].format + " > " + rcmVer + ")! Here be dragons.")
                }
                return;
            }
            abc = type + ".ttf";
            if (fs.existsSync(fontPath + "\\" + abc)) fs.unlinkSync(fontPath + "\\" + abc);
            if (keepFiles == true) {
                fs.copyFileSync("./mods/" + json[type], "./mods/" + json[type] + "-c")
                fs.renameSync("./mods/" + json[type] + "-c", fontPath + "\\" + abc)
            } else {
                fs.renameSync("./mods/" + json[type], fontPath + "\\" + abc)
            }
            console.log("Patched " + type + ".ttf")
        })
        
    }
}

function recoverFiles(robloxFolder) {
    let fontPath = robloxFolder.long + "\\content\\fonts";
    fs.readdirSync(fontPath).forEach(file => {
        if(file.includes(".rcmBackup")) {
            fs.renameSync(fontPath+"\\"+file, fontPath+"\\"+atob(file.split(".rcmBackup")[0]))
        } else {
            if(file == "families") return;
            fs.unlinkSync(fontPath+"\\"+file)
        }
    })
}
