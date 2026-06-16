uniform sampler2D uSnowflakeTexture;
uniform vec3 uColor;

varying float vAlpha;
varying vec3 vPosition;

void main() {
  vec2 uv = gl_PointCoord;

  // Create circular soft snowflake with better edge definition
  float dist = length(uv - vec2(0.5));
  float alpha = smoothstep(0.5, 0.15, dist);

  // Add sparkle variation - more pronounced
  float sparkle = sin(vPosition.x * 8.0) * sin(vPosition.z * 8.0) * 0.3;
  alpha += sparkle * 0.15;

  // Bright, consistent snow color
  vec3 color = uColor + sparkle * 0.3;

  // Stronger alpha for better visibility in all modes
  gl_FragColor = vec4(color, alpha * vAlpha * 0.9);
}
