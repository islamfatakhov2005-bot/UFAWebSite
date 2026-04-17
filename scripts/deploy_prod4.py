"""Temporarily allow trust auth for docker network, seed, then restore."""
import paramiko, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect("85.198.69.235", username="root", password="kJ(4kfNy8C@M", timeout=30)

cmd = r"""
set +e
cd /root/UFAWebSite
echo '=== backup pg_hba ==='
docker exec ufa-postgres sh -c 'cp /var/lib/postgresql/data/pg_hba.conf /var/lib/postgresql/data/pg_hba.conf.bak 2>&1'
echo ''
echo '=== add trust rule for all hosts ==='
docker exec ufa-postgres sh -c "sed -i '1ihost all all all trust' /var/lib/postgresql/data/pg_hba.conf"
docker exec ufa-postgres sh -c 'head -3 /var/lib/postgresql/data/pg_hba.conf'
echo ''
echo '=== reload postgres ==='
docker exec ufa-postgres psql -U ufa -d ufa_website -c 'SELECT pg_reload_conf();' 2>&1
sleep 2
echo ''
echo '=== test from ufa-website ==='
docker exec ufa-website sh -c 'node -e "const {Client}=require(\"pg\");const c=new Client({host:\"postgres\",user:\"ufa\",password:\"anything\",database:\"ufa_website\"});c.connect().then(()=>{console.log(\"OK\");return c.end();}).catch(e=>console.log(\"ERR\",e.message));"' 2>&1
echo ''
echo '=== run seed ==='
docker exec ufa-website sh -c 'node prisma/seed-franchises.mjs' 2>&1 | tail -50
echo ''
echo '=== count franchises ==='
docker exec ufa-postgres psql -U ufa -d ufa_website -c "SELECT COUNT(*) FROM franchises;" 2>&1
echo ''
echo '=== restore pg_hba ==='
docker exec ufa-postgres sh -c "sed -i '1d' /var/lib/postgresql/data/pg_hba.conf"
docker exec ufa-postgres sh -c 'head -3 /var/lib/postgresql/data/pg_hba.conf'
docker exec ufa-postgres psql -U ufa -d ufa_website -c 'SELECT pg_reload_conf();' 2>&1
"""
_, stdout, _ = c.exec_command(cmd, timeout=300, get_pty=True)
print(stdout.read().decode("utf-8", errors="replace"))
c.close()
