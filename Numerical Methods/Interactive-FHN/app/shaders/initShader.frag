#version 300 es
precision highp float ;
precision highp int ;

in vec2 pixPos ;
layout ( location = 0 ) out vec4 outTrgt1 ;
layout ( location = 1 ) out vec4 outTrgt2 ;

void main(){
    vec4 outTrgt =vec4(0.) ;
    if (length(pixPos - vec2(0.5,0.5)) < 0.1 ){
        outTrgt.r = 1.0 ;
    }
    outTrgt1 = outTrgt ;
    outTrgt2 = outTrgt ;
    return ;
}
