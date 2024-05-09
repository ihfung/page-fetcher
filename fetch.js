const argument = process.argv.slice(2);
const fs = require('fs');
let readLine = require('readline');
const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout
});

const request = require('request');

const fetch = (argument) => {
  request(argument[0], (error, response, body) => {
    if (error) {
      console.log('error:', error);
    } else {
      fs.writeFile(argument[1], body, (err) => {
        if (err) {
          console.log('error:', err);
        } else {
          if (fs.existsSync(argument[1])) {
            rl.question('File already exists. Do you want to overwrite it? (yes/no) ', (answer) => {
              if (answer === 'yes') {
                fs.writeFile(argument[1], body, (err) => {
                  if (err) {
                    console.log('error:', err);
                  } else {
                    console.log(`Downloaded and saved ${body.length} bytes to ${argument[1]}`);
                  }
                });
              } else {
                console.log('File not overwritten');
              }
              rl.close();
            });
          }
          console.log(`Downloaded and saved ${body.length} bytes to ${argument[1]}`);
        }
      });
    }
  });
};

fetch(argument);