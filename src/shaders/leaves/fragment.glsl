uniform vec3 uColor;

varying float vAlpha;
varying vec3 vPosition;
varying vec3 vLeafColor;

void main() {
  vec2 uv = gl_PointCoord;

  // Create leaf-like shape (oval/pointed)
  float dist = length(uv - vec2(0.5));
  float leafShape = smoothstep(0.5, 0.2, dist);

  // Add some pointiness to the leaf
  float point = smoothstep(0.3, 0.5, uv.y) * 0.3;
  leafShape -= point;

  // Mix individual leaf color with base color
  vec3 color = mix(uColor, vLeafColor, 0.6);

  // Add subtle autumn colors variation
  vec3 autumnColors = vec3(0.8, 0.4, 0.1) + vLeafColor * 0.3;
  color = mix(color, autumnColors, 0.4);

  gl_FragColor = vec4(color, leafShape * vAlpha * 0.85);
}
