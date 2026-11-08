"""Exercise rejected targets without touching host configuration."""

from pathlib import Path
import tempfile
import unittest
import sys

sys.dont_write_bytecode = True

from guard_path import validate_lab_root


class TargetGuardTests(unittest.TestCase):
    def test_rejects_unsafe_or_nested_targets(self):
        for value in ("", "/", "/etc", "/tmp", "/tmp/other", "/tmp/resume-ansible-a/child", "/tmp/resume-ansible-a/../etc"):
            with self.subTest(value=value), self.assertRaises(ValueError):
                validate_lab_root(value)

    def test_accepts_private_temporary_directory(self):
        with tempfile.TemporaryDirectory(prefix="resume-ansible-guard-", dir="/tmp") as value:
            self.assertEqual(validate_lab_root(value), Path(value))

    def test_rejects_redirected_root(self):
        with tempfile.TemporaryDirectory(prefix="resume-ansible-guard-", dir="/tmp") as value:
            target = Path(value) / "target"
            target.mkdir()
            link = Path(value + "-link")
            link.symlink_to(target, target_is_directory=True)
            try:
                with self.assertRaises(ValueError):
                    validate_lab_root(str(link))
            finally:
                link.unlink()

    def test_rejects_redirected_child(self):
        with tempfile.TemporaryDirectory(prefix="resume-ansible-guard-", dir="/tmp") as value:
            root = Path(value)
            target = root / "target"
            target.mkdir()
            (root / "config").symlink_to(target, target_is_directory=True)
            with self.assertRaises(ValueError):
                validate_lab_root(value)


if __name__ == "__main__":
    unittest.main()
