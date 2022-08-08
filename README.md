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
* The corner of the 1st line: Restart and choose the board size
* The 2nd line: Game Name at the very top
* The 3rd line: Set two players box and information
* Assign two players the symbol 
    (will upgrade like customize tokens, names, pictures in the next version) 
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
2. build a 3 * 3 array, if the first player place its key, set the corresponding location in array to 1
3. when click the div, give this div html, then change the variable to false, means the second player.
    When place the key, check if that block have html or not.
4. if the second player place its key, set the corresponding location in array to -1



* cannot click the same place twice (true of false?)

* When one win, there is something beside, start from a YOU WIN logo (Animation in the next version)
* Three in a line then one win
* Player One can choose its symbol and write name(Next version)
* Larger Board (next version)








