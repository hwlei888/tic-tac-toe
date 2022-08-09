
console.log(`Welcome to Lei's Tic Tac Toe Game!`);

// let board1 = Array(3).fill(Array(3).fill(0));//every line is the same??????

// let board2 = Array.from(Array(3), item => new Array(3).fill(0));//why in console, board == board2 is false????????????????????

// let board3 = new Array(3);
// for (let i = 0; i < board3.length; i++){
//     board3[i] = new Array(3).fill(0);
// }
// why in console, board == board3 is false????????????????????

let board = [
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

let isFirstPlayer = true;
let key;


$('.chequer').on('click', function(){
    
    //find the coordination x and coordination y with id
    const id = $(this).attr('id');
    const idr = parseInt(id[1]);
    const idc = parseInt(id[3]);

    //if no value in that div
    if($(this).html() === '' && typeof(key) !== 'number'){
        
        console.log('1st',key)

        // if isFirstPlayer = true, it means it is the first player's turn
        if(isFirstPlayer){
            isFirstPlayer = false;
            board[idr][idc] = 1;
            //let board[idx][idy] = 1; //cannot use let, is that because board[idx][idy] and idx,idy are in different block? But when I move down it also cannot work???????????????????????????? 

            $(this).html('&#10005');
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

        }else {
            isFirstPlayer = true;
            board[idr][idc] = -1;
            
            $(this).html('&#927');
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
    
    //loop around the whole array, if no 0 inside and key is not a number, then the game is fair
    let isGameFair = 0;
    for (let i = 0; i < board.length; i++){
        if(!board[i].includes(0)){
            isGameFair += 1;            
        }
    }

    if(isGameFair === 3 && typeof(key) !== 'number'){
        console.log('Fair Game!')

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

    }


    //check if player1 or player2 win
    if(key === 1){
        console.log('Player One Win');
        $('#p1Win').css('opacity', '1');
        $('#pOne').css({
            'background-color': '#b5363d',
            'color': 'white'
        });
        $('#pTwo').css({
            'background-color': '#e4e6e8',
            'color': 'black'
        });
    }
    else if(key === -1){
        console.log('Player Two Win');
        $('#p2Win').css('opacity', '1');
        $('#pOne').css({
            'background-color': '#e4e6e8',
            'color': 'black'
        });
        $('#pTwo').css({
            'background-color': '#4577a2',
            'color': 'white'
        });
    }

});


//if click the restart button, will clear the board
$('#reset').on('click', function(){
    $('.chequer').each(function(){
        $(this).html('');
    });
    isFirstPlayer = true; //isFirstPlayer back to ture, so as to the next one after reset is the first player

    //set the type of key !== number
    key = '';

    //clear the board array
    board = new Array(3);
    for (let i = 0; i < board.length; i++){
        board[i] = new Array(3).fill(0);
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

});




























































// Several situations to decide if win or not.
const makeDecision = function(r, c){

    const rowLength = board[r].length;
    const columnLength = board.length;

    //horizontal
    if (c + 1 < rowLength){ //decide if reach the edge
        if(board[r][c + 1] === board[r][c]){ //c, c+1 same
            if(c + 2 < rowLength){
                if(board[r][c + 2] === board[r][c]){
                    return board[r][c]; // if c, c+1, c+2 same
                }
                else{ //if c, c+1 same, c+2 not, check c-1
                    if(c - 1 >= 0){
                        if(board[r][c - 1] === board[r][c]){
                            return board[r][c];
                        }
                    }
                }
            }
            else{ // if the key is at second last position, and c, c+1 same, then check c - 1
                if(board[r][c - 1] === board[r][c]){
                    return board[r][c]
                }
            }
        }
        else{ //c+1 not same, check c-1
            if(c - 1 >= 0){
                if(board[r][c - 1] === board[r][c]){
                    if(c - 2 <= 0){ //c, c-1 same, check c-2
                        if(board[r][c - 2] === board[r][c]){
                            return board[r][c]; //c, c-1, c-2 same  
                        }
                    }
                }
            }
        }
    }
    else{ // if the key is at the last position, check c, c-1 and c-2
        if(board[r][c - 1] === board[r][c]){
            if(board[r][c - 2] === board[r][c]){
                return board[r][c];
            }
        }
    }


    //vertical
    if(r + 1 < columnLength){
        if(board[r + 1][c] === board[r][c]){ // r, r+1 same
            if(r + 2 < columnLength){
                if(board[r + 2][c] === board[r][c]){
                    return board[r][c]; //if r, r+1, r+2 same
                }
                else{ //if r, r+1 same, r+2 not, check r-1
                    if(r - 1 >= 0){
                        if(board[r - 1][c] === board[r][c]){
                            return board[r][c];
                        }
                    }
                }
            }
            else{ // if the key is at second last position, and r, r+1 same, then check r - 1
                if(board[r - 1][c] === board[r][c]){
                    return board[r][c]
                }
            }
        }
        else{ //r+1 not same, check r-1
            if(r - 1 >= 0){
                if(board[r - 1][c] === board[r][c]){
                    if(r - 2 >= 0){ // r, r-1 same, check r-2
                        if(board[r - 2][c] === board[r][c]){
                            return board[r][c]; //r, r-1, r-2 same
                        }
                    }
                }
            }
        }
    }
    else{ // if the key is at the last position, check r, r-1 and r-2
        if(board[r - 1][c] === board[r][c]){
            if(board[r - 2][c] === board[r][c]){
                return board[r][c];
            }
        }
    }


    //right top oblique
    if(r - 1 >= 0 && c + 1 < rowLength){
        if(board[r - 1][c + 1] === board[r][c]){ // r-1,c+1 same as r,c
            if(r - 2 >= 0 && c + 2 < rowLength){
                if(board[r - 2][c + 2] === board[r][c]){
                    return board[r][c]; //if r-1,c+1 and r-2,c+2 and r,c same
                }
                else{ //if r-1,c+1 same, r-2,c+2 not, check r+1,c-1
                    if(r + 1 < columnLength && c - 1 >= 0){
                        if(board[r + 1][c - 1] === board[r][c]){
                            return board[r][c];
                        }
                    }
                }
            }
            else if(r + 1 < columnLength && c - 1 >= 0){ // if the key is at second last position, and r-1,c+1 same, then check r+1,c-1
                if(board[r + 1][c - 1] === board[r][c]){
                    return board[r][c]
                }
            }
        }
        else{ //r-1,c+1 not same, check r+1,c-1
            if(r + 1 < columnLength && c - 1 >= 0){
                if(board[r + 1][c - 1] === board[r][c]){
                    if(r + 2 < columnLength){ // r+1,c-1 same, check r+2,c-2
                        if(board[r + 2][c - 2] === board[r][c]){
                            return board[r][c]; //r, r-1, r-2 same
                        }
                    }
                }
            }
        }
    }
    else if(r + 1 < columnLength && c - 1 >= 0){ // if the key is at the last position, check r+1,c-1 and r+2,c-2
        if(board[r + 1][c - 1] === board[r][c]){
            if(r + 2 < columnLength && c - 2 >= 0){
                if(board[r + 2][c - 2] === board[r][c]){
                return board[r][c];
                }
            }
        }
    }

    
    //Left top oblique
    if(r + 1 < columnLength && c + 1 < rowLength){
        if(board[r + 1][c + 1] === board[r][c]){ // r+1,c+1 same as r,c
            if(r + 2 < columnLength && c + 2 < rowLength){
                if(board[r + 2][c + 2] === board[r][c]){
                    return board[r][c]; //if r+1,c+1 and r+2,c+2 and r,c same
                }
                else{ //if r+1,c+1 same, r+2,c+2 not, check r-1,c-1
                    if(r - 1 >= 0 && c - 1 >= 0){
                        if(board[r - 1][c - 1] === board[r][c]){
                            return board[r][c];
                        }
                    }
                }
            }
            else if(r - 1 >= 0 && c - 1 >= 0){ // if the key is at second last position, and r+1,c+1 same, then check r-1,c-1
                if(board[r - 1][c - 1] === board[r][c]){
                    return board[r][c]
                }
            }
        }
        else{ //r+1,c+1 not same, check r-1,c-1
            if(r - 1 >= 0 && c - 1 >= 0){
                if(board[r - 1][c - 1] === board[r][c]){
                    if(r - 2 >= 0){ // r-1,c-1 same, check r-2,c-2
                        if(board[r - 2][c - 2] === board[r][c]){
                            return board[r][c]; //r, r-1, r-2 same
                        }
                    }
                }
            }
        }
    }
    else if(r - 1 >= 0 && c - 1 >= 0){ // if the key is at the last position, check r-1,c-1 and r-2,c-2
        if(board[r - 1][c - 1] === board[r][c]){
            if(r - 2 >= 0 && c - 2 >= 0){
                if(board[r - 2][c - 2] === board[r][c]){
                    return board[r][c];
                }
            }
        }
    }
}





















