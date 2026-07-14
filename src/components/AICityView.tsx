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
  CheckCircle
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
  { id: 'google', name: 'Google / DeepMind', color: '#4285F4', district: 'Cloud Boulevard', x: 25, z: 25, height: 28, style: 'twin', width: 4, depth: 4 },
  { id: 'openai', name: 'OpenAI', color: '#10a37f', district: 'Cloud Boulevard', x: 38, z: 28, height: 35, style: 'monolith', width: 4.5, depth: 4.5 },
  { id: 'anthropic', name: 'Anthropic', color: '#D97706', district: 'Cloud Boulevard', x: 28, z: 42, height: 26, style: 'tower', width: 4, depth: 4 },
  { id: 'meta', name: 'Meta AI', color: '#0668E1', district: 'Open Models', x: 30, z: -30, height: 24, style: 'twin', width: 4, depth: 4 },
  { id: 'microsoft', name: 'Microsoft AI', color: '#00A4EF', district: 'Cloud Boulevard', x: 42, z: 42, height: 32, style: 'tower', width: 4.2, depth: 4.2 },
  { id: 'aws', name: 'AWS', color: '#FF9900', district: 'Cloud Boulevard', x: 45, z: 15, height: 29, style: 'monolith', width: 4.2, depth: 4.2 },
  { id: 'nvidia', name: 'Nvidia AI', color: '#76B900', district: 'Hardware Row', x: -30, z: 30, height: 38, style: 'tower', width: 5, depth: 5 },
  { id: 'apple', name: 'Apple', color: '#f5f5f7', district: 'Tools & IDEs', x: -25, z: -25, height: 25, style: 'twin', width: 4, depth: 4 },
  { id: 'xai', name: 'xAI / Grok', color: '#ffffff', district: 'Tools & IDEs', x: -38, z: -28, height: 36, style: 'monolith', width: 4.5, depth: 4.5 },
  { id: 'mistral', name: 'Mistral AI', color: '#f97316', district: 'Open Models', x: 42, z: -38, height: 22, style: 'tower', width: 3.8, depth: 3.8 },
  { id: 'ibm', name: 'IBM / watsonx', color: '#0f62fe', district: 'Enterprise Alley', x: -40, z: 12, height: 28, style: 'monolith', width: 4.2, depth: 4.2 },
  { id: 'cohere', name: 'Cohere', color: '#3b82f6', district: 'Enterprise Alley', x: -45, z: 28, height: 24, style: 'twin', width: 4, depth: 4 },
  { id: 'huggingface', name: 'Hugging Face', color: '#fbbf24', district: 'Open Models', x: 20, z: -42, height: 20, style: 'tower', width: 3.6, depth: 3.6 }
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

export const AICityView: React.FC<AICityViewProps> = ({ onClose }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  
  // Game states
  const [showIntro, setShowIntro] = useState(true);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>([]);
  const [activeQuestIndex, setActiveQuestIndex] = useState(0);
  const [questCompleted, setQuestCompleted] = useState<Record<string, boolean>>({});
  
  // Selected interior building
  const [insideCompanyId, setInsideCompanyId] = useState<string | null>(null);
  const [activeZone, setActiveZone] = useState<'all' | 'platforms' | 'models' | 'docs' | 'learning'>('all');
  
  // Close-range prompt display
  const [nearCompanyId, setNearCompanyId] = useState<string | null>(null);

  // References for game loop
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const playerVehicleRef = useRef<THREE.Group | null>(null);
  
  // Body references for rider pedaling
  const leftThighRef = useRef<THREE.Mesh | null>(null);
  const rightThighRef = useRef<THREE.Mesh | null>(null);
  const leftShinRef = useRef<THREE.Mesh | null>(null);
  const rightShinRef = useRef<THREE.Mesh | null>(null);
  const frontWheelRef = useRef<THREE.Mesh | null>(null);
  const backWheelRef = useRef<THREE.Mesh | null>(null);
  const bicycleForkRef = useRef<THREE.Mesh | null>(null);
  
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

  // Initialize Three.js Game World
  useEffect(() => {
    if (!mountRef.current) return;

    // --- 1. Scene & Environment (Futuristic Sunset/Daylight Style) ---
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color('#0a1628'); // Deep blue-gray upper sunset horizon
    scene.fog = new THREE.FogExp2('#0a1628', 0.009);

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

    // --- 4. Lights (Warm Sunset Glow) ---
    const ambientLight = new THREE.AmbientLight('#a5b4fc', 1.4); // soft ambient indigo blue
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight('#fed7aa', 2.8); // bright orange sun
    sunLight.position.set(80, 50, 60);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    scene.add(sunLight);

    // TechTonic Central Hub Spot Light
    const centerSpot = new THREE.PointLight('#bd9a76', 4.5, 35);
    centerSpot.position.set(0, 10, 0);
    scene.add(centerSpot);

    // --- 5. Rich Road Network with Glowing Circuit Paths ---
    // Ground base plane
    const groundGeo = new THREE.PlaneGeometry(400, 400);
    const groundMat = new THREE.MeshStandardMaterial({
      color: '#111827', // Dark charcoal asphalt
      roughness: 0.9,
      metalness: 0.1
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const roadGroup = new THREE.Group();
    const createRoadSegment = (w: number, l: number, x: number, z: number, rotY: boolean) => {
      const roadGeo = new THREE.PlaneGeometry(w, l);
      const roadMat = new THREE.MeshStandardMaterial({
        color: '#1f2937',
        roughness: 0.8,
        metalness: 0.2
      });
      const roadMesh = new THREE.Mesh(roadGeo, roadMat);
      roadMesh.rotation.x = -Math.PI / 2;
      if (rotY) roadMesh.rotation.z = Math.PI / 2;
      roadMesh.position.set(x, 0.02, z);
      roadMesh.receiveShadow = true;
      roadGroup.add(roadMesh);

      // Add glowing neon yellow dotted lane separators
      const lineCount = Math.floor(l / 8);
      for (let i = 0; i < lineCount; i++) {
        const lineGeo = new THREE.PlaneGeometry(0.12, 2.0);
        const lineMat = new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.25 });
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

      // Add glowing neon green circuit board lines on road shoulders
      const circMat = new THREE.MeshBasicMaterial({ color: '#10b981', transparent: true, opacity: 0.5 });
      const circGeo = new THREE.PlaneGeometry(0.12, l);
      const circLeft = new THREE.Mesh(circGeo, circMat);
      circLeft.rotation.x = -Math.PI / 2;
      const circRight = new THREE.Mesh(circGeo, circMat);
      circRight.rotation.x = -Math.PI / 2;
      
      if (rotY) {
        circLeft.position.set(x, 0.04, z - w / 2 + 0.6);
        circLeft.rotation.z = Math.PI / 2;
        circRight.position.set(x, 0.04, z + w / 2 - 0.6);
        circRight.rotation.z = Math.PI / 2;
      } else {
        circLeft.position.set(x - w / 2 + 0.6, 0.04, z);
        circRight.position.set(x + w / 2 - 0.6, 0.04, z);
      }
      roadGroup.add(circLeft, circRight);

      // Add neon blue border lanes on the edges
      const leftBorderGeo = new THREE.PlaneGeometry(0.08, l);
      const rightBorderGeo = new THREE.PlaneGeometry(0.08, l);
      const borderMat = new THREE.MeshBasicMaterial({ color: '#38bdf8', transparent: true, opacity: 0.4 });
      
      const leftBorder = new THREE.Mesh(leftBorderGeo, borderMat);
      leftBorder.rotation.x = -Math.PI / 2;
      const rightBorder = new THREE.Mesh(rightBorderGeo, borderMat);
      rightBorder.rotation.x = -Math.PI / 2;

      if (rotY) {
        leftBorder.position.set(x, 0.03, z - w / 2);
        leftBorder.rotation.z = Math.PI / 2;
        rightBorder.position.set(x, 0.03, z + w / 2);
        rightBorder.rotation.z = Math.PI / 2;
      } else {
        leftBorder.position.set(x - w / 2, 0.03, z);
        rightBorder.position.set(x + w / 2, 0.03, z);
      }
      roadGroup.add(leftBorder);
      roadGroup.add(rightBorder);
    };

    // Main structural highways
    createRoadSegment(12, 300, 0, 0, false); // N-S Highway
    createRoadSegment(12, 300, 0, 0, true);  // E-W Highway
    
    // Outer grid loop roads
    createRoadSegment(10, 200, 50, 0, false);
    createRoadSegment(10, 200, -50, 0, false);
    createRoadSegment(10, 200, 0, 50, true);
    createRoadSegment(10, 200, 0, -50, true);
    
    scene.add(roadGroup);

    // --- 5.5. Soft Sunset Clouds in the Sky ---
    const cloudsGroup = new THREE.Group();
    const cloudGeo = new THREE.SphereGeometry(15, 8, 8);
    const cloudMat = new THREE.MeshStandardMaterial({
      color: '#fda4af', // warm sunset pinkish-orange
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
      cloud.scale.set(2.0, 0.5, 1.2);
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

      // Light head armature
      const headGeo = new THREE.BoxGeometry(0.3, 0.2, 1.2);
      const head = new THREE.Mesh(headGeo, poleMat);
      head.position.set(x, 7.0, z + (x > 0 ? -0.5 : 0.5));
      streetlightGroup.add(head);

      // Emissive bulb
      const bulbGeo = new THREE.SphereGeometry(0.2, 8, 8);
      const bulbMat = new THREE.MeshBasicMaterial({ color: '#fed7aa' });
      const bulb = new THREE.Mesh(bulbGeo, bulbMat);
      bulb.position.set(x, 6.9, z + (x > 0 ? -0.9 : 0.9));
      streetlightGroup.add(bulb);

      // PointLight casting onto the street
      const light = new THREE.PointLight('#fed7aa', 1.8, 14);
      light.position.set(x, 6.5, z + (x > 0 ? -0.9 : 0.9));
      streetlightGroup.add(light);
    };

    for (let pos = -120; pos <= 120; pos += 40) {
      if (pos === 0) continue; // skip center plaza
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

    // Neon structural accents
    const hqEdges = new THREE.EdgesGeometry(coreHqGeo);
    const hqLineMat = new THREE.LineBasicMaterial({ color: '#bd9a76', linewidth: 3 });
    const hqWire = new THREE.LineSegments(hqEdges, hqLineMat);
    hqWire.position.y = 15;
    hqGroup.add(hqWire);

    // Rotating holographic rings above HQ
    const ringGeo1 = new THREE.TorusGeometry(5, 0.15, 8, 36);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: '#bd9a76', transparent: true, opacity: 0.6 });
    const holoRing1 = new THREE.Mesh(ringGeo1, ringMat1);
    holoRing1.rotation.x = Math.PI / 2;
    holoRing1.position.y = 33;
    hqGroup.add(holoRing1);

    const ringGeo2 = new THREE.TorusGeometry(4, 0.1, 8, 36);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: '#0ea5e9', transparent: true, opacity: 0.4 });
    const holoRing2 = new THREE.Mesh(ringGeo2, ringMat2);
    holoRing2.rotation.x = Math.PI / 2 + 0.2;
    holoRing2.position.y = 35;
    hqGroup.add(holoRing2);

    scene.add(hqGroup);

    // Helper to generate rotating procedural 3D company logo
    const createCompanyLogo = (id: string, color: string): THREE.Group => {
      const logoGroup = new THREE.Group();

      if (id === 'openai') {
        // Rosette OpenAI Pattern (6 overlapping circles)
        for (let i = 0; i < 6; i++) {
          const petalGeo = new THREE.RingGeometry(0.25, 0.32, 16);
          const petalMat = new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide });
          const petal = new THREE.Mesh(petalGeo, petalMat);
          const angleRad = (i * Math.PI) / 3;
          petal.position.set(Math.cos(angleRad) * 0.28, Math.sin(angleRad) * 0.28, 0);
          logoGroup.add(petal);
        }
      } 
      else if (id === 'meta') {
        // Meta Infinity Loop (two toruses side-by-side)
        const ringG = new THREE.TorusGeometry(0.35, 0.08, 8, 20);
        const ringM = new THREE.MeshBasicMaterial({ color });
        const leftLoop = new THREE.Mesh(ringG, ringM);
        leftLoop.position.set(-0.3, 0, 0);
        const rightLoop = new THREE.Mesh(ringG, ringM);
        rightLoop.position.set(0.3, 0, 0);
        logoGroup.add(leftLoop, rightLoop);
      } 
      else if (id === 'google') {
        // Colorful Google Arc Ring
        const colors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853'];
        for (let i = 0; i < 4; i++) {
          const arcGeo = new THREE.TorusGeometry(0.5, 0.09, 8, 12, Math.PI / 2);
          const arcMat = new THREE.MeshBasicMaterial({ color: colors[i] });
          const arc = new THREE.Mesh(arcGeo, arcMat);
          arc.rotation.z = (i * Math.PI) / 2;
          logoGroup.add(arc);
        }
      } 
      else if (id === 'aws') {
        // Orange Arrow Arc
        const arrowGeo = new THREE.TorusGeometry(0.5, 0.08, 8, 12, Math.PI / 3);
        const arrowMat = new THREE.MeshBasicMaterial({ color: '#FF9900' });
        const arrow = new THREE.Mesh(arrowGeo, arrowMat);
        arrow.rotation.z = Math.PI * 1.35;
        logoGroup.add(arrow);
      } 
      else if (id === 'nvidia') {
        // Glowing Green Square core
        const nGeo = new THREE.BoxGeometry(0.7, 0.7, 0.1);
        const nMat = new THREE.MeshBasicMaterial({ color, wireframe: true });
        const nMesh = new THREE.Mesh(nGeo, nMat);
        logoGroup.add(nMesh);
      } 
      else {
        // Generic glowing geometric star/circle logo
        const torusG = new THREE.TorusGeometry(0.4, 0.08, 8, 24);
        const torusM = new THREE.MeshBasicMaterial({ color });
        const torus = new THREE.Mesh(torusG, torusM);
        logoGroup.add(torus);
      }

      return logoGroup;
    };

    // --- 8. High-Fidelity Company Skyscraper Towers ---
    companyConfig.forEach((c) => {
      const towerGroup = new THREE.Group();

      // Skyscraper Glass Core
      const coreGeo = new THREE.BoxGeometry(c.width, c.height, c.depth);
      const coreMat = new THREE.MeshStandardMaterial({
        color: '#080f1d',
        metalness: 0.95,
        roughness: 0.05,
        transparent: true,
        opacity: 0.92,
        emissive: c.color,
        emissiveIntensity: 0.06
      });
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      coreMesh.position.y = c.height / 2;
      coreMesh.castShadow = true;
      coreMesh.receiveShadow = true;
      towerGroup.add(coreMesh);

      // Glowing outline frames
      const edgesGeo = new THREE.EdgesGeometry(coreGeo);
      const lineMat = new THREE.LineBasicMaterial({ color: c.color, linewidth: 2 });
      const wire = new THREE.LineSegments(edgesGeo, lineMat);
      wire.position.y = c.height / 2;
      towerGroup.add(wire);

      // Giant Glowing logo plaque on the front facade
      const logoPlatGeo = new THREE.BoxGeometry(c.width * 0.75, 2.5, 0.1);
      const logoPlatMat = new THREE.MeshStandardMaterial({ color: '#030712', metalness: 0.9 });
      const logoPlaque = new THREE.Mesh(logoPlatGeo, logoPlatMat);
      logoPlaque.position.set(0, c.height * 0.8, c.depth / 2 + 0.05);
      towerGroup.add(logoPlaque);

      // Attach detailed logo
      const brandLogo = createCompanyLogo(c.id, c.color);
      brandLogo.position.set(0, c.height * 0.8, c.depth / 2 + 0.15);
      (brandLogo as any).userData = { isHolo: true }; // rotate it automatically
      towerGroup.add(brandLogo);

      // Blinking beacon light on top
      const beaconGeo = new THREE.SphereGeometry(0.18, 8, 8);
      const beaconMat = new THREE.MeshBasicMaterial({ color: '#ef4444' });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.y = c.height + 0.2;
      towerGroup.add(beacon);

      // Parking / Entrance Area marker ring (Ground glowing circle)
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

      // Base spotlight casting upwards
      const upSpot = new THREE.SpotLight(c.color, 12.0, 18, Math.PI / 6, 0.5, 1.0);
      upSpot.position.set(0, 0.2, 0);
      upSpot.target = towerGroup;
      towerGroup.add(upSpot);

      towerGroup.position.set(c.x, 0, c.z);
      scene.add(towerGroup);
    });

    // --- 8.5. Procedural Background Skyscrapers (METROPOLIS SKYLINE Realism) ---
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
      const d = 4.5 + Math.random() * 5;

      const bgGeo = new THREE.BoxGeometry(w, h, d);
      const bgMat = new THREE.MeshStandardMaterial({
        color: '#0c1524',
        metalness: 0.95,
        roughness: 0.15,
        transparent: true,
        opacity: 0.92,
        emissive: '#111827',
        emissiveIntensity: 0.05
      });
      const bgMesh = new THREE.Mesh(bgGeo, bgMat);
      bgMesh.position.set(bx, h / 2, bz);
      bgMesh.castShadow = true;
      bgMesh.receiveShadow = true;
      bgBuildingsGroup.add(bgMesh);

      // Neon outline edges
      if (Math.random() > 0.4) {
        const edges = new THREE.EdgesGeometry(bgGeo);
        const lineMat = new THREE.LineBasicMaterial({ 
          color: Math.random() > 0.5 ? '#1e293b' : '#334155',
          transparent: true,
          opacity: 0.35
        });
        const wireframe = new THREE.LineSegments(edges, lineMat);
        wireframe.position.set(bx, h / 2, bz);
        bgBuildingsGroup.add(wireframe);
      }
    }
    scene.add(bgBuildingsGroup);

    // --- 9. Third-Person Avatar Riding a 3D Bicycle (FROM MP4 INSPIRATION) ---
    const riderGroup = new THREE.Group();
    
    // Bicycle parts
    const bike = new THREE.Group();
    riderGroup.add(bike);

    // Wheels (Torus)
    const wheelGeo = new THREE.TorusGeometry(0.5, 0.06, 8, 24);
    const wheelMat = new THREE.MeshStandardMaterial({ color: '#111827', roughness: 0.9 });
    
    const fWheel = new THREE.Mesh(wheelGeo, wheelMat);
    fWheel.position.set(0, 0.5, 0.9);
    fWheel.castShadow = true;
    bike.add(fWheel);
    frontWheelRef.current = fWheel;

    const bWheel = new THREE.Mesh(wheelGeo, wheelMat);
    bWheel.position.set(0, 0.5, -0.9);
    bWheel.castShadow = true;
    bike.add(bWheel);
    backWheelRef.current = bWheel;

    // Metallic cyan frame tubes
    const frameMat = new THREE.MeshStandardMaterial({ color: '#0ea5e9', metalness: 0.9, roughness: 0.1 });
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
    const saddleMat = new THREE.MeshStandardMaterial({ color: '#1f2937', roughness: 0.8 });
    const saddle = new THREE.Mesh(saddleGeo, saddleMat);
    saddle.position.set(0, 1.15, -0.25);
    bike.add(saddle);

    // AI Avatar Rider
    const rider = new THREE.Group();
    riderGroup.add(rider);
    
    // Torso (Blue Shirt)
    const shirtMat = new THREE.MeshStandardMaterial({ color: '#2563eb', roughness: 0.7 });
    const torsoGeo = new THREE.CylinderGeometry(0.18, 0.15, 0.7, 8);
    const torso = new THREE.Mesh(torsoGeo, shirtMat);
    torso.position.set(0, 1.5, -0.2);
    torso.rotation.x = Math.PI / 18;
    rider.add(torso);

    // Legs (Blue Jeans)
    const pantsMat = new THREE.MeshStandardMaterial({ color: '#1e3a8a', roughness: 0.8 });
    const legGeo = new THREE.CylinderGeometry(0.08, 0.06, 0.55, 8);
    
    const leftThigh = new THREE.Mesh(legGeo, pantsMat);
    leftThigh.position.set(-0.16, 1.15, -0.15);
    leftThigh.rotation.x = Math.PI / 3;
    rider.add(leftThigh);
    leftThighRef.current = leftThigh;

    const rightThigh = new THREE.Mesh(legGeo, pantsMat);
    rightThigh.position.set(0.16, 1.15, -0.15);
    rightThigh.rotation.x = Math.PI / 6;
    rider.add(rightThigh);
    rightThighRef.current = rightThigh;

    const leftShin = new THREE.Mesh(legGeo, pantsMat);
    leftShin.position.set(-0.16, 0.75, 0.05);
    rider.add(leftShin);
    leftShinRef.current = leftShin;

    const rightShin = new THREE.Mesh(legGeo, pantsMat);
    rightShin.position.set(0.16, 0.75, -0.05);
    rider.add(rightShin);
    rightShinRef.current = rightShin;

    // Head (Skin tone)
    const headGeo = new THREE.SphereGeometry(0.15, 12, 12);
    const headMat = new THREE.MeshStandardMaterial({ color: '#ddb892', roughness: 0.6 });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.set(0, 1.95, -0.1);
    rider.add(head);

    // Hair
    const hairGeo = new THREE.SphereGeometry(0.16, 8, 8);
    const hairMat = new THREE.MeshStandardMaterial({ color: '#27272a', roughness: 0.9 });
    const hair = new THREE.Mesh(hairGeo, hairMat);
    hair.position.set(0, 2.02, -0.12);
    hair.scale.set(1.0, 0.65, 1.0);
    rider.add(hair);

    // Arms
    const armGeo = new THREE.CylinderGeometry(0.05, 0.04, 0.65, 8);
    const leftArm = new THREE.Mesh(armGeo, shirtMat);
    leftArm.position.set(-0.25, 1.45, 0.15);
    leftArm.rotation.x = -Math.PI / 4;
    leftArm.rotation.z = Math.PI / 12;
    rider.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, shirtMat);
    rightArm.position.set(0.25, 1.45, 0.15);
    rightArm.rotation.x = -Math.PI / 4;
    rightArm.rotation.z = -Math.PI / 12;
    rider.add(rightArm);

    // Setup bike position
    riderGroup.position.set(0, 0, 10);
    scene.add(riderGroup);
    playerVehicleRef.current = riderGroup;

    // --- 10. Floating Knowledge Artifacts ("AI Chips") ---
    const chipsGroup = new THREE.Group();
    const chipMeshMap: Record<string, THREE.Mesh> = {};
    companyConfig.forEach((c) => {
      // Spawn floating chips in front of each building
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

    // --- 10.7. Flying Traffic Drones ---
    const dronesCount = 15;
    const dronesGroup = new THREE.Group();
    const droneDataList: { mesh: THREE.Group; startZ: number; speed: number; direction: number }[] = [];

    for (let d = 0; d < dronesCount; d++) {
      const droneMesh = new THREE.Group();
      
      const droneBodyGeo = new THREE.BoxGeometry(0.8, 0.2, 1.4);
      const droneBodyMat = new THREE.MeshStandardMaterial({ color: '#090d16', emissive: '#0ea5e9', emissiveIntensity: 0.2 });
      const droneBody = new THREE.Mesh(droneBodyGeo, droneBodyMat);
      droneMesh.add(droneBody);

      const droneLightGeo = new THREE.SphereGeometry(0.15, 8, 8);
      const droneLightMat = new THREE.MeshBasicMaterial({ color: Math.random() > 0.5 ? '#00e5ff' : '#bd9a76' });
      const droneLight = new THREE.Mesh(droneLightGeo, droneLightMat);
      droneLight.position.set(0, 0, 0.7);
      droneMesh.add(droneLight);

      const roadLane = Math.random() > 0.5 ? 3.0 : -3.0;
      const startX = Math.random() > 0.5 ? roadLane : (Math.random() - 0.5) * 200;
      const startZ = Math.random() > 0.5 ? (Math.random() - 0.5) * 200 : roadLane;
      const height = 5 + Math.random() * 8;
      
      droneMesh.position.set(startX, height, startZ);
      dronesGroup.add(droneMesh);

      droneDataList.push({
        mesh: droneMesh,
        startZ: startZ,
        speed: 0.3 + Math.random() * 0.4,
        direction: Math.random() > 0.5 ? 1 : -1
      });
    }
    scene.add(dronesGroup);

    // --- 11. Game Animation & Physics Loop ---
    let frameId: number;

    const gameLoop = () => {
      frameId = requestAnimationFrame(gameLoop);

      // Handle vehicle inputs
      const isUp = keysPressed.current['w'] || keysPressed.current['arrowup'];
      const isDown = keysPressed.current['s'] || keysPressed.current['arrowdown'];
      const isLeft = keysPressed.current['a'] || keysPressed.current['arrowleft'];
      const isRight = keysPressed.current['d'] || keysPressed.current['arrowright'];

      // Acceleration / Deceleration (Bicycle pedaling speed logic)
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

        // Apply a gentle hovering bounce animation (sine wave)
        const timeNow = performance.now();
        const bounce = Math.sin(timeNow * 0.005) * 0.02;
        playerVehicleRef.current.position.y = bounce;

        // Pedaling joints trigonometric animation
        if (leftThighRef.current && rightThighRef.current && leftShinRef.current && rightShinRef.current) {
          const pedalCycle = timeNow * 0.018 * velocity.current;
          const leftAngle = pedalCycle;
          const rightAngle = pedalCycle + Math.PI;

          // Leg joints swing back/forth simulating pedals pushing down
          leftThighRef.current.rotation.x = Math.PI / 4 + Math.sin(leftAngle) * 0.35;
          rightThighRef.current.rotation.x = Math.PI / 4 + Math.sin(rightAngle) * 0.35;
          leftShinRef.current.rotation.x = Math.PI / 6 + Math.cos(leftAngle) * 0.25;
          rightShinRef.current.rotation.x = Math.PI / 6 + Math.cos(rightAngle) * 0.25;
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

      // Move background traffic drones
      droneDataList.forEach((drone) => {
        drone.mesh.position.z += drone.speed * drone.direction;
        if (drone.mesh.position.z > 150) {
          drone.mesh.position.z = -150;
        } else if (drone.mesh.position.z < -150) {
          drone.mesh.position.z = 150;
        }
        drone.mesh.position.y += Math.sin(performance.now() * 0.003 + drone.startZ) * 0.01;
      });

      // --- Chase Camera Follow (FITTED TO VIDEO - CLOSER THIRD-PERSON ANGLE) ---
      if (cameraRef.current && playerVehicleRef.current) {
        const targetPos = playerVehicleRef.current.position;
        const camDistance = 8.5; // Closer view matching the MP4
        const camHeight = 3.6;   // Lower angle directly behind rider
        
        const idealCamX = targetPos.x - Math.sin(angle.current) * camDistance;
        const idealCamZ = targetPos.z - Math.cos(angle.current) * camDistance;
        const idealCamY = targetPos.y + camHeight;

        cameraRef.current.position.x += (idealCamX - cameraRef.current.position.x) * 0.085;
        cameraRef.current.position.z += (idealCamZ - cameraRef.current.position.z) * 0.085;
        cameraRef.current.position.y += (idealCamY - cameraRef.current.position.y) * 0.085;

        const lookTarget = new THREE.Vector3(
          targetPos.x + Math.sin(angle.current) * 1.5,
          targetPos.y + 1.2, // Look at the torso/handlebars level
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
              onClick={() => setShowIntro(false)}
              className="w-full py-3 rounded-xl bg-brand-gold hover:bg-brand-gold-bright text-brand-navy-dark text-xs sm:text-sm font-extrabold uppercase tracking-widest cursor-pointer shadow-lg shadow-brand-gold/20 transition-all active:scale-95"
            >
              Start Driving
            </button>
          </div>
        </div>
      )}

      {/* 3D Canvas Mounting Point */}
      <div ref={mountRef} className="w-full h-full relative z-10" />

      {/* Game HUD Overlay */}
      <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-4 sm:p-6">
        
        {/* Top HUD: Level, XP, Exit controls */}
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

          {/* Right Exit HUD */}
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-950/40 hover:bg-red-900 border border-red-500/20 hover:border-red-500 text-xs font-bold uppercase tracking-widest text-slate-200 transition-all cursor-pointer shadow-lg active:scale-95"
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
                        className="mt-6 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-200 hover:text-brand-navy-dark bg-brand-navy-light/10 hover:bg-brand-gold transition-all border border-brand-gold/20 hover:border-transparent cursor-pointer"
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
                        className="mt-6 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-200 hover:text-brand-navy-dark bg-brand-navy-light/10 hover:bg-brand-gold transition-all border border-brand-gold/20 hover:border-transparent cursor-pointer"
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
                        className="mt-6 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-200 hover:text-brand-navy-dark bg-brand-navy-light/10 hover:bg-brand-gold transition-all border border-brand-gold/20 hover:border-transparent cursor-pointer"
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
