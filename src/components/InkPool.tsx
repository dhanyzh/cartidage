import { useEffect, useRef } from 'react';

const VERTEX_SHADER = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const DISPLAY_FRAGMENT = `
precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_state;
uniform vec2 u_texelSize;
uniform float u_ditherScale;
uniform vec3 u_colorDark;
uniform vec3 u_colorMid;
uniform vec3 u_colorLight;

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  return fract((p3.x + p3.y) * p3.z);
}

float dither(vec2 uv, float brightness) {
  float noise = hash(uv * u_texelSize * u_ditherScale);
  return step(0.5, brightness + noise - 0.5);
}

void main() {
  vec4 state = texture2D(u_state, v_uv);
  float dye = state.z;
  float pattern = dither(v_uv, dye);
  vec3 finalColor = mix(u_colorDark, mix(u_colorMid, u_colorLight, pattern), 0.3 + 0.7 * pattern);
  gl_FragColor = vec4(finalColor, 1.0);
}
`;

const FLUID_FRAGMENT = `
precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_state;
uniform vec2 u_texelSize;
uniform float u_viscosity;
uniform float u_damping;
uniform vec2 u_mousePos;
uniform vec2 u_mouseVel;
uniform float u_mouseActive;
uniform float u_mouseRadius;
uniform float u_mouseStrength;

float lineDistance(vec2 p, vec2 a, vec2 b) {
  vec2 ab = b - a;
  float t = clamp(dot(p - a, ab) / dot(ab, ab), 0.0, 1.0);
  return length(p - (a + t * ab));
}

vec3 decodeState(vec4 raw) {
  return vec3((raw.xy - 0.5) * 0.8, (raw.z - 0.5) * 0.8);
}

vec4 encodeState(vec3 state) {
  return vec4(state.x / 0.8 + 0.5, state.y / 0.8 + 0.5, state.z / 0.8 + 0.5, 1.0);
}

void main() {
  vec3 prev = decodeState(texture2D(u_state, v_uv));
  vec2 vel = prev.xy;
  float dye = prev.z;
  vec2 pixel = v_uv / u_texelSize;

  vec2 velL = decodeState(texture2D(u_state, v_uv + vec2(-u_texelSize.x, 0.0))).xy;
  vec2 velR = decodeState(texture2D(u_state, v_uv + vec2(u_texelSize.x, 0.0))).xy;
  vec2 velU = decodeState(texture2D(u_state, v_uv + vec2(0.0, u_texelSize.y))).xy;
  vec2 velD = decodeState(texture2D(u_state, v_uv + vec2(0.0, -u_texelSize.y))).xy;

  float dyeL = decodeState(texture2D(u_state, v_uv + vec2(-u_texelSize.x, 0.0))).z;
  float dyeR = decodeState(texture2D(u_state, v_uv + vec2(u_texelSize.x, 0.0))).z;
  float dyeU = decodeState(texture2D(u_state, v_uv + vec2(0.0, u_texelSize.y))).z;
  float dyeD = decodeState(texture2D(u_state, v_uv + vec2(0.0, -u_texelSize.y))).z;
  vec2 advUV = v_uv - vel * u_texelSize;
  float dyeAdv = decodeState(texture2D(u_state, advUV)).z;

  vec2 newVel = vel * u_damping + (velL + velR + velU + velD - 4.0 * vel) * u_viscosity;
  float newDye = mix(dye, dyeAdv, 0.6) + (dyeL + dyeR + dyeU + dyeD - 4.0 * dye) * 0.15;

  newVel += vec2(0.0008, 0.0003) * sin(pixel.yx * 0.05 + dye * 3.0);

  vec2 influenceVel = vec2(vel.y, -vel.x) * 0.002;
  newVel += influenceVel * (0.5 + 0.5 * sin(dye * 2.0));

  vec2 mousePixel = u_mousePos / u_texelSize;
  vec2 mouseDelta = u_mouseVel / u_texelSize;
  float pointDist = length(pixel - mousePixel);
  float lineDist = lineDistance(pixel, mousePixel, mousePixel - mouseDelta * 5.0);
  float mDist = mix(lineDist, pointDist, 0.3);
  float mFalloff = smoothstep(u_mouseRadius, 0.0, mDist);

  newVel += u_mouseVel * mFalloff * u_mouseStrength * 8.0;
  newDye += mFalloff * u_mouseStrength * 0.3;

  newVel = clamp(newVel, -0.4, 0.4);
  newDye = clamp(newDye * 0.998, -0.4, 0.4);

  gl_FragColor = encodeState(vec3(newVel, newDye));
}
`;

const INITIAL_FRAGMENT = `
precision mediump float;
varying vec2 v_uv;
uniform vec2 u_seed;
uniform float u_patternScale;

vec2 hash22(vec2 p) {
  return fract(vec2(
    sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123,
    sin(dot(p, vec2(269.5, 183.3))) * 43758.5453123
  ));
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash22(i).x, hash22(i + vec2(1.0, 0.0)).x, u.x),
    mix(hash22(i + vec2(0.0, 1.0)).x, hash22(i + vec2(1.0, 1.0)).x, u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = v_uv;
  vec2 centered = uv - 0.5;
  float r = length(centered);
  float angle = atan(centered.y, centered.x);
  float spiral = sin(r * 15.0 - angle * 2.0 + u_seed.x * 100.0);
  float flow = fbm(vec2(r * 6.0, angle * 3.0 + u_seed.y * 50.0)) * 0.5 + 0.5;
  float radialFalloff = smoothstep(0.0, 0.4, r) * smoothstep(0.9, 0.5, r);
  float finalPattern = mix(spiral * 0.5 + 0.5, flow, 0.5) * radialFalloff;
  gl_FragColor = vec4(finalPattern * 0.15 + 0.5, finalPattern * 0.05 + 0.5, finalPattern * 0.1 + 0.5, 1.0);
}
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext, vs: string, fs: string): WebGLProgram | null {
  const vertShader = createShader(gl, gl.VERTEX_SHADER, vs);
  const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fs);
  if (!vertShader || !fragShader) return null;
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertShader);
  gl.attachShader(program, fragShader);
  gl.bindAttribLocation(program, 0, 'a_pos');
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(program));
    return null;
  }
  return program;
}

interface FBO {
  texture: WebGLTexture;
  framebuffer: WebGLFramebuffer;
}

function createFBO(gl: WebGLRenderingContext, w: number, h: number): FBO {
  const texture = gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  const framebuffer = gl.createFramebuffer()!;
  gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

  return { texture, framebuffer };
}

export default function InkPool() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl', {
      alpha: false,
      premultipliedAlpha: false,
      antialias: false,
    });
    if (!gl) return;

    const isMobile = window.innerWidth < 768;
    const SIM_SIZE = isMobile ? 128 : 256;

    // Fullscreen quad
    const quadBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    // Create programs
    const initialProgram = createProgram(gl, VERTEX_SHADER, INITIAL_FRAGMENT);
    const fluidProgram = createProgram(gl, VERTEX_SHADER, FLUID_FRAGMENT);
    const displayProgram = createProgram(gl, VERTEX_SHADER, DISPLAY_FRAGMENT);
    if (!initialProgram || !fluidProgram || !displayProgram) return;

    // Create FBOs
    let fboA = createFBO(gl, SIM_SIZE, SIM_SIZE);
    let fboB = createFBO(gl, SIM_SIZE, SIM_SIZE);

    // Get uniform locations
    const initialLocs = {
      u_seed: gl.getUniformLocation(initialProgram, 'u_seed'),
      u_patternScale: gl.getUniformLocation(initialProgram, 'u_patternScale'),
    };

    const fluidLocs = {
      u_state: gl.getUniformLocation(fluidProgram, 'u_state'),
      u_texelSize: gl.getUniformLocation(fluidProgram, 'u_texelSize'),
      u_viscosity: gl.getUniformLocation(fluidProgram, 'u_viscosity'),
      u_damping: gl.getUniformLocation(fluidProgram, 'u_damping'),
      u_mousePos: gl.getUniformLocation(fluidProgram, 'u_mousePos'),
      u_mouseVel: gl.getUniformLocation(fluidProgram, 'u_mouseVel'),
      u_mouseActive: gl.getUniformLocation(fluidProgram, 'u_mouseActive'),
      u_mouseRadius: gl.getUniformLocation(fluidProgram, 'u_mouseRadius'),
      u_mouseStrength: gl.getUniformLocation(fluidProgram, 'u_mouseStrength'),
    };

    const displayLocs = {
      u_state: gl.getUniformLocation(displayProgram, 'u_state'),
      u_texelSize: gl.getUniformLocation(displayProgram, 'u_texelSize'),
      u_ditherScale: gl.getUniformLocation(displayProgram, 'u_ditherScale'),
      u_colorDark: gl.getUniformLocation(displayProgram, 'u_colorDark'),
      u_colorMid: gl.getUniformLocation(displayProgram, 'u_colorMid'),
      u_colorLight: gl.getUniformLocation(displayProgram, 'u_colorLight'),
    };

    // Initialize state
    gl.useProgram(initialProgram);
    gl.viewport(0, 0, SIM_SIZE, SIM_SIZE);
    gl.bindFramebuffer(gl.FRAMEBUFFER, fboA.framebuffer);
    gl.uniform2f(initialLocs.u_seed, Math.random(), Math.random());
    gl.uniform1f(initialLocs.u_patternScale, 1.0);
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    // Mouse state
    let mousePos = { x: 0.5, y: 0.5 };
    let mouseVel = { x: 0, y: 0 };
    let smoothedVel = { x: 0, y: 0 };
    let mouseActive = 0;
    let prevMouse = { x: 0.5, y: 0.5 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      mouseVel.x = x - prevMouse.x;
      mouseVel.y = y - prevMouse.y;
      prevMouse.x = x;
      prevMouse.y = y;
      mousePos.x = x;
      mousePos.y = y;
      mouseActive = 1;
    };

    const handleMouseLeave = () => {
      mouseActive = 0;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Resize handler
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
    };
    resize();
    window.addEventListener('resize', resize);

    // Render loop
    let animId = 0;
    const render = () => {
      animId = requestAnimationFrame(render);

      // Smooth velocity
      smoothedVel.x = smoothedVel.x * 0.7 + mouseVel.x * 0.3;
      smoothedVel.y = smoothedVel.y * 0.7 + mouseVel.y * 0.3;
      mouseVel.x *= 0.5;
      mouseVel.y *= 0.5;

      // Fluid sim step 1: A -> B
      gl.useProgram(fluidProgram);
      gl.viewport(0, 0, SIM_SIZE, SIM_SIZE);
      gl.bindFramebuffer(gl.FRAMEBUFFER, fboB.framebuffer);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, fboA.texture);
      gl.uniform1i(fluidLocs.u_state, 0);
      gl.uniform2f(fluidLocs.u_texelSize, 1.0 / SIM_SIZE, 1.0 / SIM_SIZE);
      gl.uniform1f(fluidLocs.u_viscosity, 0.42);
      gl.uniform1f(fluidLocs.u_damping, 0.985);
      gl.uniform2f(fluidLocs.u_mousePos, mousePos.x, mousePos.y);
      gl.uniform2f(fluidLocs.u_mouseVel, smoothedVel.x, smoothedVel.y);
      gl.uniform1f(fluidLocs.u_mouseActive, mouseActive);
      gl.uniform1f(fluidLocs.u_mouseRadius, 16.0);
      gl.uniform1f(fluidLocs.u_mouseStrength, 0.3);
      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      // Fluid sim step 2: B -> A
      gl.bindFramebuffer(gl.FRAMEBUFFER, fboA.framebuffer);
      gl.bindTexture(gl.TEXTURE_2D, fboB.texture);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      // Display pass
      gl.useProgram(displayProgram);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.bindTexture(gl.TEXTURE_2D, fboA.texture);
      gl.uniform1i(displayLocs.u_state, 0);
      gl.uniform2f(displayLocs.u_texelSize, 1.0 / SIM_SIZE, 1.0 / SIM_SIZE);
      gl.uniform1f(displayLocs.u_ditherScale, 1.0);
      gl.uniform3f(displayLocs.u_colorDark, 1.0, 1.0, 1.0);
      gl.uniform3f(displayLocs.u_colorMid, 0.94, 0.98, 0.96);
      gl.uniform3f(displayLocs.u_colorLight, 0.90, 0.94, 0.98);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resize);
      gl.deleteProgram(initialProgram);
      gl.deleteProgram(fluidProgram);
      gl.deleteProgram(displayProgram);
      gl.deleteTexture(fboA.texture);
      gl.deleteFramebuffer(fboA.framebuffer);
      gl.deleteTexture(fboB.texture);
      gl.deleteFramebuffer(fboB.framebuffer);
      gl.deleteBuffer(quadBuffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      role="presentation"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
      }}
    />
  );
}
