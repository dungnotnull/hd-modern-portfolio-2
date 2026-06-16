uniform float uTime;

varying vec3 vColor;
varying vec2 vUv;

void main() {
  // Wing shape: ellipse mask
  vec2 p = vUv - 0.5;
  float dist = length(p * vec2(1.5, 1.0));
  float wing = smoothstep(0.5, 0.3, dist);

  // Wing pattern: subtle gradient + edge darkening
  float pattern = smoothstep(0.0, 0.5, length(p));
  vec3 color = mix(vColor * 1.2, vColor * 0.6, pattern);

  // Soft body line down the center
  float body = smoothstep(0.05, 0.0, abs(vUv.x - 0.5)) * smoothstep(0.5, 0.2, abs(vUv.y - 0.5));
  color = mix(color, vec3(0.1, 0.05, 0.0), body * 0.6);

  if (wing < 0.01) discard;
  gl_FragColor = vec4(color, wing);
}
