

// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// Get Array From Letters
let lettersArray = Array.from(letters);

// Select Letters Container
let lettersContainer = document.querySelector(".letters");

// Generate Letters
lettersArray.forEach(letter => {

    // Create Span
    let span = document.createElement("span");

    // Create Letter Text Node
    let theLetter = document.createTextNode(letter);

    // Append The Letter To Span
    span.appendChild(theLetter);

    // Add Class On Span
    span.className = 'letter-box';

    // Append Span To The Letters Container
    lettersContainer.appendChild(span);

});

// Object Of Words + Categories
// const words = {
//     programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
//     movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
//     people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
//     countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
// }


// ?? fetch Data from Json file 
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        //? 'data' variable contains the JSON data
        // console.log(data);

        //! Get Random Property
        let allKeys = Object.keys(data);
        // console.log(allKeys);

        //? Random Number Depend On Keys Length
        let randomPropNumber = Math.floor(Math.random() * allKeys.length);

        //? Category
        let randomPropName = allKeys[randomPropNumber];
        console.log(randomPropName);

        //? Category Words
        let randomPropValue = data[randomPropName];
        // console.log(randomPropValue);

        //? Random Number Depend On Words
        let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

        //? The Chosen Word
        let randomValueValue = randomPropValue[randomValueNumber];

        //? Set Category Info
        document.querySelector(".game-info .category span").innerHTML = randomPropName;

        //? Select Letters Guess Element
        let lettersGuessContainer = document.querySelector(".letters-guess");

        //? Convert Chosen Word To Array
        let lettersAndSpace = Array.from(randomValueValue);

        //? Create Spans Depened On Word
        lettersAndSpace.forEach(letter => {

            // Create Empty Span
            let emptySpan = document.createElement("span");

            // If Letter Is Space
            if (letter === ' ') {

                // Add Class To The Span
                emptySpan.className = 'with-space';

            }

            // Append Span To The Letters Guess Container
            lettersGuessContainer.appendChild(emptySpan);

        });

        //? Select Guess Spans
        let guessSpans = document.querySelectorAll(".letters-guess span");

        //? Set Wrong Attempts
        let wrongAttempts = 0;

        //? Select The Draw Element
        let theDraw = document.querySelector(".hangman-draw");


        let count = 0;
        let cnt = 0;

        //**  Answer
        let theChosenWord = Array.from(randomValueValue.toLowerCase());
        console.log(theChosenWord);



        //? Handle Clicking On Letters
        document.addEventListener("click", (e) => {
            //? Set The Choose Status
            let theStatus = false;

            if (e.target.className === 'letter-box') {

                e.target.classList.add("clicked");

                //? Get Clicked Letter
                let theClickedLetter = e.target.innerHTML.toLowerCase();

                //? The Chosen Word
                let theChosenWord = Array.from(randomValueValue.toLowerCase());

                theChosenWord.forEach((wordLetter, WordIndex) => {

                    //? If The Clicked Letter Equal To One Of The Chosen Word Letter
                    if (theClickedLetter == wordLetter) {

                        //? Set Status To Correct
                        theStatus = true;

                        //? Loop On All Guess Spans
                        guessSpans.forEach((span, spanIndex) => {

                            if (WordIndex === spanIndex) {
                                cnt++;
                                span.innerHTML = theClickedLetter;

                            }

                        });
                    }
                });

                // Outside Loop
                // If Letter Is Wrong
                if (theStatus !== true) {
                    // Increase The Wrong Attempts
                    wrongAttempts++;
                    // Add Class Wrong On The Draw Element
                    theDraw.classList.add(`wrong-${wrongAttempts}`);

                    // Play Fail Sound
                    document.getElementById("fail").play();
                    if (wrongAttempts === 8) {
                        endGame(`Game Over, the Word is "${randomValueValue}"`);
                        lettersContainer.classList.add("finished");
                        document.getElementById("fail").play();

                    }
                } else {
                    count++;
                    // Play Success Sound
                    document.getElementById("success").play();
                }
            }
            //? Success 
            let sz = lettersAndSpace.length;
            if (sz == cnt && wrongAttempts < 8) {
                lettersContainer.classList.add("finished");
                endGame(`Game Over, the number of wrongs is : ${wrongAttempts}`);
                document.getElementById("success").play();

            }
            // console.log(sz);
            // console.log(count);//? success char
            // console.log(cnt); //? all success char 
            // console.log(wrongAttempts); //? all wrong char 

        });



    })//! error in fetch
    .catch(error => {
        console.log('Error:', error);
    });


// End Game Function
function endGame(text) {

    // Create Popup Div
    let div = document.createElement("div");

    // Create Text
    let divText = document.createTextNode(text);

    // Append Text To Div
    div.appendChild(divText);

    // Add Class On Div
    div.className = 'popup';

    // Append To The Body
    document.body.appendChild(div);

}



