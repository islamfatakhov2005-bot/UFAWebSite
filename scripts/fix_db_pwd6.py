import paramiko, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect("85.198.69.235", username="root", password="kJ(4kfNy8C@M", timeout=30)
cmd = r"""
echo '=== pg_hba.conf host rules ==='
docker exec ufa-postgres cat /var/lib/postgresql/data/pg_hba.conf | grep -Ev '^#|^$'
echo ''
echo '=== DATABASE_URL hash (md5 of value) ==='
docker exec ufa-website sh -c 'printenv DATABASE_URL | md5sum'
echo ''
echo '=== POSTGRES_PASSWORD hash (md5 of value) ==='
docker exec ufa-postgres sh -c 'printenv POSTGRES_PASSWORD | md5sum'
echo ''
echo '=== length checks ==='
docker exec ufa-website sh -c 'printenv DATABASE_URL | wc -c'
docker exec ufa-postgres sh -c 'printenv POSTGRES_PASSWORD | wc -c'
echo ''
echo '=== test via psql -h from postgres container ==='
docker exec ufa-postgres sh -c "PGPASSWORD='Xk9mNfR2vLpQ7wTy' psql -h 127.0.0.1 -U ufa -d ufa_website -c 'SELECT 1;'" 2>&1
echo ''
echo '=== try password with simple chars ==='
docker exec ufa-postgres psql -U ufa -d ufa_website -c "ALTER USER ufa WITH PASSWORD 'simplepw123';" 2>&1
docker exec ufa-website sh -c 'node -e "const {Client}=require(\"pg\");const c=new Client({host:\"postgres\",user:\"ufa\",password:\"simplepw123\",database:\"ufa_website\"});c.connect().then(()=>{console.log(\"OK simple\");return c.end();}).catch(e=>console.log(\"ERR\",e.message));"' 2>&1
"""
_, stdout, _ = c.exec_command(cmd, timeout=60)
print(stdout.read().decode("utf-8", errors="replace"))
c.close()
