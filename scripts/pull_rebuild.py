"""Pull latest master then rebuild app container."""
import paramiko, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect("85.198.69.235", username="root", password="kJ(4kfNy8C@M", timeout=30)

cmd = r"""
set +e
cd /root/UFAWebSite
echo '=== git pull ==='
git pull --ff-only origin master 2>&1 | tail -10
echo ''
echo '=== build app service ==='
docker compose build app 2>&1 | tail -10
echo ''
echo '=== up -d app ==='
docker compose up -d app 2>&1 | tail -5
sleep 8
echo ''
echo '=== docker ps ==='
docker ps --format 'table {{.Names}}\t{{.Status}}' | grep -E 'ufa-|NAMES'
echo ''
echo '=== curl ==='
curl -s -o /dev/null -w 'HTTP:%{http_code}\n' https://ufa.gmlb.ru/
curl -s -o /dev/null -w 'HTTP:%{http_code} /events/expo\n' https://ufa.gmlb.ru/events/expo
curl -s -o /dev/null -w 'HTTP:%{http_code} /membership/apply\n' https://ufa.gmlb.ru/membership/apply
curl -s -o /dev/null -w 'HTTP:%{http_code} /contact\n' https://ufa.gmlb.ru/contact
"""
_, stdout, _ = c.exec_command(cmd, timeout=600, get_pty=True)
print(stdout.read().decode("utf-8", errors="replace"))
c.close()
