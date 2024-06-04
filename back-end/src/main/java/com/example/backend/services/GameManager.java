package com.example.backend.services;

import com.example.backend.constants.Constants;
import com.example.backend.models.Game;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.util.ArrayList;
import java.util.List;

@Service
public class GameManager {

    private List<Game> games = new ArrayList<>();
    private WebSocketSession pendingUser;
    private List<WebSocketSession> users = new ArrayList<>();
    public void addPlayer(WebSocketSession session) { users.add(session); }

    public void removePlayer(WebSocketSession session){
        users.remove(session);
    }

    public void handleMessage(WebSocketSession session, TextMessage message){
        if(message.getPayload().equals(Constants.INIT_GAME)){
            if(pendingUser == null)
                pendingUser = session;
            else {
                Game newGame = new Game(pendingUser, session);
                games.add(newGame);
                pendingUser = null;
            }
        }else if(message.getPayload().equals(Constants.MOVE)){
            Game currentGame = null;
            for(Game game : games){
                if(game.getPlayer1() == session || game.getPlayer2() == session){
                    currentGame = game;
                    break;
                }
            }

            if(currentGame != null){
                currentGame.makeMove(message);
            }
        }
    }
}
