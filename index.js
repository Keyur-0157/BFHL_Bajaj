const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const FULL_NAME = "Keyur_Padia";
const DOB = "02022004";
const EMAIL = "keyurpadia07@gmail.com";
const ROLL_NUMBER = "22BCE0157";

function isNumeric(str) {
  return /^[0-9]+$/.test(str);
}

function isAlphabet(str) {
  return /^[a-zA-Z]+$/.test(str);
}

app.post("/bfhl", (req, res) => {
  try {
    const data = req.body.data || [];

    let even_numbers = [];
    let odd_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;

    data.forEach(item => {
      if (isNumeric(item)) {
        const num = parseInt(item, 10);
        if (num % 2 === 0) {
          even_numbers.push(item);
        } else {
          odd_numbers.push(item);
        }
        sum += num;
      } else if (isAlphabet(item)) {
        alphabets.push(item.toUpperCase());
      } else {
        special_characters.push(item);
      }
    });
    let concat_string = "";
    let allAlphas = data.filter(isAlphabet).join("");
    let reversed = allAlphas.split("").reverse().join("");
    concat_string = reversed
      .split("")
      .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");

    res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string,
    });
  } catch (error) {
    res.status(500).json({
      is_success: false,
      message: error.message,
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get("/", (req, res) => {
  res.send("Server is running. Use POST /bfhl to test the API.");
});

app.get("/bfhl", (req, res) => {
  res.send("Please use POST method for /bfhl with a JSON body.");
});
