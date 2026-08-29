import './index.css';
import { GameApp } from './game/GameApp';

window.addEventListener('DOMContentLoaded', () => {
  const app = new GameApp();
  app.run();
});
