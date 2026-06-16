import * as THREE from "three";

import butterfliesVertexShader from "../shaders/butterflies/vertex.glsl";
import butterfliesFragmentShader from "../shaders/butterflies/fragment.glsl";
import cloudsVertexShader from "../shaders/clouds/vertex.glsl";
import cloudsFragmentShader from "../shaders/clouds/fragment.glsl";
import firefliesVertexShader from "../shaders/fireflies/vertex.glsl";
import firefliesFragmentShader from "../shaders/fireflies/fragment.glsl";
import plantsVertexShader from "../shaders/plants/vertex.glsl";
import plantsFragmentShader from "../shaders/plants/fragment.glsl";

const PASTEL_COLORS = [
  new THREE.Color("#f9a8d4"), // pink
  new THREE.Color("#c4b5fd"), // purple
  new THREE.Color("#fde68a"), // yellow
  new THREE.Color("#a7f3d0"), // mint
  new THREE.Color("#bfdbfe"), // sky
];

function createButterflies(scene) {
  const count = 10;
  const geometry = new THREE.PlaneGeometry(0.5, 0.4, 8, 1);

  const offsets = new Float32Array(count);
  const speeds = new Float32Array(count);
  const colors = new Float32Array(count * 3);
  const centers = new Float32Array(count * 3);
  const radii = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    offsets[i] = Math.random();
    speeds[i] = 0.3 + Math.random() * 0.4;
    const color = PASTEL_COLORS[i % PASTEL_COLORS.length];
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
    // Spread butterflies around upper-middle of the room
    centers[i * 3] = (Math.random() - 0.5) * 14;
    centers[i * 3 + 1] = 2 + Math.random() * 4;
    centers[i * 3 + 2] = (Math.random() - 0.5) * 14;
    radii[i] = 1 + Math.random() * 2;
  }

  // InstancedMesh via InstancedBufferGeometry
  const instanced = new THREE.InstancedBufferGeometry();
  instanced.index = geometry.index;
  instanced.attributes.position = geometry.attributes.position;
  instanced.attributes.uv = geometry.attributes.uv;
  instanced.setAttribute("aOffset", new THREE.InstancedBufferAttribute(offsets, 1));
  instanced.setAttribute("aSpeed", new THREE.InstancedBufferAttribute(speeds, 1));
  instanced.setAttribute("aColor", new THREE.InstancedBufferAttribute(colors, 3));
  instanced.setAttribute("aCenter", new THREE.InstancedBufferAttribute(centers, 3));
  instanced.setAttribute("aRadius", new THREE.InstancedBufferAttribute(radii, 1));

  const material = new THREE.ShaderMaterial({
    vertexShader: butterfliesVertexShader,
    fragmentShader: butterfliesFragmentShader,
    uniforms: { uTime: new THREE.Uniform(0) },
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const mesh = new THREE.Mesh(instanced, material);
  mesh.frustumCulled = false;
  scene.add(mesh);

  return { mesh, material };
}

function createClouds(scene) {
  const count = 5;
  const geometry = new THREE.PlaneGeometry(3, 1.5);

  const offsets = new Float32Array(count);
  const speeds = new Float32Array(count);
  const centers = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    offsets[i] = Math.random();
    speeds[i] = 0.1 + Math.random() * 0.15;
    centers[i * 3] = (Math.random() - 0.5) * 20;
    centers[i * 3 + 1] = 8 + Math.random() * 3;
    centers[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
  }

  const instanced = new THREE.InstancedBufferGeometry();
  instanced.index = geometry.index;
  instanced.attributes.position = geometry.attributes.position;
  instanced.attributes.uv = geometry.attributes.uv;
  instanced.setAttribute("aOffset", new THREE.InstancedBufferAttribute(offsets, 1));
  instanced.setAttribute("aSpeed", new THREE.InstancedBufferAttribute(speeds, 1));
  instanced.setAttribute("aCenter", new THREE.InstancedBufferAttribute(centers, 3));

  const material = new THREE.ShaderMaterial({
    vertexShader: cloudsVertexShader,
    fragmentShader: cloudsFragmentShader,
    uniforms: {
      uTime: new THREE.Uniform(0),
      uColor: new THREE.Uniform(new THREE.Color("#ffffff")),
      uOpacity: new THREE.Uniform(0.7),
    },
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const mesh = new THREE.Mesh(instanced, material);
  mesh.frustumCulled = false;
  scene.add(mesh);

  return { mesh, material };
}

function createFireflies(scene) {
  const count = 40;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const phases = new Float32Array(count);
  const centers = new Float32Array(count * 3);
  const radii = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = 0;
    positions[i * 3 + 1] = 0;
    positions[i * 3 + 2] = 0;
    sizes[i] = 2 + Math.random() * 2;
    phases[i] = Math.random() * 6.28;
    centers[i * 3] = (Math.random() - 0.5) * 16;
    centers[i * 3 + 1] = 1 + Math.random() * 5;
    centers[i * 3 + 2] = (Math.random() - 0.5) * 16;
    radii[i] = 0.3 + Math.random() * 0.8;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
  geometry.setAttribute("aCenter", new THREE.BufferAttribute(centers, 3));
  geometry.setAttribute("aRadius", new THREE.BufferAttribute(radii, 1));

  const material = new THREE.ShaderMaterial({
    vertexShader: firefliesVertexShader,
    fragmentShader: firefliesFragmentShader,
    uniforms: {
      uTime: new THREE.Uniform(0),
      uColor: new THREE.Uniform(new THREE.Color("#ffe066")),
      uOpacity: new THREE.Uniform(0.85),
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const points = new THREE.Points(geometry, material);
  points.frustumCulled = false;
  scene.add(points);

  return { points, material };
}

function createPlants(scene) {
  const group = new THREE.Group();

  // Sway material (for foliage) — uniform-driven via uTime
  const swayMaterial = (color) =>
    new THREE.ShaderMaterial({
      vertexShader: plantsVertexShader,
      fragmentShader: plantsFragmentShader,
      uniforms: {
        uTime: new THREE.Uniform(0),
        uColor: new THREE.Uniform(new THREE.Color(color)),
      },
    });

  const stemMaterial = new THREE.MeshStandardMaterial({ color: "#3f6212" });

  // 6 plants scattered near piano area / corners
  const placements = [
    { x: -3, z: -1, flower: "#f472b6" },
    { x: 3.2, z: -1.4, flower: "#a78bfa" },
    { x: -2.5, z: 2.5, flower: "#fde047" },
    { x: 2.6, z: 2.3, flower: "#f9a8d4" },
    { x: 0, z: 3.2, flower: "#c084fc" },
    { x: -3.6, z: 0.5, flower: "#fbbf24" },
  ];

  const swayMaterials = [];

  for (const p of placements) {
    const plant = new THREE.Group();

    const stem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.07, 0.8, 6),
      stemMaterial
    );
    stem.position.y = 0.4;
    plant.add(stem);

    const flowerMat = swayMaterial(p.flower);
    swayMaterials.push(flowerMat);
    const flower = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.18, 0),
      flowerMat
    );
    flower.position.y = 0.95;
    plant.add(flower);

    plant.position.set(p.x, 0, p.z);
    group.add(plant);
  }

  scene.add(group);
  return { group, swayMaterials };
}

export function createCreatures(scene) {
  const butterflies = createButterflies(scene);
  const clouds = createClouds(scene);
  const fireflies = createFireflies(scene);
  const plants = createPlants(scene);

  function update(elapsedTime, nightMode) {
    butterflies.material.uniforms.uTime.value = elapsedTime;
    clouds.material.uniforms.uTime.value = elapsedTime;
    fireflies.material.uniforms.uTime.value = elapsedTime;
    for (const mat of plants.swayMaterials) {
      mat.uniforms.uTime.value = elapsedTime;
    }

    // Fireflies brighter at night, dimmer in day (but still visible)
    fireflies.material.uniforms.uOpacity.value = nightMode ? 0.9 : 0.25;

    // Clouds slightly more visible at day
    clouds.material.uniforms.uOpacity.value = nightMode ? 0.4 : 0.7;
  }

  return { butterflies, clouds, fireflies, plants, update };
}
