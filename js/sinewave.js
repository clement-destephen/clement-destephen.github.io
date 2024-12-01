
var t=1200; 

function refresh(referenceWidth, referenceHeight, drawFunction) {
    const c = document.getElementById("canvas");
    c.width = c.clientWidth;
    c.height = c.clientHeight;
  
    const ratio = Math.min(
      c.width / referenceWidth,
      c.height / referenceHeight
    );
    const ctx = c.getContext("2d");
    ctx.scale(ratio, ratio);
  
    drawFunction(c, ctx, ratio);
    window.requestAnimationFrame(() => {
      refresh(referenceWidth, referenceHeight, drawFunction);
    });
  }

function calcSineY( w, h, x, f, amp ) {
    // h is the amplitude of the wave
    // x is the current x value we get every time interval
    // 2 * PI is the length of one cycle (full circumference)
    // f/w is the frequency fraction
    //return h - 0.95*h*amp * Math.sin( x * Math.PI * (f/w));

    var scaled_amp = (2*amp-0.5)/f ;
    return h - 0.95*h*scaled_amp*Math.sin( f * Math.PI * x / w) - h/2;
}

function drawHarmonic(c, ctx, ratio, t, time_speed, harmonic){

    var number_of_x_points = 40

    var direction = "v"

    if (direction == "v"){
        var number_of_x_points = c.height
    }
    else {
        var number_of_x_points = c.width
    }

    // time-varying amplitude
    var t = t%time_speed;
    var tri_t = (t > time_speed/2) ? time_speed - t : t;
    var amp = (tri_t % time_speed / time_speed);

    var scaled_amp = 2*amp

    /* ctx.beginPath(); 
    ctx.fillStyle = "black";
    ctx.fillText(scaled_amp, 0, 20);
    ctx.stroke(); */

    ctx.beginPath(); 
    //ctx.strokeStyle = "grey";
    


    for(var i=0;i<=number_of_x_points;i++){ 

        if (direction == "v"){
            var x = i/number_of_x_points*c.height/ratio;
            var y = calcSineY(number_of_x_points, c.width/ratio, i, harmonic, amp);


            const gradient = ctx.createLinearGradient(c.width/2/ratio, x, scaled_amp*c.width/ratio,x);
            const stop_1 = 0.5/harmonic;
            const stop_2 = 1/harmonic;
            gradient.addColorStop(0, "blue");
            gradient.addColorStop(stop_1, "red");
            gradient.addColorStop(stop_2, "yellow");
            ctx.strokeStyle = gradient;

            ctx.moveTo(c.width/2/ratio, x);
            ctx.lineTo(y, x);
        }
        else {
            var x = i/number_of_x_points*c.width/ratio;
            var y = calcSineY(number_of_x_points, c.height/ratio, i, harmonic, amp);

            ctx.moveTo(x,c.height/ratio/2);
            ctx.lineTo(x,y);
        }
    }
    ctx.stroke();


    
    ctx.beginPath(); 
    ctx.strokeStyle = "black";
    for(var i=0;i<=number_of_x_points;i++){ 
          
        if (direction == "v"){
            var x = i/number_of_x_points*c.height/ratio;
            var y = calcSineY(number_of_x_points, c.width/ratio, i, harmonic, amp);
            ctx.lineTo(y, x);
        }
        else {
            var x = i/number_of_x_points*c.width/ratio;
            var y = calcSineY(number_of_x_points, c.height/ratio, i, harmonic, amp);
            ctx.lineTo(x,y);
        }
    }
    ctx.stroke();

    /* ctx.beginPath();
    ctx.strokeStyle = "blue";
    ctx.arc(50, 50, 50, 0, 2 * Math.PI);
    ctx.stroke(); */
  
}

var interval = setInterval(function(){

    t++; 

    },
    10 // Loop every 10 milliseconds 
); 

refresh(100, 100, (c, ctx, ratio) => {


    // draw background
    /* ctx.beginPath();
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, c.width,c.height)
    ctx.stroke(); */

    ctx.globalAlpha = 0.8;

    const referenceLineWidth = 1;
    ctx.lineWidth = referenceLineWidth / ratio;

    for(var i=0;i<8;i++){ 
        drawHarmonic(
            c,
            ctx,
            ratio,
            t,
            (16-i)*100, // time factor
            i+1 // harmonic number
        );     
    }
        
});