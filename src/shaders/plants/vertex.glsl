uniform float uTime;

// Stem sway: top vertices sway more than bottom (assumes geometry has Y-up with origin at base)
void main() {
  vec3 pos = position;
  float height = max(0.0, pos.y);
  float sway = sin(uTime * 1.5 + position.x * 2.0 + position.z * 2.0) * 0.05 * height;
  pos.x += sway;
  pos.z += sway * 0.6;

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
}
