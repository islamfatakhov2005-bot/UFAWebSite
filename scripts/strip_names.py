"""Remove personal name fields (name: "Firstname Lastname") and name references
from JSX in src/. Also clean up JSX renderers that print name.
"""
from __future__ import annotations
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "src"

# Cyrillic personal name: word starts with uppercase Cyrillic letter, 2-3 words
PERSONAL_NAME_RE = re.compile(
    r'^\s*name:\s*"[\u0410-\u042F\u0401][\u0430-\u044F\u0451]+'
    r'(?:\s[\u0410-\u042F\u0401][\u0430-\u044F\u0451]+){1,2}",?\s*\n',
    re.MULTILINE,
)

# Also handle the variant with trailing comma on same line as other fields
INLINE_PERSONAL_RE = re.compile(
    r'name:\s*"[\u0410-\u042F\u0401][\u0430-\u044F\u0451]+'
    r'(?:\s[\u0410-\u042F\u0401][\u0430-\u044F\u0451]+){1,2}",?\s*'
)

# Render patterns: h3/h4/p with {x.name} / {p.name} / {person.name} / {member.name}
RENDER_NAME_RE = re.compile(
    r'<h[1-6][^>]*>\s*\{(?:\w+)\.name\}\s*</h[1-6]>\s*',
    re.DOTALL,
)

changed_files: list[str] = []

for path in ROOT.rglob("*.tsx"):
    text = path.read_text(encoding="utf-8")
    original = text

    # Remove full personal name lines
    text = PERSONAL_NAME_RE.sub("", text)
    # Remove inline personal name occurrences (inside {...})
    text = INLINE_PERSONAL_RE.sub("", text)
    # Remove JSX renders of .name
    text = RENDER_NAME_RE.sub("", text)

    if text != original:
        path.write_text(text, encoding="utf-8")
        changed_files.append(str(path.relative_to(ROOT.parent)))

print(f"Changed {len(changed_files)} files")
for f in changed_files:
    print(f"  {f}")
