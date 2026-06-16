uniform float uTime;
uniform float uSnowDensity;
uniform vec3 uWindDirection;

attribute float aSize;
attribute float aSpeed;
attribute vec3 aRandomness;

varying float vAlpha;
varying vec3 vPosition;

void main() {
  vec3 pos = position;

  // Falling motion with gravity - extended range for better coverage
  float fallSpeed = aSpeed * 2.5;
  float fallHeight = 25.0;
  pos.y -= mod(uTime * fallSpeed, fallHeight) - (fallHeight / 2.0);

  // Wind effect - improved for more natural movement
  pos.x += sin(uTime * 0.3 + aRandomness.x * 5.0) * uWindDirection.x * 2.0;
  pos.z += cos(uTime * 0.2 + aRandomness.z * 5.0) * uWindDirection.z * 2.0;

  // Gentle swaying - more noticeable
  pos.x += sin(uTime * 1.5 + aRandomness.x * 10.0) * 0.15;
  pos.z += cos(uTime * 1.2 + aRandomness.z * 10.0) * 0.1;

  vPosition = pos;
  // Improved alpha calculation - more gradual fade
  vAlpha = smoothstep(-5.0, 15.0, pos.y);

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  // Bigger snowflakes
  gl_PointSize = aSize * (400.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
