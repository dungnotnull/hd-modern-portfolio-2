uniform vec3 uColor;

varying float vAlpha;
varying vec3 vPosition;

void main() {
  vec2 uv = gl_PointCoord;

  // Create elongated raindrop shape
  float distX = length(uv.x - 0.5);
  float alpha = smoothstep(0.3, 0.1, distX) * smoothstep(0.0, 0.2, uv.y) * smoothstep(1.0, 0.8, uv.y);

  // Add slight shimmer
  float shimmer = sin(vPosition.x * 20.0) * 0.1;
  alpha += shimmer * 0.05;

  // Blueish rain color
  vec3 color = uColor + vec3(0.1, 0.2, 0.3) * shimmer;

  gl_FragColor = vec4(color, alpha * vAlpha * 0.7);
}
