Source:
https://gist.github.com/textchimp/afcb3ddc676dccd59ccb18cb9391c87a

Technical Requirements
Your app must:

Render a game board in the browser
Switch turns between X and O (or whichever markers you select); your game should prevent users from playing a turn into a square that is already occupied
Visually display which side won if a player gets three in a row; or show a draw/"cat’s game" if neither wins
Include separate HTML / CSS / JavaScript files
Stick with KISS (Keep It Simple Stupid) and DRY (Don't Repeat Yourself) principles
Use Javascript with jQuery (or vanilla DOM methods if you really prefer) for DOM manipulation
Deploy your game online, where the rest of the world can access it
Use semantic markup for HTML and CSS (adhere to best practices)


8/8/2022
HTML & CSS
* The corner of the 1st line: 
    Restart this round
    Restart whole game
    Choose the board size
* The 2nd line: Game Name at the very top
* The 3rd line: Set two players box and information
* Assign two players the symbol 
    (will upgrade like customize tokens, names, pictures in the next version) (find some graphs to fill in)
    (hover effects when player choose their profile in the next version)
    (win animation in the next version)
* Set a box beside each player symbol, in the future who wins it will shows 'win' beside the player name ()
* Set a box between two players, if neither wins, show a draw in the middle box
* The 4th line: shows multiple game rounds with a win counter (Next version)
* The 5th line: Build a 3 * 3 game GUI
* The 6th line: Draw a box shows which one's turn (Next version) (or hover)
* Larger Board (next version)
* 

JS
* Reset Button to reset the whole game
* Default player one first
* Place player one symbol first then player two symbol in turn, switching symbol by clicking (on click)
1. set a variable, set as true first, when it is true, it means the first player.
    When place the key, check if that block have html or not.
2. build a 3 * 3 array, if the first player place the key, set the corresponding location in array to 1.
    2.1) 1st time thought: set each div id = x0y0 to x2y2 which the number is related to the label in the array I set. Then pick the id and change the string to number and use many if to put in the correspoding position
3. when click the div, give this div html, then change the variable to false, means the second player.
    When place the key, check if that block have html or not.
4. if the second player place its key, set the corresponding location in array to -1
5. To decide which side win:
    5.1) 1st time thought: enumeration method, list all the probabilities, and use if to decide. But not suitable for the larger board.
    5.2) 2nd time thought: divide into 4 situations:
    const board = [
                    c0, c1, c2
                r0  [0,  0,  0],
                r1  [0,  0,  0],
                r2  [0,  0,  0]
    ];
        on the board is board[r][c]
        a)horizontal:  check c+1, if same, check c+2

                        c+1 same, c+2 not same, check c-1, first check c-1 >= 0

                        c+1 not same, check c-1,
                        if c-1 same, check c-2, first check c-2 >= 0 
        
        b) vertical:    r+1 to check if the bottom key is the same,
                        if r+1 same check if r+2 is the same,
                        if r, r+1, r+2 all the same then win

                        r+1 same, r+2 not same,
                        check if r-1 same, first check if r-1 >= 0
                        if r-1, r, r+1 all same then win

                        if r+1 not same, check r-1,
                        if r-1 same, check r-2, first check if r-2 >= 0

        c) right oblique: check c+1 & r-1, if same, check c+2 & r-2
                          
                          if c+1 & r-1 same, c+2 & r-2 not same,
                          check c-1 & r+1

                          if c+1 & r-1 not same, check c-1 & r+1,
                          if c-1 & r+1 same, check c-2 & r+2

        d) left oblique: check c+1 & r+1, if same, check c+2 & r+2

                         if c+1 & r+1 same, c+2 & r+2 not same,
                         check c-1 & r-1

                         if c+1 & r+1 not same, check c-1 & r-1,
                         if c-1 & r-1 same, check c-2 & r-2

    5.3) divide into 4 directions,
         every click will run the whole grid to catch if there is a winner,
         in each direction, run a big for loop, then run a small loop inside, for example

         a) horizontal: in each row, for loop the column, start from the first one, if the value is 1 or -1, make a new variable = 0, max length is 3, column + 1 total 3 times, to see if the sum is 3 or -3, if is 3 then p1 win, if is -3 then p2 win.
                    
6. Decide if the game is fair.
   If the board is full of keys and no 1 or -1 value in key. Then it's fair game


* cannot click the same place twice (true of false?)

* When one win, there is something beside, start from a YOU WIN logo (Animation in the next version)
* Three in a line then one win
* Player One can choose its symbol and write name(Next version)
* Larger Board (next version)








