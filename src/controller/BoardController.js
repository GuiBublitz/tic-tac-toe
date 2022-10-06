export class BoardController {

    constructor (board , combinations) {
        this._board = board;
        this._boardSquares = this.getBoardSquares([...this._board.children]);
        this._currentPlayer = 1;
        this._user1Data = [];
        this._user2Data = [];
        this._X = this.createElementImg("https://cdn-icons-png.flaticon.com/128/75/75519.png");
        this._O = this.createElementImg("https://cdn-icons-png.flaticon.com/128/808/808569.png");
        this._combinations = combinations;
        this.initEvents();
    }

    initEvents(){
        [...this._board.children].forEach((el)=>{
            el.addEventListener('click', (event)=>{
                if ( !el.children.length ) {
                    this.makeMove(el, this._currentPlayer);
                };
            })
        });
    }

    makeMove (square, player) {
        if ( player == 1 ) {
            square.appendChild(this._X.cloneNode(true))
            this._user1Data.push(square.id);
            this._currentPlayer = 2;
            if ( this.isThereAWinner(player) ) this.resetGame(player);
        } else {
            square.appendChild(this._O.cloneNode(true))
            this._user2Data.push(square.id);
            this._currentPlayer = 1;
            if ( this.isThereAWinner(player) ) this.resetGame(player);
        }
    }

    isThereAWinner(player){
        let validator = false;
        if ( player == 1 ) {
            this._combinations.forEach((arrCombPossibility)=>{
                let count = 0;
                arrCombPossibility.forEach((comb)=>{
                    if ( this._user1Data.includes(comb) ) { 
                        ++count;
                    }
                    if (arrCombPossibility.length === count) validator = true;
                })
            })
        } else {
            this._combinations.forEach((arrCombPossibility)=>{
                let count = 0;
                arrCombPossibility.forEach((comb)=>{
                    if ( this._user2Data.includes(comb) ) { 
                        ++count;
                    }
                    if (arrCombPossibility.length === count) validator = true;
                })
            })
        }
        return validator;
    }

    getBoardSquares(arr){
        let squaresObj = {};
        arr.forEach((item,index)=>{
            squaresObj[item.id] = [item]; 
        });
        return squaresObj;
    }

    createElementImg(imageUrl) {
        let newImg = document.createElement('img');
        newImg.setAttribute('src', `${imageUrl}`);
        newImg.setAttribute('width','100%');
        newImg.setAttribute('height','100%');
        return newImg;
    }

    resetGame (player) {
        alert(`Player ${player} Winner!`)
        this._currentPlayer = 1;
        this._user1Data = [];
        this._user2Data = [];
        [...this._board.children].forEach( el => {
            if ( el.children.length ) [...el.children][0].remove();
        })
    };

}
