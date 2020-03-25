var brands = ['adobe','algolia','amazon','android','apple','audible','behance','bitcoin','blackberry','chrome','ebay','facebook','firefox','git','google',
'instagram','imdb','itunes','linkedin','joomla','microsoft','opera','patreon','paypal','pinterest','react','reddit','safari','salesforce','sketch','skype',
'slack','snapchat','stack-overflow','stripe','telegram','tripadvisor','tumblr','twitch','twitter','uber','ubuntu','unity','viber','vimeo','whatsapp',
'wordpress','xbox','yahoo','youtube'];

var allowed = [2,4,6,8,10];

function startGame() {
    var timer = null;
    var moves = 0;
    var matches = 0;
    var gameContainer = document.getElementById('game');
    gameContainer.innerHTML = '';
    document.getElementById('victory').innerText = "";
    document.getElementById('difficultyWrapper').style.display = 'none';
    document.getElementById('score').style.display = 'block';
    document.getElementById('moves').innerText = "moves: "+moves;
    document.getElementById('matches').innerText = "matches: "+matches;
    var difficulty = parseInt(document.getElementById('difficulty').value);
    var brandsCopy = JSON.parse(JSON.stringify(brands));
    
    var pickedBrands = [];

    for (var i = (difficulty * difficulty) / 2; i > 0; i--){
        var randomBrands = brandsCopy.splice(Math.floor(Math.random() * brandsCopy.length), 1);
        pickedBrands.push(randomBrands);
        pickedBrands.push(randomBrands);
        
    }
    
    for (var i = 0; i < difficulty; i++){
        var row = document.createElement('div');
        for(var j = 0; j < difficulty; j++){
            var brand = document.createElement('i');
            brand.classList.add('fab');
            brand.classList.add('fa-' + pickedBrands.splice(Math.floor(Math.random() * pickedBrands.length), 1));
            row.append(brand);
            
            brand.addEventListener('click', function(event){
                moves++;
                event.currentTarget.classList.add('reveal');
               
                var revealed = document.querySelectorAll('.reveal');
                if(revealed.length == 2){
                    if(revealed[0].getAttribute('class') == revealed[1].getAttribute('class')){
                        revealed[0].classList.add('matched');
                        revealed[1].classList.add('matched');
                        matches++;
                        
                    }
                    
                    if(document.querySelectorAll('.matched').length == difficulty*difficulty){
                        document.getElementById('victory').innerText = "Congratulations!\nYou completed the game in "+moves+" moves!\nPlay Again?";
                        document.getElementById('difficultyWrapper').style.display = 'block';
                        document.getElementById('score').style.display = 'none';
                    }else{
                        document.getElementById('victory').innerText = "";
                    }
                    timer = setTimeout(function(){ 
                        revealed[0].classList.remove('reveal');
                        revealed[1].classList.remove('reveal');
                    }, 320);
                }
                
                document.getElementById('moves').innerText = "moves: "+moves;
                document.getElementById('matches').innerText = "matches: "+matches;
            });
        }
        gameContainer.append(row);
    }
}
