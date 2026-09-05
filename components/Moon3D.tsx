"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useLoader, useFrame, useThree } from "@react-three/fiber";
import { TextureLoader, Vector2, type Mesh } from "three";

// reutilizado a cada frame em vez de criar um Vector2 novo por chamada
const TAMANHO_TMP = new Vector2();

/**
 * Lua real: esfera 3D com a textura da NASA (via Solar System Scope,
 * CC BY 4.0 — https://www.solarsystemscope.com/textures/), não mais
 * crateras desenhadas à mão em CSS. Gira devagar conforme a página rola,
 * "interativa com o scroll" como pedido — sem exigir arrastar nada.
 */

function EsferaLua({ ladoAlvo }: { ladoAlvo: number }) {
  const ref = useRef<Mesh>(null);
  const textura = useLoader(TextureLoader, "/textures/moon-1k.jpg");
  const scrollY = useRef(0);
  const reduzMovimento = useRef(false);
  const { gl, camera } = useThree();

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
    // reforcado a CADA frame, nao so na criacao: o onCreated sozinho nao
    // bastou (nao dava pra confirmar se disparava, ou algo depois
    // sobrescrevia). Checagem e barata (2 comparacoes), so mexe de verdade
    // se o buffer estiver errado — corrige um R3F que nunca mediu direito
    // o container (ResizeObserver que nao dispara) de forma continua,
    // em vez de depender de um unico evento que pode nao rodar ou ser
    // sobrescrito depois.
    const tamanhoAtual = gl.getSize(TAMANHO_TMP);
    if (Math.round(tamanhoAtual.width) !== ladoAlvo || Math.round(tamanhoAtual.height) !== ladoAlvo) {
      gl.setSize(ladoAlvo, ladoAlvo, false);
      if ("aspect" in camera && (camera as any).aspect !== 1) {
        (camera as any).aspect = 1;
        camera.updateProjectionMatrix();
      }
    }

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
          camera={{ position: [0, 0, 2.4], fov: 40, aspect: 1 }}
          // largura/altura 100% via CSS puro, sem depender do
          // ResizeObserver que o R3F usa por padrao — em navegadores/abas
          // sem composicao ativa esse observer as vezes nao dispara, e o
          // canvas ficaria travado no tamanho padrao do HTML (300x150)
          style={{ background: "transparent", width: "100%", height: "100%" }}
        >
          <ambientLight intensity={0.55} />
          {/* luz vindo de cima-esquerda, mesma direcao do resto da composicao */}
          <directionalLight position={[-1.4, 1.2, 1.6]} intensity={2.1} />
          <EsferaLua ladoAlvo={size} />
        </Canvas>
      )}
    </div>
  );
}
