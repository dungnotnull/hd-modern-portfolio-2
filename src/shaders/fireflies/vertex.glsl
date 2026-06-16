uniform float uTime;

attribute float aSize;
attribute float aPhase;
attribute vec3 aCenter;
attribute float aRadius;

void main() {
  vec3 pos = aCenter;
  float t = uTime + aPhase;
  pos.x += sin(t * 0.8) * aRadius;
  pos.y += cos(t * 1.1 + aPhase) * aRadius * 0.5;
  pos.z += sin(t * 0.6 + aPhase * 1.7) * aRadius;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

  // Pulse glow size
  float pulse = 0.7 + 0.5 * sin(uTime * 3.0 + aPhase);
  gl_PointSize = aSize * pulse * (200.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
