float sdSphere(vec3 p, float s) {   //signed distance 
    return length(p)-s;
}

float sdBox(vec3 p, vec3 b) {   
    vec3 q = abs(p) - b;
    return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
}

float smin(float a, float b, float k) {
    float h = max (k-abs(a-b), 0.0)/ k;
    return min(a,b) - h*h*h*k*(1.0/6.0);
}

float map(vec3 p){
    vec3 spherePos = vec3(sin(iTime)*3.,0,0);
    float sphere = sdSphere(p - spherePos, 1.0);  //move the ray to spherePos
    float box = sdBox(p, vec3(0.75));
    float ground = p.y + 0.85;  // possitive offset, but moves the ground down **we move the ray, not the object
    
    return min(ground, smin(sphere, box, 2.));    //return the object closer to the ray
}


void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;
   
    // Initialization
    vec3 ro = vec3(0,0,-3);   // ray origin
    float fieldOfView = 1.0;
    vec3 rd = normalize(vec3(uv*fieldOfView, 1));    // ray direction, normalize - make sure that len = 1
    vec3 col = vec3(0);
    
    float t = 0.0;  // total distance travelled
    
    // Raymarching
    //80 iterations
    for(int i = 0; i < 80; i++){
        vec3 p = ro + rd * t;    // postion of point along the ray

        float d = map(p);    // curent distance to the scene, save distance with out hitting an objec

        t += d; // march the ray
        
        col = vec3(i) / 80.0;   //number of iterations before hitting object
        
        //if(d < 0.001) break;   // threshold of step when too close to an object
        
        //if(t > 100.0) break;  // too big step and no object near
        
        if(d < 0.001 || t > 100.0) break;   // both combined
        
    }
    
    //Colloring
    
    col = vec3(t * 0.2);
    
    fragColor = vec4(col, 1);
}