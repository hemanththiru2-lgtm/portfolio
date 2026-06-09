import initScrollReveal from "./scripts/scrollReveal";
import initTiltEffect from "./scripts/tiltAnimation";
import initCustomCursor from "./scripts/customCursor";
import initCanvasParticles from "./scripts/canvasParticles";
import { targetElements, defaultProps } from "./data/scrollRevealConfig";

initScrollReveal(targetElements, defaultProps);
initTiltEffect();
initCustomCursor();
initCanvasParticles();
