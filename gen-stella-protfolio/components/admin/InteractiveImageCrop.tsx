"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

interface InteractiveImageCropProps {
  src: string;
  x: number; // 0-100
  y: number; // 0-100
  scale: number; // 0.8-3.0
  onUpdate: (data: { x?: number; y?: number; scale?: number }) => void;
  className?: string;
  disabled?: boolean;
}

export function InteractiveImageCrop({
  src,
  x,
  y,
  scale,
  onUpdate,
  className,
  disabled
}: InteractiveImageCropProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  // Track last known position for delta calculation, as e.movementX/Y can be inconsistent
  const lastPointerX = useRef(0);
  const lastPointerY = useRef(0);

  // High-performance refs to keep the wheel listener stable
  const scaleRef = useRef(scale);
  const onUpdateRef = useRef(onUpdate);
  const positionRef = useRef({ x, y });

  // Keep refs in sync with props
  useEffect(() => {
    scaleRef.current = scale;
    onUpdateRef.current = onUpdate;
    positionRef.current = { x, y };
  }, [scale, onUpdate, x, y]);

  // Handle Non-Passive Wheel Events to prevent page scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container || disabled) return;

    const handleNativeWheel = (e: WheelEvent) => {
      // 1. Crucial: stop the browser from scrolling the page
      // This only works because we attached with { passive: false }
      e.preventDefault();

      // 2. Logic for zooming
      const zoomSpeed = 0.0015;
      const delta = -e.deltaY * zoomSpeed;
      
      const currentScale = scaleRef.current;
      const newScale = Math.max(0.8, Math.min(3.0, currentScale + delta));
      
      if (newScale !== currentScale) {
        onUpdateRef.current({ scale: newScale });
      }
    };

    // Add listener with { passive: false } explicitly
    container.addEventListener("wheel", handleNativeWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleNativeWheel);
    };
  }, [disabled]);

  // Pointer Events support Mouse + Touch consistently
  const handlePointerDown = (e: React.PointerEvent) => {
    if (disabled) return;
    // Prevent default browser behavior (scrolling/gestures) and stop propagation
    e.preventDefault();
    e.stopPropagation();
    
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    
    // Store initial coordinates to calculate delta correctly
    lastPointerX.current = e.clientX;
    lastPointerY.current = e.clientY;
    
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || disabled || !containerRef.current) return;

    // Prevent any default behavior and stop propagation to parents (like sidebars)
    e.preventDefault();
    e.stopPropagation();

    const rect = containerRef.current.getBoundingClientRect();
    
    // Use clientX/Y to compute deltas manually
    // Many browsers have inconsistent movementX/Y values especially with high-DPI displays or touch
    const deltaX = e.clientX - lastPointerX.current;
    const deltaY = e.clientY - lastPointerY.current;

    // Update last known pointer position
    lastPointerX.current = e.clientX;
    lastPointerY.current = e.clientY;
    
    // Sensitivity and zoom adjustments
    // We adjust movement based on container size to get % change
    // Using current scale to make movement feel natural (smaller jumps when zoomed in)
    const currentScale = scaleRef.current;
    
    // Ensure we don't divide by zero if rect is somehow 0
    if (rect.width === 0 || rect.height === 0) return;

    // DELTA CALCULATION:
    // deltaX is change in pixels. rect.width is visible container width.
    // 1 pixel = (1 / rect.width) * 100 percent of the container.
    // BUT we are zooming. When scale is 2, the image is twice as large as the container.
    // Moving 10px on screen should move the image 10px relative to the viewport.
    
    const dxPercentage = (deltaX / rect.width) * 100 / currentScale;
    const dyPercentage = (deltaY / rect.height) * 100 / currentScale;

    // Use current position ref to avoid closure issues with outdated 'x' and 'y' props
    const { x: curX, y: curY } = positionRef.current;

    const newX = Math.max(0, Math.min(100, curX - dxPercentage));
    const newY = Math.max(0, Math.min(100, curY - dyPercentage));

    // Only update if there is actual movement
    if (newX !== curX || newY !== curY) {
      onUpdate({ x: newX, y: newY });
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (disabled) return;
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    setIsDragging(false);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div 
        ref={containerRef}
        className={cn(
          "relative overflow-hidden cursor-grab touch-none select-none ring-offset-background transition-shadow",
          "aspect-square w-full max-w-[280px] rounded-full border-4 border-white shadow-2xl bg-muted group",
          isDragging && "cursor-grabbing ring-2 ring-primary ring-offset-4 shadow-primary/20",
          disabled && "cursor-not-allowed opacity-80",
          className
        )}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{ overscrollBehavior: 'none' }}
      >
        <div 
          className="w-full h-full pointer-events-none"
          style={{
            backgroundImage: `url(${src})`,
            backgroundPosition: `${x}% ${y}%`,
            backgroundSize: `${scale * 100}%`,
            backgroundRepeat: 'no-repeat',
            transition: isDragging ? "none" : "background-size 0.2s cubic-bezier(0.2, 0, 0, 1), background-position 0.2s cubic-bezier(0.2, 0, 0, 1)",
          }}
        />
        
        {/* Helper Overlays */}
        <div className="absolute inset-0 pointer-events-none rounded-full ring-[40px] ring-black/30 transition-opacity group-hover:ring-black/20" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
           <div className="px-3 py-1.5 rounded-full bg-black/60 text-white text-[10px] uppercase tracking-widest font-bold backdrop-blur-sm border border-white/20">
             Drag to Position • Scroll to Zoom
           </div>
        </div>
      </div>
      
      {!disabled && (
        <p className="text-[11px] text-muted-foreground font-medium text-center max-w-[240px]">
          Directly interact with the circles above to precisely frame the face.
        </p>
      )}
    </div>
  );
}
