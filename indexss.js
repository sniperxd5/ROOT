/**
 * Puprose: Is to send text messages to a specific phone number. The body of a text messages are sourced in a json file
 */
"use strict";
const {
  myPhone,
  toPhone,
  quotesFile,
  twilio_sid,
  twilio_token,
} = require("./config");
const fs = require("fs");
const quotes = require("./quotes.json");

const client = require("twilio")(twilio_sid, twilio_token);

const makePhoneCall = async body => {
  try {
    const msg = await client.messages.create({
      to: toPhone,
      from: myPhone,
      body,
    });
    if (msg.errorMessage) {
      console.log(msg.errorMessage);
      return;
    }
  } catch (err) {
    console.log(err);
  }
};

const getCheezyQuote = async () => {
  console.log(quotes.length);
  const selectedQuote = quotes.splice(
    Math.floor(Math.random() * quotes.length),
    1
  )[0];
  return selectedQuote;
};
const saveFile = async data => {
  fs.writeFileSync(quotesFile, data);
};
(async function() {
  const body = await getCheezyQuote();
  await makePhoneCall(body);
  //   await saveFile(quotes)
})();
