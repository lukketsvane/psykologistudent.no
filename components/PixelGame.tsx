import React, { useRef, useEffect } from 'react';

export const PixelGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const touchOrigin = useRef<number | null>(null);
  const touchCurrent = useRef<number | null>(null);
  const startX = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const CTX_HEIGHT = 80;
    let CTX_WIDTH = 160;

    canvas.width = CTX_WIDTH;
    canvas.height = CTX_HEIGHT;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;

    const resizeCanvas = () => {
        const rect = canvas.getBoundingClientRect();
        if (!rect.width || !rect.height) return;

        const nextWidth = Math.max(160, Math.round((rect.width / rect.height) * CTX_HEIGHT));
        if (nextWidth === CTX_WIDTH) return;

        CTX_WIDTH = nextWidth;
        canvas.width = CTX_WIDTH;
        canvas.height = CTX_HEIGHT;
        ctx.imageSmoothingEnabled = false;
    };

    const WORLD_WIDTH = 1400;
    const GROUND_Y = 68;

    let playerX = 50;
    let playerY = GROUND_Y - 8;
    let playerVY = 0;
    const GRAVITY = 0.3;
    const JUMP_FORCE = -2.6;
    let isGrounded = true;

    let cameraX = 0;
    let frame = 0;
    let direction = 1;
    let speed = 0;

    const mountainsBack: number[] = [];
    const mountainsFront: number[] = [];
    const ulrikenProfile = [10, 9, 8, 7, 6, 6, 5, 5, 4, 5, 6, 7, 8, 9, 10, 11, 10, 9, 8, 7, 6, 5, 4, 3, 4, 5, 6, 7, 8, 9, 10, 11];

    const backBlockHeights = [20, 24, 28, 32, 36, 40, 36, 32, 28, 24, 20, 16, 20, 24, 28, 35, 42, 35, 28];

    for(let i=0; i<WORLD_WIDTH; i++) {

        const blockStep = 30;
        const idx = Math.floor(i / blockStep) % backBlockHeights.length;
        const macroVariation = Math.floor(i / 200) % 2 === 0 ? 0 : 5;
        const backH = backBlockHeights[idx] + macroVariation;
        mountainsBack.push(CTX_HEIGHT - backH);

        const profileIndex = Math.floor(i / 8) % ulrikenProfile.length;
        const noise = Math.floor(Math.random() * 2);
        const baseH = ulrikenProfile[profileIndex] * 1.8 + 12;
        mountainsFront.push(CTX_HEIGHT - baseH + noise);
    }

    const clouds: {x: number, y: number, w: number, h: number, speed: number}[] = [];
    for(let i=0; i<8; i++) {
        clouds.push({
            x: Math.random() * WORLD_WIDTH,
            y: Math.random() * 25 + 2,
            w: 12 + Math.random() * 15,
            h: 3 + Math.random() * 4,
            speed: 0.02 + Math.random() * 0.05
        });
    }

    interface Pigeon {
        x: number;
        y: number;
        state: 'idle' | 'flying';
        vx: number;
        vy: number;
        frameOffset: number;
        color: string;
    }
    const pigeons: Pigeon[] = [];
    for(let i=0; i<12; i++) {
        pigeons.push({
            x: Math.random() * WORLD_WIDTH,
            y: GROUND_Y,
            state: 'idle',
            vx: 0,
            vy: 0,
            frameOffset: Math.floor(Math.random() * 10),
            color: Math.random() > 0.5 ? '#a8a29e' : '#78716c'
        });
    }

    const RAIN_ZONE_START = 250;
    const RAIN_ZONE_END = 670;
    const rain: {x: number, y: number, speed: number}[] = [];
    for(let i=0; i<80; i++) {
        rain.push({
            x: RAIN_ZONE_START + Math.random() * (RAIN_ZONE_END - RAIN_ZONE_START),
            y: Math.random() * CTX_HEIGHT,
            speed: 1.5 + Math.random() * 2
        });
    }

    type DecorType = 'grass'|'tree'|'lamp'|'flower'|'grass_tuft'|'house_white'|'house_red'|'house_yellow';
    const decor: {x: number, type: DecorType, color?: string}[] = [];

    const blueStoneX = 100;
    const bryggenStart = 280;
    const bryggenWidth = 260;
    const floiX = 650;
    const parkStart = 720;
    const parkEnd = 920;
    const haukelandX = 1050;
    const churchX = 1300;

    const isZoneClear = (x: number) => {
        if (x > blueStoneX - 30 && x < blueStoneX + 30) return false;
        if (x > bryggenStart - 20 && x < bryggenStart + bryggenWidth + 20) return false;
        if (x > floiX - 50 && x < floiX + 60) return false;
        if (x > haukelandX - 60 && x < haukelandX + 100) return false;
        if (x > churchX - 60 && x < churchX + 60) return false;
        return true;
    };

    for(let i=0; i<WORLD_WIDTH; i+= Math.random() * 8 + 2) {
        if (i > parkStart && i < parkEnd) {
             const r = Math.random();
             if (r > 0.3) {
                 decor.push({ x: i, type: 'grass_tuft' });
             } else if (r > 0.1) {
                 const flowerCols = ['#facc15', '#f472b6', '#a78bfa', '#ffffff'];
                 decor.push({
                     x: i,
                     type: 'flower',
                     color: flowerCols[Math.floor(Math.random()*flowerCols.length)]
                 });
             }
             if (i % 30 === 0 && Math.random() > 0.5) {
                decor.push({ x: i, type: 'tree' });
             }
             continue;
        }

        if (!isZoneClear(i)) continue;

        const r = Math.random();

        if (i % 20 === 0 && r > 0.3) {
            const houseTypes: DecorType[] = ['house_white', 'house_red', 'house_yellow'];
            decor.push({ x: i, type: houseTypes[Math.floor(Math.random()*3)] });
            i+=14;
        }
        else if (i % 25 === 0 && r > 0.8) {
             decor.push({ x: i, type: 'lamp' });
             i+=5;
        } else if (r > 0.85) {
            decor.push({ x: i, type: 'tree' });
            i+=10;
        } else if (r > 0.6) {
            decor.push({ x: i, type: 'grass_tuft' });
        }
    }

    const handleJump = () => {
        if (isGrounded) {
            playerVY = JUMP_FORCE;
            isGrounded = false;
        }
    };

    const handleTouchStart = (e: TouchEvent) => {
        e.preventDefault();
        touchOrigin.current = e.touches[0].clientX;
        touchCurrent.current = e.touches[0].clientX;
        startX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
        e.preventDefault();
        touchCurrent.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
        e.preventDefault();
        if (startX.current !== null && touchCurrent.current !== null) {
            const dist = Math.abs(touchCurrent.current - startX.current);

            if (dist < 10) {
                handleJump();
            }
        } else {

             handleJump();
        }
        touchOrigin.current = null;
        touchCurrent.current = null;
        startX.current = null;
    };

    const handleMouseDown = (e: MouseEvent) => {
        touchOrigin.current = e.clientX;
        touchCurrent.current = e.clientX;
        startX.current = e.clientX;
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (touchOrigin.current !== null) touchCurrent.current = e.clientX;
    };

    const handleMouseUp = (e: MouseEvent) => {
        if (startX.current !== null) {
            const dist = Math.abs(e.clientX - startX.current);
            if (dist < 5) handleJump();
        }
        touchOrigin.current = null;
        touchCurrent.current = null;
        startX.current = null;
    };

    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: false });
    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    const drawRect = (color: string, x: number, y: number, w: number, h: number) => {
        ctx.fillStyle = color;
        ctx.fillRect(Math.floor(x), Math.floor(y), Math.floor(w), Math.floor(h));
    };

    const drawPixel = (color: string, x: number, y: number) => {
        drawRect(color, x, y, 1, 1);
    };

    const drawBlueStone = (offsetX: number, camX: number) => {
        const x = blueStoneX + offsetX - camX;
        const y = GROUND_Y;
        if (x < -20 || x > CTX_WIDTH + 20) return;

        drawRect('rgba(0,0,0,0.1)', x - 6, y, 12, 2);
        drawRect('#3498db', x - 4, y - 10, 8, 10);
        drawRect('#2980b9', x + 4, y - 9, 2, 9);
        drawRect('#5dade2', x - 3, y - 11, 8, 1);
        drawRect('#333', x + 8, y - 6, 2, 6);
        drawRect('#ecf0f1', x + 8, y - 8, 2, 2);
    };

    const drawFløibanen = (offsetX: number, camX: number) => {
        const x = floiX + offsetX - camX;
        const y = GROUND_Y;
        if (x < -50 || x > CTX_WIDTH + 50) return;

        drawRect('#5d4037', x - 5, y - 8, 12, 8);
        drawRect('#3e2723', x - 2, y - 6, 4, 6);
        drawRect('#fff', x - 8, y - 12, 18, 4);
        drawRect('#8d6e63', x - 7, y - 11, 16, 1);

        for(let i=0; i<60; i++) {
            drawPixel('#555', x + i + 2, y - i - 8);
            if(i%5===0) drawRect('#3e2723', x + i + 2, y - i - 7, 1, 10);
        }

        const carAnim = (Math.floor(frame / 1.5) % 100);
        const carPos = carAnim < 50 ? carAnim : 100 - carAnim;
        const trackProgress = Math.min(carPos, 55);
        const cx = x + trackProgress + 2;
        const cy = y - trackProgress - 14;

        drawRect('#c0392b', cx, cy, 10, 6);
        drawRect('#87ceeb', cx+2, cy+1, 2, 2);
        drawRect('#87ceeb', cx+6, cy+1, 2, 2);
        drawRect('#222', cx+1, cy+6, 2, 1);
        drawRect('#222', cx+7, cy+6, 2, 1);
    };

    const drawHaukelandComplex = (offsetX: number, camX: number) => {
        const x = haukelandX + offsetX - camX;
        if (x < -60 || x > CTX_WIDTH + 60) return;

        drawRect('#d0c8b0', x - 12, GROUND_Y - 30, 24, 30);
        drawRect('#b0a890', x + 12, GROUND_Y - 30, 2, 30);
        drawRect('#555', x - 10, GROUND_Y - 32, 20, 2);
        drawRect('#e74c3c', x - 1, GROUND_Y - 34, 3, 1);
        drawPixel('#e74c3c', x, GROUND_Y - 35);
        drawPixel('#e74c3c', x, GROUND_Y - 33);

        for(let wy=GROUND_Y - 26; wy < GROUND_Y - 4; wy+=3) {
            for(let wx=x-10; wx < x+10; wx+=3) {
                drawPixel('#2c3e50', wx, wy);
            }
        }
        drawRect('#333', x - 4, GROUND_Y - 4, 8, 4);

        drawRect('#7f8c8d', x - 20, GROUND_Y - 8, 1, 8);
        drawRect('#2980b9', x - 22, GROUND_Y - 12, 5, 4);
        drawRect('#fff', x - 21, GROUND_Y - 11, 3, 2);
        drawPixel('#2980b9', x - 20, GROUND_Y - 11);
        drawPixel('#2980b9', x - 20, GROUND_Y - 10);

        const sx = x + 20;
        drawRect('#ecf0f1', sx, GROUND_Y - 8, 3, 8);
        drawRect('#34495e', sx, GROUND_Y - 2, 1, 2);
        drawRect('#34495e', sx+2, GROUND_Y - 2, 1, 2);
        drawRect('#ffdbac', sx, GROUND_Y - 10, 3, 2);

        const lx = x + 30;
        drawRect('#7f8c8d', lx, GROUND_Y - 4, 6, 1);
        drawRect('#7f8c8d', lx, GROUND_Y - 3, 1, 3);
        drawRect('#7f8c8d', lx+5, GROUND_Y - 3, 1, 3);
        drawRect('#e74c3c', lx+3, GROUND_Y - 6, 2, 2);
    };

    const drawAmbulance = (offsetX: number, camX: number) => {
        const x = haukelandX + offsetX - camX - 35;
        const y = GROUND_Y - 6;
        if (x < -20 || x > CTX_WIDTH + 20) return;

        drawRect('#f1c40f', x, y, 16, 6);
        drawRect('#87ceeb', x + 11, y + 1, 4, 2);
        drawRect('#27ae60', x, y + 3, 16, 1);
        drawRect('#333', x + 2, y + 5, 3, 1);
        drawRect('#333', x + 11, y + 5, 3, 1);
        if (Math.floor(frame / 8) % 2 === 0) {
            drawRect('#3498db', x + 1, y - 1, 2, 1);
        } else {
            drawRect('#3498db', x + 10, y - 1, 2, 1);
        }
    };

    const drawSmallHouse = (x: number, y: number, color: string) => {
        drawRect(color, x, y - 10, 8, 10);
        drawRect('#451a03', x - 1, y - 12, 10, 2);
        drawRect('#451a03', x + 1, y - 13, 6, 1);
        drawRect('#292524', x + 4, y - 4, 2, 4);
        drawRect('#292524', x + 2, y - 7, 1, 2);
    }

    const renderDecor = (d: typeof decor[0], offset: number, camX: number) => {
        const x = d.x + offset - camX;
        if (x < -10 || x > CTX_WIDTH + 10) return;

        if (d.type.startsWith('house')) {
            let color = '#e5e5e5';
            if (d.type === 'house_red') color = '#991b1b';
            if (d.type === 'house_yellow') color = '#d97706';
            drawSmallHouse(x, GROUND_Y, color);
        } else if (d.type === 'grass_tuft') {
             const sway = Math.floor(Math.sin((frame + d.x) * 0.1) * 1.5);
             drawRect('#65a30d', x, GROUND_Y - 2, 1, 2);
             drawRect('#65a30d', x + sway, GROUND_Y - 3, 1, 1);
        } else if (d.type === 'flower') {
             const sway = Math.floor(Math.sin((frame + d.x) * 0.1) * 1.5);
             drawRect('#4d7c0f', x, GROUND_Y - 4, 1, 4);
             drawRect(d.color!, x - 1 + sway, GROUND_Y - 5, 3, 2);
             drawRect('#ffffff', x + sway, GROUND_Y - 5, 1, 1);
        } else if (d.type === 'tree') {
            drawRect('#451a03', x, GROUND_Y - 6, 2, 6);
            drawRect('#14532d', x - 4, GROUND_Y - 20, 10, 14);
            drawRect('#15803d', x - 3, GROUND_Y - 18, 8, 5);
        } else if (d.type === 'lamp') {
            drawRect('#1c1917', x, GROUND_Y - 18, 1, 18);
            drawRect('#fef08a', x - 1, GROUND_Y - 19, 3, 3);
        }
    };

    const drawJohanneskirken = (offsetX: number, camX: number) => {
        const x = churchX + offsetX - camX;
        if (x < -50 || x > CTX_WIDTH + 50) return;

        const baseC = '#b91c1c';
        const roofC = '#0f766e';
        drawRect(baseC, x - 20, GROUND_Y - 30, 40, 30);
        drawRect(roofC, x - 22, GROUND_Y - 38, 44, 8);
        drawRect(baseC, x - 8, GROUND_Y - 55, 16, 25);
        drawRect(roofC, x - 9, GROUND_Y - 65, 18, 10);
        drawRect(roofC, x - 2, GROUND_Y - 72, 4, 7);
        drawRect('#fbbf24', x - 1, GROUND_Y - 76, 2, 6);
        drawRect('#fbbf24', x - 3, GROUND_Y - 74, 6, 2);
        drawRect('#7f1d1d', x - 5, GROUND_Y - 12, 10, 12);
        drawRect('#450a0a', x - 14, GROUND_Y - 20, 4, 10);
        drawRect('#450a0a', x + 10, GROUND_Y - 20, 4, 10);
    };

    const drawBryggen = (offsetX: number, camX: number) => {
        const startX = bryggenStart + offsetX;
        const screenX = startX - camX;
        if (screenX > CTX_WIDTH || screenX + bryggenWidth < -50) return;

        const buildings = [
            { w: 22, h: 42, c: '#991b1b' },
            { w: 20, h: 38, c: '#d97706' },
            { w: 24, h: 45, c: '#e5e5e5' },
            { w: 21, h: 40, c: '#b91c1c' },
            { w: 19, h: 36, c: '#84cc16' },
            { w: 23, h: 44, c: '#fcd34d' },
            { w: 20, h: 39, c: '#7f1d1d' },
        ];

        let cx = screenX;
        const totalW = buildings.reduce((a,b)=>a+b.w, 0);
        drawRect('#78350f', screenX - 5, GROUND_Y, totalW + 10, 4);
        for(let i=0; i<totalW; i+=12) drawRect('#451a03', screenX + i, GROUND_Y + 1, 1, 3);

        buildings.forEach(b => {
            drawRect(b.c, cx, GROUND_Y - b.h, b.w, b.h);
            drawRect('#450a0a', cx - 1, GROUND_Y - b.h - 8, b.w + 2, 8);
            drawRect('#450a0a', cx + b.w/2 - 2, GROUND_Y - b.h - 11, 4, 3);
            for(let wy=12; wy<b.h-8; wy+=9) {
                drawRect('#1c1917', cx + 4, GROUND_Y - b.h + wy, 4, 5);
                drawRect('#1c1917', cx + b.w - 8, GROUND_Y - b.h + wy, 4, 5);
            }
            drawRect('#451a03', cx + b.w/2 - 3, GROUND_Y - b.h + 2, 6, 6);
            cx += b.w;
        });
    };

    const drawDog = (x: number, y: number, dir: number, isMoving: boolean) => {
        const bob = (isMoving && Math.floor(frame / 4) % 2 === 0) ? 1 : 0;
        ctx.save();
        if (dir === -1) {
            ctx.translate(x + 10, 0);
            ctx.scale(-1, 1);
            ctx.translate(-(x + 10), 0);
        }

        const fur = '#ea580c';
        drawRect(fur, x, y + bob, 10, 5);
        drawRect(fur, x + 7, y - 4 + bob, 5, 5);
        drawRect('#78350f', x + 8, y - 3 + bob, 2, 3);

        const legFrame = Math.floor(frame / 5) % 2;
        if (!isGrounded) {
             drawRect(fur, x + 1, y + 4 + bob, 2, 3);
             drawRect(fur, x + 8, y + 6 + bob, 2, 3);
        } else if (isMoving) {
            if (legFrame === 0) {
                drawRect(fur, x + 1, y + 5 + bob, 2, 3);
                drawRect(fur, x + 7, y + 5 + bob, 2, 3);
            } else {
                drawRect(fur, x + 2, y + 5 + bob, 2, 3);
                drawRect(fur, x + 6, y + 5 + bob, 2, 3);
            }
        } else {
            drawRect(fur, x + 1, y + 5 + bob, 2, 3);
            drawRect(fur, x + 7, y + 5 + bob, 2, 3);
        }
        drawRect(fur, x - 2, y + bob - 1, 2, 2);
        ctx.restore();
    };

    const drawPigeon = (p: Pigeon, offsetX: number, camX: number) => {
        const px = p.x + offsetX - camX;
        const py = p.y;
        if (px < -10 || px > CTX_WIDTH + 10) return;

        const color = p.color;

        if (p.state === 'idle') {

            const peck = Math.floor(frame / 10 + p.frameOffset) % 4 === 0;
            drawRect(color, px, py - 3, 3, 3);
            if (peck) {
                drawRect('#d6d3d1', px + 2, py - 1, 2, 1);
            } else {
                drawRect('#d6d3d1', px + 2, py - 4, 2, 1);
            }
        } else {

            const flap = Math.floor(frame / 3) % 2 === 0;
            drawRect(color, px, py - 3, 3, 2);
            if (flap) {

                drawRect('#e7e5e4', px - 2, py - 5, 2, 3);
                drawRect('#e7e5e4', px + 3, py - 5, 2, 3);
            } else {

                drawRect('#e7e5e4', px - 2, py - 1, 2, 2);
                drawRect('#e7e5e4', px + 3, py - 1, 2, 2);
            }
            drawRect('#d6d3d1', px + 2, py - 4, 2, 1);
        }
    };

    const render = () => {
        if (!canvasRef.current) return;
        resizeCanvas();

        if (touchOrigin.current !== null && touchCurrent.current !== null) {
            const delta = touchCurrent.current - touchOrigin.current;
            if (Math.abs(delta) > 5) {
                direction = delta > 0 ? 1 : -1;
                speed = Math.min(3, Math.abs(delta) / 10);
            } else { speed = 0; }
        } else { speed = 0; }

        if (speed > 0) playerX += speed * direction;

        if (playerX > WORLD_WIDTH) playerX = 0;
        if (playerX < 0) playerX = WORLD_WIDTH;

        playerVY += GRAVITY;
        playerY += playerVY;

        if (playerY > GROUND_Y - 8) {
            playerY = GROUND_Y - 8;
            playerVY = 0;
            isGrounded = true;
        }

        cameraX = playerX - CTX_WIDTH / 2 + 5;

        pigeons.forEach(p => {
            if (p.state === 'idle') {
                const dist = Math.abs(p.x - playerX);

                if (dist < 40 || Math.abs(p.x - (playerX + WORLD_WIDTH)) < 40 || Math.abs(p.x - (playerX - WORLD_WIDTH)) < 40) {
                    p.state = 'flying';

                    const dir = p.x > playerX ? 1 : -1;
                    p.vx = dir * (1 + Math.random());
                    p.vy = -1.5 - Math.random();
                }
            } else {

                p.x += p.vx;
                p.y += p.vy;
                p.vy -= 0.05;

                if (p.y < -50) {
                    p.state = 'idle';
                    p.y = GROUND_Y;
                    p.x = Math.random() * WORLD_WIDTH;
                    p.vx = 0;
                    p.vy = 0;
                }
            }
        });

        const grd = ctx.createLinearGradient(0,0,0,CTX_HEIGHT);
        grd.addColorStop(0, '#7dd3fc');
        grd.addColorStop(1, '#bae6fd');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, CTX_WIDTH, CTX_HEIGHT);

        ctx.fillStyle = '#94a3b8';
        for(let i=0; i < CTX_WIDTH + 10; i++) {
            let wx = Math.floor(cameraX * 0.1 + i);
            while(wx < 0) wx += WORLD_WIDTH;
            wx = wx % WORLD_WIDTH;
            const h = mountainsBack[wx];
            ctx.fillRect(i, h, 1, CTX_HEIGHT - h);
        }

        ctx.fillStyle = '#34495e';
        for(let i=0; i < CTX_WIDTH + 10; i++) {
            let wx = Math.floor(cameraX * 0.2 + i);
            while(wx < 0) wx += WORLD_WIDTH;
            wx = wx % WORLD_WIDTH;
            const h = mountainsFront[wx];
            ctx.fillRect(i, h, 1, CTX_HEIGHT - h);
            if (h < CTX_HEIGHT - 60) {
                 ctx.fillStyle = '#ecf0f1';
                 ctx.fillRect(i, h, 1, 2);
                 ctx.fillStyle = '#34495e';
            }
        }

        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        clouds.forEach(c => {
            c.x -= c.speed;
            if (c.x < -c.w) c.x = WORLD_WIDTH;
            const sx = Math.floor(c.x - cameraX * 0.1);
            const renderC = (ox: number) => {
                 const x = sx + ox;
                 if (x + c.w > 0 && x < CTX_WIDTH) ctx.fillRect(x, c.y, c.w, c.h);
            };
            renderC(0);
            renderC(WORLD_WIDTH * 5);
        });

        [0, WORLD_WIDTH, -WORLD_WIDTH].forEach(offset => {
             drawJohanneskirken(offset, cameraX);
             drawBryggen(offset, cameraX);
             drawHaukelandComplex(offset, cameraX);
             drawAmbulance(offset, cameraX);
             drawBlueStone(offset, cameraX);
             drawFløibanen(offset, cameraX);
        });

        drawRect('#57534e', 0, GROUND_Y, CTX_WIDTH, CTX_HEIGHT - GROUND_Y);
        drawRect('#78716c', 0, GROUND_Y, CTX_WIDTH, 1);

        [0, WORLD_WIDTH, -WORLD_WIDTH].forEach(offset => {
            decor.forEach(d => renderDecor(d, offset, cameraX));
            pigeons.forEach(p => drawPigeon(p, offset, cameraX));
        });

        drawDog(playerX - cameraX, playerY, direction, speed > 0.1);

        rain.forEach(r => {
            r.y += r.speed;
            if (r.y > CTX_HEIGHT) {
                r.y = -5;
                r.x = RAIN_ZONE_START + Math.random() * (RAIN_ZONE_END - RAIN_ZONE_START);
            }
            [0, WORLD_WIDTH, -WORLD_WIDTH].forEach(offset => {
                const rx = r.x + offset - cameraX;
                if (rx > 0 && rx < CTX_WIDTH) {
                    drawRect('#85c1e9', rx, r.y, 1, 2);
                }
            });
        });

        frame++;
        requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        canvas.removeEventListener('touchstart', handleTouchStart);
        canvas.removeEventListener('touchmove', handleTouchMove);
        canvas.removeEventListener('touchend', handleTouchEnd);
        canvas.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return (
    <div className="w-full h-[160px] mb-4 rounded-t-2xl bg-stone-100 relative overflow-hidden select-none cursor-pointer active:cursor-grabbing border-b-4 border-stone-200 group">
        <canvas
            ref={canvasRef}
            className="w-full h-full touch-none"
            style={{ imageRendering: 'pixelated' }}
        />
    </div>
  );
};
