"""Deploy latest master to production: pull, rebuild Docker, reset DB password, seed franchises."""
import paramiko, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect("85.198.69.235", username="root", password="kJ(4kfNy8C@M", timeout=30)

cmd = r"""
set +e
cd /root/ufa 2>/dev/null || cd /opt/ufa 2>/dev/null || cd /srv/ufa 2>/dev/null || cd /root/UFAWebSite 2>/dev/null
echo "=== pwd ==="; pwd
echo ''
echo '=== git pull ==='
git pull --ff-only origin master 2>&1 | tail -10
echo ''
echo '=== reset DB password (scram-sha-256) ==='
docker exec ufa-postgres psql -U ufa -d ufa_website -c "SET password_encryption = 'scram-sha-256'; ALTER USER ufa WITH PASSWORD 'Xk9mNfR2vLpQ7wTy';" 2>&1
echo ''
echo '=== docker compose rebuild ==='
docker compose build ufa-website 2>&1 | tail -15
docker compose up -d ufa-website 2>&1 | tail -5
sleep 10
echo ''
echo '=== verify connect from ufa-website ==='
docker exec ufa-website sh -c 'node -e "const {Client}=require(\"pg\");const c=new Client({host:\"postgres\",user:\"ufa\",password:\"Xk9mNfR2vLpQ7wTy\",database:\"ufa_website\"});c.connect().then(()=>{console.log(\"OK\");return c.end();}).catch(e=>console.log(\"ERR\",e.message));"' 2>&1
echo ''
echo '=== run seed ==='
docker exec ufa-website sh -c 'node prisma/seed-franchises.mjs' 2>&1 | tail -30
echo ''
echo '=== franchise count ==='
docker exec ufa-postgres psql -U ufa -d ufa_website -c "SELECT COUNT(*) FROM \"Franchise\";" 2>&1
"""
_, stdout, _ = c.exec_command(cmd, timeout=600, get_pty=True)
print(stdout.read().decode("utf-8", errors="replace"))
c.close()
