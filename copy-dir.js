const fs = require("fs-extra");

const listFolderCopy = [
    {
        sourceDirectory: "views",
        targetDirectory: "dist/views"
    },
    {
        sourceDirectory: "public",
        targetDirectory: "dist/public"
    }
];

listFolderCopy.forEach(item=>{
    fs.copy(item.sourceDirectory, item.targetDirectory, (err) =>{
        if(err){
            console.error(`Loi sao chep thu muc ${item.sourceDirectory}:`, err);
        }
        else{
            console.log(`Sao chep thanh cong thu muc ${item.sourceDirectory}`);
        }
    });
});