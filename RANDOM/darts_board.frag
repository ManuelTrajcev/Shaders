#version 330 core
in vec2 fragPos;
out vec4 FragColor;

void main() {
    float dist = length(fragPos);
    vec3 color = vec3(1.0);// default white
    vec3 white = vec3(1.0, 1.0, 0.9);
    vec3 black = vec3(0.0);
    vec3 red = vec3(0.7, 0.0, 0.0);
    vec3 green = vec3(0.0, 0.5, 0.0);

    float angle = atan(fragPos.y, fragPos.x);// range [-π, π]
    angle = mod(angle + 3.14159, 6.28318);// convert to [0, 2π]
    angle += 3.14159 / 24.0;//rotate for 1/2 segment

    int sector = int(floor(angle / (6.28318 / 24.0)));// 24 segments
    if (dist > 0.85 && dist < 0.95){ //outter black ring
        color = black;
    } else if (dist > 0.035 && dist < 0.07){ //center green
        color = green;
    } else if (dist < 0.035){ //center red
        color = red;
    } else if (sector % 2 == 0 && dist < 0.9) {
        if (dist > 0.4 && dist < 0.435) {
            color = red;//inner red ring
        } else if (dist > 0.815 && dist < 0.85) { //outter red ring
            color = red;
        } else {
            color = vec3(0.0);// black - even segments
        }
    } else {
        if (dist > 0.4 && dist < 0.435) {
            color = green;//inner green ring
        } else if (dist > 0.815 && dist < 0.85) {
            color = green;//outter green ring
        } else {
            color = white;// white - odd segments
        }
    }

    if (dist > 0.95) {
        color = vec3(1.0);
    }

    FragColor = vec4(color, 1.0);
}
