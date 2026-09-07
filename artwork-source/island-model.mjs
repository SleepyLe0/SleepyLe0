import * as THREE from "three";
export function createIsland() {
  const scene = new THREE.Group;
  const materials = [];
  const material = (color, roughness = 0.8, metalness = 0) => {
    const m = new THREE.MeshStandardMaterial({ color, roughness, metalness });
    materials.push(m);
    return m;
  };
  const cream = material("#f4e7d1"), stone = material("#c7ba9d"), grass = material("#9dab78");
  const green = material("#748d64"), darkGreen = material("#405d4d"), peach = material("#e99e83");
  const wood = material("#997858"), brown = material("#615347"), ink = material("#283e3b");
  const brass = material("#d0a563", 0.35, 0.5), white = material("#fffae8");
  const world = new THREE.Group;
  scene.add(world);
  function mesh(geometry, mat, x, y, z, parent = world) {
    const object = new THREE.Mesh(geometry, mat);
    object.position.set(x, y, z);
    object.castShadow = true;
    object.receiveShadow = true;
    parent.add(object);
    return object;
  }
  const box = (w, h, d, mat, x, y, z, parent = world) => mesh(new THREE.BoxGeometry(w, h, d), mat, x, y, z, parent);
  const sphere = (r, mat, x, y, z, parent = world) => mesh(new THREE.IcosahedronGeometry(r, 0), mat, x, y, z, parent);
  const cylinder = (top, bottom, h, mat, x, y, z, parent = world, segments = 48) => mesh(new THREE.CylinderGeometry(top, bottom, h, Math.min(segments, 6)), mat, x, y, z, parent);
  cylinder(5.25, 4.9, 0.45, grass, 0, 0, 0, world, 64);
  cylinder(4.9, 3.9, 0.95, stone, 0, -0.65, 0, world, 14);
  cylinder(3.9, 1.7, 1.45, cream, 0, -1.8, 0, world, 10);
  cylinder(1.7, 0.12, 1.25, stone, 0, -3.1, 0, world, 7);
  const fragments = [];
  for (let i = 0;i < 12; i++) {
    const angle = i * 2.4;
    const r = 4.7 + Math.sin(i * 3) * 0.7;
    const rock = mesh(new THREE.IcosahedronGeometry(0.15 + i % 3 * 0.1), i % 2 ? stone : cream, Math.cos(angle) * r, -1.6 - i % 4 * 0.6, Math.sin(angle) * r);
    fragments.push(rock);
  }
  for (let i = 0;i < 10; i++) {
    const step = cylinder(0.34, 0.36, 0.12, cream, -0.4 + Math.sin(i * 0.32) * 1.4, 0.3, -1.9 + i * 0.61, world, 7);
    step.rotation.y = i * 0.8;
  }
  const studio = new THREE.Group;
  studio.position.set(-1.5, 0.25, -0.9);
  studio.rotation.y = -0.1;
  world.add(studio);
  box(3.5, 0.2, 2.8, wood, 0, 0.1, 0, studio);
  box(3.35, 2.75, 0.14, cream, 0, 1.6, -1.25, studio);
  box(0.14, 2.75, 2.6, cream, -1.6, 1.6, 0, studio);
  box(0.15, 2.9, 0.15, wood, 1.58, 1.7, 1.2, studio);
  box(0.15, 2.9, 0.15, wood, -1.58, 1.7, 1.2, studio);
  const roof = box(3.9, 0.2, 3.3, peach, 0, 3.2, 0, studio);
  roof.rotation.z = -0.1;
  for (let i = 0;i < 12; i++)
    box(0.055, 0.04, 3.3, cream, -1.75 + i * 0.32, 3.34 - (-1.75 + i * 0.32) * 0.1, 0, studio);
  box(0.7, 0.85, 0.08, wood, -1, 2, -1.15, studio);
  box(0.58, 0.73, 0.09, peach, -1, 2, -1.09, studio);
  const art = mesh(new THREE.TorusGeometry(0.2, 0.035, 3, 8), cream, -1, 2, -1.02, studio);
  art.rotation.z = 0.5;
  box(2.6, 0.13, 1, wood, 0.1, 1.2, -0.25, studio);
  for (const x of [-1, 1.2])
    for (const z of [-0.65, 0.1])
      box(0.1, 1, 0.1, brown, x, 0.65, z, studio);
  box(1.3, 0.85, 0.12, ink, 0.05, 1.85, -0.45, studio);
  box(0.12, 0.3, 0.12, ink, 0.05, 1.36, -0.45, studio);
  box(0.55, 0.06, 0.32, ink, 0.05, 1.28, -0.4, studio);
  const screenMaterial = new THREE.MeshBasicMaterial({ color: "#203e38" });
  mesh(new THREE.PlaneGeometry(1.19, 0.74), screenMaterial, 0.05, 1.85, -0.378, studio);
  box(0.82, 0.04, 0.28, ink, 0.05, 1.3, -0.02, studio);
  for (let i = 0;i < 7; i++)
    box(0.035, 0.008, 0.21, stone, -0.27 + i * 0.1, 1.325, -0.02, studio);
  cylinder(0.13, 0.1, 0.24, peach, 1, 1.39, -0.2, studio);
  cylinder(0.11, 0.11, 0.01, green, 1, 1.515, -0.2, studio);
  mesh(new THREE.TorusGeometry(0.08, 0.025, 3, 8), peach, 1.14, 1.4, -0.2, studio);
  cylinder(0.44, 0.44, 0.13, peach, 0.1, 0.72, 0.75, studio);
  cylinder(0.06, 0.06, 0.5, ink, 0.1, 0.42, 0.75, studio);
  box(0.85, 0.5, 0.12, peach, 0.1, 1, 1.06, studio);
  box(1.15, 0.08, 0.32, wood, 0.75, 2.6, -1, studio);
  for (let i = 0;i < 5; i++)
    box(0.12, 0.3 + i % 2 * 0.1, 0.23, [peach, green, cream][i % 3], 0.35 + i * 0.15, 2.81, -1, studio);
  cylinder(0.012, 0.012, 0.55, brown, 0.2, 2.85, 0.1, studio);
  cylinder(0.06, 0.32, 0.22, brass, 0.2, 2.48, 0.1, studio);
  const lamp = new THREE.PointLight("#ffc38e", 3, 5);
  lamp.position.set(0.2, 2.3, 0.1);
  studio.add(lamp);
  studio.userData.destination = "work";
  function tree(x, z, size) {
    const group = new THREE.Group;
    group.position.set(x, 0.2, z);
    group.scale.setScalar(size);
    world.add(group);
    cylinder(0.12, 0.2, 1.7, wood, 0, 0.85, 0, group, 8);
    const branch = cylinder(0.06, 0.1, 0.9, wood, 0.2, 1.2, 0, group, 7);
    branch.rotation.z = -0.6;
    sphere(0.82, green, 0, 2, 0, group).scale.set(1, 1.2, 1);
    sphere(0.58, grass, 0.48, 1.75, 0.1, group);
    sphere(0.56, darkGreen, -0.4, 1.6, -0.15, group);
  }
  tree(-3.6, -0.4, 1);
  tree(-2.6, -3, 0.8);
  tree(0.3, -3.65, 1.05);
  tree(3.6, -1.5, 0.7);
  for (let i = 0;i < 12; i++) {
    const angle = i * 4.798;
    const r = 3.1 + i % 4 * 0.4;
    sphere(0.12 + i % 3 * 0.055, i % 4 === 0 ? peach : green, Math.cos(angle) * r, 0.28, Math.sin(angle) * r).scale.y = 0.65;
  }
  const portal = new THREE.Group;
  portal.position.set(2.8, 0.3, -0.4);
  world.add(portal);
  cylinder(0.95, 1.12, 0.25, cream, 0, 0.1, 0, portal);
  cylinder(0.76, 0.9, 0.15, peach, 0, 0.3, 0, portal);
  const portalRing = mesh(new THREE.TorusGeometry(0.93, 0.1, 4, 16), brass, 0, 1.6, 0, portal);
  const portalGlow = new THREE.MeshStandardMaterial({
    color: "#bedac5",
    emissive: "#6cba9a",
    emissiveIntensity: 0.45,
    transparent: true,
    opacity: 0.72,
    side: THREE.DoubleSide
  });
  materials.push(portalGlow);
  mesh(new THREE.CircleGeometry(0.83, 12), portalGlow, 0, 1.6, 0, portal);
  const portalCore = mesh(new THREE.IcosahedronGeometry(0.38, 0), cream, 0, 1.6, 0.1, portal);
  mesh(new THREE.TorusGeometry(0.57, 0.018, 3, 8), white, 0, 1.6, 0.14, portal).rotation.x = 0.6;
  portal.userData.destination = "work";
  const garden = new THREE.Group;
  garden.position.set(-2.6, 0.28, 2.3);
  world.add(garden);
  cylinder(0.9, 0.95, 0.1, cream, 0, 0.02, 0, garden);
  cylinder(0.39, 0.31, 0.55, peach, -0.35, 0.33, -0.1, garden);
  cylinder(0.355, 0.355, 0.02, darkGreen, -0.35, 0.615, -0.1, garden);
  mesh(new THREE.TorusGeometry(0.22, 0.065, 3, 8), peach, 0.03, 0.35, -0.1, garden);
  const cat = new THREE.Group;
  garden.add(cat);
  cat.position.set(0.5, 0.2, 0.2);
  sphere(0.32, cream, 0, 0.16, 0, cat).scale.set(1.25, 0.7, 0.8);
  sphere(0.21, cream, 0.27, 0.24, 0.12, cat);
  for (const x of [0.15, 0.37]) {
    const ear = mesh(new THREE.ConeGeometry(0.1, 0.18, 3), cream, x, 0.44, 0.12, cat);
    ear.rotation.z = x < 0.2 ? -0.15 : 0.15;
    const eye = mesh(new THREE.TorusGeometry(0.035, 0.009, 3, 8, Math.PI), brown, x + 0.015, 0.26, 0.305, cat);
    eye.rotation.z = Math.PI;
  }
  const tail = mesh(new THREE.TorusGeometry(0.26, 0.07, 3, 8, Math.PI * 1.5), cream, -0.25, 0.15, 0.07, cat);
  tail.rotation.x = Math.PI / 2;
  garden.userData.destination = "about";
  const mailbox = new THREE.Group;
  mailbox.position.set(1.8, 0.3, 3.1);
  mailbox.rotation.y = -0.3;
  world.add(mailbox);
  cylinder(0.7, 0.8, 0.16, cream, 0, 0.04, 0, mailbox);
  box(0.16, 1.3, 0.16, wood, 0, 0.75, 0, mailbox);
  box(0.75, 0.55, 0.75, peach, 0, 1.6, 0, mailbox);
  const mailboxRoof = cylinder(0.38, 0.38, 0.76, peach, 0, 1.86, 0, mailbox);
  mailboxRoof.rotation.x = Math.PI / 2;
  box(0.55, 0.05, 0.02, brown, 0, 1.62, 0.39, mailbox);
  box(0.025, 0.6, 0.035, brass, 0.4, 1.95, 0, mailbox);
  box(0.28, 0.17, 0.04, peach, 0.53, 2.2, 0, mailbox);
  mailbox.userData.destination = "contact";
  for (let i = 0;i < 4; i++) {
    box(0.1, 0.75, 0.1, wood, 2.7 + i * 0.43, 0.64, 2.3 - i * 0.22);
  }
  const rail = box(1.65, 0.08, 0.08, wood, 3.34, 0.91, 1.97);
  rail.rotation.y = 0.47;
  world.rotation.x = Math.PI / 2;
  world.updateMatrixWorld(true);
  return world;
}
