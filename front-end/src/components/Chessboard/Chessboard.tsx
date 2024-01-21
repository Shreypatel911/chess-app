import Tile from '../Tile/Tile';
import './Chessboard.css'

const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];

interface Piece{
    image : string
    x : number
    y : number
}

const pieces : Piece[] = []; 
for(let i=0;i<8;i++){
    pieces.push({image : "assets/images/pawn_b.png", x : 6, y : i});
    pieces.push({image : "assets/images/pawn_w.png", x : 1, y : i});
}
//rook
pieces.push({ image: "assets/images/rook_b.png", x: 7, y: 7 })
pieces.push({ image: "assets/images/rook_b.png", x: 7, y: 0 })
pieces.push({ image: "assets/images/rook_w.png", x: 0, y: 0 })
pieces.push({ image: "assets/images/rook_w.png", x: 0, y: 7 })
//knight
pieces.push({ image: "assets/images/knight_b.png", x: 7, y: 1 })
pieces.push({ image: "assets/images/knight_b.png", x: 7, y: 6 })
pieces.push({ image: "assets/images/knight_w.png", x: 0, y: 1 }) 
pieces.push({ image: "assets/images/knight_w.png", x: 0, y: 6 })
//bishop
pieces.push({ image: "assets/images/bishop_b.png", x: 7, y: 2 })
pieces.push({ image: "assets/images/bishop_b.png", x: 7, y: 5 })
pieces.push({ image: "assets/images/bishop_w.png", x: 0, y: 2 })
pieces.push({ image: "assets/images/bishop_w.png", x: 0, y: 5 })
//queen
pieces.push({ image: "assets/images/queen_b.png", x: 7, y: 3 })
pieces.push({ image: "assets/images/queen_w.png", x: 0, y: 3 })
//king
pieces.push({ image: "assets/images/king_b.png", x: 7, y: 4 })
pieces.push({ image: "assets/images/king_w.png", x: 0, y: 4 })


export default function Chessboard(){
    let board = [];

    function grabPieces(e : React.MouseEvent){
        const element = e.target as HTMLElement;
        if(element.classList.contains("chess-piece")){
            const x = e.clientX - 50;
            const y = e.clientY - 50;
            element.style.position = "absolute";
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
        }
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

    return (<div onMouseDown={(e) => grabPieces(e)} id='chessboard'>{board}</div>)
}