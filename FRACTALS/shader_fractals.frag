void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;
    
    //uv *= 2.0;
    
    float d = length(uv);
    
    d = sin(d*8.0 + iTime)/8.0;
    
    d = abs(d);
    
    d = 0.02 / d;
    
    fragColor = vec4(d, d, d, 1.0);
}


///

vec3 pallette(float t) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.263, 0.416, 0.557);
    
    return a + b*(cos(6.28318*(c*t+d)));
}


void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;
    
    //uv *= 2.0;
        
    float d = length(uv);
    
    vec3 col = pallette(d + iTime);
    
    d = sin(d*8.0 + iTime)/8.0;
    
    d = abs(d);
    
    d = 0.02 / d;
    
    col *= d;
    
    fragColor = vec4(col, 1.0);
}

//

vec3 pallette(float t) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.263, 0.416, 0.557);
    
    return a + b*(cos(6.28318*(c*t+d)));
}


void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;
    
    vec2 uv0 = uv;
        
    //uv *= 2.0;
           
    uv = fract(uv * 2.0) - 0.5;
    
    float d = length(uv);
    
    vec3 col = pallette(length(uv0) + iTime);
    
    d = sin(d*8.0 + iTime)/8.0;
    
    d = abs(d);
    
    d = 0.02 / d;
    
    col *= d;
    
    fragColor = vec4(col, 1.0);
}


///

vec3 pallette(float t) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.263, 0.416, 0.557);
    
    return a + b*(cos(6.28318*(c*t+d)));
}


void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;
    
    vec2 uv0 = uv;
    
    vec3 finalcolor = vec3(0.0);
    
    for(float i = 0.0; i< 3.0; i++){
    
    //uv *= 2.0;
           
    uv = fract(uv * 2.0) - 0.5;
    
    float d = length(uv);
    
    vec3 col = pallette(length(uv0) + iTime*0.4);
    
    d = sin(d*8.0 + iTime)/8.0;
    
    d = abs(d);
    
    d = 0.02 / d;
    
    finalcolor += col * d;
    
    }
    
    fragColor = vec4(finalcolor, 1.0);
}

///

vec3 pallette(float t) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.263, 0.416, 0.557);
    
    return a + b*(cos(6.28318*(c*t+d)));
}


void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;
    
    vec2 uv0 = uv;
    
    vec3 finalcolor = vec3(0.0);
    
    for(float i = 0.0; i< 3.0; i++){
    
    //uv *= 2.0;
           
    uv = fract(uv * 1.5) - 0.5;   //uv*2.0 - symetrical
    
    float d = length(uv) * exp(-length(uv0));
    
    vec3 col = pallette(length(uv0) + iTime*0.4);
    
    d = sin(d*8.0 + iTime)/8.0;
    
    d = abs(d);
    
    d = 0.01 / d;
    
    finalcolor += col * d;
    
    }
    
    fragColor = vec4(finalcolor, 1.0);
}

///

vec3 pallette(float t) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.263, 0.416, 0.557);
    
    return a + b*(cos(6.28318*(c*t+d)));
}


void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;
    
    vec2 uv0 = uv;
    
    vec3 finalcolor = vec3(0.0);
    
    for(float i = 0.0; i< 4.0; i++){
    
    //uv *= 2.0;
           
    uv = fract(uv * 1.5) - 0.5;   //uv*2.0 - symetrical
    
    float d = length(uv) * exp(-length(uv0));
    
    vec3 col = pallette(length(uv0) + i*0.4 + iTime*0.4);
    
    d = sin(d*8.0 + iTime)/8.0;
    
    d = abs(d);
    
    d = 0.01 / d;
    
    finalcolor += col * d;
    
    }
    
    fragColor = vec4(finalcolor, 1.0);
}


//

vec3 pallette(float t) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.263, 0.416, 0.557);
    
    return a + b*(cos(6.28318*(c*t+d)));
}


void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;
    
    vec2 uv0 = uv;
    
    vec3 finalcolor = vec3(0.0);
    
    for(float i = 0.0; i< 4.0; i++){
    
    //uv *= 2.0;
           
    uv = fract(uv * 1.5) - 0.5;   //uv*2.0 - symetrical
    
    float d = length(uv) * exp(-length(uv0));
    
    vec3 col = pallette(length(uv0) + i*0.4 + iTime*0.4);
    
    d = sin(d*8.0 + iTime)/8.0;
    
    d = abs(d);
       
    d = pow(0.01 / d, 1.2);
    
    finalcolor += col * d;
    
    }
    
    fragColor = vec4(finalcolor, 1.0);
}