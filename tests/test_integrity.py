"""Release invariants: privacy assets, credential and public navigation."""
from pathlib import Path
from html.parser import HTMLParser
import hashlib, json, unittest

ROOT = Path(__file__).resolve().parents[1]

class Page(HTMLParser):
    def __init__(self, text):
        super().__init__(); self.tags = []; self.feed(text)
    def handle_starttag(self, tag, attrs):
        self.tags.append((tag, dict(attrs)))

class Integrity(unittest.TestCase):
    def test_original_protected_assets_and_badge_unchanged(self):
        for name, digest in json.loads((ROOT/'docs/qa/v6-preserved-sha256.json').read_text()).items():
            self.assertEqual(hashlib.sha256((ROOT/name).read_bytes()).hexdigest(), digest, name)

    def test_seven_projects_and_three_case_destinations(self):
        page = Page((ROOT/'index.html').read_text())
        cards = [a['id'] for t,a in page.tags if t=='article' and 'card' in a.get('class','').split()]
        self.assertEqual(len(cards), 7); self.assertEqual(len(set(cards)), 7)
        for name in ['control-tower.html','gas-condominio.html','forno-estoque.html']:
            self.assertTrue(any(a.get('href')==name for t,a in page.tags), name)

    def test_all_local_assets_and_page_links_resolve(self):
        for name in ['index.html','control-tower.html','gas-condominio.html','forno-estoque.html']:
            page = Page((ROOT/name).read_text())
            for tag, attrs in page.tags:
                for key in ['href','src','data-img','data-photo']:
                    url=attrs.get(key,'').split('?')[0].split('#')[0]
                    if url and not url.startswith(('http:', 'https:', 'data:', 'mailto:', '/')):
                        self.assertTrue((ROOT/url).exists(), f'{name}: {url}')

    def test_entry_has_immediate_semantic_content_and_skip(self):
        page = Page((ROOT/'index.html').read_text())
        self.assertTrue(any(t=='h1' and a.get('id')=='hero-title' for t,a in page.tags))
        self.assertTrue(any(t=='button' and a.get('id')=='skip-opening' for t,a in page.tags), 'Opening needs an interrupt control')
        self.assertFalse(any('experience-v7-original.js' in a.get('src','') for t,a in page.tags), 'Old long opening must not compete with V7')

if __name__=='__main__': unittest.main()
