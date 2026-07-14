import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { 
  Compass, 
  ArrowLeft, 
  MapPin, 
  Layers, 
  Cpu, 
  ChevronRight, 
  Globe, 
  ExternalLink, 
  Award, 
  Terminal, 
  Trophy, 
  CheckCircle,
  Volume2,
  VolumeX
} from 'lucide-react';

// Import all leader datasets for data-driven rendering
import googleHubData from '../data/googleHubData.json';
import openaiHubData from '../data/openaiHubData.json';
import anthropicHubData from '../data/anthropicHubData.json';
import metaHubData from '../data/metaHubData.json';
import microsoftHubData from '../data/microsoftHubData.json';
import nvidiaHubData from '../data/nvidiaHubData.json';
import awsHubData from '../data/awsHubData.json';
import appleHubData from '../data/appleHubData.json';
import xaiHubData from '../data/xaiHubData.json';
import mistralHubData from '../data/mistralHubData.json';
import ibmHubData from '../data/ibmHubData.json';
import cohereHubData from '../data/cohereHubData.json';
import huggingfaceHubData from '../data/huggingfaceHubData.json';

interface AICityViewProps {
  onClose: () => void;
}

const hubDataMap: Record<string, any> = {
  google: googleHubData,
  openai: openaiHubData,
  anthropic: anthropicHubData,
  meta: metaHubData,
  microsoft: microsoftHubData,
  nvidia: nvidiaHubData,
  aws: awsHubData,
  apple: appleHubData,
  xai: xaiHubData,
  mistral: mistralHubData,
  ibm: ibmHubData,
  cohere: cohereHubData,
  huggingface: huggingfaceHubData
};

const companyConfig = [
  { id: 'google', name: 'Google / DeepMind', color: '#4285F4', district: 'Cloud Boulevard', x: 25, z: 25, height: 28, style: 'oval', width: 4.5, depth: 4.5 },
  { id: 'openai', name: 'OpenAI', color: '#10a37f', district: 'Cloud Boulevard', x: 38, z: 28, height: 35, style: 'oval', width: 5.0, depth: 5.0 },
  { id: 'anthropic', name: 'Anthropic', color: '#D97706', district: 'Cloud Boulevard', x: 28, z: 42, height: 26, style: 'oval', width: 4.5, depth: 4.5 },
  { id: 'meta', name: 'Meta AI', color: '#0668E1', district: 'Open Models', x: 30, z: -30, height: 24, style: 'twin', width: 4, depth: 4 },
  { id: 'microsoft', name: 'Microsoft AI', color: '#00A4EF', district: 'Cloud Boulevard', x: 42, z: 42, height: 32, style: 'oval', width: 4.8, depth: 4.8 },
  { id: 'aws', name: 'AWS', color: '#FF9900', district: 'Cloud Boulevard', x: 45, z: 15, height: 29, style: 'oval', width: 4.8, depth: 4.8 },
  { id: 'nvidia', name: 'Nvidia AI', color: '#76B900', district: 'Hardware Row', x: -30, z: 30, height: 38, style: 'oval', width: 5.5, depth: 5.5 },
  { id: 'apple', name: 'Apple', color: '#f5f5f7', district: 'Tools & IDEs', x: -25, z: -25, height: 25, style: 'twin', width: 4, depth: 4 },
  { id: 'xai', name: 'xAI / Grok', color: '#ffffff', district: 'Tools & IDEs', x: -38, z: -28, height: 36, style: 'oval', width: 5.0, depth: 5.0 },
  { id: 'mistral', name: 'Mistral AI', color: '#f97316', district: 'Open Models', x: 42, z: -38, height: 22, style: 'oval', width: 4.2, depth: 4.2 },
  { id: 'ibm', name: 'IBM / watsonx', color: '#0f62fe', district: 'Enterprise Alley', x: -40, z: 12, height: 28, style: 'oval', width: 4.8, depth: 4.8 },
  { id: 'cohere', name: 'Cohere', color: '#3b82f6', district: 'Enterprise Alley', x: -45, z: 28, height: 24, style: 'twin', width: 4, depth: 4 },
  { id: 'huggingface', name: 'Hugging Face', color: '#fbbf24', district: 'Open Models', x: 20, z: -42, height: 20, style: 'oval', width: 4.0, depth: 4.0 }
];

// Quests mapping
interface Quest {
  id: string;
  title: string;
  description: string;
  district: string;
  targetCompanyId: string;
  xpReward: number;
}

const QUESTS: Quest[] = [
  {
    id: 'quest-google',
    title: 'Google Platform Run',
    description: 'Drive to the Google building in Cloud Boulevard and enter the terminal to boot Vertex AI.',
    district: 'Cloud Boulevard',
    targetCompanyId: 'google',
    xpReward: 150
  },
  {
    id: 'quest-nvidia',
    title: 'NVIDIA Hardware Check',
    description: 'Locate the Nvidia tower in Hardware Row to scan Blackwell GPU clusters.',
    district: 'Hardware Row',
    targetCompanyId: 'nvidia',
    xpReward: 200
  },
  {
    id: 'quest-openai',
    title: 'OpenAI Developer Docs',
    description: 'Find the OpenAI monolith on Cloud Boulevard and scan their API Reference library.',
    district: 'Cloud Boulevard',
    targetCompanyId: 'openai',
    xpReward: 150
  },
  {
    id: 'quest-meta',
    title: 'Meta Open-Source Stack',
    description: 'Reach the Meta headquarters in Open Models Quarter and download Llama weights.',
    district: 'Open Models',
    targetCompanyId: 'meta',
    xpReward: 180
  },
  {
    id: 'quest-huggingface',
    title: 'Hugging Face Hub Access',
    description: 'Navigate to the Hugging Face base in Open Models Quarter to sync model spaces.',
    district: 'Open Models',
    targetCompanyId: 'huggingface',
    xpReward: 150
  }
];

interface ProjectedLabel {
  id: string;
  name: string;
  x: number;
  y: number;
  visible: boolean;
  color: string;
  dist: number;
}

export const AICityView: React.FC<AICityViewProps> = ({ onClose }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  
  // Game states
  const [showIntro, setShowIntro] = useState(true);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([]);
  const [activeQuestIndex, setActiveQuestIndex] = useState(0);
  const [questCompleted, setQuestCompleted] = useState<Record<string, boolean>>({});
  
  // Projected 3D Labels in HTML space
  const [projectedLabels, setProjectedLabels] = useState<ProjectedLabel[]>([]);
  
  // Selected interior building
  const [insideCompanyId, setInsideCompanyId] = useState<string | null>(null);
  const [activeZone, setActiveZone] = useState<'all' | 'platforms' | 'models' | 'docs' | 'learning'>('all');
  
  // Close-range prompt display
  const [nearCompanyId, setNearCompanyId] = useState<string | null>(null);

  // References for game loop
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const playerVehicleRef = useRef<THREE.Group | null>(null);
  
  // High-quality background HTML Audio stream (SoundHelix synth track)
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [musicMuted, setMusicMuted] = useState(true);

  // Body references for rider pedaling
  const leftThighRef = useRef<THREE.Mesh | null>(null);
  const rightThighRef = useRef<THREE.Mesh | null>(null);
  const leftShinRef = useRef<THREE.Mesh | null>(null);
  const rightShinRef = useRef<THREE.Mesh | null>(null);
  const leftFootRef = useRef<THREE.Mesh | null>(null);
  const rightFootRef = useRef<THREE.Mesh | null>(null);
  const frontWheelRef = useRef<THREE.Mesh | null>(null);
  const backWheelRef = useRef<THREE.Mesh | null>(null);
  const bicycleForkRef = useRef<THREE.Mesh | null>(null);
  
  const leftPedalCrankRef = useRef<THREE.Group | null>(null);
  const rightPedalCrankRef = useRef<THREE.Group | null>(null);

  // Vehicle movement parameters
  const keysPressed = useRef<Record<string, boolean>>({});
  const velocity = useRef(0);
  const angle = useRef(0);
  const maxSpeed = 0.8;
  const acceleration = 0.025;
  const deceleration = 0.015;
  const turnSpeed = 0.04;

  // Active quest selector
  const activeQuest = useMemo(() => {
    if (activeQuestIndex >= QUESTS.length) return null;
    return QUESTS[activeQuestIndex];
  }, [activeQuestIndex]);

  // Selected interior data selector
  const insideData = useMemo(() => {
    if (!insideCompanyId) return null;
    return hubDataMap[insideCompanyId] || null;
  }, [insideCompanyId]);

  // Handle XP updates and levels
  const addXp = (amount: number) => {
    setXp(prevXp => {
      const nextXp = prevXp + amount;
      const nextLevel = Math.floor(nextXp / 300) + 1;
      if (nextLevel > level) {
        setLevel(nextLevel);
        const newBadge = nextLevel === 2 ? 'Cloud Explorer' : nextLevel === 3 ? 'Model Architect' : 'Frontier Legend';
        setUnlockedBadges(prev => [...prev, newBadge]);
      }
      return nextXp;
    });
  };

  // Complete current quest
  const completeCurrentQuest = () => {
    if (!activeQuest) return;
    const qId = activeQuest.id;
    if (questCompleted[qId]) return;

    setQuestCompleted(prev => ({ ...prev, [qId]: true }));
    addXp(activeQuest.xpReward);
    setActiveQuestIndex(prev => prev + 1);
  };

  // Setup Keyboard control bindings
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = true;
      
      // Enter building on "E" key
      if (e.key.toLowerCase() === 'e' && nearCompanyId && !insideCompanyId) {
        setInsideCompanyId(nearCompanyId);
        if (activeQuest && activeQuest.targetCompanyId === nearCompanyId) {
          completeCurrentQuest();
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [nearCompanyId, insideCompanyId, activeQuest]);

  const toggleMute = () => {
    if (audioRef.current) {
      if (musicMuted) {
        audioRef.current.play().catch(err => console.warn("Audio autoplay blocked:", err));
        setMusicMuted(false);
      } else {
        audioRef.current.pause();
        setMusicMuted(true);
      }
    }
  };

  // Initialize Three.js Game World
  useEffect(() => {
    if (!mountRef.current) return;

    // --- 1. Scene & Environment ---
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color('#0a1324');
    scene.fog = new THREE.FogExp2('#0a1324', 0.009);

    // Sky Dome Shader
    const skyGeo = new THREE.SphereGeometry(280, 32, 15);
    skyGeo.scale(-1, 1, 1);
    
    const skyMat = new THREE.ShaderMaterial({
      uniforms: {
        topColor: { value: new THREE.Color('#050b18') },
        bottomColor: { value: new THREE.Color('#853b1b') }
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vWorldPosition;
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        void main() {
          float h = normalize(vWorldPosition + vec3(0.0, 30.0, 0.0)).y;
          gl_FragColor = vec4(mix(bottomColor, topColor, max(h, 0.0)), 1.0);
        }
      `
    });
    const sky = new THREE.Mesh(skyGeo, skyMat);
    scene.add(sky);

    // --- 2. Camera ---
    const camera = new THREE.PerspectiveCamera(
      52,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    cameraRef.current = camera;

    // --- 3. Renderer ---
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    // --- 4. Lights ---
    const ambientLight = new THREE.AmbientLight('#a5b4fc', 1.3);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight('#fed7aa', 3.0);
    sunLight.position.set(70, 45, 60);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    scene.add(sunLight);

    const centerSpot = new THREE.PointLight('#bd9a76', 4.5, 35);
    centerSpot.position.set(0, 10, 0);
    scene.add(centerSpot);

    // --- 5. Rich Road Grid & Sidewalks ---
    const groundGeo = new THREE.PlaneGeometry(400, 400);
    const groundMat = new THREE.MeshStandardMaterial({
      color: '#0f172a',
      roughness: 0.95,
      metalness: 0.05
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const roadGroup = new THREE.Group();
    const createRoadSegment = (w: number, l: number, x: number, z: number, rotY: boolean) => {
      const roadGeo = new THREE.PlaneGeometry(w, l);
      const roadMat = new THREE.MeshStandardMaterial({
        color: '#1e293b',
        roughness: 0.78,
        metalness: 0.15
      });
      const roadMesh = new THREE.Mesh(roadGeo, roadMat);
      roadMesh.rotation.x = -Math.PI / 2;
      if (rotY) roadMesh.rotation.z = Math.PI / 2;
      roadMesh.position.set(x, 0.02, z);
      roadMesh.receiveShadow = true;
      roadGroup.add(roadMesh);

      // Sidewalk borders
      const sideW = 0.8;
      const sideGeo = new THREE.BoxGeometry(sideW, 0.15, l);
      const sideMat = new THREE.MeshStandardMaterial({ color: '#64748b', roughness: 0.85 });
      
      const leftSidewalk = new THREE.Mesh(sideGeo, sideMat);
      const rightSidewalk = new THREE.Mesh(sideGeo, sideMat);
      leftSidewalk.castShadow = true;
      leftSidewalk.receiveShadow = true;
      rightSidewalk.castShadow = true;
      rightSidewalk.receiveShadow = true;

      if (rotY) {
        leftSidewalk.position.set(x, 0.08, z - w / 2 - sideW / 2);
        leftSidewalk.rotation.y = Math.PI / 2;
        rightSidewalk.position.set(x, 0.08, z + w / 2 + sideW / 2);
        rightSidewalk.rotation.y = Math.PI / 2;
      } else {
        leftSidewalk.position.set(x - w / 2 - sideW / 2, 0.08, z);
        rightSidewalk.position.set(x + w / 2 + sideW / 2, 0.08, z);
      }
      roadGroup.add(leftSidewalk, rightSidewalk);

      // Lane dividers
      const lineCount = Math.floor(l / 8);
      for (let i = 0; i < lineCount; i++) {
        const lineGeo = new THREE.PlaneGeometry(0.12, 1.8);
        const lineMat = new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.3 });
        const lineMesh = new THREE.Mesh(lineGeo, lineMat);
        lineMesh.rotation.x = -Math.PI / 2;
        
        const offset = -l / 2 + (i * 8) + 4;
        if (rotY) {
          lineMesh.position.set(x + offset, 0.03, z);
          lineMesh.rotation.z = Math.PI / 2;
        } else {
          lineMesh.position.set(x, 0.03, z + offset);
        }
        roadGroup.add(lineMesh);
      }

      // Glowing circuit lines
      const circMat = new THREE.MeshBasicMaterial({ color: '#10b981', transparent: true, opacity: 0.45 });
      const circGeo = new THREE.PlaneGeometry(0.1, l);
      const circLeft = new THREE.Mesh(circGeo, circMat);
      circLeft.rotation.x = -Math.PI / 2;
      const circRight = new THREE.Mesh(circGeo, circMat);
      circRight.rotation.x = -Math.PI / 2;
      
      if (rotY) {
        circLeft.position.set(x, 0.04, z - w / 2 + 0.5);
        circLeft.rotation.z = Math.PI / 2;
        circRight.position.set(x, 0.04, z + w / 2 - 0.5);
        circRight.rotation.z = Math.PI / 2;
      } else {
        circLeft.position.set(x - w / 2 + 0.5, 0.04, z);
        circRight.position.set(x + w / 2 - 0.5, 0.04, z);
      }
      roadGroup.add(circLeft, circRight);
    };

    createRoadSegment(12, 300, 0, 0, false);
    createRoadSegment(12, 300, 0, 0, true);
    createRoadSegment(10, 200, 50, 0, false);
    createRoadSegment(10, 200, -50, 0, false);
    createRoadSegment(10, 200, 0, 50, true);
    createRoadSegment(10, 200, 0, -50, true);
    scene.add(roadGroup);

    // --- 5.5. Sunset clouds ---
    const cloudsGroup = new THREE.Group();
    const cloudGeo = new THREE.SphereGeometry(15, 8, 8);
    const cloudMat = new THREE.MeshStandardMaterial({
      color: '#fda4af',
      transparent: true,
      opacity: 0.12,
      roughness: 0.95
    });
    for (let i = 0; i < 20; i++) {
      const cloud = new THREE.Mesh(cloudGeo, cloudMat);
      cloud.position.set(
        (Math.random() - 0.5) * 300,
        40 + Math.random() * 20,
        (Math.random() - 0.5) * 300
      );
      cloud.scale.set(2.2, 0.5, 1.2);
      cloudsGroup.add(cloud);
    }
    scene.add(cloudsGroup);

    // --- 6. Streetlight Poles Along Highways ---
    const streetlightGroup = new THREE.Group();
    const addStreetlight = (x: number, z: number) => {
      const poleGeo = new THREE.CylinderGeometry(0.12, 0.18, 7, 8);
      const poleMat = new THREE.MeshStandardMaterial({ color: '#475569', metalness: 0.8 });
      const pole = new THREE.Mesh(poleGeo, poleMat);
      pole.position.set(x, 3.5, z);
      pole.castShadow = true;
      streetlightGroup.add(pole);

      const headGeo = new THREE.BoxGeometry(0.3, 0.2, 1.2);
      const head = new THREE.Mesh(headGeo, poleMat);
      head.position.set(x, 7.0, z + (x > 0 ? -0.5 : 0.5));
      streetlightGroup.add(head);

      const bulbGeo = new THREE.SphereGeometry(0.2, 8, 8);
      const bulbMat = new THREE.MeshBasicMaterial({ color: '#fed7aa' });
      const bulb = new THREE.Mesh(bulbGeo, bulbMat);
      bulb.position.set(x, 6.9, z + (x > 0 ? -0.9 : 0.9));
      streetlightGroup.add(bulb);

      const light = new THREE.PointLight('#fed7aa', 1.8, 14);
      light.position.set(x, 6.5, z + (x > 0 ? -0.9 : 0.9));
      streetlightGroup.add(light);
    };

    for (let pos = -120; pos <= 120; pos += 40) {
      if (pos === 0) continue;
      addStreetlight(6.5, pos);
      addStreetlight(-6.5, pos);
      addStreetlight(pos, 6.5);
      addStreetlight(pos, -6.5);
    }
    scene.add(streetlightGroup);

    // --- 7. Central TechTonic HQ Square Monolith ---
    const hqGroup = new THREE.Group();
    const coreHqGeo = new THREE.BoxGeometry(7, 30, 7);
    const coreHqMat = new THREE.MeshStandardMaterial({
      color: '#030712',
      metalness: 0.98,
      roughness: 0.05,
      emissive: '#bd9a76',
      emissiveIntensity: 0.15
    });
    const coreHq = new THREE.Mesh(coreHqGeo, coreHqMat);
    coreHq.position.y = 15;
    hqGroup.add(coreHq);

    const hqEdges = new THREE.EdgesGeometry(coreHqGeo);
    const hqLineMat = new THREE.LineBasicMaterial({ color: '#bd9a76', linewidth: 3 });
    const hqWire = new THREE.LineSegments(hqEdges, hqLineMat);
    hqWire.position.y = 15;
    hqGroup.add(hqWire);

    const ringGeo1 = new THREE.TorusGeometry(5, 0.15, 8, 36);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: '#bd9a76', transparent: true, opacity: 0.6 });
    const holoRing1 = new THREE.Mesh(ringGeo1, ringMat1);
    holoRing1.rotation.x = Math.PI / 2;
    holoRing1.position.y = 33;
    hqGroup.add(holoRing1);

    scene.add(hqGroup);

    // Texture loader for real downloaded company logos
    const textureLoader = new THREE.TextureLoader();
    const downloadedLogos = ['google', 'openai', 'meta', 'nvidia', 'microsoft', 'aws', 'anthropic', 'huggingface', 'ibm', 'apple'];

    // --- 8. High-Fidelity Company Skyscraper Towers ---
    companyConfig.forEach((c) => {
      const towerGroup = new THREE.Group();

      const coreGeo = new THREE.CylinderGeometry(c.width / 2, c.width / 2, c.height, 16);
      coreGeo.scale(1.0, 1.0, 0.65);
      
      const coreMat = new THREE.MeshStandardMaterial({
        color: '#040b17',
        metalness: 0.95,
        roughness: 0.04,
        transparent: true,
        opacity: 0.92,
        emissive: c.color,
        emissiveIntensity: 0.04
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      coreMesh.position.y = c.height / 2;
      coreMesh.castShadow = true;
      coreMesh.receiveShadow = true;
      towerGroup.add(coreMesh);

      // Add horizontal glowing neon bands representing office floors
      const floorCount = Math.floor(c.height / 2.8);
      for (let f = 1; f < floorCount; f++) {
        const ringG = new THREE.CylinderGeometry(c.width * 0.505, c.width * 0.505, 0.1, 16, 1, true);
        ringG.scale(1.0, 1.0, 0.65);
        const ringM = new THREE.MeshBasicMaterial({ color: c.color, transparent: true, opacity: 0.35 });
        const floorRing = new THREE.Mesh(ringG, ringM);
        floorRing.position.y = f * 2.8;
        towerGroup.add(floorRing);
      }

      const structGeo = new THREE.BoxGeometry(0.12, c.height, 0.12);
      const structMat = new THREE.MeshStandardMaterial({ color: '#475569', metalness: 0.9, roughness: 0.2 });
      
      const colLeft = new THREE.Mesh(structGeo, structMat);
      colLeft.position.set(-c.width / 2, c.height / 2, 0);
      const colRight = new THREE.Mesh(structGeo, structMat);
      colRight.position.set(c.width / 2, c.height / 2, 0);
      towerGroup.add(colLeft, colRight);

      // Giant Glowing logo plaque on front facade
      const logoPlatGeo = new THREE.BoxGeometry(c.width * 0.65, 2.2, 0.1);
      const logoPlatMat = new THREE.MeshStandardMaterial({ color: '#030712', metalness: 0.9 });
      const logoPlaque = new THREE.Mesh(logoPlatGeo, logoPlatMat);
      logoPlaque.position.set(0, c.height * 0.8, c.depth * 0.3 + 0.05);
      towerGroup.add(logoPlaque);

      // Apply real downloaded image logo or procedural fallback
      if (downloadedLogos.includes(c.id)) {
        const logoTex = textureLoader.load(`/logos/${c.id}.png`);
        const logoPicGeo = new THREE.PlaneGeometry(c.width * 0.55, 1.8);
        const logoPicMat = new THREE.MeshStandardMaterial({
          map: logoTex,
          transparent: true,
          roughness: 0.15,
          metalness: 0.8,
          side: THREE.DoubleSide
        });
        const logoPic = new THREE.Mesh(logoPicGeo, logoPicMat);
        // Position slightly in front of the plaque to prevent Z-fighting
        logoPic.position.set(0, c.height * 0.8, c.depth * 0.3 + 0.11);
        towerGroup.add(logoPic);
      } else {
        // Fallback simple torus mesh if logo is not downloaded
        const ringG = new THREE.TorusGeometry(0.5, 0.1, 8, 20);
        const ringM = new THREE.MeshBasicMaterial({ color: c.color });
        const fallbackLogo = new THREE.Mesh(ringG, ringM);
        fallbackLogo.position.set(0, c.height * 0.8, c.depth * 0.3 + 0.11);
        (fallbackLogo as any).userData = { isHolo: true };
        towerGroup.add(fallbackLogo);
      }

      // Blinking beacon light on top
      const beaconGeo = new THREE.SphereGeometry(0.18, 8, 8);
      const beaconMat = new THREE.MeshBasicMaterial({ color: '#ef4444' });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.y = c.height + 0.2;
      towerGroup.add(beacon);

      // Parking / Entrance Area marker ring
      const ringGeo = new THREE.RingGeometry(6.4, 6.8, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: c.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 0.08;
      towerGroup.add(ring);

      towerGroup.position.set(c.x, 0, c.z);
      scene.add(towerGroup);
    });

    // --- 8.5. Procedural Background Skyscrapers ---
    const isOverlapWithRoadsOrCompanies = (bx: number, bz: number) => {
      if (Math.abs(bx) < 8.5 || Math.abs(bz) < 8.5) return true;
      if (Math.abs(Math.abs(bx) - 50) < 7.5 || Math.abs(Math.abs(bz) - 50) < 7.5) return true;
      if (Math.hypot(bx, bz) < 22) return true;
      for (let i = 0; i < companyConfig.length; i++) {
        const dist = Math.hypot(bx - companyConfig[i].x, bz - companyConfig[i].z);
        if (dist < 12) return true;
      }
      return false;
    };

    const bgBuildingsGroup = new THREE.Group();
    for (let i = 0; i < 65; i++) {
      const bx = (Math.random() - 0.5) * 230;
      const bz = (Math.random() - 0.5) * 230;
      if (isOverlapWithRoadsOrCompanies(bx, bz)) continue;

      const w = 4.5 + Math.random() * 5;
      const h = 18 + Math.random() * 30;

      const bgGeo = new THREE.CylinderGeometry(w / 2, w / 2, h, 16);
      bgGeo.scale(1.0, 1.0, 0.65);
      
      const bgMat = new THREE.MeshStandardMaterial({
        color: '#081121',
        metalness: 0.95,
        roughness: 0.06,
        transparent: true,
        opacity: 0.92,
        emissive: '#1e293b',
        emissiveIntensity: 0.04
      });
      const bgMesh = new THREE.Mesh(bgGeo, bgMat);
      bgMesh.position.set(bx, h / 2, bz);
      bgMesh.castShadow = true;
      bgMesh.receiveShadow = true;
      bgBuildingsGroup.add(bgMesh);
    }
    scene.add(bgBuildingsGroup);

    // --- 9. Futuristic Cybernetic Bicycle & High-Fidelity Rider ---
    const riderGroup = new THREE.Group();
    
    // Bicycle Parts
    const bike = new THREE.Group();
    riderGroup.add(bike);

    const wheelGeo = new THREE.TorusGeometry(0.5, 0.06, 8, 24);
    const wheelMat = new THREE.MeshStandardMaterial({ color: '#0f172a', roughness: 0.9 });
    const spokeMat = new THREE.MeshStandardMaterial({ color: '#cbd5e1', metalness: 1.0, roughness: 0.1 });
    
    // Front wheel
    const fWheel = new THREE.Mesh(wheelGeo, wheelMat);
    fWheel.position.set(0, 0.5, 0.9);
    fWheel.castShadow = true;
    
    const frontSpokes = new THREE.Mesh(new THREE.RingGeometry(0.02, 0.48, 12), spokeMat);
    frontSpokes.rotation.y = Math.PI / 2;
    fWheel.add(frontSpokes);
    bike.add(fWheel);
    frontWheelRef.current = fWheel;

    // Back wheel
    const bWheel = new THREE.Mesh(wheelGeo, wheelMat);
    bWheel.position.set(0, 0.5, -0.9);
    bWheel.castShadow = true;
    
    const backSpokes = new THREE.Mesh(new THREE.RingGeometry(0.02, 0.48, 12), spokeMat);
    backSpokes.rotation.y = Math.PI / 2;
    bWheel.add(backSpokes);
    bike.add(bWheel);
    backWheelRef.current = bWheel;

    // Polished Silver Chrome frame tubes
    const frameMat = new THREE.MeshStandardMaterial({ color: '#cbd5e1', metalness: 1.0, roughness: 0.05 });
    const tubeGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.2, 8);
    
    const downTube = new THREE.Mesh(tubeGeo, frameMat);
    downTube.position.set(0, 0.65, 0.25);
    downTube.rotation.x = -Math.PI / 4;
    bike.add(downTube);

    const seatTube = new THREE.Mesh(tubeGeo, frameMat);
    seatTube.position.set(0, 0.75, -0.2);
    seatTube.rotation.x = Math.PI / 12;
    bike.add(seatTube);

    const forkGeo = new THREE.CylinderGeometry(0.03, 0.03, 1.0, 8);
    const fork = new THREE.Mesh(forkGeo, frameMat);
    fork.position.set(0, 0.85, 0.75);
    fork.rotation.x = -Math.PI / 8;
    bike.add(fork);
    bicycleForkRef.current = fork;

    const barGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.8, 8);
    const bar = new THREE.Mesh(barGeo, frameMat);
    bar.position.set(0, 1.25, 0.65);
    bar.rotation.z = Math.PI / 2;
    bike.add(bar);

    const saddleGeo = new THREE.BoxGeometry(0.2, 0.08, 0.45);
    const saddleMat = new THREE.MeshStandardMaterial({ color: '#1e293b', roughness: 0.8 });
    const saddle = new THREE.Mesh(saddleGeo, saddleMat);
    saddle.position.set(0, 1.15, -0.25);
    bike.add(saddle);

    // Interactive Pedals/Cranks
    const crankMat = new THREE.MeshStandardMaterial({ color: '#64748b', metalness: 0.9, roughness: 0.1 });
    const pedalMatNode = new THREE.MeshStandardMaterial({ color: '#1e293b', roughness: 0.8 });

    // Left Pedal Assembly
    const leftPedalCrank = new THREE.Group();
    leftPedalCrank.position.set(-0.16, 0.5, -0.2);
    
    const leftArm = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.35, 0.06), crankMat);
    leftArm.position.y = -0.15;
    leftPedalCrank.add(leftArm);

    const leftPedalPlate = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.04, 0.12), pedalMatNode);
    leftPedalPlate.position.y = -0.3;
    leftPedalCrank.add(leftPedalPlate);
    
    bike.add(leftPedalCrank);
    leftPedalCrankRef.current = leftPedalCrank;

    // Right Pedal Assembly
    const rightPedalCrank = new THREE.Group();
    rightPedalCrank.position.set(0.16, 0.5, -0.2);

    const rightArm = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.35, 0.06), crankMat);
    rightArm.position.y = 0.15;
    rightPedalCrank.add(rightArm);

    const rightPedalPlate = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.04, 0.12), pedalMatNode);
    rightPedalPlate.position.y = 0.3;
    rightPedalCrank.add(rightPedalPlate);

    bike.add(rightPedalCrank);
    rightPedalCrankRef.current = rightPedalCrank;

    // --- High-Fidelity Cyber-Athlete Rider ---
    const rider = new THREE.Group();
    riderGroup.add(rider);
    
    const skinMat = new THREE.MeshStandardMaterial({ color: '#e5c298', roughness: 0.65 });
    const tShirtMat = new THREE.MeshStandardMaterial({ color: '#2563eb', roughness: 0.7 });
    const jeansMat = new THREE.MeshStandardMaterial({ color: '#1e3a8a', roughness: 0.85 });
    const shoeMat = new THREE.MeshStandardMaterial({ color: '#ef4444', roughness: 0.6 });

    // Torso
    const torsoChest = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.15, 0.65, 10), tShirtMat);
    torsoChest.position.set(0, 1.48, -0.2);
    torsoChest.rotation.x = Math.PI / 15;
    rider.add(torsoChest);

    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.07, 0.15, 8), skinMat);
    neck.position.set(0, 1.8, -0.15);
    rider.add(neck);

    // Realistic Head
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 16), skinMat);
    head.position.set(0, 1.95, -0.12);
    rider.add(head);

    // Hair
    const hair = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 12), new THREE.MeshStandardMaterial({ color: '#27272a', roughness: 0.95 }));
    hair.position.set(0, 2.0, -0.14);
    hair.scale.set(1.0, 0.6, 0.9);
    rider.add(hair);

    // Left Arm
    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(-0.22, 1.7, -0.15);
    
    const upperArmLeft = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.04, 0.35, 8), tShirtMat);
    upperArmLeft.position.y = -0.15;
    upperArmLeft.rotation.z = Math.PI / 8;
    upperArmLeft.rotation.x = -Math.PI / 6;
    leftArmGroup.add(upperArmLeft);

    const foreArmLeft = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.035, 0.35, 8), skinMat);
    foreArmLeft.position.set(0.05, -0.4, 0.15);
    foreArmLeft.rotation.x = -Math.PI / 3;
    leftArmGroup.add(foreArmLeft);
    
    rider.add(leftArmGroup);

    // Right Arm
    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(0.22, 1.7, -0.15);

    const upperArmRight = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.04, 0.35, 8), tShirtMat);
    upperArmRight.position.y = -0.15;
    upperArmRight.rotation.z = -Math.PI / 8;
    upperArmRight.rotation.x = -Math.PI / 6;
    rightArmGroup.add(upperArmRight);

    const foreArmRight = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.035, 0.35, 8), skinMat);
    foreArmRight.position.set(-0.05, -0.4, 0.15);
    foreArmRight.rotation.x = -Math.PI / 3;
    rightArmGroup.add(foreArmRight);

    rider.add(rightArmGroup);

    // Legs
    const thighGeo = new THREE.CylinderGeometry(0.09, 0.07, 0.5, 8);
    const shinGeo = new THREE.CylinderGeometry(0.07, 0.055, 0.5, 8);
    const footGeo = new THREE.BoxGeometry(0.12, 0.08, 0.28);

    // Left Leg
    const leftThigh = new THREE.Mesh(thighGeo, jeansMat);
    leftThigh.position.set(-0.16, 1.15, -0.2);
    rider.add(leftThigh);
    leftThighRef.current = leftThigh;

    const leftShin = new THREE.Mesh(shinGeo, jeansMat);
    rider.add(leftShin);
    leftShinRef.current = leftShin;

    const leftFoot = new THREE.Mesh(footGeo, shoeMat);
    rider.add(leftFoot);
    leftFootRef.current = leftFoot;

    // Right Leg
    const rightThigh = new THREE.Mesh(thighGeo, jeansMat);
    rightThigh.position.set(0.16, 1.15, -0.2);
    rider.add(rightThigh);
    rightThighRef.current = rightThigh;

    const rightShin = new THREE.Mesh(shinGeo, jeansMat);
    rider.add(rightShin);
    rightShinRef.current = rightShin;

    const rightFoot = new THREE.Mesh(footGeo, shoeMat);
    rider.add(rightFoot);
    rightFootRef.current = rightFoot;

    // Setup bike position
    riderGroup.position.set(0, 0, 10);
    scene.add(riderGroup);
    playerVehicleRef.current = riderGroup;

    // --- 10. Floating Knowledge Artifacts ---
    const chipsGroup = new THREE.Group();
    const chipMeshMap: Record<string, THREE.Mesh> = {};
    companyConfig.forEach((c) => {
      const angleRad = Math.atan2(c.z, c.x);
      const distance = Math.hypot(c.x, c.z);
      const chipDist = Math.max(distance - 8.0, 5.0);
      const chipX = Math.cos(angleRad) * chipDist;
      const chipZ = Math.sin(angleRad) * chipDist;

      const chipGeo = new THREE.TorusGeometry(0.7, 0.16, 8, 24);
      const chipMat = new THREE.MeshStandardMaterial({
        color: c.color,
        roughness: 0.1,
        metalness: 0.9,
        emissive: c.color,
        emissiveIntensity: 0.5
      });
      const chip = new THREE.Mesh(chipGeo, chipMat);
      chip.position.set(chipX, 1.8, chipZ);
      chip.castShadow = true;
      chipsGroup.add(chip);
      chipMeshMap[c.id] = chip;
    });
    scene.add(chipsGroup);

    // --- 10.5. Particle Starfield ---
    const starCount = 350;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const colorGold = new THREE.Color('#bd9a76');
    const colorBlue = new THREE.Color('#38bdf8');

    for (let s = 0; s < starCount; s++) {
      const radius = 55 + Math.random() * 70;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = Math.abs(radius * Math.sin(phi) * Math.sin(theta)) + 4;
      const z = radius * Math.cos(phi);

      starPositions[s * 3] = x;
      starPositions[s * 3 + 1] = y;
      starPositions[s * 3 + 2] = z;

      const blendColor = Math.random() > 0.5 ? colorGold : colorBlue;
      starColors[s * 3] = blendColor.r;
      starColors[s * 3 + 1] = blendColor.g;
      starColors[s * 3 + 2] = blendColor.b;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.9,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true
    });

    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // --- 11. Game Animation & Physics Loop ---
    let frameId: number;

    const gameLoop = () => {
      frameId = requestAnimationFrame(gameLoop);

      // Handle vehicle inputs
      const isUp = keysPressed.current['w'] || keysPressed.current['arrowup'];
      const isDown = keysPressed.current['s'] || keysPressed.current['arrowdown'];
      const isLeft = keysPressed.current['a'] || keysPressed.current['arrowleft'];
      const isRight = keysPressed.current['d'] || keysPressed.current['arrowright'];

      // Acceleration / Deceleration
      if (isUp) {
        velocity.current = Math.min(velocity.current + acceleration, maxSpeed);
      } else if (isDown) {
        velocity.current = Math.max(velocity.current - acceleration, -maxSpeed / 3);
      } else {
        if (velocity.current > 0) {
          velocity.current = Math.max(velocity.current - deceleration, 0);
        } else if (velocity.current < 0) {
          velocity.current = Math.min(velocity.current + deceleration, 0);
        }
      }

      // Steering
      if (Math.abs(velocity.current) > 0.05) {
        const directionMultiplier = velocity.current > 0 ? 1 : -1;
        if (isLeft) {
          angle.current += turnSpeed * directionMultiplier;
        } else if (isRight) {
          angle.current -= turnSpeed * directionMultiplier;
        }
      }

      // Update vehicle placement
      if (playerVehicleRef.current) {
        const velX = Math.sin(angle.current) * velocity.current;
        const velZ = Math.cos(angle.current) * velocity.current;
        
        playerVehicleRef.current.position.x += velX;
        playerVehicleRef.current.position.z += velZ;
        playerVehicleRef.current.rotation.y = angle.current;

        const timeNow = performance.now();
        const bounce = Math.sin(timeNow * 0.005) * 0.02;
        playerVehicleRef.current.position.y = bounce;

        // Pedaling assembly and joints trig calculation
        const pedalCycle = timeNow * 0.015 * velocity.current;
        const leftAngle = pedalCycle;
        const rightAngle = pedalCycle + Math.PI;

        // Rotate the metal pedal crank nodes
        if (leftPedalCrankRef.current && rightPedalCrankRef.current) {
          leftPedalCrankRef.current.rotation.x = leftAngle;
          rightPedalCrankRef.current.rotation.x = rightAngle;
        }

        // Animate left/right thighs, shins, and feet to match the pedal spin
        if (
          leftThighRef.current && leftShinRef.current && leftFootRef.current &&
          rightThighRef.current && rightShinRef.current && rightFootRef.current
        ) {
          leftThighRef.current.rotation.x = Math.PI / 4 + Math.sin(leftAngle) * 0.35;
          const leftKneeY = 0.82 + Math.sin(leftAngle) * 0.18;
          const leftKneeZ = -0.15 + Math.cos(leftAngle) * 0.12;

          leftShinRef.current.position.set(-0.16, leftKneeY - 0.22, leftKneeZ + 0.18);
          leftShinRef.current.rotation.x = -Math.PI / 6 + Math.cos(leftAngle) * 0.28;

          leftFootRef.current.position.set(-0.16, 0.5 + Math.sin(leftAngle + Math.PI / 2) * 0.3, -0.2 + Math.cos(leftAngle + Math.PI / 2) * 0.3);
          leftFootRef.current.rotation.x = Math.sin(leftAngle) * 0.15;

          rightThighRef.current.rotation.x = Math.PI / 4 + Math.sin(rightAngle) * 0.35;
          const rightKneeY = 0.82 + Math.sin(rightAngle) * 0.18;
          const rightKneeZ = -0.15 + Math.cos(rightAngle) * 0.12;

          rightShinRef.current.position.set(0.16, rightKneeY - 0.22, rightKneeZ + 0.18);
          rightShinRef.current.rotation.x = -Math.PI / 6 + Math.cos(rightAngle) * 0.28;

          rightFootRef.current.position.set(0.16, 0.5 + Math.sin(rightAngle + Math.PI / 2) * 0.3, -0.2 + Math.cos(rightAngle + Math.PI / 2) * 0.3);
          rightFootRef.current.rotation.x = Math.sin(rightAngle) * 0.15;
        }

        // Spin wheels when moving
        if (frontWheelRef.current && backWheelRef.current) {
          frontWheelRef.current.rotation.x += velocity.current * 0.8;
          backWheelRef.current.rotation.x += velocity.current * 0.8;
        }

        // Steer turning front fork slightly
        if (bicycleForkRef.current) {
          let targetForkY = 0;
          if (isLeft) targetForkY = 0.35;
          if (isRight) targetForkY = -0.35;
          bicycleForkRef.current.rotation.y += (targetForkY - bicycleForkRef.current.rotation.y) * 0.15;
        }

        // --- Range check against company buildings ---
        let currentNearId: string | null = null;
        companyConfig.forEach((c) => {
          const dist = Math.hypot(
            playerVehicleRef.current!.position.x - c.x,
            playerVehicleRef.current!.position.z - c.z
          );
          if (dist < 7.0) {
            currentNearId = c.id;
          }
        });
        setNearCompanyId(currentNearId);
      }

      // Rotate stars and holographic crowns
      scene.traverse((obj) => {
        if ((obj as any).userData && (obj as any).userData.isHolo) {
          obj.rotation.y += 0.015;
        }
      });

      // Spin floating Torus chips
      Object.keys(chipMeshMap).forEach((id) => {
        const chip = chipMeshMap[id];
        if (chip) {
          chip.rotation.y += 0.015;
          chip.rotation.x = Math.sin(performance.now() * 0.003) * 0.25;
          
          if (playerVehicleRef.current) {
            const dist = playerVehicleRef.current.position.distanceTo(chip.position);
            if (dist < 2.5 && chip.visible) {
              chip.visible = false;
              addXp(40);
            }
          }
        }
      });

      // --- Project 3D Skyscraper Coordinates to 2D Screen Space ---
      if (cameraRef.current) {
        const width = mountRef.current?.clientWidth || window.innerWidth;
        const height = mountRef.current?.clientHeight || window.innerHeight;
        const newLabels: ProjectedLabel[] = [];

        companyConfig.forEach((c) => {
          const pos = new THREE.Vector3(c.x, c.height + 4.5, c.z);
          pos.project(cameraRef.current!);

          const isBehind = pos.z > 1;

          const screenX = (pos.x * 0.5 + 0.5) * width;
          const screenY = (pos.y * -0.5 + 0.5) * height;

          let dist = 999;
          if (playerVehicleRef.current) {
            dist = playerVehicleRef.current.position.distanceTo(new THREE.Vector3(c.x, 0, c.z));
          }

          newLabels.push({
            id: c.id,
            name: c.name,
            x: screenX,
            y: screenY,
            visible: !isBehind && dist < 160,
            color: c.color,
            dist: Math.round(dist)
          });
        });
        setProjectedLabels(newLabels);
      }

      // --- Chase Camera Follow (FITTED TO VIDEO - THREE-QUARTER SIDE ANGLE OFFSET) ---
      if (cameraRef.current && playerVehicleRef.current) {
        const targetPos = playerVehicleRef.current.position;
        const camDistance = 8.5;
        const camHeight = 3.2;
        
        // Calculate tangent (sideways) vector of orientation to offset the camera slightly to the right
        const tangentX = -Math.cos(angle.current);
        const tangentZ = Math.sin(angle.current);
        const sideOffset = 1.6; // 1.6 meters offset to show beautiful three-quarter bicycle profile

        const idealCamX = targetPos.x - Math.sin(angle.current) * camDistance + tangentX * sideOffset;
        const idealCamZ = targetPos.z - Math.cos(angle.current) * camDistance + tangentZ * sideOffset;
        const idealCamY = targetPos.y + camHeight;

        cameraRef.current.position.x += (idealCamX - cameraRef.current.position.x) * 0.085;
        cameraRef.current.position.z += (idealCamZ - cameraRef.current.position.z) * 0.085;
        cameraRef.current.position.y += (idealCamY - cameraRef.current.position.y) * 0.085;

        // Point at cyclist's back/torso center
        const lookTarget = new THREE.Vector3(
          targetPos.x + Math.sin(angle.current) * 1.5,
          targetPos.y + 1.25,
          targetPos.z + Math.cos(angle.current) * 1.5
        );
        cameraRef.current.lookAt(lookTarget);
      }

      starField.rotation.y = performance.now() * 0.00004;

      renderer.render(scene, camera);
    };
    gameLoop();

    // Resize handler
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      if (mountRef.current && renderer.domElement.parentNode) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Minimap 2D Canvas rendering
  const minimapCanvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = minimapCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let mapFrameId: number;
    const drawMinimap = () => {
      mapFrameId = requestAnimationFrame(drawMinimap);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#03050c';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(189, 154, 118, 0.04)';
      ctx.lineWidth = 1;
      const step = 20;
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      const scale = 1.0;
      const center = canvas.width / 2;

      ctx.beginPath();
      ctx.arc(center, center, 15 * scale, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(189, 154, 118, 0.12)';
      ctx.fill();
      ctx.strokeStyle = '#bd9a76';
      ctx.stroke();

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 4;
      
      ctx.beginPath();
      ctx.moveTo(0, center);
      ctx.lineTo(canvas.width, center);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(center, 0);
      ctx.lineTo(center, canvas.height);
      ctx.stroke();

      companyConfig.forEach((c) => {
        const bx = center + c.x * scale;
        const bz = center + c.z * scale;

        ctx.beginPath();
        ctx.arc(bx, bz, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = c.color;
        ctx.fill();

        if (nearCompanyId === c.id) {
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          ctx.arc(bx, bz, 7, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      if (playerVehicleRef.current) {
        const px = center + playerVehicleRef.current.position.x * scale;
        const pz = center + playerVehicleRef.current.position.z * scale;

        ctx.save();
        ctx.translate(px, pz);
        ctx.rotate(angle.current);

        ctx.beginPath();
        ctx.moveTo(0, -5);
        ctx.lineTo(-3, 4);
        ctx.lineTo(3, 4);
        ctx.closePath();
        ctx.fillStyle = '#bd9a76';
        ctx.fill();
        ctx.restore();
      }
    };
    drawMinimap();

    return () => {
      cancelAnimationFrame(mapFrameId);
    };
  }, [nearCompanyId]);

  return (
    <div className="fixed inset-0 z-50 bg-[#02040a] overflow-hidden flex select-none text-slate-100 font-sans">
      
      {/* Background Audio tag */}
      <audio 
        ref={audioRef} 
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" 
        loop 
        preload="auto" 
      />

      {/* Dynamic Intro Welcome overlay */}
      {showIntro && (
        <div className="absolute inset-0 bg-[#02040a]/98 backdrop-blur-md flex items-center justify-center z-[100] px-4">
          <div className="max-w-md w-full glass-panel border border-brand-gold/25 p-8 rounded-3xl text-center space-y-6 shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-brand-gold via-blue-500 to-brand-gold" />
            <div className="w-16 h-16 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center mx-auto text-brand-gold-bright shadow-lg shadow-brand-gold/5">
              <Compass className="w-8 h-8 animate-spin-slow" />
            </div>
            <h2 className="font-serif text-2.5xl font-bold uppercase tracking-wider text-slate-200">
              Welcome to TechTonic City
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Explore a stylized, 3D open-world cyber city driving a neon hover-pod! Enter leader districts, complete AI-themed learning quests, and collect insights to level up.
            </p>
            <div className="bg-brand-navy-deep/50 p-4 rounded-xl border border-brand-gold/5 text-left text-xs space-y-2">
              <span className="font-bold text-slate-300 block mb-1">Driving Controls:</span>
              <p className="text-slate-400">⌨️ <strong className="text-slate-200">W / A / S / D:</strong> Steer & drive hovercar</p>
              <p className="text-slate-400">⌨️ <strong className="text-slate-200">Arrow Keys:</strong> Alternative driving controls</p>
              <p className="text-slate-400">⌨️ <strong className="text-slate-200">E Key:</strong> Enter selected building zone</p>
            </div>
            <button
              onClick={() => {
                setShowIntro(false);
                window.focus(); // Set focus to key events immediately
                toggleMute(); // Auto-unmute on drive click
              }}
              className="w-full py-3 rounded-xl bg-brand-gold hover:bg-brand-gold-bright text-brand-navy-dark text-xs sm:text-sm font-extrabold uppercase tracking-widest cursor-pointer shadow-lg shadow-brand-gold/20 transition-all active:scale-95"
            >
              Start Driving
            </button>
          </div>
        </div>
      )}

      {/* 3D Canvas Mounting Point */}
      <div ref={mountRef} className="w-full h-full relative z-10" />

      {/* Projected HTML Skyscraper Floating HUD Name Tags */}
      <div className="absolute inset-0 z-15 pointer-events-none overflow-hidden">
        {projectedLabels.map((lbl) => {
          if (!lbl.visible) return null;
          return (
            <div
              key={lbl.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center space-y-1"
              style={{ left: `${lbl.x}px`, top: `${lbl.y}px` }}
            >
              <div 
                className="px-2.5 py-1 rounded-full text-[9px] font-extrabold uppercase tracking-widest bg-brand-navy-dark/95 border shadow-xl flex items-center gap-1.5 backdrop-blur-sm"
                style={{ borderColor: lbl.color, color: '#f8fafc' }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: lbl.color }} />
                {lbl.name.split(' / ')[0]}
                <span className="text-[7px] text-slate-500 font-bold">({lbl.dist}m)</span>
              </div>
              <div 
                className="w-0.5 h-4" 
                style={{ backgroundColor: lbl.color, opacity: 0.6 }}
              />
            </div>
          );
        })}
      </div>

      {/* Game HUD Overlay */}
      <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-4 sm:p-6">
        
        {/* Top HUD: Level, XP, Exit controls, Audio controls */}
        <div className="flex items-start justify-between w-full pointer-events-auto">
          {/* Level & Progression tracking */}
          <div className="bg-brand-navy-dark/85 backdrop-blur-md p-4 rounded-2xl border border-brand-gold/15 shadow-xl flex items-center gap-4 w-72">
            <div className="w-12 h-12 rounded-xl bg-brand-gold/10 border border-brand-gold/30 flex flex-col justify-center items-center text-brand-gold-bright shadow-inner">
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Level</span>
              <span className="text-base font-extrabold">{level}</span>
            </div>
            <div className="flex-grow space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-200">Insights XP</span>
                <span className="text-[10px] font-extrabold text-brand-gold-bright">{xp} / {level * 300}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 border border-slate-700 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-brand-gold via-yellow-500 to-brand-gold-bright transition-all duration-300"
                  style={{ width: `${(xp % 300) / 3}%` }}
                />
              </div>
              {unlockedBadges.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {unlockedBadges.map(b => (
                    <span key={b} className="px-1.5 py-0.5 rounded text-[7px] font-extrabold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wide">
                      🎖️ {b}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Exit & Audio Controls */}
          <div className="flex gap-2">
            <button
              onClick={toggleMute}
              className={`flex items-center justify-center p-2.5 rounded-xl border transition-all cursor-pointer shadow-lg active:scale-95 pointer-events-auto ${
                musicMuted
                  ? 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-slate-200'
                  : 'bg-brand-gold/25 border-brand-gold/40 text-brand-gold-bright shadow-brand-gold/10'
              }`}
              title={musicMuted ? "Unmute Ambient Music" : "Mute Ambient Music"}
            >
              {musicMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-950/40 hover:bg-red-900 border border-red-500/20 hover:border-red-500 text-xs font-bold uppercase tracking-widest text-slate-200 transition-all cursor-pointer shadow-lg active:scale-95 pointer-events-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              Exit City
            </button>
          </div>
        </div>

        {/* Action Prompt (Teleport inside building) */}
        {nearCompanyId && !insideCompanyId && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-navy-dark/95 border border-brand-gold/40 px-6 py-4 rounded-3xl text-center space-y-2 pointer-events-auto shadow-2xl animate-bounce z-30">
            <MapPin className="w-6 h-6 text-brand-gold mx-auto animate-pulse" />
            <h4 className="font-serif text-sm font-bold text-slate-100 uppercase tracking-wider">
              {companyConfig.find(c => c.id === nearCompanyId)?.name}
            </h4>
            <p className="text-[10px] text-slate-400">
              Sector: {companyConfig.find(c => c.id === nearCompanyId)?.district}
            </p>
            <button
              onClick={() => setInsideCompanyId(nearCompanyId)}
              className="px-4 py-2 bg-brand-gold text-brand-navy-dark text-[10px] font-extrabold uppercase rounded-lg cursor-pointer transition-all active:scale-95 block w-full"
            >
              [E] Enter Building
            </button>
          </div>
        )}

        {/* Bottom HUD: Radar Minimap & Active Quest Log */}
        <div className="flex flex-col sm:flex-row items-end justify-between w-full gap-4 mt-auto">
          
          {/* Active Quest logs */}
          <div className="w-full sm:w-80 bg-brand-navy-dark/85 backdrop-blur-md p-4 rounded-2xl border border-brand-gold/15 shadow-xl pointer-events-auto">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 block mb-2 border-b border-brand-gold/10 pb-1 flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-brand-gold" />
              Quest Tracker
            </span>
            {activeQuest ? (
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-200 block">{activeQuest.title}</span>
                <p className="text-[10px] text-slate-400 leading-relaxed">{activeQuest.description}</p>
                <div className="flex justify-between items-center pt-1.5 border-t border-brand-gold/5 mt-2">
                  <span className="text-[8px] font-extrabold uppercase text-slate-500">Sector: {activeQuest.district}</span>
                  <span className="text-[9px] font-bold text-brand-gold-bright">+{activeQuest.xpReward} XP</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-2 text-slate-400 space-y-1">
                <CheckCircle className="w-5 h-5 text-emerald-400 mx-auto" />
                <span className="text-[10px] font-bold uppercase block text-emerald-400">All Quests Completed</span>
                <p className="text-[8px] text-slate-500">You have mastered the AI City roadmap!</p>
              </div>
            )}
          </div>

          {/* Minimap radar */}
          <div className="bg-brand-navy-dark/85 backdrop-blur-md p-4 rounded-2xl border border-brand-gold/15 shadow-xl pointer-events-auto w-40 h-40 flex flex-col justify-between items-center relative overflow-hidden">
            <canvas ref={minimapCanvasRef} width={100} height={100} className="w-24 h-24 rounded-full border border-brand-gold/15" />
            <span className="text-[8px] font-semibold text-slate-400 mt-1 uppercase tracking-wider flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-brand-gold" />
              Minimap Radar
            </span>
          </div>

        </div>

      </div>

      {/* Building Interior Immersive Overlay Panel */}
      {insideCompanyId && insideData && (
        <div className="fixed inset-0 z-50 bg-[#02040a]/98 flex flex-col pointer-events-auto text-slate-100 overflow-hidden">
          
          {/* Header */}
          <div className="p-6 border-b border-brand-gold/10 bg-brand-navy-dark flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: companyConfig.find(c => c.id === insideCompanyId)?.color }} 
              />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">
                  District: {companyConfig.find(c => c.id === insideCompanyId)?.district}
                </span>
                <h2 className="font-serif text-2xl font-extrabold uppercase tracking-wider text-slate-200">
                  {insideData.company.name} Building Interior
                </h2>
              </div>
            </div>

            <button
              onClick={() => setInsideCompanyId(null)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-navy-light/10 hover:bg-brand-navy-light/35 border border-brand-gold/10 hover:border-brand-gold/30 text-xs font-bold uppercase tracking-widest text-slate-300 cursor-pointer transition-all active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              Exit Building (Back to Car)
            </button>
          </div>

          {/* Subpages Tabs / Zones */}
          <div className="flex bg-brand-navy-deep p-1.5 border-b border-brand-gold/10 overflow-x-auto scrollbar-none">
            {[
              { id: 'all', label: 'All Zones' },
              { id: 'platforms', label: 'Platform Garage' },
              { id: 'models', label: 'Models & Tech Lab' },
              { id: 'docs', label: 'Docs Control Room' },
              { id: 'learning', label: 'Learning Arcade' }
            ].map((zone) => (
              <button
                key={zone.id}
                onClick={() => setActiveZone(zone.id as any)}
                className={`px-5 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeZone === zone.id
                    ? 'bg-brand-gold/25 text-brand-gold-bright font-extrabold border border-brand-gold/25'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {zone.label}
              </button>
            ))}
          </div>

          {/* Main interior viewport */}
          <div className="flex-grow p-6 overflow-y-auto space-y-8 custom-scrollbar max-w-7xl mx-auto w-full">
            
            {/* 1. Platform Garage */}
            {(activeZone === 'all' || activeZone === 'platforms') && insideData.platforms && insideData.platforms.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-brand-gold/10 pb-2">
                  <Layers className="w-5 h-5 text-brand-gold" />
                  <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-slate-300">Platform Garage</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {insideData.platforms.map((p: any) => (
                    <div key={p.id} className="p-6 rounded-2xl bg-brand-navy-deep/20 border border-brand-gold/10 hover:border-brand-gold/25 hover:bg-brand-navy-light/10 transition-all flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start gap-2">
                          <span className="font-bold text-slate-100 text-sm sm:text-base">{p.name}</span>
                          {p.badges && p.badges.length > 0 && (
                            <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-brand-navy-light text-slate-400 border border-slate-700 uppercase">
                              {p.badges[0]}
                            </span>
                          )}
                        </div>
                        <p className="text-slate-400 text-xs leading-relaxed">{p.description}</p>
                        {p.ideal_for && (
                          <div className="text-[10px] text-brand-gold/80 italic">
                            Ideal for: {p.ideal_for.join(', ')}
                          </div>
                        )}
                      </div>
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-200 hover:text-brand-navy-dark bg-brand-navy-gold hover:bg-brand-gold-bright transition-all border border-brand-gold/20 hover:border-transparent cursor-pointer"
                      >
                        Launch Platform
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Models & Tech Lab */}
            {(activeZone === 'all' || activeZone === 'models') && insideData.llms && insideData.llms.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-brand-gold/10 pb-2">
                  <Cpu className="w-5 h-5 text-brand-gold" />
                  <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-slate-300">Models & Tech Lab</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {insideData.llms.map((m: any) => (
                    <div key={m.id} className="p-6 rounded-2xl bg-brand-navy-deep/20 border border-brand-gold/10 hover:border-brand-gold/25 hover:bg-brand-navy-light/10 transition-all flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start gap-2">
                          <span className="font-bold text-slate-100 text-sm sm:text-base">{m.name}</span>
                          <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-brand-gold/10 text-brand-gold-bright border border-brand-gold/20 uppercase">
                            {m.family}
                          </span>
                        </div>
                        <p className="text-slate-400 text-xs leading-relaxed">{m.description}</p>
                        {m.primary_use_cases && (
                          <div className="text-[10px] text-slate-400 space-y-0.5">
                            <span className="font-semibold text-slate-300 block mb-1">Primary Actions:</span>
                            {m.primary_use_cases.map((u: string) => (
                              <div key={u} className="flex items-center gap-1.5">
                                <span className="w-1 h-1 rounded-full bg-brand-gold" />
                                <span>{u}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <a
                        href={m.docs_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-200 hover:text-brand-navy-dark bg-brand-navy-gold hover:bg-brand-gold-bright transition-all border border-brand-gold/20 hover:border-transparent cursor-pointer"
                      >
                        Read Model Card
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Docs Control Room */}
            {(activeZone === 'all' || activeZone === 'docs') && insideData.docsAndNews && insideData.docsAndNews.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-brand-gold/10 pb-2">
                  <Terminal className="w-5 h-5 text-brand-gold" />
                  <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-slate-300">Docs Control Room</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {insideData.docsAndNews.map((d: any) => (
                    <a
                      key={d.id}
                      href={d.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-5 rounded-xl bg-brand-navy-deep/10 border border-brand-gold/5 hover:border-brand-gold/25 hover:bg-brand-navy-light/10 transition-all flex justify-between items-center group cursor-pointer"
                    >
                      <div className="space-y-1">
                        <span className="font-bold text-slate-200 text-sm group-hover:text-slate-100 block">{d.name}</span>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider">{d.type}</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-brand-gold-bright transition-all group-hover:translate-x-1" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Learning Arcade */}
            {(activeZone === 'all' || activeZone === 'learning') && insideData.learning && insideData.learning.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-brand-gold/10 pb-2">
                  <Award className="w-5 h-5 text-brand-gold" />
                  <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-slate-300">Learning Arcade</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {insideData.learning.map((l: any) => (
                    <div key={l.id} className="p-6 rounded-2xl bg-brand-navy-deep/20 border border-brand-gold/10 hover:border-brand-gold/25 hover:bg-brand-navy-light/10 transition-all flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start gap-2">
                          <span className="font-bold text-slate-100 text-sm sm:text-base">{l.name}</span>
                          <span className="px-2 py-0.5 rounded text-[8px] font-bold bg-brand-navy-light text-slate-400 border border-slate-700 uppercase">
                            {l.level || 'All Levels'}
                          </span>
                        </div>
                        <p className="text-slate-400 text-xs leading-relaxed">{l.description}</p>
                        {l.focus_areas && (
                          <div className="text-[10px] text-brand-gold/80 italic">
                            Focus: {l.focus_areas.join(', ')}
                          </div>
                        )}
                      </div>
                      <a
                        href={l.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-200 hover:text-brand-navy-dark bg-brand-navy-gold hover:bg-brand-gold-bright transition-all border border-brand-gold/20 hover:border-transparent cursor-pointer"
                      >
                        Access Learning path
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Footer of interior view */}
          <div className="p-6 border-t border-brand-gold/10 bg-brand-navy-dark flex gap-4 justify-between items-center">
            <p className="text-slate-400 text-xs hidden sm:block max-w-md">
              Interact with individual panels to view platform settings, read quickstarts, download model cards, or launch course paths.
            </p>
            <div className="flex gap-2">
              <a
                href={insideData.company.official_site_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 py-3 px-6 rounded-xl bg-brand-gold hover:bg-brand-gold-bright text-brand-navy-dark text-xs font-extrabold uppercase tracking-wider cursor-pointer transition-all shadow-md shadow-brand-gold/15"
              >
                <Globe className="w-3.5 h-3.5" />
                Official Portal
              </a>
              <button
                onClick={() => setInsideCompanyId(null)}
                className="py-3 px-6 rounded-xl bg-brand-navy-light/10 hover:bg-brand-navy-light/35 border border-brand-gold/10 text-slate-300 text-xs font-bold uppercase tracking-wider cursor-pointer transition-all"
              >
                Return to Vehicle
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
