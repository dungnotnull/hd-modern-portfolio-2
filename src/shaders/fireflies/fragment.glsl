uniform vec3 uColor;
uniform float uOpacity;

void main() {
  vec2 uv = gl_PointCoord;
  float dist = length(uv - 0.5);
  float glow = smoothstep(0.5, 0.0, dist);
  float core = smoothstep(0.2, 0.0, dist);

  vec3 color = mix(uColor, vec3(1.0, 1.0, 0.8), core);
  gl_FragColor = vec4(color, glow * uOpacity);
}
