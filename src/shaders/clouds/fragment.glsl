uniform vec3 uColor;
uniform float uOpacity;

varying vec2 vUv;
varying float vAlpha;

void main() {
  // Soft blob: radial gradient
  float dist = length(vUv - 0.5);
  float blob = smoothstep(0.5, 0.0, dist);

  // Slight color variation at edges
  vec3 color = mix(uColor, uColor * 0.85, smoothstep(0.2, 0.5, dist));

  gl_FragColor = vec4(color, blob * uOpacity * vAlpha);
}
