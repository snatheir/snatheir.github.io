document.addEventListener('DOMContentLoaded', () => {

    const width = 28
    const grid = document.querySelector('.grid')

    const layout = [
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,0,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,0,0,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,0,1,1,1,0,0,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,0,1,2,2,2,2,2,2,1,0,1,1,0,1,1,1,1,1,1,
        0,4,4,4,4,4,0,1,1,0,1,2,2,2,2,2,2,1,0,0,0,0,4,4,4,4,4,4,
        1,1,1,1,1,1,0,1,1,0,1,2,2,2,2,2,2,1,0,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    ]
  
    const squares = []
  
    //create your board
    function createBoard() {
      for (let i = 0; i < layout.length; i++) {
        const square = document.createElement('div')
        grid.appendChild(square)
        squares.push(square)
  
        //add layout to the board
        if (layout[i] === 1) {
          squares[i].classList.add('wall')
        }
      }
    }
    createBoard()

    function wait(ms){
        var start = new Date().getTime();
        var end = start;
        while(end < start + ms) {
          end = new Date().getTime();
       }
     }

    //starting position of pac-man
    //let pacmanCurrentIndex = 729
    let pacmanCurrentIndex = 29
    squares[pacmanCurrentIndex].classList.add('pac-man')

    //move pac-man
    function movePacman(e){

        squares[pacmanCurrentIndex].classList.remove('pac-man')
        squares[pacmanCurrentIndex].classList.remove('manWater')

        switch(e.keyCode){
            case 37:
                if(pacmanCurrentIndex % width !== 0 && !squares[pacmanCurrentIndex -1].classList.contains('wall')) 
                pacmanCurrentIndex -=1
                break
            case 38:
                if(pacmanCurrentIndex - width >= 0 && !squares[pacmanCurrentIndex -width].classList.contains('wall')) 
                pacmanCurrentIndex -=width
                break
            case 39:
                if(pacmanCurrentIndex % width < width - 1 && !squares[pacmanCurrentIndex +1].classList.contains('wall')) 
                pacmanCurrentIndex +=1
                break;
            case 40:
                if(pacmanCurrentIndex + width < width * width && !squares[pacmanCurrentIndex +width].classList.contains('wall')) 
                pacmanCurrentIndex +=width
                break
        }

        squares[pacmanCurrentIndex].classList.add('pac-man')

        var audio = new Audio("assets/Water_Ch.mp3")

        if(pacmanCurrentIndex === 349){
            squares[pacmanCurrentIndex].classList.add('manWater')
            audio.play();

        }
    }
    document.addEventListener('keyup', movePacman)

    let plantIndex = 377

    squares[plantIndex].classList.add('plant')

})


