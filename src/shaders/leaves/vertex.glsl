uniform float uTime;
uniform float uLeafDensity;
uniform vec3 uWindDirection;

attribute float aSize;
attribute float aSpeed;
attribute float aRotationSpeed;
attribute vec3 aRandomness;
attribute vec3 aColor;

varying float vAlpha;
varying vec3 vPosition;
varying vec3 vLeafColor;

void main() {
  vec3 pos = position;

  // Falling motion with gravity - slower and more graceful
  float fallSpeed = aSpeed * 1.5;
  float fallHeight = 25.0;
  pos.y -= mod(uTime * fallSpeed, fallHeight) - (fallHeight / 2.0);

  // Wind effect with more movement for leaves
  float windStrength = 2.5;
  pos.x += sin(uTime * 0.4 + aRandomness.x * 4.0) * uWindDirection.x * windStrength;
  pos.z += cos(uTime * 0.3 + aRandomness.z * 4.0) * uWindDirection.z * windStrength;

  // Spiraling/rotation effect
  float spiral = sin(uTime * 0.8 + aRandomness.x * 6.0) * 0.3;
  pos.x += cos(uTime * 2.0 + aRandomness.x * 10.0) * spiral * 0.2;
  pos.z += sin(uTime * 1.5 + aRandomness.z * 10.0) * spiral * 0.2;

  // Rotation of individual leaves
  float rotation = uTime * aRotationSpeed * 5.0;

  vPosition = pos;
  vLeafColor = aColor;
  // Alpha based on height
  vAlpha = smoothstep(-5.0, 15.0, pos.y);

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  // Leaves are varied sizes
  gl_PointSize = aSize * (350.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
