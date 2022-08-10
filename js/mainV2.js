
console.log(`Welcome to Lei's Tic Tac Toe Game!`);

//Profile Background Url
const harryUrl = "url('graph/harry.png')"; //why not ../graph???????????????
const malfoyUrl = "url('graph/malfoy.png')";
const narutoUrl = "url('graph/naruto.png')";
const sasukeUrl = "url('graph/sasuke.png')";


/* ------------------------------------------------------------------------------------ */
//different ways to build a new board

// let board1 = Array(3).fill(Array(3).fill(0));//don't use, it will change all three arrays

// let board2 = Array.from(Array(3), item => new Array(3).fill(0));

// let board3 = new Array(3);
// for (let i = 0; i < board3.length; i++){
//     board3[i] = new Array(3).fill(0);
// }

let boardThree = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

//Build a 3 * 3 array with 0
// [
//     c0, c1, c2
// r0  [0,  0,  0],
// r1  [0,  0,  0],
// r2  [0,  0,  0] 
// ];

// Build 5 * 5 board
let boardFive = new Array(5);
for (let i = 0; i < boardFive.length; i++){
    boardFive[i] = new Array(boardFive.length).fill(0);
}


/* ------------------------------------------------------------------------------------ */
//global variables

let isFirstPlayer = true;
let key;
let chequerUrlOne; //chequer background
let chequerHTMLOne = '&#10005'; //chequer html X
let chequerUrlTwo; //chequer background
let chequerHTMLTwo = '&#927'; //chequer html O
let rounds = 1;
let playerOneWinNo = 0;
let playerTwoWinNo = 0;
let tieNo = 0;
let board = boardThree;

//when fresh the webpage, back to default X and O, and 3 * 3 board
$('#dropdownOne').val('symbolX');
$('#dropdownTwo').val('symbolO');
$('#dropdownBoardSize').val('boardSize3');

/* ------------------------------------------------------------------------------------ */
// Build different size board in HTML

// Build a 3 * 3 board
// build 3 rows with class row0, row1, row2
for (let i = 0; i < boardThree.length; i++){
    $('<div></div>').addClass(`boardThreeRow${i}`)
                    .appendTo('.threeLineBoard')
}

//build 9 divs with rows and columns
for (let row = 0; row < boardThree.length; row++){
    for (let column = 0; column < boardThree.length; column++){
        $('<div></div>').addClass('chequer')
                        .attr({
                            'data-row': `${row}`,
                            'data-column': `${column}`
                        })
                        .appendTo($(`.boardThreeRow${row}`));
    }
}


//Build a 5 * 5 board
//build 5 rows with class row0 - row4
for (let i = 0; i < boardFive.length; i++){
    $('<div></div>').addClass(`boardFiveRow${i}`)
                    .appendTo('.fiveLineBoard')
}

//build 25 divs with rows and columns
for (let row = 0; row < boardFive.length; row++){
    for (let column = 0; column < boardFive.length; column++){
        $('<div></div>').addClass('chequer')
                        .attr({
                            'data-row': `${row}`,
                            'data-column': `${column}`
                        })
                        .appendTo($(`.boardFiveRow${row}`));
    }
}

/* ------------------------------------------------------------------------------------ */
//choose board size

$('#dropdownBoardSize').on('change', function(){
    //if choose 3 * 3 size
    if($(this).val() === 'boardSize3'){ 
        
        //Reset the old board first
        nextRound(); 
        // display 3*3 board
        $('.threeLineBoard').css('display', 'block'); 
        // none display other board
        $('.fiveLineBoard').css('display', 'none');
        board = boardThree;
    }
    else if($(this).val() === 'boardSize5'){ 

        nextRound();
        // display 5*5 board
        $('.fiveLineBoard').css('display', 'block'); 
        // none display other board
        $('.threeLineBoard').css('display', 'none');
        board = boardFive;
    }
}) 



/* ------------------------------------------------------------------------------------ */

//choose player profiles, set X and O as default
$('#dropdownOne').on('change', function(){
    //if choose harry profile
    if($(this).val() === 'harry'){ 
        //change profile background and hide X or O
        $('.pOneProfile').css('background-image', harryUrl);
        $('.pOneProfile p').css('opacity', '0');
        //change chequer background and no X or O
        chequerUrlOne = harryUrl;
        chequerHTMLOne = '';
    }
    else if($(this).val() === 'naruto'){ 
        $('.pOneProfile').css('background-image', narutoUrl);
        $('.pOneProfile p').css('opacity', '0');
        chequerUrlOne = narutoUrl;
        chequerHTMLOne = '';
    }
    else{//default X or O
        //change back to default
        $('.pOneProfile').css('background-image', 'none');
        $('.pOneProfile p').css('opacity', '1');
        chequerUrlOne = 'none';
        chequerHTMLOne = '&#10005';
    }
}) 


$('#dropdownTwo').on('change', function(){
    //if choose harry profile
    if($(this).val() === 'malfoy'){ 
        // console.log('choose harry'); //for check
        $('.pTwoProfile').css('background-image', malfoyUrl);
        $('.pTwoProfile p').css('opacity', '0');
        chequerUrlTwo = malfoyUrl;
        chequerHTMLTwo = '';
    }
    else if($(this).val() === 'sasuke'){
        $('.pTwoProfile').css('background-image', sasukeUrl);
        $('.pTwoProfile p').css('opacity', '0');
        chequerUrlTwo = sasukeUrl;
        chequerHTMLTwo = '';
    }   
    else{//default
        $('.pTwoProfile').css('background-image', 'none');
        $('.pTwoProfile p').css('opacity', '1');
        chequerUrlTwo = 'none';
        chequerHTMLTwo = '&#927';
    }
})




/* ------------------------------------------------------------------------------------ */

$('.chequer').on('click', function(){
    
    //find the row and column with data
    const idr = parseInt($(this).attr('data-row'));
    const idc = parseInt($(this).attr('data-column'));
    // console.log(idr); // for check
    // console.log(typeof(idr));//for check

    //if no value in that div, and game not finish
    // if($(this).html() === '' && typeof(key) !== 'number'){
    //if value in that related matrix is 0, and game not finish
    if(board[idr][idc] === 0 && typeof(key) !== 'number'){
        
        // console.log('1st',key)//for check

        // if isFirstPlayer = true, it means it is the first player's turn
        if(isFirstPlayer){
            isFirstPlayer = false;
            board[idr][idc] = 1;

            //write html or show background in the clicked div box
            $(this).html(chequerHTMLOne);
            $(this).css('background-image', chequerUrlOne);

            //change player color to show who is the next one
            $('#pOne').css({
                'background-color': '#e4e6e8',
                'color': 'black',
                'transition': '0.5s'
            });
            $('#pTwo').css({
                'background-color': '#4577a2',
                'color': 'white',
                'transition': '0.5s'
            });

            //decide if there is a winner
            key = makeDecision(idr, idc);

        }else { //another player
            isFirstPlayer = true;
            board[idr][idc] = -1;
            
            //write html or show background in the clicked div box
            $(this).html(chequerHTMLTwo);
            $(this).css('background-image', chequerUrlTwo);

            //change player color to show who is the next one
            $('#pOne').css({
                'background-color': '#b5363d',
                'color': 'white',
                'transition': '0.5s'
            });
            $('#pTwo').css({
                'background-color': '#e4e6e8',
                'color': 'black',
                'transition': '0.5s'
            });

            key = makeDecision(idr, idc);

        }
    }
    


/* ------------------------------------------------------------------------------------ */
    //Fair Game
    //loop around the whole array, if no 0 inside and key is not a number, then the game is fair
    let isGameFair = 0;
    for (let i = 0; i < board.length; i++){
        if(!board[i].includes(0)){
            isGameFair += 1;            
        }
    }

    if(isGameFair === 3 && typeof(key) !== 'number'){
        console.log('Fair Game!'); //for check

        //show fair game label
        $('#fair').css('opacity', '1');

        //both turn grey
        $('#pOne').css({
            'background-color': '#e4e6e8',
            'color': 'black',
            'transition': '0.5s'
        });
        $('#pTwo').css({
            'background-color': '#e4e6e8',
            'color': 'black',
            'transition': '0.5s'
        });

        //fair game time + 1
        tieNo += 1;
        $('#tieNo').html(`${tieNo}`);
        $('#tieNo').css('opacity', '1');

        //number of rounds + 1
        rounds += 1;     
        
        //set key === number but not 1 or -1
        key = 0;
    }



/* ------------------------------------------------------------------------------------ */
    //check if player1 or player2 win
    if(key === 1){
        console.log('Player One Win'); //for check

        //pop up you win label, change winner color
        $('#p1Win').css('opacity', '1');
        $('#pOne').css({
            'background-color': '#b5363d',
            'color': 'white'
        });
        $('#pTwo').css({
            'background-color': '#e4e6e8',
            'color': 'black'
        });
        
        //set key !== 1
        key = 0;

        //Player One win time + 1
        playerOneWinNo += 1;
        $('#p1WinNo').html(`${playerOneWinNo}`);
        $('#p1WinNo').css('opacity', '1');

        //number of rounds + 1
        rounds += 1;

    }
    else if(key === -1){
        console.log('Player Two Win'); //for check

        //pop up you win label
        $('#p2Win').css('opacity', '1');
        $('#pOne').css({
            'background-color': '#e4e6e8',
            'color': 'black'
        });
        $('#pTwo').css({
            'background-color': '#4577a2',
            'color': 'white'
        });

        //set key !== -1
        key = 0;
        
        //Player Two win time + 1
        playerTwoWinNo += 1;
        $('#p2WinNo').html(`${playerTwoWinNo}`);
        $('#p2WinNo').css('opacity', '1');
    
        //number of rounds + 1
        rounds += 1;

    }
    
});




/* ------------------------------------------------------------------------------------ */
// Set a new round
//if click the next round button, will clear the board
const nextRound = function(){
    $('.chequer').each(function(){
        $(this).html('')
               .css('background-image','none');        
    });
    isFirstPlayer = true; //isFirstPlayer back to ture, so as to the next one after reset is the first player

    //set the type of key !== number
    key = '';

    //clear the board array
    boardThree = new Array(3);
    for (let i = 0; i < boardThree.length; i++){
        boardThree[i] = new Array(boardThree.length).fill(0);
    }

    boardFive = new Array(5);
    for (let i = 0; i < boardFive.length; i++){
        boardFive[i] = new Array(boardFive.length).fill(0);
    }

    board = new Array(board.length);
    for (let i = 0; i < board.length; i++){
        board[i] = new Array(board.length).fill(0);
    }

    //clear Winner or fair label
    $('#fair').css('opacity', '0');
    $('#p1Win').css('opacity', '0');
    $('#p2Win').css('opacity', '0');

    //change the color to the original state
    $('#pOne').css({
        'background-color': '#b5363d',
        'color': 'white'
    });
    $('#pTwo').css({
        'background-color': '#e4e6e8',
        'color': 'black'
    });

    //show the number of rounds
    $('#roundNo').html(`${rounds}`);

}; //newRound()


$('#reset').on('click', nextRound);



/* ------------------------------------------------------------------------------------ */
// Restart the whole game
//if click the restart button, will clear the board
$('#restartGame').on('click', function(){
    $('.chequer').each(function(){
        $(this).html('')
               .css('background-image','none');  
    });

    //profile back to default X and O, clear profile background
    //select block back to 'select your profile'
    //change chequer to default X and O, clear chequer background
    $('.pOneProfile').css('background-image', 'none');
    $('.pOneProfile p').css('opacity', '1');
    $('#dropdownOne').val('symbolX');
    chequerHTMLOne = '&#10005';
    chequerUrlOne = 'none';

    $('.pTwoProfile').css('background-image', 'none');
    $('.pTwoProfile p').css('opacity', '1');
    $('#dropdownTwo').val('symbolO');
    chequerHTMLTwo = '&#927';
    chequerUrlTwo = 'none';

    //set board to default 3 * 3 board
    $('#dropdownBoardSize').val('boardSize3');
    $('.threeLineBoard').css('display', 'block'); 
    $('.fiveLineBoard').css('display', 'none');

    //clear the board array
    boardThree = new Array(3);
    for (let i = 0; i < boardThree.length; i++){
        boardThree[i] = new Array(boardThree.length).fill(0);
    }

    boardFive = new Array(5);
    for (let i = 0; i < boardFive.length; i++){
        boardFive[i] = new Array(boardFive.length).fill(0);
    }

    board = boardThree;


    isFirstPlayer = true; //isFirstPlayer back to ture, so as to the next one after reset is the first player

    //set the type of key !== number
    key = '';


    //clear Winner or fair label
    $('#fair').css('opacity', '0');
    $('#p1Win').css('opacity', '0');
    $('#p2Win').css('opacity', '0');

    //change the color to the original state
    $('#pOne').css({
        'background-color': '#b5363d',
        'color': 'white'
    });
    $('#pTwo').css({
        'background-color': '#e4e6e8',
        'color': 'black'
    });

    //restart the number of rounds
    rounds = 1;
    $('#roundNo').html(`${rounds}`);

    //restart the number of win
    playerOneWinNo = 0;
    playerTwoWinNo = 0;
    tieNo = 0;
    //hide the player win number information
    $('#tieNo').css('opacity', '0');
    $('#p1WinNo').css('opacity', '0');
    $('#p2WinNo').css('opacity', '0');

});




/* ----------------------------------- Version 2 ------------------------------------------------- */

const makeDecision = function(r, c){

    // let count;
    const rowLength = board[r].length;
    const columnLength = board.length;

    //horizontal
    for(let r = 0; r < columnLength; r++){
        for(let c = 0; c < rowLength - 2; c++){
            if(board[r][c] === 1){
                let count = 0;
                for (let k = 0; k < 3; k++){
                    count += board[r][c + k];
                }
                if(count === 3){ //3 continuous 1
                    return board[r][c]
                }
            }
            else if(board[r][c] === -1){
                let count = 0;
                for (let k = 0; k < 3; k++){
                    count += board[r][c + k];
                }
                if(count === -3){ //3 continouns -1
                    return board[r][c]
                }
            }
        }
    }


    //vertical
    for(let c = 0; c < rowLength; c++){
        for(let r = 0; r < columnLength - 2; r++){
            if(board[r][c] === 1){
                let count = 0;
                for (let k = 0; k < 3; k++){
                    count += board[r + k][c];
                }
                if(count === 3){ //3 continuous 1
                    return board[r][c]
                }
            }
            else if(board[r][c] === -1){
                let count = 0;
                for (let k = 0; k < 3; k++){
                    count += board[r + k][c];
                }
                if(count === -3){ //3 continouns -1
                    return board[r][c]
                }
            }
        }
    }


    //right top oblique
    for(let r = 0; r < columnLength; r++){
        for(let c = 0; c < rowLength - 2; c++){
            if(board[r][c] === 1){
                let count = 0;
                for (let k = 0; k < 3; k++){
                    if(r - k >= 0){
                        count += board[r - k][c + k];
                    }
                }
                if(count === 3){ //3 continuous 1
                    return board[r][c]
                }
            }
            else if(board[r][c] === -1){
                let count = 0;
                for (let k = 0; k < 3; k++){
                    if(r - k >= 0){
                        count += board[r - k][c + k];
                    }
                }
                if(count === -3){ //3 continouns -1
                    return board[r][c]
                }
            }
        }
    }


    //right down oblique
    for(let r = 0; r < columnLength; r++){
        for(let c = 0; c < rowLength - 2; c++){
            if(board[r][c] === 1){
                let count = 0;
                for (let k = 0; k < 3; k++){
                    if(r + k < columnLength){
                        count += board[r + k][c + k];
                    }
                }
                if(count === 3){ //3 continuous 1
                    return board[r][c]
                }
            }
            else if(board[r][c] === -1){
                let count = 0;
                for (let k = 0; k < 3; k++){
                    if(r + k < columnLength){
                        count += board[r + k][c + k];
                    }
                }
                if(count === -3){ //3 continouns -1
                    return board[r][c]
                }
            }
        }
    }

}










/* ----------------------------------- Version 1 ------------------------------------------------- */
//complicated way

// // Several situations to decide if win or not.
// const makeDecision = function(r, c){

//     const rowLength = board[r].length;
//     const columnLength = board.length;

//     //horizontal
//     if (c + 1 < rowLength){ //decide if reach the edge
//         if(board[r][c + 1] === board[r][c]){ //c, c+1 same
//             if(c + 2 < rowLength){
//                 if(board[r][c + 2] === board[r][c]){
//                     return board[r][c]; // if c, c+1, c+2 same
//                 }
//                 else{ //if c, c+1 same, c+2 not, check c-1
//                     if(c - 1 >= 0){
//                         if(board[r][c - 1] === board[r][c]){
//                             return board[r][c];
//                         }
//                     }
//                 }
//             }
//             else{ // if the key is at second last position, and c, c+1 same, then check c - 1
//                 if(board[r][c - 1] === board[r][c]){
//                     return board[r][c]
//                 }
//             }
//         }
//         else{ //c+1 not same, check c-1
//             if(c - 1 >= 0){
//                 if(board[r][c - 1] === board[r][c]){
//                     if(c - 2 <= 0){ //c, c-1 same, check c-2
//                         if(board[r][c - 2] === board[r][c]){
//                             return board[r][c]; //c, c-1, c-2 same  
//                         }
//                     }
//                 }
//             }
//         }
//     }
//     else{ // if the key is at the last position, check c, c-1 and c-2
//         if(board[r][c - 1] === board[r][c]){
//             if(board[r][c - 2] === board[r][c]){
//                 return board[r][c];
//             }
//         }
//     }


//     //vertical
//     if(r + 1 < columnLength){
//         if(board[r + 1][c] === board[r][c]){ // r, r+1 same
//             if(r + 2 < columnLength){
//                 if(board[r + 2][c] === board[r][c]){
//                     return board[r][c]; //if r, r+1, r+2 same
//                 }
//                 else{ //if r, r+1 same, r+2 not, check r-1
//                     if(r - 1 >= 0){
//                         if(board[r - 1][c] === board[r][c]){
//                             return board[r][c];
//                         }
//                     }
//                 }
//             }
//             else{ // if the key is at second last position, and r, r+1 same, then check r - 1
//                 if(board[r - 1][c] === board[r][c]){
//                     return board[r][c]
//                 }
//             }
//         }
//         else{ //r+1 not same, check r-1
//             if(r - 1 >= 0){
//                 if(board[r - 1][c] === board[r][c]){
//                     if(r - 2 >= 0){ // r, r-1 same, check r-2
//                         if(board[r - 2][c] === board[r][c]){
//                             return board[r][c]; //r, r-1, r-2 same
//                         }
//                     }
//                 }
//             }
//         }
//     }
//     else{ // if the key is at the last position, check r, r-1 and r-2
//         if(board[r - 1][c] === board[r][c]){
//             if(board[r - 2][c] === board[r][c]){
//                 return board[r][c];
//             }
//         }
//     }


//     //right top oblique
//     if(r - 1 >= 0 && c + 1 < rowLength){
//         if(board[r - 1][c + 1] === board[r][c]){ // r-1,c+1 same as r,c
//             if(r - 2 >= 0 && c + 2 < rowLength){
//                 if(board[r - 2][c + 2] === board[r][c]){
//                     return board[r][c]; //if r-1,c+1 and r-2,c+2 and r,c same
//                 }
//                 else{ //if r-1,c+1 same, r-2,c+2 not, check r+1,c-1
//                     if(r + 1 < columnLength && c - 1 >= 0){
//                         if(board[r + 1][c - 1] === board[r][c]){
//                             return board[r][c];
//                         }
//                     }
//                 }
//             }
//             else if(r + 1 < columnLength && c - 1 >= 0){ // if the key is at second last position, and r-1,c+1 same, then check r+1,c-1
//                 if(board[r + 1][c - 1] === board[r][c]){
//                     return board[r][c]
//                 }
//             }
//         }
//         else{ //r-1,c+1 not same, check r+1,c-1
//             if(r + 1 < columnLength && c - 1 >= 0){
//                 if(board[r + 1][c - 1] === board[r][c]){
//                     if(r + 2 < columnLength){ // r+1,c-1 same, check r+2,c-2
//                         if(board[r + 2][c - 2] === board[r][c]){
//                             return board[r][c]; //r, r-1, r-2 same
//                         }
//                     }
//                 }
//             }
//         }
//     }
//     else if(r + 1 < columnLength && c - 1 >= 0){ // if the key is at the last position, check r+1,c-1 and r+2,c-2
//         if(board[r + 1][c - 1] === board[r][c]){
//             if(r + 2 < columnLength && c - 2 >= 0){
//                 if(board[r + 2][c - 2] === board[r][c]){
//                 return board[r][c];
//                 }
//             }
//         }
//     }

    
//     //Left top oblique
//     if(r + 1 < columnLength && c + 1 < rowLength){
//         if(board[r + 1][c + 1] === board[r][c]){ // r+1,c+1 same as r,c
//             if(r + 2 < columnLength && c + 2 < rowLength){
//                 if(board[r + 2][c + 2] === board[r][c]){
//                     return board[r][c]; //if r+1,c+1 and r+2,c+2 and r,c same
//                 }
//                 else{ //if r+1,c+1 same, r+2,c+2 not, check r-1,c-1
//                     if(r - 1 >= 0 && c - 1 >= 0){
//                         if(board[r - 1][c - 1] === board[r][c]){
//                             return board[r][c];
//                         }
//                     }
//                 }
//             }
//             else if(r - 1 >= 0 && c - 1 >= 0){ // if the key is at second last position, and r+1,c+1 same, then check r-1,c-1
//                 if(board[r - 1][c - 1] === board[r][c]){
//                     return board[r][c]
//                 }
//             }
//         }
//         else{ //r+1,c+1 not same, check r-1,c-1
//             if(r - 1 >= 0 && c - 1 >= 0){
//                 if(board[r - 1][c - 1] === board[r][c]){
//                     if(r - 2 >= 0){ // r-1,c-1 same, check r-2,c-2
//                         if(board[r - 2][c - 2] === board[r][c]){
//                             return board[r][c]; //r, r-1, r-2 same
//                         }
//                     }
//                 }
//             }
//         }
//     }
//     else if(r - 1 >= 0 && c - 1 >= 0){ // if the key is at the last position, check r-1,c-1 and r-2,c-2
//         if(board[r - 1][c - 1] === board[r][c]){
//             if(r - 2 >= 0 && c - 2 >= 0){
//                 if(board[r - 2][c - 2] === board[r][c]){
//                     return board[r][c];
//                 }
//             }
//         }
//     }
// }





















