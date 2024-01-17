import './Chessboard.css'

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

export default function Chessboard(){
    let board = [];
    let colorFlag : boolean = false;
    
    for(let i=verticalAxis.length-1;i>=0;i--){
        for(let j=0;j<horizontalAxis.length;j++){
            if(i%2 === 0){
                if(!colorFlag)
                    board.push(
                        <div className="tile black-tile"></div>
                    );
                else
                    board.push(
                        <div className="tile white-tile"></div>
                    );
                colorFlag = !colorFlag;
            }else {
                if(!colorFlag)
                    board.push(
                        <div className="tile white-tile"></div>
                    );
                else
                    board.push(
                        <div className="tile black-tile"></div>
                    );
                colorFlag = !colorFlag;
            }
        }
    }

    return (<div id='chessboard'>{board}</div>)
}