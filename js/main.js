
console.log(`Welcome to Lei's Tic Tac Toe Game!`);

//Profile Background Url
const harryUrl = "url(graph/harry.png)";
const malfoyUrl = "url(graph/malfoy.png)";
const narutoUrl = "url(graph/naruto.png)";
const sasukeUrl = "url(graph/sasuke.png)";
const ironmanUrl = "url(graph/ironman.png)";
const captainUrl = "url(graph/captain.png)";


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

// Build 8 * 8 board
let boardEight = new Array(8);
for (let i = 0; i < boardEight.length; i++){
    boardEight[i] = new Array(boardEight.length).fill(0);
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
// $('#dropdownOne').val('symbolX');//can also change on autocomplete = off in html in select
// $('#dropdownTwo').val('symbolO');
// $('#dropdownBoardSize').val('boardSize3');

/* ------------------------------------------------------------------------------------ */
// Build different size board in HTML

// Build a 3 * 3 board
// build 3 rows with class row0, row1, row2
for (let i = 0; i < boardThree.length; i++){
    $('<div></div>').addClass(`boardThreeRow${i}`)
                    .appendTo('.threeLineBoard')
}

// build 9 divs with rows and columns
//data method show no info in inspector html sector, need to check console with 'use' in console
for (let row = 0; row < boardThree.length; row++){
    for (let column = 0; column < boardThree.length; column++){
        $('<div></div>').addClass('chequer')
                        .data({
                            'row': row,
                            'column': column
                        })
                        .appendTo($(`.boardThreeRow${row}`));
    }
}

// for (let row = 0; row < boardThree.length; row++){
//     for (let column = 0; column < boardThree.length; column++){
//         $('<div></div>').addClass('chequer')
//                         .attr({
//                             'data-row': row,
//                             'data-column': column
//                         })
//         .appendTo($(`.boardThreeRow${row}`));
//     }
// }


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
                        .data({
                            'row': row,
                            'column': column
                        })
                        .appendTo($(`.boardFiveRow${row}`));
    }
}


// for (let row = 0; row < boardFive.length; row++){
//     for (let column = 0; column < boardFive.length; column++){
//         $('<div></div>').addClass('chequer')
//                         .attr({
//                             'data-row': row,
//                             'data-column': column
//                         })
//                         .appendTo($(`.boardFiveRow${row}`));
//     }
// }

//Build a 8 * 8 board
//build 8 rows with class row0 - row7
for (let i = 0; i < boardEight.length; i++){
    $('<div></div>').addClass(`boardEightRow${i}`)
                    .appendTo('.eightLineBoard')
}

//build 64 divs with rows and columns
for (let row = 0; row < boardEight.length; row++){
    for (let column = 0; column < boardEight.length; column++){
        $('<div></div>').addClass('chequer')
                        .data({
                            'row': row,
                            'column': column
                        })
                        .appendTo($(`.boardEightRow${row}`));
    }
}


// for (let row = 0; row < boardEight.length; row++){
//     for (let column = 0; column < boardEight.length; column++){
//         $('<div></div>').addClass('chequer')
//                         .attr({
//                             'data-row': row,
//                             'data-column': column
//                         })
//                         .appendTo($(`.boardEightRow${row}`));
//     }
// }


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
        $('.eightLineBoard').css('display', 'none');
        board = boardThree;
    }
    else if($(this).val() === 'boardSize5'){ 

        nextRound();
        // display 5*5 board
        $('.fiveLineBoard').css('display', 'block'); 
        // none display other board
        $('.threeLineBoard').css('display', 'none');
        $('.eightLineBoard').css('display', 'none');
        board = boardFive;
    }
    else if($(this).val() === 'boardSize8'){ 

        nextRound();
        // display 8*8 board
        $('.eightLineBoard').css('display', 'block'); 
        // none display other board
        $('.threeLineBoard').css('display', 'none');
        $('.fiveLineBoard').css('display', 'none');
        board = boardEight;
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
    else if($(this).val() === 'ironman'){ 
        $('.pOneProfile').css('background-image', ironmanUrl);
        $('.pOneProfile p').css('opacity', '0');
        chequerUrlOne = ironmanUrl;
        chequerHTMLOne = '';
    }
    else if($(this).val() === 'computerOne'){
        $('.pOneProfile').css('background-image', 'none');
        $('.pOneProfile p').css('opacity', '1')
                           .html('Start');
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
    else if($(this).val() === 'captain'){
        $('.pTwoProfile').css('background-image', captainUrl);
        $('.pTwoProfile p').css('opacity', '0');
        chequerUrlTwo = captainUrl;
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
// checkWinner() function to check the winner or fair every time click the button

const makeDecision = function(){
    
    //Fair Game
    //loop around the whole array, if no 0 inside and key is not a number, then the game is fair
    let isGameFair = 0;
    for (let i = 0; i < board.length; i++){
        if(!board[i].includes(0)){
            isGameFair += 1;            
        }
    }
    
    if(isGameFair === board.length && typeof(key) !== 'number'){
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
        //because I don't want to click empty div and don't want rounds + 1 again
        key = 0;
    }

    /* ------------------------------------------------------------------------------------ */
    // if it is not a fair game
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
}; //makeDecision()


/* ------------------------------------------------------------------------------------ */
//Player One is computer
//when set player one as computer, need to press start to let computer place the key to start the game
$('.pOneProfile').on('click', function(){
    if($('.pOneProfile p').html() === 'Start'){

        //prevent when player one is computer, user click board first
        isFirstPlayer = false;

        //decide which profile user choose for player two, then decide which profile computer use
        //because if set computer profile when click the dropdown bar, if we set computer mode first then set human profile, the computer profile would not be related to the human profile.
        
        if($('#dropdownTwo').val() === 'malfoy'){
            $('.pOneProfile').css('background-image', harryUrl);
            $('.pOneProfile p').css('opacity', '0');
            chequerUrlOne = harryUrl;
            chequerHTMLOne = '';
        }
        else if($('#dropdownTwo').val() === 'sasuke'){
            $('.pOneProfile').css('background-image', narutoUrl);
            $('.pOneProfile p').css('opacity', '0');
            chequerUrlOne = narutoUrl;
            chequerHTMLOne = '';
        }
        else if($('#dropdownTwo').val() === 'captain'){
            $('.pOneProfile').css('background-image', ironmanUrl);
            $('.pOneProfile p').css('opacity', '0');
            chequerUrlOne = ironmanUrl;
            chequerHTMLOne = '';
        }
        else{
            $('.pOneProfile').css('background-image', 'none');
            $('.pOneProfile p').css('opacity', '1');
            chequerUrlOne = 'none';
            chequerHTMLOne = '&#10005';
        }

        //Random row and column position between 0 to board.length - 1 of AI
        let idrAI = Math.floor(Math.random() * (board.length));
        let idcAI = Math.floor(Math.random() * (board.length));

        //record in the board array
        board[idrAI][idcAI] = 1;

        //find the exact div use idrAI and idcAI
        $('div').each(function(){
            if($(this).data('row') === idrAI && $(this).data('column') === idcAI){
                $(this).html(chequerHTMLOne);
                $(this).css('background-image', chequerUrlOne);
            }
        })

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
            
    }

    //change the profile html in case click profile part the above will run again and again
    //becuase html is start is a condition
    $('.pOneProfile p').html('&#10005');
    
})




/* ------------------------------------------------------------------------------------ */
// every click check the result

$('.chequer').on('click', function(){

    // console.log('fisrt',JSON.stringify(board));
    // console.table(board);

    //if player two is computer
    if($('#dropdownTwo').val() === 'computerTwo'){
        
        // console.log('computer two click');//for check
        
        //decide which profile user choose for player one, then decide which profile computer use
        //because if set computer profile when click the dropdown bar, if we set computer mode first then set human profile, the computer profile would not be related to the human profile.
        if($('#dropdownOne').val() === 'harry'){
            $('.pTwoProfile').css('background-image', malfoyUrl);
            $('.pTwoProfile p').css('opacity', '0');
            chequerUrlTwo = malfoyUrl;
            chequerHTMLTwo = '';
        }
        else if($('#dropdownOne').val() === 'naruto'){
            $('.pTwoProfile').css('background-image', sasukeUrl);
            $('.pTwoProfile p').css('opacity', '0');
            chequerUrlTwo = sasukeUrl;
            chequerHTMLTwo = '';
        }
        else if($('#dropdownOne').val() === 'ironman'){
            $('.pTwoProfile').css('background-image', captainUrl);
            $('.pTwoProfile p').css('opacity', '0');
            chequerUrlTwo = captainUrl;
            chequerHTMLTwo = '';
        }
        else{
            $('.pTwoProfile').css('background-image', 'none');
            $('.pTwoProfile p').css('opacity', '1');
            chequerUrlTwo = 'none';
            chequerHTMLTwo = '&#927';
        }
        
        const idr = $(this).data('row');
        const idc = $(this).data('column');
        // console.log(idr); // for check
        // console.log(typeof(idr));//for check
        
        //if no value in that div, and game not finish
        // if($(this).html() === '' && typeof(key) !== 'number'){
        //if value in that related matrix is 0, and game not finish
        if(board[idr][idc] === 0 && typeof(key) !== 'number'){
            
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
            key = checkWinner(idr, idc);
    
            
            //Computer's turn
            //To check if is fair or already have the winner, if it is, computer would not do anything
            //if isGameFair = board.length, then the board is full and game is fair
            let isGameFair = 0;
            for (let i = 0; i < board.length; i++){
                if(!board[i].includes(0)){
                    isGameFair += 1;            
                }
            }

            //Random row and column position between 0 to board.length - 1 of AI
            //when game is not over, computer place its key
            if(key !== 1 && key !== -1 && isGameFair !== board.length){ 
                
                idrInitial = Math.floor(Math.random() * (board.length));
                idcInitial = Math.floor(Math.random() * (board.length));

                for(i = 0; i < board.length ^ 2; i++){
                    if(board[idrInitial][idcInitial] !== 0){
                        idrInitial = Math.floor(Math.random() * (board.length));
                        idcInitial = Math.floor(Math.random() * (board.length));
                    }
                    else{
                        board[idrInitial][idcInitial] = -1;
                        idrAI = idrInitial;
                        idcAI = idcInitial;
                        break;
                    }
                }
 

                //find the exact div use idrAI and idcAI
                $('div').each(function(){
                    if($(this).data('row') === idrAI && $(this).data('column') === idcAI){
                        // $(this).html('&#927');
                        $(this).html(chequerHTMLTwo);
                        $(this).css('background-image', chequerUrlTwo);
                    }
                })


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
        
                key = checkWinner(idrAI, idcAI);

            }        
            
        }
        
        //decide the game result, if it is a fair game, or P1 or P2 win
        makeDecision();

    }
/* ------------------------------------------------------------------------------------ */
    //if player one is computer
    else if($('#dropdownOne').val() === 'computerOne'){

        //after player one computer place the key
        if(!isFirstPlayer){

            //human's turn
            const idr = $(this).data('row');
            const idc = $(this).data('column');
    
            if(board[idr][idc] === 0 && typeof(key) !== 'number'){
                
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
        
                key = checkWinner(idr, idc);  
        
                
                //Computer's turn
                //To check if is fair or already have the winner, if it is, computer would not do anything
                //if isGameFair = board.length, then the board is full and game is fair
                let isGameFair = 0;
                for (let i = 0; i < board.length; i++){
                    if(!board[i].includes(0)){
                        isGameFair += 1;            
                    }
                }
    
                //Random row and column position between 0 to board.length - 1 of AI
                //when game is not over, computer place its key
                if(key !== 1 && key !== -1 && isGameFair !== board.length){ 
                    
                    idrInitial = Math.floor(Math.random() * (board.length));
                    idcInitial = Math.floor(Math.random() * (board.length));
    
                    for(i = 0; i < board.length ^ 2; i++){
                        if(board[idrInitial][idcInitial] !== 0){
                            idrInitial = Math.floor(Math.random() * (board.length));
                            idcInitial = Math.floor(Math.random() * (board.length));
                        }
                        else{
                            board[idrInitial][idcInitial] = 1;
                            idrAI = idrInitial;
                            idcAI = idcInitial;
                            break;
                        }
                    }
     
    
                //find the exact div use idrAI and idcAI
                $('div').each(function(){
                    if($(this).data('row') === idrAI && $(this).data('column') === idcAI){
                        $(this).html(chequerHTMLOne);
                        $(this).css('background-image', chequerUrlOne);
                    }
                })
    
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
            
                    key = checkWinner(idrAI, idcAI);
    
                }        
                
            }

        }
        
        //decide the game result, if it is a fair game, or P1 or P2 win
        makeDecision();

    } 
/* ------------------------------------------------------------------------------------ */
    //human to human battle
    else{
        //find the row and column with data
    
        //for attribute data-row method, will return a string like '1'
        // const idr = $(this).attr('data-row'); 
        // const idc = $(this).attr('data-column');
    
        //for data method, will return a number directly like 1
        const idr = $(this).data('row'); 
        const idc = $(this).data('column');
        // console.log(idr); // for check
        // console.log(typeof(idr));//for check
        //can work when idr and idc are string just with number inside like '1' or '2'
        
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
                key = checkWinner(idr, idc);
        
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
        
                key = checkWinner(idr, idc);  
            }
        }
        
        //decide the game result, if it is a fair game, or P1 or P2 win
        makeDecision();   
        }

})













































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
    //need to clear all of the board because change board size will also use this function
    boardThree = new Array(3);
    for (let i = 0; i < boardThree.length; i++){
        boardThree[i] = new Array(boardThree.length).fill(0);
    }

    boardFive = new Array(5);
    for (let i = 0; i < boardFive.length; i++){
        boardFive[i] = new Array(boardFive.length).fill(0);
    }

    boardEight = new Array(8);
    for (let i = 0; i < boardEight.length; i++){
        boardEight[i] = new Array(boardEight.length).fill(0);
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

    //if player one is computer, change profile html back to 'Start', and clear the background
    if($('#dropdownOne').val() === 'computerOne'){
        $('.pOneProfile').css('background-image', 'none');
        $('.pOneProfile p').css('opacity', '1')
                           .html('Start');
    }
    
    //show the number of rounds
    $('#roundNo').html(`${rounds}`);

}; //nextRound()


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
    $('.eightLineBoard').css('display', 'none');

    //clear the board array
    boardThree = new Array(3);
    for (let i = 0; i < boardThree.length; i++){
        boardThree[i] = new Array(boardThree.length).fill(0);
    }

    boardFive = new Array(5);
    for (let i = 0; i < boardFive.length; i++){
        boardFive[i] = new Array(boardFive.length).fill(0);
    }

    boardEight = new Array(8);
    for (let i = 0; i < boardEight.length; i++){
        boardEight[i] = new Array(boardEight.length).fill(0);
    }

    board = boardThree; //3 * 3 size is default


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

const checkWinner = function(r, c){

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
// const checkWinner = function(r, c){

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





















