var fs = require('fs');

var str = `
    export const config = {
        production: true,
        read_key: '${process.env.COSMIC_READ_KEY}',
        write_key: '${process.env.COSMIC_WRITE_KEY}',
        bucket_name: '${process.env.COSMIC_BUCKET}',
        
    };
`;
fs.writeFile("./src/config/cosmic.prod.ts", str, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
}); 
