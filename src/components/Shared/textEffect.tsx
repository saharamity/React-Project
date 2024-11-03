const aText = [
    "There are only 10 types of people in the world:",
    "Those who understand binary, and those who don't"
];
const iSpeed = 100; // time delay of print out
let iIndex = 0; // start printing array at this position
let iArrLength = aText[0].length; // the length of the text array
const iScrollAt = 20; // start scrolling up at this many lines

let iTextPos = 0; // initialize text position
let sContents = ''; // initialize contents variable
let iRow; // initialize current row

export default function typewriter() {
    sContents = ' ';
    iRow = Math.max(0, iIndex - iScrollAt);
    const destination = document.getElementById("typedtext");

    // Add each line up to the current line
    while (iRow < iIndex) {
        sContents += aText[iRow++] + '<br />';
    }
    destination!.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + "_";

    if (iTextPos++ === iArrLength) {
        iTextPos = 0;
        iIndex++;
        if (iIndex < aText.length) {
            iArrLength = aText[iIndex].length;
            setTimeout(typewriter, 500); // Recursive call with delay
        }
    } else {
        setTimeout(typewriter, iSpeed); // Use iSpeed for delay
    }
}