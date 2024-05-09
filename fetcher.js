const argument = process.argv.slice(2);
const fs = require('fs');
let readLine = require('readline');
const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout
});

const needle = require('needle');

const fetch = (argument) => {
  needle.get(argument[0], (err, res) => { //get the URL
    if (err) {
      console.error(err);
          
    }
    if (argument[1]) {
      fs.writeFile(argument[1], res.body, (err) => { //write the file to the path
        if (err) {
          console.error(err);
          return;
        }
        console.log(`Downloaded and saved ${res.body.length} bytes to ${argument[1]}`);
      });
    }
    //If the file path already exists, right now your app will overwrite it! If you want to change this, let the user know and prompt them to type in Y(followed by the enter key) to overwrite the file, otherwise skip and exit the app. We suggest using the readline module, which we've previously used.
    if (fs.existsSync(argument[1])) {
      rl.question('File already exists. Do you want to overwrite it? (Y/N)', (answer) => {
        if (answer === 'Y') {
          fs.writeFile(argument[1], res.body, (err) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log(`Downloaded and saved ${res.body.length} bytes to ${argument[1]}`);
          });
        } else {
          console.log('File not overwritten.');
        }
        rl.close();
      });
    }
  });
};

fetch(argument);