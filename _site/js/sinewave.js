
var t=0; 

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

// Calculates y position from x
function calcSineY( w, h, x, f, amp ) {
  // h is the amplitude of the wave
  // x is the current x value we get every time interval
  // 2 * PI is the length of one cycle (full circumference)
  // f/w is the frequency fraction
	return h - 0.95*h*amp * Math.sin( x * Math.PI * (f/w) );
}
function drawHarmonic(ctx, t, time_speed, harmonic, amp_scaling = 1){

    // time-varying amplitude
    var t = t%time_speed;
    var tri_t =  (t > time_speed/2) ? time_speed - t : t;
    var amp = tri_t % time_speed / time_speed;

    ctx.beginPath(); 
    ctx.strokeStyle = "black";
    for(var i=0;i<=200;i++){ 
        var y = calcSineY(200, 50, i, harmonic, amp*amp_scaling);
        ctx.lineTo(i/2,y);     
    }
    ctx.stroke();

    ctx.beginPath(); 
    for(var i=0;i<=200;i++){ 
        var y = calcSineY(200, 50, i,harmonic,-amp*amp_scaling);
        ctx.lineTo(i/2,y);     
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

    const referenceLineWidth = 1;
    ctx.lineWidth = referenceLineWidth / ratio;

    for(var i=0;i<6;i++){ 
        drawHarmonic(
            ctx,
            t,
            (16-i)*50, // time factor
            i+1, // harmonic number
            (16-i)/16 // amplitude scaling
        );     
    }
        
});