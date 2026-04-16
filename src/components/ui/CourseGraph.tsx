import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { getAllCourses, type CourseData } from '../../data/courses'
import styles from './CourseGraph.module.css'

function makeSprite(text: string, sub: string, color: string): THREE.Sprite {
  const canvas = document.createElement('canvas')
  canvas.width = 280
  canvas.height = 72
  const ctx = canvas.getContext('2d')!

  ctx.fillStyle = 'rgba(13,27,42,0.9)'
  ctx.beginPath()
  if (ctx.roundRect) {
    ctx.roundRect(3, 3, 274, 66, 10)
  } else {
    ctx.rect(3, 3, 274, 66)
  }
  ctx.fill()
  ctx.strokeStyle = color
  ctx.lineWidth = 1.5
  ctx.stroke()

  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 20px sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'alphabetic'
  ctx.fillText(text.length > 14 ? text.slice(0, 13) + '…' : text, 140, 38)

  ctx.fillStyle = color
  ctx.font = '13px sans-serif'
  ctx.fillText(sub, 140, 56)

  const tex = new THREE.CanvasTexture(canvas)
  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false })
  const sprite = new THREE.Sprite(mat)
  sprite.scale.set(3.2, 0.82, 1)
  return sprite
}

export default function CourseGraph({ course }: { course: CourseData }) {
  const mountRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const mount = mountRef.current!
    const tooltipDiv = tooltipRef.current
    if (!mountRef.current || !tooltipDiv) return

    const allCourses = getAllCourses()

    // ── Scene ────────────────────────────────────────────────────────────────
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#0d1b2a')
    scene.fog = new THREE.FogExp2('#0d1b2a', 0.028)

    // ── Camera ───────────────────────────────────────────────────────────────
    const width = mount.clientWidth
    const height = mount.clientHeight
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 200)
    camera.position.set(0, 3, 14)

    // ── Renderer ─────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(width, height)
    mount.appendChild(renderer.domElement)

    // ── Lights ───────────────────────────────────────────────────────────────
    const ambient = new THREE.AmbientLight(0xffffff, 0.35)
    scene.add(ambient)

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6)
    dirLight.position.set(5, 10, 5)
    scene.add(dirLight)

    const pointLight = new THREE.PointLight(0x087283, 2.5, 10)
    pointLight.position.set(0, 0, 0)
    scene.add(pointLight)

    // ── Grid ─────────────────────────────────────────────────────────────────
    const grid = new THREE.GridHelper(40, 40, '#0e2233', '#0e2233')
    grid.position.y = -4
    scene.add(grid)

    // ── Stars ────────────────────────────────────────────────────────────────
    const starPositions: number[] = []
    for (let i = 0; i < 400; i++) {
      starPositions.push(
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 80
      )
    }
    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3))
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.08, transparent: true, opacity: 0.55 })
    scene.add(new THREE.Points(starGeo, starMat))

    // ── Classify courses ──────────────────────────────────────────────────────
    const prereqSlugs = new Set(course.prerequisites.map(p => p.slug))
    const nextSlugs = new Set(course.nextSteps.map(n => n.slug))

    const otherCourses = allCourses.filter(
      c => c.slug !== course.slug && !prereqSlugs.has(c.slug) && !nextSlugs.has(c.slug)
    )

    // ── Node mesh storage ────────────────────────────────────────────────────
    interface NodeMeta {
      mesh: THREE.Mesh
      slug: string
      name: string
      icon: string
      price: string
      baseY: number
      floatIndex: number
      isOther: boolean
      baseMaterial: THREE.MeshPhongMaterial
    }
    const nodes: NodeMeta[] = []
    const allMeshes: THREE.Mesh[] = []

    function addNode(
      pos: THREE.Vector3,
      radius: number,
      color: string,
      emissive: string,
      emissiveIntensity: number,
      shininess: number,
      slug: string,
      name: string,
      icon: string,
      price: string,
      isOther: boolean,
      floatIndex: number,
      labelText?: string,
      labelSub?: string,
      labelColor?: string
    ) {
      const geo = new THREE.SphereGeometry(radius, 32, 32)
      const mat = new THREE.MeshPhongMaterial({
        color: new THREE.Color(color),
        emissive: new THREE.Color(emissive),
        emissiveIntensity,
        shininess,
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.copy(pos)
      scene.add(mesh)
      allMeshes.push(mesh)

      nodes.push({
        mesh,
        slug,
        name,
        icon,
        price,
        baseY: pos.y,
        floatIndex,
        isOther,
        baseMaterial: mat,
      })

      if (labelText !== undefined && labelSub !== undefined && labelColor !== undefined) {
        const sprite = makeSprite(labelText, labelSub, labelColor)
        sprite.position.copy(pos).add(new THREE.Vector3(0, radius + 0.9, 0))
        scene.add(sprite)
      }

      return mesh
    }

    // ── Current course node ───────────────────────────────────────────────────
    const currentPos = new THREE.Vector3(0, 0, 0)
    const currentRadius = 0.8
    addNode(
      currentPos,
      currentRadius,
      '#087283', '#087283', 0.4, 90,
      course.slug, course.name, course.icon, course.price,
      false, 0,
      course.shortName, 'DIESER KURS', '#087283'
    )

    // Glow sphere
    const glowGeo = new THREE.SphereGeometry(currentRadius * 1.5, 32, 32)
    const glowMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#087283'),
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide,
    })
    const glowMesh = new THREE.Mesh(glowGeo, glowMat)
    glowMesh.position.copy(currentPos)
    scene.add(glowMesh)

    // Pulsing rings
    const ringGeo = new THREE.RingGeometry(1.05, 1.18, 64)
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#087283'),
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide,
    })
    const ring1 = new THREE.Mesh(ringGeo, ring1Mat)
    ring1.position.copy(currentPos)
    scene.add(ring1)

    const ring2Mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#087283'),
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide,
    })
    const ring2 = new THREE.Mesh(ringGeo.clone(), ring2Mat)
    ring2.position.copy(currentPos)
    ring2.rotation.x = Math.PI / 4
    scene.add(ring2)

    // ── Prerequisite nodes ────────────────────────────────────────────────────
    const prereqTotal = course.prerequisites.length
    const prereqMeshes: THREE.Mesh[] = []

    course.prerequisites.forEach((p, idx) => {
      const y = prereqTotal === 1 ? 0 : (idx - (prereqTotal - 1) / 2) * 2.0
      const pos = new THREE.Vector3(-4.5, y, 0)
      const pCourse = allCourses.find(c => c.slug === p.slug)
      const price = pCourse?.price ?? ''
      const mesh = addNode(
        pos, 0.45,
        '#e65100', '#e65100', 0.25, 70,
        p.slug, p.name, p.icon, price,
        false, idx,
        p.name, price, '#e65100'
      )
      prereqMeshes.push(mesh)
    })

    // ── Next step nodes ───────────────────────────────────────────────────────
    const nextTotal = course.nextSteps.length
    const nextMeshes: THREE.Mesh[] = []

    course.nextSteps.forEach((n, idx) => {
      const y = nextTotal === 1 ? 0 : (idx - (nextTotal - 1) / 2) * 2.0
      const pos = new THREE.Vector3(4.5, y, 0)
      const nCourse = allCourses.find(c => c.slug === n.slug)
      const price = nCourse?.price ?? ''
      const mesh = addNode(
        pos, 0.45,
        '#2e7d32', '#2e7d32', 0.25, 70,
        n.slug, n.name, n.icon, price,
        false, idx,
        n.name, price, '#2e7d32'
      )
      nextMeshes.push(mesh)
    })

    // ── Other course nodes ────────────────────────────────────────────────────
    otherCourses.forEach((c, i) => {
      const angle = (i / otherCourses.length) * Math.PI * 2
      const pos = new THREE.Vector3(
        Math.cos(angle) * 9,
        Math.sin(angle * 0.7) * 2.5,
        Math.sin(angle) * 5
      )
      addNode(
        pos, 0.32,
        '#1e3a5f', '#0a1f35', 0.1, 40,
        c.slug, c.name, c.icon, c.price,
        true, i
      )
    })

    // ── Connections ───────────────────────────────────────────────────────────
    function makeConnection(from: THREE.Vector3, to: THREE.Vector3, color: string) {
      const mid = from.clone().add(to).multiplyScalar(0.5)
      mid.y += 0.8
      const curve = new THREE.QuadraticBezierCurve3(from, mid, to)
      const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.025, 8, false)
      const tubeMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(color),
        transparent: true,
        opacity: 0.65,
      })
      const tube = new THREE.Mesh(tubeGeo, tubeMat)
      scene.add(tube)
    }

    prereqMeshes.forEach(mesh => {
      makeConnection(mesh.position.clone(), currentPos.clone(), '#e65100')
    })

    nextMeshes.forEach(mesh => {
      makeConnection(currentPos.clone(), mesh.position.clone(), '#2e7d32')
    })

    // ── OrbitControls ─────────────────────────────────────────────────────────
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.08
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.4
    controls.maxDistance = 24
    controls.minDistance = 4
    controls.enablePan = false

    // ── Raycasting ────────────────────────────────────────────────────────────
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()
    let hoveredNode: NodeMeta | null = null

    function showTooltip(node: NodeMeta, x: number, y: number) {
      if (!tooltipDiv) return
      tooltipDiv.style.display = 'block'
      tooltipDiv.style.left = x + 'px'
      tooltipDiv.style.top = y + 'px'
      tooltipDiv.innerHTML = `
        <div style="font-size:22px;margin-bottom:4px">${node.icon}</div>
        <div style="color:#fff;font-size:13px;font-weight:600;margin-bottom:2px">${node.name}</div>
        <div style="color:#087283;font-size:12px">${node.price}</div>
        ${node.slug !== course.slug ? '<div style="color:rgba(255,255,255,0.4);font-size:11px;margin-top:6px">Klicken zum Öffnen →</div>' : ''}
      `
    }

    function hideTooltip() {
      if (!tooltipDiv) return
      tooltipDiv.style.display = 'none'
    }

    function onMouseMove(e: MouseEvent) {
      const rect = mount.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const hits = raycaster.intersectObjects(allMeshes)

      if (hits.length > 0) {
        const hitMesh = hits[0].object as THREE.Mesh
        const node = nodes.find(n => n.mesh === hitMesh)
        if (node) {
          if (hoveredNode && hoveredNode !== node) {
            hoveredNode.baseMaterial.emissiveIntensity = hoveredNode.isOther ? 0.1 : 0.25
            if (hoveredNode.slug === course.slug) hoveredNode.baseMaterial.emissiveIntensity = 0.4
          }
          hoveredNode = node
          node.baseMaterial.emissiveIntensity = 0.7
          mount.style.cursor = 'pointer'
          showTooltip(node, e.clientX - rect.left, e.clientY - rect.top)
          return
        }
      }

      if (hoveredNode) {
        hoveredNode.baseMaterial.emissiveIntensity = hoveredNode.isOther ? 0.1 : 0.25
        if (hoveredNode.slug === course.slug) hoveredNode.baseMaterial.emissiveIntensity = 0.4
        hoveredNode = null
      }
      mount.style.cursor = 'grab'
      hideTooltip()
    }

    function onClick(e: MouseEvent) {
      const rect = mount.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const hits = raycaster.intersectObjects(allMeshes)

      if (hits.length > 0) {
        const hitMesh = hits[0].object as THREE.Mesh
        const node = nodes.find(n => n.mesh === hitMesh)
        if (node && node.slug !== course.slug) {
          navigate('/kurs/' + node.slug)
        }
      }
    }

    mount.addEventListener('mousemove', onMouseMove)
    mount.addEventListener('click', onClick)

    // ── Resize ────────────────────────────────────────────────────────────────
    function onResize() {
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    // ── Animation ─────────────────────────────────────────────────────────────
    const clock = new THREE.Clock()
    let animId: number

    const currentNode = nodes[0]

    function animate() {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      // Pulse current node scale
      if (currentNode) {
        const s = 1 + Math.sin(t * 1.8) * 0.05
        currentNode.mesh.scale.setScalar(s)
      }

      // Pulse point light
      pointLight.intensity = 2.5 + Math.sin(t * 2.2) * 0.7

      // Pulse rings
      ring1.rotation.z = t * 0.4
      ring2.rotation.z = -t * 0.3
      ring1Mat.opacity = 0.25 + Math.sin(t * 2) * 0.1
      ring2Mat.opacity = 0.25 + Math.sin(t * 2 + 1) * 0.1

      // Float other nodes
      nodes.forEach(node => {
        if (node.isOther) {
          node.mesh.position.y = node.baseY + Math.sin(t * 0.5 + node.floatIndex * 0.8) * 0.18
        }
      })

      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    // ── Cleanup ───────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId)
      mount.removeEventListener('mousemove', onMouseMove)
      mount.removeEventListener('click', onClick)
      window.removeEventListener('resize', onResize)
      controls.dispose()
      renderer.dispose()
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [course.slug]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <p className="section-eyebrow" style={{ color: '#087283' }}>Kurs-Ökosystem</p>
        <h3 className={styles.title}>Dein Ausbildungsweg in 3D</h3>
        <p className={styles.hint}>Drehen · Zoomen · Kurs anklicken</p>
      </div>
      <div className={styles.canvasWrap}>
        <div ref={mountRef} className={styles.canvas} />
        <div ref={tooltipRef} className={styles.tooltip} style={{ display: 'none' }} />
      </div>
      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={styles.dot} style={{ background: '#087283' }} />
          Dieser Kurs
        </span>
        {course.prerequisites.length > 0 && (
          <span className={styles.legendItem}>
            <span className={styles.dot} style={{ background: '#e65100' }} />
            Voraussetzung
          </span>
        )}
        {course.nextSteps.length > 0 && (
          <span className={styles.legendItem}>
            <span className={styles.dot} style={{ background: '#2e7d32' }} />
            Nächster Schritt
          </span>
        )}
        <span className={styles.legendItem}>
          <span className={styles.dot} style={{ background: '#1e3a5f' }} />
          Weitere Kurse
        </span>
      </div>
    </div>
  )
}
