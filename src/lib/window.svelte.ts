let width = $state(0);
let height = $state(0);

function update() {
    width = window.innerWidth;
    height = window.innerHeight;
}

export function setupWindowStore() {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
}

export const windowStore = {
    get width() { return width; },
    get height() { return height; }
}