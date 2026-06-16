uniform float uTime;

attribute float aOffset;
attribute float aSpeed;

varying vec2 vUv;
varying float vAlpha;

void main() {
  vUv = uv;
  vAlpha = 1.0;

  vec3 pos = position;
  // Subtle scale pulse
  float pulse = 1.0 + 0.04 * sin(uTime * 0.6 + aOffset);
  pos *= pulse;

  // Drift along x; wrapping handled CPU-side
  pos.x += mod(uTime * aSpeed + aOffset * 10.0, 50.0) - 25.0;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
}
