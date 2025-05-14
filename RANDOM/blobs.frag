
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;

    float distortionY = cos(uv.y * 3.0 + iTime*2.0) * 0.85;
    float distortionX = sin(uv.y * 4.0 + iTime*3.0) * 0.85;

    uv.x += distortionY;
    uv.y += distortionX;
    

    float dist = length(uv);

    float r = cos(iTime);
    float g = sin(iTime);
    float b = cos(iTime + 2.0);

    vec3 col = vec3(g*0.3, b, r);
    
    if(dist < 0.8){
        col = vec3(r*0.4, g*0.6, b*0.4);
    }
    
    float edge = smoothstep(0.8, 0.78, dist);
    col = mix(vec3(r, g, b), vec3(g, b, r), edge);

    fragColor = vec4(col, 1.0);
}