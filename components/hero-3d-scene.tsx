"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function Hero3DScene() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 200)
    camera.position.set(0, 0, 7)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    mount.appendChild(renderer.domElement)

    const mainGroup = new THREE.Group()
    scene.add(mainGroup)

    // === CORE: Crystalline geometry ===
    const coreGeo = new THREE.IcosahedronGeometry(1.3, 5)
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#7c3aed"),
      metalness: 0.8,
      roughness: 0.05,
      transmission: 0.3,
      thickness: 1.5,
      emissive: new THREE.Color("#4c1d95"),
      emissiveIntensity: 0.6,
      iridescence: 1,
      iridescenceIOR: 2.0,
      iridescenceThicknessRange: [100, 800],
      envMapIntensity: 1.5,
    })
    const core = new THREE.Mesh(coreGeo, coreMat)
    core.castShadow = true
    mainGroup.add(core)

    // === OUTER WIREFRAME ===
    const wireGeo = new THREE.IcosahedronGeometry(1.6, 2)
    const wireMat = new THREE.MeshBasicMaterial({
      color: "#22d3ee",
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    })
    const wire = new THREE.Mesh(wireGeo, wireMat)
    mainGroup.add(wire)

    // === SECOND WIREFRAME (rotated) ===
    const wire2Geo = new THREE.OctahedronGeometry(1.8, 2)
    const wire2Mat = new THREE.MeshBasicMaterial({
      color: "#f472b6",
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    })
    const wire2 = new THREE.Mesh(wire2Geo, wire2Mat)
    mainGroup.add(wire2)

    // === ORBITING RINGS with glow ===
    const ringData = [
      { radius: 2.1, tube: 0.008, color: "#a78bfa", tilt: Math.PI / 2.2, speed: 0.4 },
      { radius: 2.45, tube: 0.006, color: "#22d3ee", tilt: Math.PI / 3.5, speed: -0.3 },
      { radius: 2.75, tube: 0.005, color: "#f472b6", tilt: Math.PI / 5, speed: 0.25 },
    ]

    const rings = ringData.map((rd) => {
      const geo = new THREE.TorusGeometry(rd.radius, rd.tube, 16, 200)
      const mat = new THREE.MeshBasicMaterial({
        color: rd.color,
        transparent: true,
        opacity: 0.7,
      })
      const ring = new THREE.Mesh(geo, mat)
      ring.rotation.x = rd.tilt
      mainGroup.add(ring)
      return { mesh: ring, speed: rd.speed }
    })

    // === ORBITING SPHERES ===
    const orbitSpheres: THREE.Mesh[] = []
    const orbitData = [
      { r: 2.1, angle: 0, speed: 1.1, size: 0.08, color: "#a78bfa", tiltX: 0.3, tiltZ: 0 },
      { r: 2.5, angle: Math.PI * 0.66, speed: -0.8, size: 0.06, color: "#22d3ee", tiltX: -0.5, tiltZ: 0.4 },
      { r: 2.8, angle: Math.PI * 1.3, speed: 0.6, size: 0.1, color: "#f472b6", tiltX: 0.8, tiltZ: -0.3 },
    ]

    const orbitGroups = orbitData.map((od) => {
      const group = new THREE.Group()
      group.rotation.x = od.tiltX
      group.rotation.z = od.tiltZ
      const sGeo = new THREE.SphereGeometry(od.size, 16, 16)
      const sMat = new THREE.MeshPhysicalMaterial({
        color: od.color,
        emissive: od.color,
        emissiveIntensity: 1.5,
        metalness: 1,
        roughness: 0,
      })
      const sphere = new THREE.Mesh(sGeo, sMat)
      sphere.position.x = od.r
      group.add(sphere)
      orbitSpheres.push(sphere)
      mainGroup.add(group)
      return { group, speed: od.speed, angle: od.angle }
    })

    // === PARTICLES (two layers) ===
    function makeParticles(count: number, minR: number, maxR: number, color: string, size: number) {
      const geo = new THREE.BufferGeometry()
      const pos = new Float32Array(count * 3)
      for (let i = 0; i < count; i++) {
        const r = minR + Math.random() * (maxR - minR)
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(Math.random() * 2 - 1)
        pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
        pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
        pos[i * 3 + 2] = r * Math.cos(phi)
      }
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3))
      return new THREE.Points(
        geo,
        new THREE.PointsMaterial({ color, size, transparent: true, opacity: 0.8, sizeAttenuation: true })
      )
    }

    const particles1 = makeParticles(180, 2.5, 4.5, "#a7f3d0", 0.03)
    const particles2 = makeParticles(100, 3.5, 6.0, "#c4b5fd", 0.02)
    scene.add(particles1)
    scene.add(particles2)

    // === LIGHTNING BOLT connections ===
    const connections: THREE.Line[] = []
    const connMat = new THREE.LineBasicMaterial({ color: "#a78bfa", transparent: true, opacity: 0.3 })
    for (let i = 0; i < 6; i++) {
      const points = []
      const theta1 = Math.random() * Math.PI * 2
      const phi1 = Math.acos(Math.random() * 2 - 1)
      const theta2 = Math.random() * Math.PI * 2
      const phi2 = Math.acos(Math.random() * 2 - 1)
      const r = 1.32
      points.push(new THREE.Vector3(r * Math.sin(phi1) * Math.cos(theta1), r * Math.sin(phi1) * Math.sin(theta1), r * Math.cos(phi1)))
      points.push(new THREE.Vector3(r * Math.sin(phi2) * Math.cos(theta2), r * Math.sin(phi2) * Math.sin(theta2), r * Math.cos(phi2)))
      const lineGeo = new THREE.BufferGeometry().setFromPoints(points)
      const line = new THREE.Line(lineGeo, connMat.clone())
      mainGroup.add(line)
      connections.push(line)
    }

    // === LIGHTS ===
    scene.add(new THREE.AmbientLight("#ffffff", 0.5))

    const keyLight = new THREE.PointLight("#c084fc", 8, 20)
    keyLight.position.set(4, 4, 5)
    scene.add(keyLight)

    const fillLight = new THREE.PointLight("#22d3ee", 5, 15)
    fillLight.position.set(-5, -3, 3)
    scene.add(fillLight)

    const rimLight = new THREE.PointLight("#f472b6", 4, 12)
    rimLight.position.set(0, -5, -4)
    scene.add(rimLight)

    // Pulsing light
    const pulseLight = new THREE.PointLight("#7c3aed", 6, 8)
    pulseLight.position.set(0, 0, 0)
    mainGroup.add(pulseLight)

    // === POINTER ===
    const pointer = new THREE.Vector2(0, 0)
    let targetRotX = 0
    let targetRotY = 0
    let currentRotX = 0
    let currentRotY = 0

    const onPointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect()
      const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      const ny = -((event.clientY - rect.top) / rect.height - 0.5) * 2
      pointer.set(nx, ny)
      targetRotX = ny * 0.3
      targetRotY = nx * 0.5
    }

   const resize = () => {
  const { width, height } = mount.getBoundingClientRect()

  renderer.setSize(width, height, false)

  camera.aspect = width / height

  if (width < 768) {
    camera.position.z = 9
    camera.fov = 50
  } else {
    camera.position.z = 7.5
    camera.fov = 45
  }

  camera.updateProjectionMatrix()
}

    mount.addEventListener("pointermove", onPointerMove)
    window.addEventListener("resize", resize)
    resize()

    let animationId = 0
    const clock = new THREE.Clock()

    const animate = () => {
      const elapsed = clock.getElapsedTime()

      // Smooth pointer tracking
      currentRotX += (targetRotX - currentRotX) * 0.04
      currentRotY += (targetRotY - currentRotY) * 0.04

      mainGroup.rotation.y = elapsed * 0.15 + currentRotY
      mainGroup.rotation.x = Math.sin(elapsed * 0.4) * 0.08 + currentRotX

      core.rotation.y = elapsed * 0.5
      core.rotation.z = elapsed * 0.2

      wire.rotation.x = -elapsed * 0.2
      wire.rotation.y = elapsed * 0.3
      wire.rotation.z = elapsed * 0.1

      wire2.rotation.x = elapsed * 0.15
      wire2.rotation.y = -elapsed * 0.25

      // Orbiting groups
      orbitGroups.forEach((od) => {
        od.group.rotation.y = elapsed * od.speed
      })

      // Pulsing core scale
      const pulse = 1 + Math.sin(elapsed * 2.5) * 0.04
      core.scale.setScalar(pulse)

      // Pulsing light
      pulseLight.intensity = 4 + Math.sin(elapsed * 3) * 3

      // Rings
      rings.forEach((rd, i) => {
        rd.mesh.rotation.z = elapsed * rd.speed
        rd.mesh.rotation.y = elapsed * rd.speed * 0.3
      })

      // Connection opacity pulsing
      connections.forEach((line, i) => {
        ;(line.material as THREE.LineBasicMaterial).opacity = 0.1 + Math.abs(Math.sin(elapsed * 0.8 + i * 1.2)) * 0.4
      })

      particles1.rotation.y = elapsed * 0.04
      particles1.rotation.x = Math.sin(elapsed * 0.2) * 0.06
      particles2.rotation.y = -elapsed * 0.03
      particles2.rotation.z = elapsed * 0.02

      renderer.render(scene, camera)
      animationId = window.requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.cancelAnimationFrame(animationId)
      mount.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("resize", resize)
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return (
    <div className="relative h-[320px] w-full overflow-hidden sm:h-[400px] md:h-[560px]">
      {/* Multi-layer glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.25),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(34,211,238,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_70%,rgba(244,114,182,0.15),transparent_50%)]" />

      <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />

      {/* Stat badges */}
      <div className="pointer-events-none absolute inset-x-4 bottom-4 grid grid-cols-3 gap-2 md:inset-x-6 md:bottom-6 md:gap-3">
        {[
          ["13+", "Years"],
          ["35+", "Projects"],
          ["4", "Stacks"],
        ].map(([value, label]) => (
          <div
            key={label}
            className="rounded-xl border border-white/15 bg-black/30 px-2 py-2 text-center backdrop-blur-xl"
            style={{ boxShadow: "0 4px 24px rgba(124,58,237,0.2), inset 0 1px 0 rgba(255,255,255,0.1)" }}
          >
            <div className="text-base font-bold text-white md:text-lg">{value}</div>
            <div className="text-[10px] uppercase tracking-widest text-white/60">{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
