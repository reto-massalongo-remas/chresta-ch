import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { getAllCourses, type CourseData } from '../../data/courses'
import styles from './CourseGraph.module.css'

// ─── Color palette ────────────────────────────────────────────────────────────
const C = {
  grass: 0x6ab04c,
  grassDark: 0x5a9040,
  asphalt: 0x3d3d3d,
  asphaltLight: 0x555555,
  sidewalk: 0xbfb29a,
  buildingWarm: 0xf5ede0,
  buildingBlue: 0xe8f0f8,
  buildingGrey: 0xe0e0e0,
  roofRed: 0xc44b2b,
  roofBrown: 0x8b5e3c,
  roofBlue: 0x2c5f8a,
  treeGreen: 0x3a9e2f,
  treeDark: 0x2d7a1f,
  treeTrunk: 0x8b6914,
  carRed: 0xd63031,
  carBlue: 0x0984e3,
  carYellow: 0xf9ca24,
  carWhite: 0xffffff,
  moto: 0x2c2c54,
  ambulance: 0xfafafa,
  ambulanceRed: 0xe74c3c,
  truck: 0x2c3e50,
  truckCargo: 0xecf0f1,
  coneOrange: 0xe67e22,
  lampPost: 0x8a8a8a,
  lampLight: 0xfffff0,
}

// ─── Scene type ───────────────────────────────────────────────────────────────
type SceneType = 'emergency' | 'motorcycle' | 'truck' | 'default'

function getSceneType(course: CourseData): SceneType {
  const s = course.slug
  if (
    s.includes('nothelfer') ||
    s.includes('bls') ||
    s.includes('erste-hilfe') ||
    s.includes('refresher')
  )
    return 'emergency'
  if (
    s.includes('motorrad') ||
    s.includes('kurventraining') ||
    s.includes('schnupperkurs')
  )
    return 'motorcycle'
  if (s.includes('czv') || course.categorySlug === 'chauffeur') return 'truck'
  return 'default'
}

// ─── Material helper ──────────────────────────────────────────────────────────
function flatMat(color: number): THREE.MeshLambertMaterial {
  return new THREE.MeshLambertMaterial({ color, flatShading: true })
}

// ─── Building ─────────────────────────────────────────────────────────────────
interface BuildingOpts {
  w?: number
  h?: number
  d?: number
  bodyColor?: number
  roofColor?: number
  roofStyle?: 'gabled' | 'flat' | 'hip'
  hasCross?: boolean
  slug?: string
  name?: string
  price?: string
}

function makeBuilding(opts: BuildingOpts): { group: THREE.Group; body: THREE.Mesh } {
  const {
    w = 2,
    h = 2.5,
    d = 2,
    bodyColor = C.buildingWarm,
    roofColor = C.roofRed,
    roofStyle = 'gabled',
    hasCross = false,
    slug = '',
    name = '',
    price = '',
  } = opts

  const group = new THREE.Group()

  // Body
  const bodyGeo = new THREE.BoxGeometry(w, h, d)
  const bodyMat = flatMat(bodyColor)
  const body = new THREE.Mesh(bodyGeo, bodyMat)
  body.position.y = h / 2
  body.castShadow = true
  body.userData = { slug, name, price }
  group.add(body)

  // Roof
  if (roofStyle === 'gabled' || roofStyle === 'hip') {
    const roofRadius = Math.sqrt(w * w + d * d) * 0.72
    const roofHeight = w * 0.45
    const roofGeo = new THREE.ConeGeometry(roofRadius, roofHeight, 4)
    const roofMesh = new THREE.Mesh(roofGeo, flatMat(roofColor))
    roofMesh.rotation.y = Math.PI / 4
    roofMesh.position.y = h + roofHeight / 2
    roofMesh.castShadow = true
    group.add(roofMesh)
  } else {
    // flat roof — thin rim
    const rimGeo = new THREE.BoxGeometry(w + 0.1, 0.12, d + 0.1)
    const rim = new THREE.Mesh(rimGeo, flatMat(roofColor))
    rim.position.y = h + 0.06
    group.add(rim)
  }

  // Red cross for hospital/emergency
  if (hasCross) {
    const crossMat = new THREE.MeshLambertMaterial({ color: 0xe74c3c })
    const hBar = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.12, 0.06), crossMat)
    const vBar = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.55, 0.06), crossMat)
    const crossY = h * 0.7
    const frontZ = d / 2 + 0.04
    hBar.position.set(0, crossY, frontZ)
    vBar.position.set(0, crossY, frontZ)
    group.add(hBar, vBar)
  }

  return { group, body }
}

// ─── Tree ─────────────────────────────────────────────────────────────────────
function makeTree(x: number, z: number, scale = 1): THREE.Group {
  const s = scale
  const group = new THREE.Group()
  group.position.set(x, 0, z)

  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06 * s, 0.09 * s, 0.7 * s, 6),
    flatMat(C.treeTrunk),
  )
  trunk.position.y = 0.35 * s

  const leaves1 = new THREE.Mesh(
    new THREE.ConeGeometry(0.52 * s, 1.2 * s, 7),
    flatMat(C.treeGreen),
  )
  leaves1.position.y = 1.0 * s

  const leaves2 = new THREE.Mesh(
    new THREE.ConeGeometry(0.38 * s, 0.9 * s, 7),
    flatMat(C.treeDark),
  )
  leaves2.position.y = 1.5 * s

  group.add(trunk, leaves1, leaves2)
  return group
}

// ─── Car ──────────────────────────────────────────────────────────────────────
function makeCar(color: number): THREE.Group {
  const group = new THREE.Group()

  const body = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.28, 1.4), flatMat(color))
  body.position.y = 0.14
  body.castShadow = true

  const cabinColor = new THREE.Color(color).multiplyScalar(0.82).getHex()
  const cabin = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.24, 0.7), flatMat(cabinColor))
  cabin.position.set(0, 0.42, -0.05)

  const glass = new THREE.Mesh(
    new THREE.BoxGeometry(0.53, 0.22, 0.03),
    new THREE.MeshLambertMaterial({ color: 0xaed6f1, transparent: true, opacity: 0.7 }),
  )
  glass.position.set(0, 0.42, -0.39)

  // 4 wheels
  const wheelGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.1, 8)
  const wheelMat = flatMat(0x222222)
  const wheelPositions: [number, number, number][] = [
    [-0.38, 0.12, -0.45],
    [0.38, 0.12, -0.45],
    [-0.38, 0.12, 0.45],
    [0.38, 0.12, 0.45],
  ]
  wheelPositions.forEach(([wx, wy, wz]) => {
    const w = new THREE.Mesh(wheelGeo, wheelMat)
    w.rotation.z = Math.PI / 2
    w.position.set(wx, wy, wz)
    group.add(w)
  })

  group.add(body, cabin, glass)
  return group
}

// ─── Ambulance ────────────────────────────────────────────────────────────────
function makeAmbulance(): THREE.Group {
  const group = makeCar(C.ambulance)

  const stripe = new THREE.Mesh(
    new THREE.BoxGeometry(0.72, 0.1, 1.42),
    flatMat(C.ambulanceRed),
  )
  stripe.position.y = 0.12

  const crossH = new THREE.Mesh(
    new THREE.BoxGeometry(0.22, 0.06, 0.04),
    flatMat(C.ambulanceRed),
  )
  const crossV = new THREE.Mesh(
    new THREE.BoxGeometry(0.06, 0.22, 0.04),
    flatMat(C.ambulanceRed),
  )
  crossH.position.set(0.36, 0.22, -0.5)
  crossV.position.set(0.36, 0.22, -0.5)

  group.add(stripe, crossH, crossV)
  return group
}

// ─── Motorcycle ───────────────────────────────────────────────────────────────
function makeMotorcycle(color: number): THREE.Group {
  const group = new THREE.Group()

  const tank = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.8), flatMat(color))
  tank.position.y = 0.42

  const seat = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.06, 0.38), flatMat(0x1a1a1a))
  seat.position.set(0, 0.55, 0.1)

  const handlebar = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.05, 0.06), flatMat(0x888888))
  handlebar.position.set(0, 0.62, -0.38)

  const wheelMat = flatMat(0x222222)
  const wheelGeo = new THREE.TorusGeometry(0.2, 0.05, 6, 12)

  const frontWheel = new THREE.Mesh(wheelGeo, wheelMat)
  frontWheel.rotation.y = Math.PI / 2
  frontWheel.position.set(0, 0.2, -0.45)

  const rearWheel = new THREE.Mesh(wheelGeo, wheelMat)
  rearWheel.rotation.y = Math.PI / 2
  rearWheel.position.set(0, 0.2, 0.45)

  group.add(tank, seat, handlebar, frontWheel, rearWheel)
  return group
}

// ─── Truck ────────────────────────────────────────────────────────────────────
function makeTruck(color: number): THREE.Group {
  const group = new THREE.Group()

  const cabin = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.7, 1.0), flatMat(color))
  cabin.position.set(0, 0.35, -1.0)
  cabin.castShadow = true

  const cargo = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.75, 1.9), flatMat(C.truckCargo))
  cargo.position.set(0, 0.375, 0.3)
  cargo.castShadow = true

  const wheelMat = flatMat(0x222222)
  const wheelGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.12, 8)
  const wheelPos: [number, number, number][] = [
    [-0.48, 0.14, -1.2],
    [0.48, 0.14, -1.2],
    [-0.48, 0.14, 0.1],
    [0.48, 0.14, 0.1],
    [-0.48, 0.14, 0.9],
    [0.48, 0.14, 0.9],
  ]
  wheelPos.forEach(([wx, wy, wz]) => {
    const w = new THREE.Mesh(wheelGeo, wheelMat)
    w.rotation.z = Math.PI / 2
    w.position.set(wx, wy, wz)
    group.add(w)
  })

  group.add(cabin, cargo)
  return group
}

// ─── Traffic cone ─────────────────────────────────────────────────────────────
function makeTrafficCone(x: number, z: number): THREE.Mesh {
  const cone = new THREE.Mesh(
    new THREE.ConeGeometry(0.1, 0.32, 6),
    flatMat(C.coneOrange),
  )
  cone.position.set(x, 0.16, z)
  return cone
}

// ─── Street light ─────────────────────────────────────────────────────────────
function makeStreetLight(x: number, z: number): THREE.Group {
  const group = new THREE.Group()

  const pole = new THREE.Mesh(
    new THREE.CylinderGeometry(0.04, 0.05, 2.8, 6),
    flatMat(C.lampPost),
  )
  pole.position.set(x, 1.4, z)

  const arm = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.06, 0.06), flatMat(C.lampPost))
  arm.position.set(x + 0.2, 2.72, z)

  const bulb = new THREE.Mesh(
    new THREE.SphereGeometry(0.09, 6, 4),
    new THREE.MeshLambertMaterial({ color: C.lampLight, emissive: C.lampLight, emissiveIntensity: 0.6 }),
  )
  bulb.position.set(x + 0.4, 2.72, z)

  group.add(pole, arm, bulb)
  return group
}

// ─── Road dashed line ─────────────────────────────────────────────────────────
function makeRoadLine(x: number, z: number, horizontal: boolean): THREE.Mesh {
  const w = horizontal ? 1.0 : 0.1
  const d = horizontal ? 0.1 : 1.0
  const line = new THREE.Mesh(
    new THREE.BoxGeometry(w, 0.02, d),
    new THREE.MeshLambertMaterial({ color: 0xffffff }),
  )
  line.position.set(x, 0.02, z)
  return line
}

// ─── Sprite label ─────────────────────────────────────────────────────────────
function makeLabel(name: string, price: string, color: string): THREE.Sprite {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 64
  const ctx = canvas.getContext('2d')!

  ctx.fillStyle = 'rgba(255,255,255,0.93)'
  if (ctx.roundRect) {
    ctx.roundRect(2, 2, 252, 60, 8)
  } else {
    ctx.rect(2, 2, 252, 60)
  }
  ctx.fill()
  ctx.strokeStyle = color
  ctx.lineWidth = 2
  ctx.stroke()

  ctx.fillStyle = '#1D1D1B'
  ctx.font = 'bold 18px sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'alphabetic'
  ctx.fillText(name.length > 16 ? name.slice(0, 15) + '…' : name, 128, 34)

  ctx.fillStyle = color
  ctx.font = '13px sans-serif'
  ctx.fillText(price, 128, 52)

  const tex = new THREE.CanvasTexture(canvas)
  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false }),
  )
  sprite.scale.set(3.0, 0.75, 1)
  return sprite
}

// ─── Vehicle animation state ──────────────────────────────────────────────────
interface AnimVehicle {
  group: THREE.Group
  waypoints: THREE.Vector3[]
  segment: number
  progress: number
  speed: number
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function CourseGraph({ course }: { course: CourseData }) {
  const mountRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const mount = mountRef.current!
    const tooltipDiv = tooltipRef.current
    if (!mountRef.current || !tooltipDiv) return

    const allCourses = getAllCourses()
    const sceneType = getSceneType(course)

    // ── Scene ─────────────────────────────────────────────────────────────────
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#d4eaf7')

    // ── Camera ────────────────────────────────────────────────────────────────
    const width = mount.clientWidth
    const height = mount.clientHeight
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 200)
    camera.position.set(0, 14, 13)
    camera.lookAt(0, 0, 0)

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    mount.appendChild(renderer.domElement)

    // ── Lights ────────────────────────────────────────────────────────────────
    scene.add(new THREE.HemisphereLight(0x87ceeb, 0x6ab04c, 0.7))

    const sun = new THREE.DirectionalLight(0xfff5e0, 1.1)
    sun.position.set(10, 20, 5)
    sun.castShadow = true
    sun.shadow.mapSize.width = 1024
    sun.shadow.mapSize.height = 1024
    scene.add(sun)

    const fill = new THREE.DirectionalLight(0xd0e8ff, 0.3)
    fill.position.set(-8, 5, -5)
    scene.add(fill)

    // ── Ground ────────────────────────────────────────────────────────────────
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(40, 40),
      flatMat(C.grass),
    )
    ground.rotation.x = -Math.PI / 2
    ground.position.y = -0.01
    ground.receiveShadow = true
    scene.add(ground)

    // ── Road network ──────────────────────────────────────────────────────────
    // Main horizontal road
    const mainRoad = new THREE.Mesh(
      new THREE.BoxGeometry(40, 0.02, 4),
      flatMat(C.asphalt),
    )
    mainRoad.position.set(0, 0.01, 0)
    mainRoad.receiveShadow = true
    scene.add(mainRoad)

    // Cross vertical road
    const crossRoad = new THREE.Mesh(
      new THREE.BoxGeometry(4, 0.02, 40),
      flatMat(C.asphalt),
    )
    crossRoad.position.set(0, 0.01, 0)
    crossRoad.receiveShadow = true
    scene.add(crossRoad)

    // Sidewalks alongside main road
    const swMat = flatMat(C.sidewalk)
    const sw1 = new THREE.Mesh(new THREE.BoxGeometry(40, 0.015, 0.8), swMat)
    sw1.position.set(0, 0.008, -2.4)
    scene.add(sw1)
    const sw2 = new THREE.Mesh(new THREE.BoxGeometry(40, 0.015, 0.8), swMat)
    sw2.position.set(0, 0.008, 2.4)
    scene.add(sw2)

    // Road dashed center lines (horizontal road)
    for (let x = -18; x <= 18; x += 2.5) {
      scene.add(makeRoadLine(x, 0, true))
    }
    // Vertical road center lines
    for (let z = -18; z <= 18; z += 2.5) {
      scene.add(makeRoadLine(0, z, false))
    }

    // ── Street lights ─────────────────────────────────────────────────────────
    for (let x = -16; x <= 16; x += 4) {
      scene.add(makeStreetLight(x, -2.9))
      scene.add(makeStreetLight(x, 2.9))
    }

    // ── Trees scattered on grass ──────────────────────────────────────────────
    const treePosArr: [number, number, number][] = [
      [-16, 0, -6], [-13, 0, -7], [-10, 0, -5], [-7, 0, -8],
      [-16, 0, 6],  [-13, 0, 7],  [-10, 0, 5],  [-7, 0, 9],
      [8, 0, -6],   [11, 0, -8],  [14, 0, -5],  [16, 0, -7],
      [8, 0, 7],    [11, 0, 6],   [14, 0, 9],   [16, 0, 7],
    ]
    treePosArr.forEach(([tx, , tz]) => scene.add(makeTree(tx, tz, 0.8 + Math.random() * 0.4)))

    // ── Classify related courses ──────────────────────────────────────────────
    const prereqCourses = allCourses.filter(c =>
      course.prerequisites.some(p => p.slug === c.slug),
    )
    const nextCourses = allCourses.filter(c =>
      course.nextSteps.some(n => n.slug === c.slug),
    )
    const otherCourses = allCourses.filter(
      c =>
        c.slug !== course.slug &&
        !course.prerequisites.some(p => p.slug === c.slug) &&
        !course.nextSteps.some(n => n.slug === c.slug),
    )

    // ── clickable body meshes for raycasting ──────────────────────────────────
    const clickableMeshes: THREE.Mesh[] = []

    // ── Label sprite tracking (for bob animation) ─────────────────────────────
    interface LabelInfo {
      sprite: THREE.Sprite
      baseY: number
      index: number
    }
    const labelSprites: LabelInfo[] = []

    // ── Helper: place a building at a position ────────────────────────────────
    function placeBuilding(
      opts: BuildingOpts,
      x: number,
      z: number,
      labelColor: string,
      labelIndex: number,
    ): THREE.Group {
      const { group, body } = makeBuilding(opts)
      group.position.set(x, 0, z)
      scene.add(group)
      clickableMeshes.push(body)

      if (opts.name && opts.slug) {
        const h = opts.h ?? 2.5
        const baseY = h + 1.2
        const label = makeLabel(opts.name, opts.price ?? '', labelColor)
        label.position.set(x, baseY, z)
        scene.add(label)
        labelSprites.push({ sprite: label, baseY, index: labelIndex })
      }

      return group
    }

    // ── Current course building ───────────────────────────────────────────────
    let curBodyColor = C.buildingWarm
    let curRoofColor = C.roofRed
    let curRoofStyle: 'gabled' | 'flat' | 'hip' = 'gabled'
    let curHasCross = false
    const curW = 3, curH = 3.5, curD = 3

    if (sceneType === 'emergency') {
      curBodyColor = 0xfafafa
      curRoofColor = 0xcccccc
      curRoofStyle = 'flat'
      curHasCross = true
    } else if (sceneType === 'motorcycle') {
      curBodyColor = 0x4a4a4a
      curRoofColor = 0x333333
      curRoofStyle = 'flat'
    } else if (sceneType === 'truck') {
      curBodyColor = C.buildingGrey
      curRoofColor = 0xbbbbbb
      curRoofStyle = 'flat'
    }

    placeBuilding(
      {
        w: curW, h: curH, d: curD,
        bodyColor: curBodyColor,
        roofColor: curRoofColor,
        roofStyle: curRoofStyle,
        hasCross: curHasCross,
        slug: course.slug,
        name: course.shortName,
        price: course.price,
      },
      -3, -4,
      '#087283',
      0,
    )

    // Ground ring / halo around current building
    const ringGeo = new THREE.RingGeometry(1.8, 2.0, 32)
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x087283,
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide,
    })
    const groundRing = new THREE.Mesh(ringGeo, ringMat)
    groundRing.rotation.x = -Math.PI / 2
    groundRing.position.set(-3, 0.03, -4)
    scene.add(groundRing)

    // Arrow on road pointing toward current building from prereq side
    if (prereqCourses.length > 0) {
      const arrow = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 0.02, 0.18),
        new THREE.MeshLambertMaterial({ color: 0xe65100 }),
      )
      arrow.position.set(-6, 0.03, -4)
      scene.add(arrow)
      // Arrowhead triangle approximated with a small cone
      const tip = new THREE.Mesh(
        new THREE.ConeGeometry(0.14, 0.32, 4),
        new THREE.MeshLambertMaterial({ color: 0xe65100 }),
      )
      tip.rotation.z = -Math.PI / 2
      tip.position.set(-5.3, 0.03, -4)
      scene.add(tip)
    }

    // ── Prerequisite buildings ────────────────────────────────────────────────
    prereqCourses.forEach((pc, idx) => {
      const x = -8 - idx * 4
      placeBuilding(
        {
          w: 2, h: 2.5, d: 2,
          bodyColor: 0xfde8d8,
          roofColor: 0xc0603a,
          roofStyle: 'gabled',
          slug: pc.slug,
          name: pc.shortName,
          price: pc.price,
        },
        x, -4,
        '#e65100',
        idx + 1,
      )
    })

    // ── Next step buildings ───────────────────────────────────────────────────
    nextCourses.forEach((nc, idx) => {
      const x = 3 + idx * 4
      placeBuilding(
        {
          w: 2, h: 2.5, d: 2,
          bodyColor: 0xdff0e0,
          roofColor: 0x2e7d32,
          roofStyle: 'gabled',
          slug: nc.slug,
          name: nc.shortName,
          price: nc.price,
        },
        x, -4,
        '#2e7d32',
        idx + prereqCourses.length + 1,
      )
    })

    // ── Other course buildings (small, scattered) ──────────────────────────────
    const otherPositions: [number, number][] = [
      [-14, 5], [-10, 7], [-6, 6], [-2, 7], [3, 6], [7, 7], [11, 5], [15, 6],
      [-12, -9], [-8, -8], [-4, -9], [2, -8], [6, -9], [10, -8],
    ]
    otherCourses.slice(0, otherPositions.length).forEach((oc, idx) => {
      const [ox, oz] = otherPositions[idx]
      const { group, body } = makeBuilding({
        w: 1.5, h: 2, d: 1.5,
        bodyColor: 0xd8e4ec,
        roofColor: 0x5a7a8a,
        roofStyle: 'gabled',
        slug: oc.slug,
        name: oc.shortName,
        price: oc.price,
      })
      group.position.set(ox, 0, oz)
      scene.add(group)
      clickableMeshes.push(body)
    })

    // ── Vehicle animation state ────────────────────────────────────────────────
    const animVehicles: AnimVehicle[] = []

    // ── Scene-specific elements ────────────────────────────────────────────────
    if (sceneType === 'emergency') {
      // Ambulance on road
      const ambulance = makeAmbulance()
      ambulance.position.set(1, 0.05, 1)
      scene.add(ambulance)
      animVehicles.push({
        group: ambulance,
        waypoints: [
          new THREE.Vector3(-14, 0.05, -1),
          new THREE.Vector3(14, 0.05, -1),
          new THREE.Vector3(14, 0.05, 1),
          new THREE.Vector3(-14, 0.05, 1),
        ],
        segment: 0,
        progress: 0,
        speed: 0.35,
      })

      // Manikin approximations (sphere + cylinder)
      const manikinMat = flatMat(0xf39c12)
      for (let i = 0; i < 2; i++) {
        const manikin = new THREE.Group()
        const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.5, 6), manikinMat)
        torso.position.y = 0.25
        const head = new THREE.Mesh(new THREE.SphereGeometry(0.1, 6, 4), manikinMat)
        head.position.y = 0.6
        manikin.add(torso, head)
        manikin.position.set(-1.5 + i * 0.7, 0, -3)
        scene.add(manikin)
      }

      // Emergency cone cluster at intersection
      const coneRing = [
        [0.6, 0.6], [-0.6, 0.6], [0.6, -0.6], [-0.6, -0.6],
      ] as [number, number][]
      coneRing.forEach(([cx, cz]) => scene.add(makeTrafficCone(cx, cz)))

      // Extra trees around hospital
      scene.add(makeTree(-6, -6, 0.9))
      scene.add(makeTree(-1, -7, 1.0))
      scene.add(makeTree(-5, -2, 0.85))

    } else if (sceneType === 'motorcycle') {
      // Oval of cones for training area
      const coneCount = 8
      for (let i = 0; i < coneCount; i++) {
        const angle = (i / coneCount) * Math.PI * 2
        const cx = 5 + Math.cos(angle) * 2.8
        const cz = 4 + Math.sin(angle) * 1.6
        scene.add(makeTrafficCone(cx, cz))
      }

      // Slalom cones along road center
      for (let z = -8; z <= 8; z += 2.2) {
        scene.add(makeTrafficCone(0, z))
      }

      // Parked motorcycle
      const motoParked = makeMotorcycle(C.moto)
      motoParked.position.set(-1, 0.05, -2.5)
      scene.add(motoParked)

      // Animated motorcycle on road
      const motoDriving = makeMotorcycle(0x6c5ce7)
      motoDriving.position.set(-10, 0.05, -1)
      scene.add(motoDriving)
      animVehicles.push({
        group: motoDriving,
        waypoints: [
          new THREE.Vector3(4, 0.05, 3),
          new THREE.Vector3(7, 0.05, 5.5),
          new THREE.Vector3(4, 0.05, 7),
          new THREE.Vector3(3, 0.05, 5),
        ],
        segment: 0,
        progress: 0,
        speed: 0.28,
      })

    } else if (sceneType === 'truck') {
      // Warehouse loading dock
      const dock = new THREE.Mesh(
        new THREE.BoxGeometry(4, 0.2, 2),
        flatMat(0xaaaaaa),
      )
      dock.position.set(-4.5, 0.1, -6.5)
      scene.add(dock)

      // Wide road markings for truck
      for (let x2 = -18; x2 <= 18; x2 += 3) {
        const wm = new THREE.Mesh(
          new THREE.BoxGeometry(1.4, 0.02, 0.15),
          new THREE.MeshLambertMaterial({ color: 0xffff00 }),
        )
        wm.position.set(x2, 0.025, 1.8)
        scene.add(wm)
      }

      // Animated truck
      const truck = makeTruck(C.truck)
      truck.position.set(-12, 0.05, -1)
      scene.add(truck)
      animVehicles.push({
        group: truck,
        waypoints: [
          new THREE.Vector3(-15, 0.05, -1),
          new THREE.Vector3(15, 0.05, -1),
          new THREE.Vector3(15, 0.05, 1),
          new THREE.Vector3(-15, 0.05, 1),
        ],
        segment: 0,
        progress: 0,
        speed: 0.18,
      })

    } else {
      // Default — school building extras
      // Parking area
      const parking = new THREE.Mesh(
        new THREE.BoxGeometry(4.5, 0.015, 3),
        flatMat(0x555555),
      )
      parking.position.set(-3, 0.005, -7.5)
      scene.add(parking)

      // Two cars animated
      const car1 = makeCar(C.carRed)
      car1.position.set(-10, 0.05, -1)
      scene.add(car1)
      animVehicles.push({
        group: car1,
        waypoints: [
          new THREE.Vector3(-15, 0.08, -1),
          new THREE.Vector3(15, 0.08, -1),
          new THREE.Vector3(15, 0.08, 1),
          new THREE.Vector3(-15, 0.08, 1),
        ],
        segment: 0,
        progress: 0.25,
        speed: 0.3,
      })

      const car2 = makeCar(C.carBlue)
      car2.position.set(6, 0.05, 1)
      scene.add(car2)
      animVehicles.push({
        group: car2,
        waypoints: [
          new THREE.Vector3(15, 0.08, 1),
          new THREE.Vector3(-15, 0.08, 1),
          new THREE.Vector3(-15, 0.08, -1),
          new THREE.Vector3(15, 0.08, -1),
        ],
        segment: 0,
        progress: 0.5,
        speed: 0.22,
      })

      // Signpost near school
      const post = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 1.6, 6),
        flatMat(C.lampPost),
      )
      post.position.set(-0.5, 0.8, -2.8)
      const sign = new THREE.Mesh(
        new THREE.BoxGeometry(0.7, 0.3, 0.05),
        flatMat(0x087283),
      )
      sign.position.set(0.15, 1.55, -2.8)
      scene.add(post, sign)
    }

    // ── OrbitControls ─────────────────────────────────────────────────────────
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.08
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.25
    controls.maxPolarAngle = Math.PI / 2.2
    controls.minDistance = 8
    controls.maxDistance = 30
    controls.enablePan = false

    // ── Raycasting ────────────────────────────────────────────────────────────
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()
    let hoveredMesh: THREE.Mesh | null = null

    const ttip = tooltipDiv!
    function showTooltip(mesh: THREE.Mesh, clientX: number, clientY: number) {
      const rect = mount.getBoundingClientRect()
      const { slug, name, price } = mesh.userData as { slug: string; name: string; price: string }
      ttip.style.display = 'block'
      ttip.style.left = clientX - rect.left + 'px'
      ttip.style.top = clientY - rect.top + 'px'
      ttip.innerHTML = `
        <div style="font-size:13px;font-weight:700;color:#1D1D1B;margin-bottom:3px">${name}</div>
        <div style="font-size:12px;color:#087283;font-weight:600">${price}</div>
        ${slug !== course.slug ? '<div style="font-size:11px;color:#6B7280;margin-top:5px">Klicken zum Öffnen →</div>' : '<div style="font-size:11px;color:#087283;margin-top:5px">Dieser Kurs</div>'}
      `
    }

    function hideTooltip() {
      ttip.style.display = 'none'
    }

    function onMouseMove(e: MouseEvent) {
      const rect = mount.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const hits = raycaster.intersectObjects(clickableMeshes)

      if (hits.length > 0) {
        const hit = hits[0].object as THREE.Mesh
        if (hoveredMesh && hoveredMesh !== hit) {
          hoveredMesh.scale.set(1, 1, 1)
        }
        hoveredMesh = hit
        hit.scale.set(1, 1.05, 1)
        mount.style.cursor = 'pointer'
        showTooltip(hit, e.clientX, e.clientY)
      } else {
        if (hoveredMesh) {
          hoveredMesh.scale.set(1, 1, 1)
          hoveredMesh = null
        }
        mount.style.cursor = 'grab'
        hideTooltip()
      }
    }

    function onClick(e: MouseEvent) {
      const rect = mount.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const hits = raycaster.intersectObjects(clickableMeshes)

      if (hits.length > 0) {
        const hit = hits[0].object as THREE.Mesh
        const { slug } = hit.userData as { slug: string }
        if (slug && slug !== course.slug) {
          navigate('/kurs/' + slug)
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

    // ── Animation loop ────────────────────────────────────────────────────────
    const clock = new THREE.Clock()
    let animId: number
    let elapsed = 0

    function animate() {
      animId = requestAnimationFrame(animate)
      const delta = clock.getDelta()
      elapsed += delta
      const t = elapsed

      // Ground ring pulse
      ringMat.opacity = 0.3 + Math.sin(t * 2) * 0.15

      // Sprite label bob
      labelSprites.forEach(({ sprite, baseY, index }) => {
        sprite.position.y = baseY + Math.sin(t * 1.5 + index) * 0.06
      })

      // Vehicle animation
      animVehicles.forEach(v => {
        v.progress += v.speed * delta
        if (v.progress >= 1) {
          v.progress = 0
          v.segment = (v.segment + 1) % v.waypoints.length
        }
        const from = v.waypoints[v.segment]
        const to = v.waypoints[(v.segment + 1) % v.waypoints.length]
        v.group.position.lerpVectors(from, to, v.progress)
        const dir = to.clone().sub(from).normalize()
        if (dir.lengthSq() > 0) {
          v.group.rotation.y = Math.atan2(dir.x, dir.z)
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
      <div className={styles.canvas} ref={mountRef} />

      <div className={styles.overlay}>
        <div className={styles.eyebrow}>Kurs-Ökosystem</div>
        <h3 className={styles.title}>Dein Ausbildungsweg</h3>
        <div className={styles.hint}>Drehen · Zoomen · Gebäude anklicken</div>
      </div>

      <div ref={tooltipRef} className={styles.tooltip} style={{ display: 'none' }} />

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
          <span className={styles.dot} style={{ background: '#94a3b8' }} />
          Weitere Kurse
        </span>
      </div>
    </div>
  )
}
