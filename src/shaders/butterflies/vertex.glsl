uniform float uTime;

attribute float aOffset;
attribute float aSpeed;
attribute vec3 aColor;
attribute vec3 aCenter;
attribute float aRadius;

varying vec3 vColor;
varying vec2 vUv;

void main() {
  vUv = uv;
  vColor = aColor;

  // Wing flutter: scale x position by sin wave for flapping effect
  float flap = abs(sin(uTime * 8.0 + aOffset * 6.28));
  vec3 pos = position;
  pos.x *= mix(0.2, 1.0, flap);

  // Position the plane around its center
  vec3 center = aCenter;
  float angle = uTime * aSpeed + aOffset * 6.28;
  center.x += sin(angle) * aRadius;
  center.y += cos(angle * 0.7) * aRadius * 0.3;
  center.z += sin(angle * 0.5 + aOffset * 1.3) * aRadius;

  // Face the direction of movement
  float yaw = atan(cos(angle * 0.7), sin(angle));
  float c = cos(yaw);
  float s = sin(yaw);
  vec3 rotated;
  rotated.x = pos.x * c - pos.z * s;
  rotated.z = pos.x * s + pos.z * c;
  rotated.y = pos.y;
  pos = rotated + center;

  // Billboard: rotate to face camera (approximate, only Y axis)
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
}
