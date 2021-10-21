export default (uniforms) => ({
  uniforms,
  vertexShader: `
  #ifdef USE_LOGDEPTHBUF
  #define EPSILON 1e-6
  #ifdef USE_LOGDEPTHBUF_EXT
    varying float vFragDepth;
  #endif
    uniform float logDepthBufFC;
  #endif

  varying vec2 vUv;

  void main() {
    vUv = uv;

    gl_Position   = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    #ifdef USE_LOGDEPTHBUF
      gl_Position.z = log2(max( EPSILON, gl_Position.w + 1.0 )) * logDepthBufFC;
    #ifdef USE_LOGDEPTHBUF_EXT
      vFragDepth = 1.0 + gl_Position.w;
    #else
      gl_Position.z = (gl_Position.z - 1.0) * gl_Position.w;
    #endif
    #endif
  }
  `,
  fragmentShader: `
  #ifdef USE_LOGDEPTHBUF
  #ifdef USE_LOGDEPTHBUF_EXT
  #extension GL_EXT_frag_depth : enable
  varying float vFragDepth;
  #endif
    uniform float logDepthBufFC;
  #endif

  varying vec2 vUv;

  uniform vec3 baseColor;
  uniform vec3 stripeColor;

  void main() {
    float stripesY = 3.0 * vUv.y;
    float roundedY = floor(stripesY);
    float stripesX = 9.0 * vUv.x;
    float roundedX = floor(stripesX);

    if (
      mod(roundedY, 2.0) == 1.0 &&
      vUv.y < 0.55 && vUv.y > 0.40 &&
      mod(roundedX, 2.0) == 1.0
    )
    {
      gl_FragColor = vec4(stripeColor, 1.0);
    }
    else
    {
      gl_FragColor = vec4(baseColor, 1.0);
    }

    #if defined(USE_LOGDEPTHBUF) && defined(USE_LOGDEPTHBUF_EXT)
      gl_FragDepthEXT = log2(vFragDepth) * logDepthBufFC * 0.5;
    #endif
  }
  `
});
