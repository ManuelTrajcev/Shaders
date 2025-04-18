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

mat2 rot2D(float angle) {   //2D rotation
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
}

vec3 rot3D(vec3 p, vec3 axis, float angle) {   //3D rotation, Rodrigues' formula
    return mix(dot(axis, p) * axis, p, cos(angle)) + cross(axis, p) * sin(angle);
}

float map(vec3 p){
    vec3 spherePos = vec3(sin(iTime)*3.,0,0);
    
    float sphere = sdSphere(p - spherePos, 1.0);  //move the ray to spherePos
    
    vec3 q = p;   //copy of position, if we use original, the ground also rotates
    
    q.xy *= rot2D(iTime);  //Exclude the axis of rotation
    
    float scaleFactor = 1.0;
    
    float box = sdBox(q * scaleFactor, vec3(0.75)) / scaleFactor;    //positive scaling factor, decreases the size, divide by same amount to fix artefacts
    
    float ground = p.y + 0.85;  // possitive offset, but moves the ground down **we move the ray, not the object
    
    return smin(ground, smin(sphere, box, 2.), 1.);    //return the object closer to the ray
}


void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    float mouseSensitivity = 2.0;
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;
    vec2 m = (iMouse.xy * 2.0 -  iResolution.xy) / iResolution.y * mouseSensitivity;  //mouse posion, normalized the same way as uv
   
    // Initialization
    vec3 ro = vec3(0,0,-3);   // ray origin
    float fieldOfView = 1.0;
    vec3 rd = normalize(vec3(uv*fieldOfView, 1));    // ray direction, normalize - make sure that len = 1
    vec3 col = vec3(0);
    
    float t = 0.0;  // total distance travelled
    
    //Vertical camera rotation, always needs to be before horizontal
    ro.yz *= rot2D(-m.y);
    rd.yz *= rot2D(-m.y);
    
    // Horizontal camera rotation
    ro.xz *= rot2D(-m.x);
    rd.xz *= rot2D(-m.x);
    
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