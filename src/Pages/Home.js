import { useNavigate } from "react-router-dom";

export default function Home(){
    let navigate = useNavigate();
    return(
        <>
            <p>
                This game is my version of Ultimate Tic-Tac-Toe.<br></br> 
                Ultimate Tic-Tac-Toe is a game that consists of 9 different, independent games of Tic-Tac-Toe.
            </p>
            <p>
                Rules:<br></br>
                
                The game starts with X playing wherever they want, then the next move is forced to be played in the small board indicated by the position of the previous move.<br></br>
            </p>
            <p>
                In the normal variation of this game, once an individual game is completed, players sent there can play wherever they choose.<br></br>
                However, I feel being able to play wherever you want is extremely powerful in this game, therefore, the pattern of being forced to play relative to the position of the previous move is held throughout the entire game. <br></br>
                But, the individual game can only be won once, and the point will be given to the player that scores three in a row first.
            </p>
            <p>
                The game is over whenever X or O gets 3 individual board wins.
            </p>
            <button 
                type="button" 
                onClick={() => {
                    navigate("/game");
                  }}
            >
                Go To Game
            </button>
        </>
    );
}