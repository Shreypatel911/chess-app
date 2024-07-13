package com.example.backend.models;

import com.example.backend.constants.Constants;
import com.github.bhlangonijr.chesslib.Square;
import com.github.bhlangonijr.chesslib.move.Move;
import com.google.gson.JsonObject;
import lombok.Getter;
import lombok.Setter;
import org.json.JSONObject;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.*;
import com.github.bhlangonijr.chesslib.Board;

@Getter
@Setter
public class Game {
    private WebSocketSession player1;
    private WebSocketSession player2;
    private Board board;
    private List<String> moves;
    private Date startTme;
    private static Map<String, Square> moveToSquare = new HashMap<>();

    public Game(WebSocketSession player1, WebSocketSession player2) throws IOException {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Board();
        this.moves = new ArrayList<>();
        this.startTme = new Date();

        JSONObject responseJsonPlayer1 = new JSONObject();
        responseJsonPlayer1.put(Constants.TYPE, Constants.INIT_GAME);
        responseJsonPlayer1.put(Constants.PAYLOAD, new JSONObject());
        JSONObject nestedResponseJsonPlayer1 = (JSONObject) responseJsonPlayer1.get(Constants.PAYLOAD);
        nestedResponseJsonPlayer1.put(Constants.COLOR, Constants.WHITE);
        player1.sendMessage(new TextMessage(responseJsonPlayer1.toString()));

        JSONObject responseJsonPlayer2 = new JSONObject();
        responseJsonPlayer2.put(Constants.TYPE, Constants.INIT_GAME);
        responseJsonPlayer2.put(Constants.PAYLOAD, new JSONObject());
        JSONObject nestedResponseJsonPlayer2 = (JSONObject) responseJsonPlayer2.get(Constants.PAYLOAD);
        nestedResponseJsonPlayer2.put(Constants.COLOR, Constants.BLACK);
        player2.sendMessage(new TextMessage(responseJsonPlayer2.toString()));

        moveToSquare.put("a1", Square.A1);
        moveToSquare.put("a2", Square.A2);
        moveToSquare.put("a3", Square.A3);
        moveToSquare.put("a4", Square.A4);
        moveToSquare.put("a5", Square.A5);
        moveToSquare.put("a6", Square.A6);
        moveToSquare.put("a7", Square.A7);
        moveToSquare.put("a8", Square.A8);

        moveToSquare.put("b1", Square.B1);
        moveToSquare.put("b2", Square.B2);
        moveToSquare.put("b3", Square.B3);
        moveToSquare.put("b4", Square.B4);
        moveToSquare.put("b5", Square.B5);
        moveToSquare.put("b6", Square.B6);
        moveToSquare.put("b7", Square.B7);
        moveToSquare.put("b8", Square.B8);

        moveToSquare.put("c1", Square.C1);
        moveToSquare.put("c2", Square.C2);
        moveToSquare.put("c3", Square.C3);
        moveToSquare.put("c4", Square.C4);
        moveToSquare.put("c5", Square.C5);
        moveToSquare.put("c6", Square.C6);
        moveToSquare.put("c7", Square.C7);
        moveToSquare.put("c8", Square.C8);

        moveToSquare.put("d1", Square.D1);
        moveToSquare.put("d2", Square.D2);
        moveToSquare.put("d3", Square.D3);
        moveToSquare.put("d4", Square.D4);
        moveToSquare.put("d5", Square.D5);
        moveToSquare.put("d6", Square.D6);
        moveToSquare.put("d7", Square.D7);
        moveToSquare.put("d8", Square.D8);

        moveToSquare.put("e1", Square.E1);
        moveToSquare.put("e2", Square.E2);
        moveToSquare.put("e3", Square.E3);
        moveToSquare.put("e4", Square.E4);
        moveToSquare.put("e5", Square.E5);
        moveToSquare.put("e6", Square.E6);
        moveToSquare.put("e7", Square.E7);
        moveToSquare.put("e8", Square.E8);

        moveToSquare.put("f1", Square.F1);
        moveToSquare.put("f2", Square.F2);
        moveToSquare.put("f3", Square.F3);
        moveToSquare.put("f4", Square.F4);
        moveToSquare.put("f5", Square.F5);
        moveToSquare.put("f6", Square.F6);
        moveToSquare.put("f7", Square.F7);
        moveToSquare.put("f8", Square.F8);

        moveToSquare.put("g1", Square.G1);
        moveToSquare.put("g2", Square.G2);
        moveToSquare.put("g3", Square.G3);
        moveToSquare.put("g4", Square.G4);
        moveToSquare.put("g5", Square.G5);
        moveToSquare.put("g6", Square.G6);
        moveToSquare.put("g7", Square.G7);
        moveToSquare.put("g8", Square.G8);

        moveToSquare.put("h1", Square.H1);
        moveToSquare.put("h2", Square.H2);
        moveToSquare.put("h3", Square.H3);
        moveToSquare.put("h4", Square.H4);
        moveToSquare.put("h5", Square.H5);
        moveToSquare.put("h6", Square.H6);
        moveToSquare.put("h7", Square.H7);
        moveToSquare.put("h8", Square.H8);
    }

    public void makeMove(JsonObject message){
        String from = message.get(Constants.FROM).getAsString();
        String to = message.get(Constants.TO).getAsString();
        Move currentMove = new Move(moveToSquare.get(from), moveToSquare.get(to));

        try{
            boolean isMoveValid = this.board.doMove(currentMove, true);
            if(!isMoveValid){
                System.out.println("Move is not valid");
                return ;
            }
            System.out.println(isMoveValid);
            System.out.println(this.board.toString());
        }catch (Exception e){
            System.out.println("Illegal move: " + e.getMessage());
        }
    }
}
