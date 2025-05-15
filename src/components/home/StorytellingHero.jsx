'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/lib/hooks';

export default function StorytellingHero() {
  const canvasRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [showTagline, setShowTagline] = useState(false);
  const [showCta, setShowCta] = useState(false);
  
  // Advanced animation setup with slower, less distracting movement
  useEffect(() => {
    if (!canvasRef.current || reduceMotion) {
      setShowTagline(true);
      setShowCta(true);
      return;
    }
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas to full window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create energy network visualization - SLOWER and LESS DENSE
    const nodes = [];
    const connections = [];
    const numNodes = 60; // Reduced from 100
    
    // Create nodes (power sources and consumption points)
    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5, // Smaller radius
        color: i % 7 === 0 ? '#00B6F1' : // Energy sources (blue)
               i % 11 === 0 ? '#4CAF50' : // Renewable nodes (green)
               i % 15 === 0 ? '#FFC107' : // Industrial nodes (yellow)
               '#F8FBFD', // Regular nodes (white)
        speed: Math.random() * 0.2 + 0.05, // SLOWER speed
        angle: Math.random() * 2 * Math.PI,
        pulseFrequency: 0.01 + Math.random() * 0.01, // SLOWER pulse
        pulseCounter: Math.random() * 100,
        isEnergySource: i % 7 === 0,
        isRenewable: i % 11 === 0
      });
    }
    
    // Create connections between nodes - FEWER CONNECTIONS
    for (let i = 0; i < numNodes; i++) {
      const numConnections = Math.floor(Math.random() * 2) + 1; // 1-2 connections only
      
      for (let j = 0; j < numConnections; j++) {
        const targetIdx = Math.floor(Math.random() * numNodes);
        if (targetIdx !== i && Math.random() > 0.3) { // 30% chance to skip connection
          connections.push({
            source: i,
            target: targetIdx,
            width: Math.random() * 0.5 + 0.1, // Thinner lines
            pulseSpeed: Math.random() * 0.02 + 0.005, // SLOWER pulse
            pulsePosition: 0,
            active: Math.random() > 0.4 // Fewer active connections
          });
        }
      }
    }
    
    // Animation parameters
    let frame = 0;
    let fadeInStarted = false;
    
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0A1B2B'); // Night Navy
      gradient.addColorStop(1, '#061622'); // Darker shade
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw connections
      connections.forEach(connection => {
        const source = nodes[connection.source];
        const target = nodes[connection.target];
        
        if (connection.active) {
          connection.pulsePosition = (connection.pulsePosition + connection.pulseSpeed) % 1;
          
          // Draw line
          ctx.beginPath();
          ctx.moveTo(source.x, source.y);
          ctx.lineTo(target.x, target.y);
          
          // Line style based on node types
          if (source.isEnergySource || target.isEnergySource) {
            ctx.strokeStyle = 'rgba(0, 182, 241, 0.15)'; // Reduced opacity
          } else if (source.isRenewable || target.isRenewable) {
            ctx.strokeStyle = 'rgba(76, 175, 80, 0.15)'; // Reduced opacity
          } else {
            ctx.strokeStyle = 'rgba(248, 251, 253, 0.08)'; // Reduced opacity
          }
          
          ctx.lineWidth = connection.width;
          ctx.stroke();
          
          // Draw pulse along the line - ONLY FOR SOME CONNECTIONS
          if (Math.random() > 0.7) { // Only 30% of connections show pulses
            const pulseX = source.x + (target.x - source.x) * connection.pulsePosition;
            const pulseY = source.y + (target.y - source.y) * connection.pulsePosition;
            
            ctx.beginPath();
            ctx.arc(pulseX, pulseY, 1, 0, Math.PI * 2);
            
            if (source.isEnergySource || target.isEnergySource) {
              ctx.fillStyle = '#00B6F1'; // Cyan
            } else if (source.isRenewable || target.isRenewable) {
              ctx.fillStyle = '#4CAF50'; // Green
            } else {
              ctx.fillStyle = '#F8FBFD'; // White
            }
            
            ctx.fill();
          }
        }
      });
      
      // Update and draw nodes
      nodes.forEach(node => {
        // Subtle movement
        node.angle += (Math.random() - 0.5) * 0.01; // SLOWER rotation
        node.x += Math.cos(node.angle) * node.speed;
        node.y += Math.sin(node.angle) * node.speed;
        
        // Bounce off walls
        if (node.x < 0 || node.x > canvas.width) node.angle = Math.PI - node.angle;
        if (node.y < 0 || node.y > canvas.height) node.angle = -node.angle;
        
        // Pulsing effect
        node.pulseCounter += node.pulseFrequency;
        const pulse = 1 + Math.sin(node.pulseCounter) * 0.2; // Less dramatic pulse
        
        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * pulse, 0, Math.PI * 2);
        
        if (node.isEnergySource) {
          // Gradient for energy sources
          const gradient = ctx.createRadialGradient(
            node.x, node.y, 0,
            node.x, node.y, node.radius * 2
          );
          gradient.addColorStop(0, '#00B6F1');
          gradient.addColorStop(1, 'rgba(0, 182, 241, 0)');
          ctx.fillStyle = gradient;
        } else {
          ctx.fillStyle = node.color;
        }
        
        ctx.fill();
      });
      
      // Fade in text after more frames (slower reveal)
      if (frame > 90 && !fadeInStarted) { // Wait longer before showing text
        fadeInStarted = true;
        setShowTagline(true);
        setTimeout(() => setShowCta(true), 1500); // Longer delay
      }
      
      frame++;
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [reduceMotion]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Canvas for energy network animation */}
        <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        />
        
          {/* Main content stays the same */}
          <div className="container relative z-10 text-center px-4">
            <h1 
          className={`text-5xl md:text-6xl lg:text-7xl font-bold text-cloud-white mb-6 transition-all duration-1000 ${
            showTagline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Energy powers prosperity
        </h1>
        
        <p 
          className={`text-2xl md:text-3xl text-sky-cyan font-medium mb-12 transition-all duration-1000 delay-300 ${
            showTagline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          and fuels a sustainable world
        </p>
        
        <p 
          className={`text-xl text-cloud-white/80 max-w-3xl mx-auto mb-12 transition-all duration-1000 delay-500 ${
            showTagline ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Join us on a data-driven journey through key aspects of the global energy landscape.
        </p>
        
        {/* Scroll indicator */}
        <div 
          className={`mt-12 transition-all duration-700 ${
            showCta ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <a href="#energy-growth" className="inline-block group">
            <div className="w-12 h-20 border-2 border-sky-cyan rounded-full mx-auto flex justify-center">
              <div className="w-3 h-3 bg-sky-cyan rounded-full mt-4 animate-bounce-slow"></div>
            </div>
            <span className="text-cloud-white/60 text-sm mt-2 block group-hover:text-sky-cyan transition-colors">
              Begin the journey
            </span>
          </a>
        </div>
      </div>
      
      {/* Bottom gradient transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-cloud-white/10 to-transparent"></div>
    </section>
  );
}
