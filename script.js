




const canvas = document.getElementById("0");
const ctx = canvas.getContext("2d");
const hidden = document.getElementById("HD");
const easy = document.getElementById("EZ");
const flashlight = document.getElementById("FL")
let fleche = document.getElementById("bt1");


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
function Carre (x,y,long,larg,color,maxCell) {
    this.x = x,
    this.y = y,
    this.long= long,
    this.larg = larg,
    this.color = color,
    this.cell = cell = new Array(),
    this.maxcell = maxCell
};

serpent = new Carre(400,400,25,0,"red",4);
pomme = new Carre(0,0,25,0,"green",0);
reset();
function placePomme()
{

    pomme.x = getRandomInt(0,32) * taille;
    pomme.y = getRandomInt(0,32) * taille;
    
}
deplacement();

draw();
placePomme();
count = 0;


function draw(){
    ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
    ctx.font="25px Comic Sans MS";
    ctx.fillStyle = "#A9A9A9";
    ctx.textAlign = "center";
    ctx.fillText(score, canvas.width/2 + 10 , canvas.height/2 + 100); // dessin du score

    ctx.fillStyle = serpent.color;

    serpent.cell.forEach(function(cell, index){

        ctx.fillRect(cell.x,cell.y,taille -1 ,taille - 1)

    }); //on draw le tableau
    ;
    
    ctx.fillStyle = "rgba(0, 255, 0," + opacity + ")"; //reglage Hidden
    if(hidden.checked === true && score > 0){
        opacity -= 0.05;
    }
    
    ctx.fillRect(pomme.x,pomme.y,pomme.long,pomme.long);
    if(flashlight.checked === true){
        ctx.fillStyle = "grey"; //flashlight
        ctx.beginPath();
        ctx.arc(serpent.x, serpent.y, radius, 0, 2 * Math.PI);
        ctx.rect(800, 0, -8008, 800);
        ctx.fill();
    }

    
};
function deplacement(){

    serpent.cell.unshift({x: serpent.x, y: serpent.y})

    if(serpent.cell.length >= serpent.maxcell)
    {
        serpent.cell.pop()
    };


}
function boucle(){
    requestAnimationFrame(boucle); 
    if (++count < Speed)// reduire/augmenter la vitesse la vitesse
    {
        return;
    }

    count = 0;

    serpent.x += serpent.long;
    serpent.y += serpent.larg;

    if(serpent.x == pomme.x && serpent.y == pomme.y) //Pomme toucher
    {
        if(score <= 0){
            
            if(hidden.checked == true)
                scoreMultiplier *= 1.5
            if(easy.checked == true)
                scoreMultiplier *= 0.25
            if(flashlight.checked == true)
                scoreMultiplier *= 2

                
        }else{
            hidden.disabled = true;
            easy.disabled = true;
            flashlight.disabled = true;
        }
        score = score + hit * scoreMultiplier;
        opacity = 1;
        serpent.maxcell++;
        placePomme();
        if(serpent.maxcell >= maxSpeed ){ //reglage vitesse
            maxSpeed += 5;
            radius /= 1.2;
            Speed /= 1.1;
            console.log(Speed);
        }
    }
    for(i = 0; i < serpent.cell.length ; i++){ //reset si toucher
        if(serpent.x === serpent.cell[i].x && serpent.y === serpent.cell[i].y){
            reset();
        }

    }

   
    if(serpent.x >= canvas.width){ // si touche bord droite
        if(easy.checked == true){
            serpent.x = 0
        }else
            reset();
    }else if(serpent.x < 0){ //touche bord gauche
        if(easy.checked == true){
            serpent.x = canvas.width;
        }else
            reset();
    }else if(serpent.y >= canvas.height){//touche bas
        if(easy.checked == true){
            serpent.y = 0;
        }else
            reset();
    }else if(serpent.y < 0){//touche haut
        if(easy.checked == true){
            serpent.y = canvas.height;
        }else
            reset();
    }
    deplacement();
    draw();


}




window.addEventListener('keydown', (e)=>{
//40 down left 37 Right 39 up 38
    if(e.keyCode == 39 && serpent.long === 0)//vers la droite
    {
        
        serpent.long = taille;
        serpent.larg = 0;
    }else if(e.keyCode == 37 && serpent.long === 0 )// vers la gauche
    { 
      
        serpent.long = -taille;
        serpent.larg = 0;
    }else if(e.keyCode == 38 && serpent.larg === 0)// vers le haut
    {
       
        serpent.larg = -taille;
        serpent.long  = 0;
    
    }else if(e.keyCode == 40 && serpent.larg === 0) //vers le bas
    {
        
        serpent.larg = taille;
        serpent.long = 0;
    }
});
requestAnimationFrame(boucle);
function reset(){
    radius = 300;
    hit = 1000;
    hidden.disabled = false;
    easy.disabled = false;
    flashlight.disabled = false;
    score = 0;
    scoreMultiplier = 1;
    opacity = 1;
    maxSpeed = 5;
    Speed = 10;
    taille = 25;
    serpent.maxcell = 4;
    serpent.cell = [];
    serpent.x = 400;
    serpent.y = 400;
    placePomme();

}


