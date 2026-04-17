"""Check exact DATABASE_URL and do seed via explicit URL."""
import paramiko, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect("85.198.69.235", username="root", password="kJ(4kfNy8C@M", timeout=30)

cmd = r"""
set +e
cd /root/UFAWebSite
echo '=== DATABASE_URL in ufa-website ==='
docker exec ufa-website sh -c 'printenv DATABASE_URL'
echo ''
echo '=== POSTGRES_PASSWORD in ufa-postgres ==='
docker exec ufa-postgres sh -c 'printenv POSTGRES_PASSWORD'
echo ''
echo '=== .env on host ==='
ls -la .env .env.* 2>&1 | head -10
grep -E '^DATABASE_URL|^POSTGRES' .env 2>&1 | head -5
echo ''
echo '=== docker-compose file location ==='
find . -maxdepth 3 -name 'docker-compose*.yml' -o -name 'compose.yml' 2>&1 | head -5
echo ''
echo '=== Run seed using inline DATABASE_URL matching POSTGRES_PASSWORD ==='
DB_PW=$(docker exec ufa-postgres sh -c 'printenv POSTGRES_PASSWORD' | tr -d '\r\n')
echo "pw len: ${#DB_PW}"
docker exec -e DATABASE_URL="postgresql://ufa:${DB_PW}@postgres:5432/ufa_website" ufa-website sh -c 'node prisma/seed-franchises.mjs' 2>&1 | tail -30
echo ''
echo '=== count ==='
docker exec ufa-postgres psql -U ufa -d ufa_website -c "SELECT COUNT(*) FROM franchises;" 2>&1
"""
_, stdout, _ = c.exec_command(cmd, timeout=300, get_pty=True)
print(stdout.read().decode("utf-8", errors="replace"))
c.close()
