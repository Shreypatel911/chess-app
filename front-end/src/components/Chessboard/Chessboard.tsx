import { useRef, useState } from 'react';
import Tile from '../Tile/Tile';
import './Chessboard.css'
import Refree from '../../refree/Refree';

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

export interface Piece{
    image : string
    x : number
    y : number
    type : PieceType
    team : Team
}

export enum Team{
    OPPONENT,
    OUR
}

export enum PieceType{
    PAWN, 
    BISHOP,
    ROOK,
    KNIGHT,
    QUEEN,
    KING
}

const initialBoardState : Piece[] = [];
for(let i=0;i<8;i++){
    initialBoardState.push({image : "assets/images/pawn_b.png", x : 6, y : i, type : PieceType.PAWN, team : Team.OPPONENT});
    initialBoardState.push({image : "assets/images/pawn_w.png", x : 1, y : i, type : PieceType.PAWN, team : Team.OUR});
}
//rook
initialBoardState.push({ image: "assets/images/rook_b.png", x: 7, y: 7, type : PieceType.ROOK, team : Team.OPPONENT })
initialBoardState.push({ image: "assets/images/rook_b.png", x: 7, y: 0, type : PieceType.ROOK, team : Team.OPPONENT })
initialBoardState.push({ image: "assets/images/rook_w.png", x: 0, y: 0, type : PieceType.ROOK, team : Team.OUR })
initialBoardState.push({ image: "assets/images/rook_w.png", x: 0, y: 7, type : PieceType.ROOK, team : Team.OUR })
//knight
initialBoardState.push({ image: "assets/images/knight_b.png", x: 7, y: 1, type : PieceType.KNIGHT, team : Team.OPPONENT })
initialBoardState.push({ image: "assets/images/knight_b.png", x: 7, y: 6, type : PieceType.KNIGHT, team : Team.OPPONENT })
initialBoardState.push({ image: "assets/images/knight_w.png", x: 0, y: 1, type : PieceType.KNIGHT, team : Team.OUR }) 
initialBoardState.push({ image: "assets/images/knight_w.png", x: 0, y: 6, type : PieceType.KNIGHT, team : Team.OUR })
//bishop
initialBoardState.push({ image: "assets/images/bishop_b.png", x: 7, y: 2, type : PieceType.BISHOP, team : Team.OPPONENT })
initialBoardState.push({ image: "assets/images/bishop_b.png", x: 7, y: 5, type : PieceType.BISHOP, team : Team.OPPONENT })
initialBoardState.push({ image: "assets/images/bishop_w.png", x: 0, y: 2, type : PieceType.BISHOP, team : Team.OUR })
initialBoardState.push({ image: "assets/images/bishop_w.png", x: 0, y: 5, type : PieceType.BISHOP, team : Team.OUR })
//queen
initialBoardState.push({ image: "assets/images/queen_b.png", x: 7, y: 3, type : PieceType.QUEEN, team : Team.OPPONENT })
initialBoardState.push({ image: "assets/images/queen_w.png", x: 0, y: 3, type : PieceType.QUEEN, team : Team.OUR })
//king
initialBoardState.push({ image: "assets/images/king_b.png", x: 7, y: 4, type : PieceType.KING, team : Team.OPPONENT })
initialBoardState.push({ image: "assets/images/king_w.png", x: 0, y: 4, type : PieceType.KING, team : Team.OUR })

export default function Chessboard(){
    let board = [];
    const chessboardRef = useRef<HTMLDivElement>(null);
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
    const [gridX, setGridX] = useState(0);
    const [gridY, setGridY] = useState(0);
    const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
    const refree = new Refree();

    function grabPieces(e : React.MouseEvent){
        const element = e.target as HTMLElement;
        const chessboard = chessboardRef.current;

        if(element.classList.contains("chess-piece") && chessboard){
            setGridX(Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100 )));
            setGridY(Math.floor((e.clientX - chessboard.offsetLeft) / 100));
            const x = e.clientX - 50;
            const y = e.clientY - 50;
            element.style.position = "absolute";
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
            setActivePiece(element);
        }
    }

    function movePieces(e : React.MouseEvent){
        const chessboard = chessboardRef.current;

        if(activePiece && chessboard){
            const minX = chessboard.offsetLeft - 25;
            const minY = chessboard.offsetTop - 25;
            const maxX = chessboard.offsetLeft + chessboard.clientWidth - 75;
            const maxY = chessboard.offsetTop + chessboard.clientHeight - 75;
            const x = e.clientX - 50;
            const y = e.clientY - 50;
            activePiece.style.position = "absolute";
            if (x < minX) {
                activePiece.style.left = `${minX}px`;
            }
            else if (x > maxX) {
                activePiece.style.left = `${maxX}px`;
            }
            else {
                activePiece.style.left = `${x}px`;
            }
        
            if (y < minY) {
                activePiece.style.top = `${minY}px`;
            }
            else if (y > maxY) {
                activePiece.style.top = `${maxY}px`;
            }
            else {
                activePiece.style.top = `${y}px`;
            }
        }
    }

    function dropPieces(e : React.MouseEvent){
        const chessboard = chessboardRef.current;

        if(activePiece && chessboard){
            const currX = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800) / 100));
            const currY = Math.floor((e.clientX - chessboard.offsetLeft) / 100);
            
            setPieces((value) => {
                const pieces = value.map((element) => {
                    if(element.x === gridX && element.y === gridY){
                        const isvalidMove = refree.isValidMove(gridX, gridY, currX, currY, element.type, element.team, pieces);

                        if(isvalidMove){
                            element.x = currX;
                            element.y = currY;
                        }else{
                            activePiece.style.position = 'relative';
                            activePiece.style.removeProperty('top');
                            activePiece.style.removeProperty('left');
                        }
                    }

                    return element;
                })

                return pieces; 
            });
            setActivePiece(null);
        }
        setActivePiece(null);
    }
    
    for(let i=verticalAxis.length-1;i>=0;i--){
        for(let j=0;j<horizontalAxis.length;j++){
            const number = i + j + 2;
            let image = undefined;
            pieces.forEach(p => {
                if(p.x === i && p.y === j)
                    image = p.image;
            })
            board.push(<Tile key={`${j},${i}`} image={image} number={number}></Tile>);
        } 
    }

    return (<div ref={chessboardRef} onMouseMove={(e) => movePieces(e)} onMouseDown={(e) => grabPieces(e)} onMouseUp={(e) => dropPieces(e)} id='chessboard'>{board}</div>)
}