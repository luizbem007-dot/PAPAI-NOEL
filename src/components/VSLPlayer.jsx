import React, { useEffect } from 'react';

const VTURB_SCRIPT_SRC = 'https://scripts.converteai.net/e57fed85-7f72-481f-b182-402ed86ecb6a/players/69432866e6d704f8906a195c/v4/player.js';
const VTURB_PLAYER_ID = 'vid-69432866e6d704f8906a195c';

export default function VSLPlayer() {
  useEffect(() => {
    const exists = document.querySelector(`script[src="${VTURB_SCRIPT_SRC}"]`);
    if (exists) return;

    const script = document.createElement('script');
    script.src = VTURB_SCRIPT_SRC;
    script.async = true;
    document.head.appendChild(script);

    // Adicionar CSS para ocultar textos indesejados do player
    const style = document.createElement('style');
    style.textContent = `
      vturb-smartplayer::part(resume-text),
      vturb-smartplayer .smartplayer-resume-text,
      [class*="resume"],
      [class*="continuar"],
      [class*="ja-assistiu"] {
        display: none !important;
        visibility: hidden !important;
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <vturb-smartplayer
      id={VTURB_PLAYER_ID}
      style={{ display: 'block', margin: '0 auto', width: '100%' }}
    />
  );
}
