uniform float uTime;
uniform float uRainDensity;
uniform vec3 uWindDirection;

attribute float aSpeed;
attribute vec3 aRandomness;

varying float vAlpha;
varying vec3 vPosition;

void main() {
  vec3 pos = position;

  // Falling motion with gravity - faster than snow
  float fallSpeed = aSpeed * 4.0;
  float fallHeight = 30.0;
  pos.y -= mod(uTime * fallSpeed, fallHeight) - (fallHeight / 2.0);

  // Wind effect for rain
  pos.x += sin(uTime * 0.8 + aRandomness.x * 3.0) * uWindDirection.x * 1.5;
  pos.z += cos(uTime * 0.6 + aRandomness.z * 3.0) * uWindDirection.z * 1.5;

  // Slight swaying
  pos.x += sin(uTime * 3.0 + aRandomness.x * 8.0) * 0.05;

  vPosition = pos;
  // Alpha based on height
  vAlpha = smoothstep(-8.0, 20.0, pos.y);

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  // Raindrops are thin and stretched
  gl_PointSize = (200.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
