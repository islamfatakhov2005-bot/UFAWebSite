"""Rebuild ufa-website app container with latest code. Skip DB work."""
import paramiko, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect("85.198.69.235", username="root", password="kJ(4kfNy8C@M", timeout=30)

cmd = r"""
set +e
cd /root/UFAWebSite
echo '=== build app service ==='
docker compose build app 2>&1 | tail -20
echo ''
echo '=== up -d app ==='
docker compose up -d app 2>&1 | tail -5
sleep 6
echo ''
echo '=== docker ps ==='
docker ps --format 'table {{.Names}}\t{{.Status}}' | grep -E 'ufa-|NAMES'
echo ''
echo '=== app logs tail ==='
docker logs ufa-website --tail 20 2>&1 | tail -20
echo ''
echo '=== curl homepage ==='
curl -s -o /dev/null -w 'HTTP:%{http_code} time:%{time_total}s\n' https://ufa.gmlb.ru/
curl -s -o /dev/null -w 'HTTP:%{http_code} time:%{time_total}s /events/expo\n' https://ufa.gmlb.ru/events/expo
curl -s -o /dev/null -w 'HTTP:%{http_code} time:%{time_total}s /register\n' https://ufa.gmlb.ru/register
curl -s -o /dev/null -w 'HTTP:%{http_code} time:%{time_total}s /membership\n' https://ufa.gmlb.ru/membership
"""
_, stdout, _ = c.exec_command(cmd, timeout=600, get_pty=True)
print(stdout.read().decode("utf-8", errors="replace"))
c.close()
