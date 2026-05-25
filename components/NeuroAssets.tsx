import React, { useRef, useEffect } from 'react';

class PixelDrawer {
    ctx: CanvasRenderingContext2D | null;
    pixelSize: number;
    width: number;
    height: number;

    constructor(canvas: HTMLCanvasElement, pixelSize: number) {
        this.ctx = canvas.getContext('2d', { alpha: true });
        this.pixelSize = pixelSize;
        this.width = canvas.width;
        this.height = canvas.height;
        if (this.ctx) this.ctx.imageSmoothingEnabled = false;
    }

    clear() {
        if (this.ctx) this.ctx.clearRect(0, 0, this.width, this.height);
    }

    drawPixel(x: number, y: number, color: string) {
        if (!this.ctx) return;
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x * this.pixelSize, y * this.pixelSize, this.pixelSize, this.pixelSize);
    }

    drawRect(x: number, y: number, w: number, h: number, color: string) {
        if (!this.ctx) return;
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x * this.pixelSize, y * this.pixelSize, w * this.pixelSize, h * this.pixelSize);
    }
}

export const NeuroDecorations: React.FC = () => {
    const brainRef = useRef<HTMLCanvasElement>(null);
    const neuronRef = useRef<HTMLCanvasElement>(null);
    const dnaRef = useRef<HTMLCanvasElement>(null);
    const eegRef = useRef<HTMLCanvasElement>(null);
    const rorschachRef = useRef<HTMLCanvasElement>(null);
    const couchRef = useRef<HTMLCanvasElement>(null);
    const clipboardRef = useRef<HTMLCanvasElement>(null);
    const pillsRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const scale = 4;

        const refs = {
            brain: brainRef,
            neuron: neuronRef,
            dna: dnaRef,
            eeg: eegRef,
            rorschach: rorschachRef,
            couch: couchRef,
            clipboard: clipboardRef,
            pills: pillsRef
        };

        const drawers: Record<string, PixelDrawer> = {};
        Object.entries(refs).forEach(([key, ref]) => {
            if (ref.current) {
                drawers[key] = new PixelDrawer(ref.current, scale);
            }
        });

        let eegData: number[] = [];
        let animationFrameId: number;

        const animate = () => {
            const now = Date.now();

            if (drawers.brain) {
                const d = drawers.brain;
                d.clear();
                const t = now / 200;
                const pulse = Math.sin(t) * 0.5 + 0.5;
                const baseColor = '#eec';
                const foldColor = '#dda';
                const activeColor = `rgba(255, 100, 100, ${0.2 + pulse * 0.6})`;
                const pixels = [
                    "00011111000", "00111111100", "01111111110", "11111111111",
                    "11111111111", "11111111111", "01111111110", "00111111110",
                    "00011111000", "00001110000"
                ];
                for(let y=0; y<pixels.length; y++) {
                    for(let x=0; x<pixels[y].length; x++) {
                        if(pixels[y][x] === '1') {
                            d.drawPixel(x+2, y+2, baseColor);
                            if((x+y)%3 === 0) d.drawPixel(x+2, y+2, foldColor);
                        }
                    }
                }
                d.drawRect(4, 4, 3, 2, activeColor);
                if (Math.sin(t*1.5) > 0) d.drawRect(8, 5, 2, 2, activeColor);
            }

            if (drawers.neuron) {
                const d = drawers.neuron;
                d.clear();
                d.drawRect(2, 6, 4, 4, '#fb4');
                d.drawPixel(3, 7, '#d92');
                d.drawPixel(1, 5, '#fb4'); d.drawPixel(1, 10, '#fb4'); d.drawPixel(0, 4, '#fb4');
                d.drawRect(6, 7, 14, 2, '#ccc');
                d.drawPixel(20, 6, '#fb4'); d.drawPixel(21, 5, '#fb4'); d.drawPixel(20, 9, '#fb4');
                const signalPos = Math.floor((now / 50) % 18);
                if(signalPos < 14) d.drawRect(6 + signalPos, 7, 2, 2, '#ff0');
            }

            if (drawers.dna) {
                const d = drawers.dna;
                d.clear();
                const t = now / 300;
                for (let y = 0; y < 20; y++) {
                    const phase = (y / 4) + t;
                    const x1 = Math.sin(phase) * 3 + 6;
                    const x2 = Math.sin(phase + Math.PI) * 3 + 6;
                    const depth1 = Math.cos(phase);
                    const color1 = depth1 > 0 ? '#44f' : '#228';
                    const depth2 = Math.cos(phase + Math.PI);
                    const color2 = depth2 > 0 ? '#f44' : '#822';
                    if (y % 2 === 0) d.drawRect(Math.min(x1, x2), y + 2, Math.abs(x1 - x2), 1, '#aaa');
                    d.drawPixel(x1, y + 2, color1);
                    d.drawPixel(x2, y + 2, color2);
                }
            }

            if (drawers.eeg) {
                const d = drawers.eeg;
                d.clear();
                d.drawRect(0, 0, 24, 12, 'rgba(0,0,0,0.05)');
                for(let i=0; i<24; i+=4) d.drawRect(i, 0, 1, 12, '#eee');
                d.drawRect(0, 6, 24, 1, '#ddd');
                if (eegData.length > 24) eegData.shift();
                const noise = (Math.random() - 0.5) * 4;
                const wave = Math.sin(now / 100) * 3;
                eegData.push(6 + wave + noise);
                for (let i = 0; i < eegData.length; i++) {
                    d.drawPixel(i, Math.floor(eegData[i]), '#f00');
                }
            }

            if (drawers.rorschach) {
                const d = drawers.rorschach;
                d.clear();
                const t = now / 1000;
                const morph = Math.sin(t) * 2;
                const cx = 8; const cy = 8; const color = '#111';
                d.drawRect(cx - 2, cy - 4 + morph, 4, 8, color);
                d.drawRect(cx - 4 - morph, cy - 2, 2, 4, color);
                d.drawRect(cx + 2 + morph, cy - 2, 2, 4, color);
                d.drawPixel(cx - 3, cy - 5, color);
                d.drawPixel(cx + 2, cy - 5, color);
                if (Math.random() > 0.9) {
                    d.drawPixel(cx - 5, cy, color);
                    d.drawPixel(cx + 4, cy, color);
                }
            }

            if (drawers.couch) {
                const d = drawers.couch;
                d.clear();
                const leather = '#843'; const darkLeather = '#632'; const wood = '#531';
                d.drawRect(2, 10, 20, 4, leather);
                d.drawRect(2, 6, 4, 6, leather);
                d.drawRect(3, 14, 2, 2, wood); d.drawRect(18, 14, 2, 2, wood);
                d.drawPixel(4, 8, darkLeather); d.drawPixel(8, 11, darkLeather); d.drawPixel(14, 11, darkLeather);
            }

            if (drawers.clipboard) {
                const d = drawers.clipboard;
                d.clear();
                d.drawRect(2, 2, 8, 12, '#852');
                d.drawRect(3, 3, 6, 10, '#fff');
                d.drawRect(4, 1, 4, 2, '#aaa');
                const t = Math.floor(now / 200);
                const lineY = 4 + (t % 8);
                const handX = 6 + (t % 2);
                const handY = lineY + 1;
                for(let i=4; i<lineY; i+=2) d.drawRect(4, i, 4, 1, '#000');
                d.drawPixel(handX, handY, '#fcc');
                d.drawPixel(handX-1, handY+1, '#33f');
            }

            if (drawers.pills) {
                const d = drawers.pills;
                d.clear();
                const t = now;
                d.drawRect(4, 4, 6, 8, 'rgba(200, 200, 255, 0.5)');
                d.drawRect(5, 2, 4, 2, '#eee');
                d.drawRect(4, 12, 6, 1, 'rgba(200, 200, 255, 0.5)');
                d.drawRect(5, 6, 4, 4, '#fff'); d.drawRect(6, 7, 2, 2, '#f00');
                const floatY = Math.sin(t/300) * 2;
                d.drawRect(10, 8 + floatY, 3, 1, '#f00');
                d.drawRect(13, 8 + floatY, 3, 1, '#fff');
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <div className="w-full flex flex-wrap justify-center items-end gap-8 md:gap-16 py-12 px-4 opacity-70 pointer-events-none select-none grayscale-[0.2] border-t border-black/5 mt-16">
            <canvas ref={brainRef} width={64} height={64} className="w-16 h-16" title="Brain Activity" />
            <canvas ref={neuronRef} width={96} height={64} className="w-24 h-16" title="Neuron Signal" />
            <canvas ref={dnaRef} width={48} height={96} className="w-12 h-24" title="Genetics" />
            <canvas ref={eegRef} width={96} height={48} className="w-24 h-12" title="EEG Waves" />
            <canvas ref={rorschachRef} width={64} height={64} className="w-16 h-16" title="Rorschach Test" />
            <canvas ref={couchRef} width={96} height={64} className="w-24 h-16" title="Therapy" />
            <canvas ref={clipboardRef} width={48} height={64} className="w-12 h-16" title="Clinical Notes" />
            <canvas ref={pillsRef} width={48} height={48} className="w-12 h-12" title="Treatment" />
        </div>
    );
};
