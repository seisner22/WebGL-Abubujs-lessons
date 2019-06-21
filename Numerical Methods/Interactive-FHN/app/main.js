define([    'shader!vertShader.vert',
            'shader!compShader.frag',
            'shader!initShader.frag',
            'Abubu/Abubu'
            ],
function(   vertShader,
            compShader,
            initShader,
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
    env.size  = 512 ;
    env.width = env.size ;
    env.height = env.size ;

    env.dt = 0.05 ;

/*------------------------------------------------------------------------
 * Access and setup canvas 
 *------------------------------------------------------------------------
 */
    var canvas_1 = document.getElementById("canvas_1") ;
    canvas_1.width = env.width ;
    canvas_1.height = env.height ;
    env.period = 100 ;
	env.period2 = 100 ;
    env.skip = 40 ;
	env.lx = 16.0 ;
	env.diffcoef = 0.001 ;
	env.epsilon = 0.01 ;
	env.aa = 0.1 ;
	env.bb = 0.3 ;
    env.xx = 0.0 ;
    env.yy = 0.0 ;
    env.button1 = true ;
    env.button2 = true ;
    env.button3 = false ;
 
    env.ftrgt = new Abubu.Float32Texture(env.width, env.height ) ;
    env.strgt = new Abubu.Float32Texture(env.width, env.height ) ;

    env.init = new Abubu.Solver({
            fragmentShader : initShader.value,
            vertexShader : vertShader.value ,
            targets : { 
                outTrgt1 : { location : 0, target : env.ftrgt } ,
                outTrgt2 : { location : 1, target : env.strgt } ,
            } 
        } ) ;
    env.init.render() ;
    
    /* Setup a solver */
    env.fsol = new Abubu.Solver({
        fragmentShader  : compShader.value ,
        vertexShader    : vertShader.value ,
        uniforms : {
            inTrgt  : { type : 's', value : env.ftrgt   } ,
            dt      : { type : 'f', value : env.dt      } ,
            period  : { type : 'f', value : env.period  } ,
			period2 : { type : 'f', value : env.period2 } ,
			lx		: { type : 'f', value : env.lx		} ,
			diffCoef: { type : 'f', value : env.diffcoef} ,
			epsilon	: { type : 'f', value : env.epsilon } ,
			aa		: { type : 'f', value : env.aa		} ,
			bb		: { type : 'f', value : env.bb		} ,
            click_x : { type : 'f', value : env.xx      } ,
            click_y : { type : 'f', value : env.yy      } ,
            button1 : { type : 'b', value : env.button1 } ,
            button2 : { type : 'b', value : env.button2 } ,
            button3 : { type : 'b', value : env.button3 } ,
        } ,
        renderTargets: { 
            outTrgt : { location : 0 , target : env.strgt } ,
        }
    } ) ;

    env.ssol = new Abubu.Solver({
        fragmentShader  : compShader.value ,
        vertexShader    : vertShader.value ,
        uniforms : {
            inTrgt  : { type : 's', value : env.strgt   } ,
            dt      : { type : 'f', value : env.dt      } ,
            period  : { type : 'f', value : env.period  } ,
			period2 : { type : 'f', value : env.period2 } ,
			lx		: { type : 'f', value : env.lx		} ,
			diffCoef: { type : 'f', value : env.diffcoef} ,
			epsilon	: { type : 'f', value : env.epsilon } ,
			aa		: { type : 'f', value : env.aa		} ,
			bb		: { type : 'f', value : env.bb		} ,
            click_x : { type : 'f', value : env.xx      } ,
            click_y : { type : 'f', value : env.yy      } ,
            button1 : { type : 'b', value : env.button1 } ,
            button2 : { type : 'b', value : env.button2 } ,
            button3 : { type : 'b', value : env.button3 } ,

        } ,
        renderTargets: { 
            outTrgt : { location : 0 , target : env.ftrgt } ,
        }
    } ) ;

    env.plot = new Abubu.Plot2D({
            target : env.strgt,
            channel: 'r' ,
            minValue : 0. ,
            maxValue : 1. ,
            colorbar : true ,
            canvas : canvas_1, 
    } ) ;


    env.initialize = function(){
        env.init.render() ;
        env.plot.init() ;
        env.time = 0 ;
        env.breaked = false ;
    }

    env.running = false ;
    env.solve = function(){
        env.running = !env.running ;
    }

    env.initialize() ;
    createGUI() ;
    render() ;
}/*  End of loadWebGL  */

function render(){
    if(env.running){
        for(var i=0; i<env.skip ; i++){
            env.time += env.dt*2. ;
            env.fsol.render() ;
            env.ssol.render() ;
        }
    }
    env.plot.render() ;
    requestAnimationFrame(render) ;
}
function createGUI(){
    canvas_1.addEventListener('click', function(e) {
        env.xx = parseFloat(e.clientX) ;
        env.yy = parseFloat(e.clientY) ;
        env.click = true ;
        env.fsol.uniforms.click_x.value = env.xx ;
        env.ssol.uniforms.click_x.value = env.xx ;
        env.fsol.uniforms.click_y.value = env.yy ;
        env.ssol.uniforms.click_y.value = env.yy ;
        console.log(env.xx/env.width, 1.0 - env.yy/env.height) ;
    });
    env.gui = new Abubu.Gui() ;
    env.pnl = env.gui.addPanel() ;
    env.pnl.add(env, 'button1').name('Pacing 1 (On/Off)').onChange(function(){
        env.button1 != env.button1 ;
        env.fsol.uniforms.button1.value = env.button1 ;        
        env.ssol.uniforms.button1.value = env.button1 ;        
    } );
    env.pnl.add(env, 'button2').name('Pacing 2 (On/Off)').onChange(function(){
        env.button2 != env.button2 ;
        env.fsol.uniforms.button2.value = env.button2 ;        
        env.ssol.uniforms.button2.value = env.button2 ;        
    } );
    env.pnl.add(env, 'button3').name('Defib').onChange(function(){
        env.button3 != env.button3 ;
        env.fsol.uniforms.button3.value = env.button3 ;        
        env.ssol.uniforms.button3.value = env.button3 ; 
    } );
    env.pnl.add(env, 'period').onChange(function(){
        env.fsol.uniforms.period.value = env.period ;        
        env.ssol.uniforms.period.value = env.period ;        
    } );       
	env.pnl.add(env, 'period2').onChange(function(){
        env.fsol.uniforms.period2.value = env.period2 ;        
        env.ssol.uniforms.period2.value = env.period2 ;        
    } );
	env.pnl.add(env, 'lx').onChange(function(){
        env.fsol.uniforms.lx.value = env.lx ;        
        env.ssol.uniforms.lx.value = env.lx ;        
    } );
	env.pnl.add(env, 'diffcoef').onChange(function(){
        env.fsol.uniforms.diffCoef.value = env.diffcoef ;        
        env.ssol.uniforms.diffCoef.value = env.diffcoef ;        
    } );
	env.pnl.add(env, 'epsilon').onChange(function(){
        env.fsol.uniforms.epsilon.value = env.epsilon ;        
        env.ssol.uniforms.epsilon.value = env.epsilon ;        
    } );
	env.pnl.add(env, 'aa').onChange(function(){
        env.fsol.uniforms.aa.value = env.aa ;        
        env.ssol.uniforms.aa.value = env.aa ;        
    } );
	env.pnl.add(env, 'bb').onChange(function(){
        env.fsol.uniforms.bb.value = env.bb ;        
        env.ssol.uniforms.bb.value = env.bb ;        
    } );
    env.pnl.add(env, 'skip') ;
    env.pnl.add(env, 'time').listen(); 
    env.pnl.add(env, 'initialize') ;
    env.pnl.add(env, 'solve').name('Solve/Stop') ;
}

loadWebGL() ;

} ) ;   // End of require 
