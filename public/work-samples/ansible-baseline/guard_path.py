"""Limit this local example to a user-owned, symlink-free temporary tree."""

import os
from pathlib import Path
import re
import sys


def validate_lab_root(raw_path: str) -> Path:
    if sys.platform != "linux":
        raise ValueError("Run this local example on Linux or inside WSL.")
    if not re.fullmatch(r"/tmp/resume-ansible-[A-Za-z0-9_-]+", raw_path):
        raise ValueError("Target must be a direct /tmp/resume-ansible-* directory.")
    root = Path(raw_path)
    if root.is_symlink() or root.resolve().parent != Path("/tmp").resolve():
        raise ValueError("Target must not redirect through a symlink.")
    if root.exists():
        if not root.is_dir() or root.stat().st_uid != os.getuid():
            raise ValueError("Target must be a directory owned by the current user.")
        for parent, directories, files in os.walk(root, followlinks=False):
            for name in directories + files:
                entry = Path(parent) / name
                if entry.is_symlink():
                    raise ValueError("The lab tree must not contain symlinks.")
                if entry.stat().st_uid != os.getuid():
                    raise ValueError("The lab tree must be owned by the current user.")
    return root


if __name__ == "__main__":
    try:
        print(validate_lab_root(sys.argv[1] if len(sys.argv) == 2 else ""))
    except (ValueError, OSError) as error:
        print(str(error), file=sys.stderr)
        sys.exit(1)
