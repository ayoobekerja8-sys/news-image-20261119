from pathlib import Path
from PIL import Image

SOURCE = Path("/home/hatch/workspace/makefun/news-image-20261119/media-generation-hero-frontpage-0-2aa08b35-210a-4d04-96cd-56dd149fe856.png")
DESTINATION = Path(__file__).with_name("entry.png")
MAX_BYTES = 1_048_576

with Image.open(SOURCE) as source:
    image = source.convert("RGB").resize((1024, 1024), Image.Resampling.LANCZOS)
    image.save(DESTINATION, format="PNG", optimize=True)

if DESTINATION.stat().st_size > MAX_BYTES:
    image.save(DESTINATION, format="JPEG", quality=88, optimize=True)

with Image.open(DESTINATION) as result:
    dimensions = result.size
    size = DESTINATION.stat().st_size
    print(f"{dimensions[0]}x{dimensions[1]}; {size} bytes; {result.format}")
    assert dimensions == (1024, 1024)
    assert size <= MAX_BYTES
