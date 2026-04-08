'use client';

import { useFrame } from '@react-three/fiber';
import { useXR, useController } from '@react-three/xr';
import { useRef } from 'react';
import * as THREE from 'three';

export default function PlayerVRControls({ speed = 3 }) {
  const { isPresenting } = useXR();
  const controller = useController('left'); // You can also try 'right'
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!isPresenting || !controller || !controller.inputSource?.gamepad) return;

    const [x, y] = controller.inputSource.gamepad.axes;

    const direction = new THREE.Vector3();
    controller.controller.getWorldDirection(direction);
    direction.y = 0;
    direction.normalize();

    const right = new THREE.Vector3().crossVectors(direction, new THREE.Vector3(0, 1, 0));
    const move = direction.multiplyScalar(-y).add(right.multiplyScalar(x)).normalize().multiplyScalar(speed * delta);

    controller.controller.parent?.position.add(move);
  });

  return <group ref={ref} />;
}
