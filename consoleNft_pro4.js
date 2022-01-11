const { By, Key, Builder } = require("selenium-webdriver");
const axios = require('axios');
require("chromedriver");
const discordId = '8796'; //Your Discord ID. Number only

function getPasswords() {
    return new Promise((resolve, reject) => {
        axios.get('https://console-nft.art/starwars/passwords.txt').then(res => {
            resolve(res.data)
        })
    })
}
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
async function start() {
    let passwordsString = await getPasswords();
    let passwords = passwordsString.toString().split(/\r?\n/);
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("https://console-nft.art/starwars/index.php");
    await driver.findElement(By.name("id")).sendKeys(discordId, Key.RETURN);
    for (let password of passwords) {
        try {
            await driver.findElement(By.name("password")).sendKeys(password, Key.RETURN);
        } catch (err) {
            console.log('The password is: ' + password);
            await sleep(6000000)
            return;
        }
    }
}

start()