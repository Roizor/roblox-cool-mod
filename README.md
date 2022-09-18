# roblox-cool-mod
Cool mod that lets you replace Roblox's font files to your heart's content. Only tested on Windows.  
## How To Use
Open the `mods` folder, and place in the font files of your choice  
(currently `Poppins Bold, Regular, Light`)  

Next, edit rcm.json and change it so your files correlate.  

Examples:  
| Name                  | File                       |
|-----------------------|----------------------------|
| arialbd               | ArialFile.ttf              |
| arial                 | ArialLongExampleString.ttf |
| SourceSansPro-Regular | CoolMod.ttf                |

The patcher is not limited to just these files, take a look. Here's how:  
Step 1: Open Run (windows + r)  
Step 2: Paste this into the Run prompt `%LocalAppData%\Roblox\Versions\`  
Step 3: Open the folder starting with `version-` and make sure it has some sort of `RobloxPlayerBeta` in it.  
Step 4: Open `contents` folder, then `fonts`.  
Every name you see there is a Roblox font, and thus correlates with the `Name` section of the table above.  

## Still confused?  
Here's example JSON that's different from the included one.
```json
{
  "$rcm": {
    "format": "1",
    "keepFiles": true
  },
  "AmaticSC-Bold": "Poppins-Regular.ttf",
  "Bangers-Regular": "Fortnite-AmongUs.ttf"
}
```  
To use this exact JSON, replace `rcm.json` in the `mods` folder and ensure there are the 2 files (`Poppins-Regular.ttf` and `Fortnite-AmongUs.ttf`) in same folder.

## Still confused???
To be continued
