import { BUTTON_OVERLAY_DURATION } from "../../../../consts/consts";

export function spawnOverlay(e: MouseEvent) {
    const target = e.target as HTMLButtonElement
    const newOverlay = document.createElement('div');
    newOverlay.classList.add('overlay');

    newOverlay.style.left = e.offsetX + 'px';
    newOverlay.style.top = e.offsetY + 'px';
    target.appendChild(newOverlay);

    setTimeout(() => {
        newOverlay.remove();
    }, BUTTON_OVERLAY_DURATION)
}
