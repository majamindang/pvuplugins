var xhr = new XMLHttpRequest();
xhr.withCredentials = false;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    r = this.responseText;

    document.querySelector('.tw-mt-20').innerHTML += `<div class="helper-container" style="width: 160px; position: absolute; bottom: 50px; overflow: hidden;">
    <p style="color: #ffffff; font-size: 0.8rem; margin-bottom: 5px;">PVU to PHP Value</p>
    <input
        type="text"
        id="phpvalue"
        style="
            width: 100%;
            background: #0e8400;
            border-radius: 5px;
            height: 40px;
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #d3e7ff;
            box-sizing: border-box;
            outline: none;
            color: white;
            font-weight: bold;
        " value="${JSON.parse(r)["plant-vs-undead-token"]['php']}"
    />

    <p style="color: #ffffff; font-size: 0.8rem; margin-bottom: 5px;">LE to PVU Rate</p>
    <input
        type="text"
        id="conversion"
        style="
            width: 100%;
            background: #649cde;
            border-radius: 5px;
            height: 40px;
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #d3e7ff;
            box-sizing: border-box;
            outline: none;
            color: white;
            font-weight: bold;
        "
        value="150"
    />
    <p style="color: #ffffff; font-size: 0.8rem; margin-bottom: 5px;">Monthly Output</p>
    <p
        id="pricebox"
        style="
            width: 100%;
            background: #d8d8d8;
            border-radius: 5px;
            height: 40px;
            padding: 10px;
            border: 1px solid white;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            line-height: 30px;
            box-sizing: border-box;
            color: green;
            font-weight: bold;
        "
    >
        0
    </p>
</div>
`;

    function checkThis(){

        plants = [...document.querySelectorAll('li:not(.tw-flex)')].slice(12, 22)
    
        if(plants.length > 1){
            console.log('ready');
        }
        
        for(plant of plants){
            plant.addEventListener('mouseenter', function(e){
                price = document.querySelector('#phpvalue').value;
                conversion = document.querySelector('#conversion').value;
                le = this.querySelector('.le.tw-text-center').innerText;
                lerate = le.slice(4, le.indexOf(' Hour')).split("/");
                monthly = ((lerate[0] / conversion) * price) * (30 / (lerate[1] / 24));
                document.querySelector('#pricebox').innerHTML = `₱${Math.ceil(monthly).toLocaleString()}`;
                e.stopPropagation();
            });
        }
    }
    
    checkThis();
    
    btns = document.querySelectorAll('.box.tw-cursor-pointer');
    
    for(btn of btns){
        btn.addEventListener('click', function(){
            checkThis();
        });
    }

  }
});

xhr.open("GET", "https://api.coingecko.com/api/v3/simple/price?ids=plant-vs-undead-token&vs_currencies=php");
xhr.send();