define([    'shader!vertShader.vert',
            'shader!compShader.frag',
            'Abubu/Abubu'
            ],
function(   vertShader,
            compShader,
            Abubu
            ){
"use strict" ;

/*========================================================================
 * Global Parameters
 *========================================================================
 */
var log = console.log ;
var env = {} ;
window.env = env ;

/*========================================================================
 * Initialization of the GPU and Container
 *========================================================================
 */
function loadWebGL()
{
    env.width = 512 ;
    env.height = 512 ;

/*------------------------------------------------------------------------
 * Access and setup canvas 
 *------------------------------------------------------------------------
 */
    var canvas_1 = document.getElementById("canvas_1") ;
    canvas_1.width = env.width ;
    canvas_1.height = env.height ;
	env.r = 1. ;
	env.th = -Math.PI ;
	env.num = 2. ;
	env.a = 1. ;
		
	
	env.txtr = new Abubu.Float32Texture( env.width, env.height ) ;
    /* Setup a solver */
    var renderer = new Abubu.Solver( {
        fragmentShader  : compShader.value,
        vertexShader    : vertShader.value,
		uniforms : {
			radius :{ type : 'f', value : env.r } ,
			theta : { type : 'f', value : env.th } ,
			n : { type : 'f', value : env.num } ,
			alpha : { type : 'f', value : env.a } ,
		} ,
        renderTargets : {
			outcolor : { location : 0 , target : env.txtr } ,
		}
    } ) ;
	env.colormap = 'rainbowHotSpring' ;
	env.disp  = new Abubu.Plot2D({
		target : env.txtr ,
		channel : 'r' ,
		colormap : env.colormap,
		minValue : 0 ,
		maxValue : 30 ,
		colorbar : true ,
		canvas : canvas_1 ,
	} ) ;
	env.disp.initialize() ;
	
    renderer.render() ;
	env.disp.render() ;
	var uniforms_list = ['radius', 'theta', 'n', 'alpha'];
	var env_list = ['r', 'th', 'num', 'a'] ;
	
	function panel_draw(step_size = 0.01, panel){
		var i ;
		for (i = 0; i < 4 ; i++) {
			panel.add(env, env_list[i]).step(step_size).onChange( function() {console.log(i);
				renderer.uniforms[uniforms_list[Math.round(i)]].value = env[env_list[Math.round(i)]];
				renderer.render() ;
				env.disp.render() ;
			} ) ;
		} ;
	}
	
	var gui = new Abubu.Gui() ;
	var pnl = gui.addPanel() ;
	setInterval(function() {
		if(renderer.uniforms.theta.value >= -2.9) {
			renderer.uniforms.theta.value = -3.5 ;
			renderer.render() ;
			env.disp.render() ;
		}
		else {
		renderer.uniforms.theta.value += 0.001 ;
		renderer.render() ;
		env.disp.render() ;
		}
	}, 50) ;
	


	panel_draw(0.01, pnl) ;
}/*  End of loadWebGL  */

loadWebGL() ;

} ) ;   // End of require 
