import "./style.css";

let id = 1;

class Node {
    
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.id = id++;
    };
};

const visited = [];
const queue = [];
const visitedMap = new Map();

function generateNodes(){

    const adjMatrix = [[],[],[],[],[],[],[],[]];
    
    for(let x = 0; x < 8; x++){
        for(let y = 0; y < 8; y++){

            const element = new Node(x, y);
            adjMatrix[[y],[x]].push(element);
        };
    };     
    return adjMatrix;
};

const gamegrid = generateNodes();


function adjacencyList(grid){

    const array = new Array();

    grid.forEach((element) => {
        element.forEach(() => {

            array.push(Array());
        });        
    });

    return array;
};

const list = adjacencyList(gamegrid);

function getMoves([startRow, startCol], [endRow, endCol], found){

    const current = gamegrid[startRow][startCol];

    //index 0 is X index 1 is Y
    const moves = [[startRow -2, startCol +1], 
                   [startRow -1, startCol +2], 
                   [startRow +1, startCol +2], 
                   [startRow +2, startCol +1], 
                   [startRow +2, startCol -1], 
                   [startRow +1, startCol -2], 
                   [startRow -1, startCol -2], 
                   [startRow -2, startCol -1]];

    //get all avaliable moves
    for(let i = 0; i < moves.length; i++){

        const x = moves[i][0];
        const y = moves[i][1];

        //only generates moves within the board limits
        if (x >= 0 && x < 8 && y >= 0 && y < 8){

            //check this location has not already been visited
            if(!visited.includes(gamegrid[x][y])){
                
                const move = gamegrid[x][y];
                queue.push(move);
                
                visitedMap.set(move.id, current.id)
                list[current.id - 1].push(move);
            };
        };

        if(x === endRow && y === endCol){

            const move = gamegrid[x][y];

            const idArray = [move.id];
            const objArry = Array();
            let nextMoveID = visitedMap.get(move.id);

            while(nextMoveID != null){
                
                const previousID = nextMoveID;
                nextMoveID = visitedMap.get(previousID)
                
                idArray.unshift(previousID);
            };

            for(let i = 0; i < idArray.length; i++){

                const current = idArray[i];

                gamegrid.forEach((row) => {
                    row.forEach((element) => {

                        if (element.id === current){

                            objArry.push(element);
                        };
                    });
                });
            };
            
            console.log("")
            console.log(`You made it in ${idArray.length - 1} moves! Here is your path`);

            objArry.forEach((element) => {
            
                console.log(`${element.x}, ${element.y}`)
            });
        
            return found.value = true;;
        };
    };
};

function knightMoves([startRow, startCol], [endRow, endCol]){

    let found = {value: false};

    if(startRow === endRow && startCol === endCol){
        return console.log("SUCCESS")
    };
    
    const startGrid = gamegrid[startRow][startCol];

    queue.push(startGrid);

    while(found.value === false){

        const current = queue[0];
        const currentX = current.x;
        const currentY = current.y;
        
        visited.push(current);
        getMoves([currentX,currentY],[endRow,endCol], found);
        
        queue.shift();
        if(currentX === endRow && currentY === endCol){
            console.log(`SUCCESS node is ${current.id}`)
            return found.value = true; 
        };
        
    };
};

knightMoves([3,2],[3,4]);