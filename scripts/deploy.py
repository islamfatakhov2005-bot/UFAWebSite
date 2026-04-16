import paramiko
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8", errors="replace")

HOST = "85.198.69.235"
USER = "root"
PASSWORD = "kJ(4kfNy8C@M"

CMD = "cd /root/UFAWebSite && docker rm -f ufa-website ufa-postgres 2>/dev/null; docker compose up -d --build 2>&1"

client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(HOST, username=USER, password=PASSWORD, timeout=30)

_, stdout, stderr = client.exec_command(CMD, timeout=600)

for line in iter(stdout.readline, ""):
    sys.stdout.write(line)
    sys.stdout.flush()

exit_code = stdout.channel.recv_exit_status()
err = stderr.read().decode("utf-8", errors="replace")
if err:
    sys.stderr.write(err)

client.close()
sys.exit(exit_code)
