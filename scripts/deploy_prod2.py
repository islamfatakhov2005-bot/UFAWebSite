"""Fix DB auth + apply migrations + restart app + seed."""
import paramiko, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect("85.198.69.235", username="root", password="kJ(4kfNy8C@M", timeout=30)

cmd = r"""
set +e
cd /root/UFAWebSite
echo '=== docker compose config service names ==='
docker compose config --services 2>&1
echo ''
echo '=== docker ps ==='
docker ps --format 'table {{.Names}}\t{{.Image}}\t{{.Status}}' | head -10
echo ''
echo '=== apply prisma migrations from ufa-website ==='
docker exec ufa-website sh -c 'npx prisma migrate deploy 2>&1' | tail -20
echo ''
echo '=== after migrate: table list ==='
docker exec ufa-postgres psql -U ufa -d ufa_website -c "\\dt" 2>&1 | head -30
echo ''
echo '=== retry auth with fresh scram password ==='
docker exec ufa-postgres psql -U ufa -d ufa_website -c "SET password_encryption='scram-sha-256'; ALTER USER ufa WITH PASSWORD 'Xk9mNfR2vLpQ7wTy';" 2>&1
echo ''
echo '=== show pg_authid type ==='
docker exec ufa-postgres psql -U ufa -d ufa_website -c "SELECT rolname, substring(rolpassword,1,25) FROM pg_authid WHERE rolname='ufa';" 2>&1
echo ''
echo '=== test from ufa-website ==='
docker exec ufa-website sh -c 'node -e "const {Client}=require(\"pg\");const c=new Client({host:\"postgres\",user:\"ufa\",password:\"Xk9mNfR2vLpQ7wTy\",database:\"ufa_website\"});c.connect().then(()=>{console.log(\"OK\");return c.end();}).catch(e=>console.log(\"ERR\",e.message));"' 2>&1
"""
_, stdout, _ = c.exec_command(cmd, timeout=300, get_pty=True)
print(stdout.read().decode("utf-8", errors="replace"))
c.close()
