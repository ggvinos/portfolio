"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { TextureLoader, type Mesh } from "three";

/**
 * Lua real: esfera 3D com a textura da NASA (via Solar System Scope,
 * CC BY 4.0 — https://www.solarsystemscope.com/textures/), não mais
 * crateras desenhadas à mão em CSS. Gira devagar conforme a página rola,
 * "interativa com o scroll" como pedido — sem exigir arrastar nada.
 */

function EsferaLua() {
  const ref = useRef<Mesh>(null);
  const textura = useLoader(TextureLoader, "/textures/moon-1k.jpg");
  const scrollY = useRef(0);
  const reduzMovimento = useRef(false);

  useEffect(() => {
    reduzMovimento.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onScroll = () => {
      scrollY.current = window.scrollY;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame(() => {
    if (!ref.current || reduzMovimento.current) return;
    // rotacao amarrada ao scroll da pagina inteira, nao so do hero — a lua
    // continua girando devagar enquanto ela estiver visivel na tela
    ref.current.rotation.y = scrollY.current * 0.0012;
    ref.current.rotation.x = -0.15;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 48, 48]} />
      <meshStandardMaterial map={textura} roughness={1} metalness={0} />
    </mesh>
  );
}

export default function Moon3D({
  size,
  style,
}: {
  size: number;
  style?: React.CSSProperties;
}) {
  // WebGL so entra depois do mount — SSR nao tem canvas, e o dev server
  // recompila em cima do build isolado, entao vale nao arriscar renderizar
  // isso no servidor
  const [pronto, setPronto] = useState(false);
  useEffect(() => setPronto(true), []);

  return (
    <div aria-hidden="true" className="absolute moon3d-canvas-fill" style={{ width: size, height: size, ...style }}>
      {pronto && (
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          camera={{ position: [0, 0, 2.4], fov: 40 }}
          // largura/altura 100% via CSS puro, sem depender do
          // ResizeObserver que o R3F usa por padrao — em navegadores/abas
          // sem composicao ativa esse observer as vezes nao dispara, e o
          // canvas ficaria travado no tamanho padrao do HTML (300x150)
          style={{ background: "transparent", width: "100%", height: "100%" }}
        >
          <ambientLight intensity={0.55} />
          {/* luz vindo de cima-esquerda, mesma direcao do resto da composicao */}
          <directionalLight position={[-1.4, 1.2, 1.6]} intensity={2.1} />
          <EsferaLua />
        </Canvas>
      )}
    </div>
  );
}
