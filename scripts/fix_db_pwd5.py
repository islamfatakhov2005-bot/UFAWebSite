import paramiko, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect("85.198.69.235", username="root", password="kJ(4kfNy8C@M", timeout=30)
cmd = r"""
echo '=== DATABASE_URL in ufa-website (exact) ==='
docker exec ufa-website sh -c 'printenv DATABASE_URL | od -c | head -5'
echo ''
echo '=== POSTGRES_PASSWORD in ufa-postgres (exact) ==='
docker exec ufa-postgres sh -c 'printenv POSTGRES_PASSWORD | od -c | head -5'
echo ''
echo '=== pg_hba.conf host rules ==='
docker exec ufa-postgres cat /var/lib/postgresql/data/pg_hba.conf | grep -Ev '^#|^$'
echo ''
echo '=== restart postgres to apply scram ==='
docker restart ufa-postgres
sleep 5
echo ''
echo '=== test via psql -h ==='
docker exec ufa-postgres sh -c "PGPASSWORD='Xk9mNfR2vLpQ7wTy' psql -h 127.0.0.1 -U ufa -d ufa_website -c 'SELECT 1;'" 2>&1
echo ''
echo '=== test from ufa-website ==='
docker exec ufa-website sh -c 'node -e "const {Client}=require(\"pg\");const c=new Client({host:\"postgres\",user:\"ufa\",password:\"Xk9mNfR2vLpQ7wTy\",database:\"ufa_website\"});c.connect().then(()=>{console.log(\"OK\");return c.end();}).catch(e=>console.log(\"ERR\",e.message));"' 2>&1
"""
_, stdout, _ = c.exec_command(cmd, timeout=90)
print(stdout.read().decode("utf-8", errors="replace"))
c.close()
