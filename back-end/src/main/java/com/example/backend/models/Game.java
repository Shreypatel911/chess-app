package com.example.backend.models;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

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

    public Game(WebSocketSession player1, WebSocketSession player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Board();
        this.moves = new ArrayList<>();
        this.startTme = new Date();
    }

    public void makeMove(TextMessage message){
        System.out.println(this.getPlayer1().getId());
        System.out.println(this.getPlayer2().getId());
    }
}
