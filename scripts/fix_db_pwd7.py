import paramiko, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect("85.198.69.235", username="root", password="kJ(4kfNy8C@M", timeout=30)
cmd = r"""
echo '=== set scram explicitly and ALTER USER ==='
docker exec ufa-postgres psql -U ufa -d ufa_website <<'SQL'
SET password_encryption = 'scram-sha-256';
ALTER USER ufa WITH PASSWORD 'Xk9mNfR2vLpQ7wTy';
SQL
echo ''
echo '=== try psql -h postgres from ufa-postgres itself ==='
docker exec ufa-postgres sh -c "PGPASSWORD='Xk9mNfR2vLpQ7wTy' psql -h ufa-postgres -U ufa -d ufa_website -c 'SELECT 1;'" 2>&1
echo ''
echo '=== docker network inspect ==='
docker network ls
echo ''
docker inspect ufa-website --format '{{json .NetworkSettings.Networks}}' | head -c 500
echo ''
docker inspect ufa-postgres --format '{{json .NetworkSettings.Networks}}' | head -c 500
echo ''
echo '=== ufa-website can reach postgres ==='
docker exec ufa-website sh -c 'nslookup postgres 2>/dev/null || getent hosts postgres' 2>&1
echo ''
echo '=== try pg_isready ==='
docker exec ufa-website sh -c 'nc -zv postgres 5432 2>&1' || docker exec ufa-website sh -c 'node -e "require(\"net\").createConnection({host:\"postgres\",port:5432}).on(\"connect\",()=>{console.log(\"TCP OK\");process.exit(0);}).on(\"error\",e=>{console.log(\"TCP ERR\",e.message);process.exit(1);});"' 2>&1
"""
_, stdout, _ = c.exec_command(cmd, timeout=60)
print(stdout.read().decode("utf-8", errors="replace"))
c.close()
