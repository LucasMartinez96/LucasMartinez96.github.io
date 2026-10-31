"""Build the same static assets locally for managed browser QA (no bundler)."""
from pathlib import Path
import shutil
root=Path(__file__).resolve().parents[1]
out=root/'dist'
out.mkdir(exist_ok=True)
for pattern in ('*.html','*.css','*.js'):
    for source in root.glob(pattern): shutil.copy2(source,out/source.name)
shutil.copytree(root/'assets',out/'assets',dirs_exist_ok=True)
print('Static preview ready:',out)
