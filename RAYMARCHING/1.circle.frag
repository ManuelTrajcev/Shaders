// Distance to the scene
float map(vec3 p){
    return length(p) - 1.0;   // distance to a sphere with radius 1
}


void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;
   
    // Initialization
    vec3 ro = vec3(0,0,-3);   // ray origin
    vec3 rd = normalize(vec3(uv, 1));    // ray direction, normalize - make sure that len = 1
    vec3 col = vec3(0);
    
    float t = 0.0;  // total distance travelled
    
    // Raymarching
    //80 iterations
    for(int i = 0; i < 80; i++){
        vec3 p = ro + rd * t;    // postion of point along the ray

        float d = map(p);    // curent distance to the scene, save distance with out hitting an objec

        t += d; // march the ray
    }
    
    col = vec3(t * 0.2);
    
    fragColor = vec4(col, 1);
}