import paramiko, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect("85.198.69.235", username="root", password="kJ(4kfNy8C@M", timeout=30)
cmd = "docker exec ufa-website sh -c 'echo DATABASE_URL=\"$DATABASE_URL\"' 2>&1"
_, stdout, _ = c.exec_command(cmd, timeout=30)
print(stdout.read().decode("utf-8", errors="replace"))
c.close()
