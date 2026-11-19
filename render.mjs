import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const dir = path.dirname(fileURLToPath(import.meta.url));
const chrome = '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1255/chrome-headless-shell-linux64/chrome-headless-shell';
const html = path.join(dir, 'frontpage.html');
const png = path.join(dir, 'entry.png');
const result = spawnSync(chrome, ['--headless','--disable-gpu','--no-sandbox','--hide-scrollbars','--force-device-scale-factor=1',`--screenshot=${png}`,'--window-size=1024,1024',`file://${html}`], {stdio:'inherit'});
if (result.status !== 0) throw new Error(`Chromium exited with ${result.status}`);
const py = String.raw`from PIL import Image
import os
p = r'''${png}'''
im = Image.open(p).convert('RGB')
assert im.size == (1024, 1024), im.size
im.save(p, 'PNG', optimize=True)
if os.path.getsize(p) > 1048576:
    im.save(p, 'JPEG', quality=92, optimize=True)
assert os.path.getsize(p) <= 1048576, os.path.getsize(p)
print(f'{im.width}x{im.height} {os.path.getsize(p)} bytes')`;
const check = spawnSync('python3', ['-c', py], {stdio:'inherit'});
if (check.status !== 0) throw new Error(`Pillow exited with ${check.status}`);
