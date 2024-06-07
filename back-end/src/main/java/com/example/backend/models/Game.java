package com.example.backend.models;

import com.example.backend.constants.Constants;
import com.github.bhlangonijr.chesslib.Square;
import com.github.bhlangonijr.chesslib.move.Move;
import lombok.Getter;
import lombok.Setter;
import org.json.JSONObject;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import com.github.bhlangonijr.chesslib.Board;

@Getter
@Setter
public class Game {
    private WebSocketSession player1;
    private WebSocketSession player2;
    private Board board;
    private List<String> moves;
    private Date startTme;

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
        nestedResponseJsonPlayer2.put(Constants.COLOR, Constants.WHITE);
        player2.sendMessage(new TextMessage(responseJsonPlayer2.toString()));
    }

    public void makeMove(TextMessage message){
    }
}
