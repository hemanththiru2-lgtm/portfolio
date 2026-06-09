export default function initCustomCursor() {
  if (window.matchMedia("(pointer: coarse)").matches) {
    return; // Do not initialize on mobile/touch screens
  }

  const dot = document.createElement("div");
  const ring = document.createElement("div");
  
  dot.classList.add("custom-cursor-dot");
  ring.classList.add("custom-cursor-ring");
  
  document.body.appendChild(dot);
  document.body.appendChild(ring);
  
  let mouse = { x: -100, y: -100 };
  let ringPos = { x: -100, y: -100 };
  let isHovering = false;
  
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    
    dot.style.top = `${mouse.y}px`;
    dot.style.left = `${mouse.x}px`;
  });

  // Handle pointer leaving the window
  document.addEventListener("mouseleave", () => {
    dot.style.opacity = "0";
    ring.style.opacity = "0";
  });
  
  document.addEventListener("mouseenter", () => {
    dot.style.opacity = "1";
    ring.style.opacity = "1";
  });
  
  // Use event delegation to catch all dynamic elements
  document.addEventListener("mouseover", (e) => {
    const target = e.target;
    const isInteractive = target.closest("a, button, input, textarea, [role='button'], .js-tilt");
    
    if (isInteractive) {
      document.body.classList.add("cursor-hover");
      isHovering = true;
    } else {
      document.body.classList.remove("cursor-hover");
      isHovering = false;
    }
  });
  
  // Smooth elastic follow loop
  function tick() {
    const ease = isHovering ? 0.25 : 0.15;
    ringPos.x += (mouse.x - ringPos.x) * ease;
    ringPos.y += (mouse.y - ringPos.y) * ease;
    
    ring.style.top = `${ringPos.y}px`;
    ring.style.left = `${ringPos.x}px`;
    
    requestAnimationFrame(tick);
  }
  
  tick();
}
