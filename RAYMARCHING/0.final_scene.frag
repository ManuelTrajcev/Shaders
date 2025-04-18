float sdSphere(vec3 p, float s) {   //signed distance 
    return length(p)-s;
}

float sdBox(vec3 p, vec3 b) {   
    vec3 q = abs(p) - b;
    return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
}

float sdOctahedron(vec3 p, float s){
    p = abs(p);
    
    return (p.x + p.y + p.z - s) * 0.57735027;
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

vec3 pallette(float t) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.263, 0.416, 0.557);
    
    return a + b*(cos(6.28318*(c*t+d)));
}

float map(vec3 p){
    p.z += iTime * 0.4;
    
    p.xy = fract(p.xy) - .5;
    p.z = mod(p.z, .25) - .125;

    
    float box = sdOctahedron(p, 0.15);
    
    return box;
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
    //ro.yz *= rot2D(-m.y);
    //rd.yz *= rot2D(-m.y);
    
    // Horizontal camera rotation
    //ro.xz *= rot2D(-m.x);
    //rd.xz *= rot2D(-m.x);
    
    
    //Default circular motion, when mouse is not pressed
    if(iMouse.z < 0.0) {
        m = vec2(cos(iTime*0.2), sin(iTime*0.2));
    }
    
    // Raymarching
    //80 iterations
    int i;
    for(i = 0; i < 80; i++){
        vec3 p = ro + rd * t;    // postion of point along the ray

        p.xy *= rot2D(t*0.2 * m.x);   //spiral rotation along Z axis (furtehr awat, more rotation)
        
        p.y += sin(t*(m.y+1.0)*0.5)*.35;   //distoriton on y axis, determined by total distance
        
        float d = map(p);    // curent distance to the scene, save distance with out hitting an objec

        t += d; // march the ray
        
        col = vec3(i) / 80.0;   //number of iterations before hitting object
        
        //if(d < 0.001) break;   // threshold of step when too close to an object
        
        //if(t > 100.0) break;  // too big step and no object near
        
        if(d < 0.001 || t > 100.0) break;   // both combined
        
    }
    
    //Colloring
    float clipDistance = 0.05;
    
    col = pallette(t * 0.04 + float(i) * 0.005);
    
    fragColor = vec4(col, 1);
}