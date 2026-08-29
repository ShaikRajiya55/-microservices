# Python launcher bridge for enterprise compatibility
import os
import subprocess
import sys

print("NexusCart Enterprise Application Launcher")
print("Routing request to Node.js TypeScript server runtime...")
subprocess.run(["node", "dist/backend/src/index.js"])
