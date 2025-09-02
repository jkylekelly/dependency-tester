#!/usr/bin/env python3
"""
Simple test to validate TensorFlow hello world functionality.
"""
import sys
import subprocess
import re


def test_main_output():
    """Test that main.py produces expected output."""
    result = subprocess.run([sys.executable, 'main.py'], 
                          capture_output=True, text=True)
    
    assert result.returncode == 0, f"main.py failed with exit code {result.returncode}"
    
    output = result.stdout
    
    # Check for expected outputs
    assert "Hello, TensorFlow!" in output, "Missing 'Hello, TensorFlow!' message"
    assert "TensorFlow version:" in output, "Missing TensorFlow version info"
    assert "TensorFlow says: Hello, World!" in output, "Missing TensorFlow string concatenation"
    assert "TensorFlow computation: 2.0 + 3.0 = 5.0" in output, "Missing TensorFlow computation"
    assert "Matrix multiplication result:" in output, "Missing matrix multiplication"
    
    # Check version format
    version_match = re.search(r"TensorFlow version: (\d+\.\d+\.\d+)", output)
    assert version_match, "TensorFlow version not in expected format"
    version = version_match.group(1)
    
    # Ensure version is at least 2.16.0
    major, minor, patch = map(int, version.split('.'))
    assert major >= 2, f"TensorFlow major version {major} is too old"
    if major == 2:
        assert minor >= 16, f"TensorFlow minor version {minor} is too old for major version 2"
    
    print("✓ All tests passed!")
    return True


if __name__ == "__main__":
    test_main_output()