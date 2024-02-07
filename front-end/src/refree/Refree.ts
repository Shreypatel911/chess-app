import { Piece, PieceType, Team } from "../components/Chessboard/Chessboard";

export default class Refree{
    isTileOccupied(x : number, y : number, boardState : Piece[]){
        boardState.forEach((element) => {
            if(element.x === x && element.y === y)
                return true;
        })
        return false;
    }

    isValidMove(px : number, py : number, x : number, y : number, type : PieceType, team : Team, boardState : Piece[]){
        if(type === PieceType.PAWN){
            if(this.isTileOccupied(x, y, boardState)){
                return false;
            }
            if(team === Team.OUR){
                if(px === 1){
                    if(py === y && (x - px === 1 || x - px === 2))
                        return true;
                    return false;
                }else {
                    if(py === y && (x - px === 1))
                        return true;
                    return false;
                }
            }else{
                if(px === 6){
                    if(py === y && (x - px === -1 || x - px === -2))
                        return true;
                    return false;
                }else {
                    if(py === y && (x - px === -1))
                        return true;
                    return false;
                }
            }
        }
    }
}