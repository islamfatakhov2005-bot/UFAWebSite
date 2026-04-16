import paramiko
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

HOST = "85.198.69.235"
USER = "root"
PASSWORD = "kJ(4kfNy8C@M"

CMD = "cd /root/UFAWebSite && grep -E 'CRM_API_URL|CRM_API_KEY' .env 2>/dev/null | sed 's/=.*/=<set>/'; docker exec ufa-postgres psql -U postgres -d ufa -c 'SELECT COUNT(*) AS leads FROM \"WebsiteLead\";' 2>/dev/null"

c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect(HOST, username=USER, password=PASSWORD, timeout=30)
_, stdout, stderr = c.exec_command(CMD, timeout=30)
print(stdout.read().decode("utf-8", errors="replace"))
err = stderr.read().decode("utf-8", errors="replace")
if err:
    print("STDERR:", err)
c.close()
