import paramiko, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect("85.198.69.235", username="root", password="kJ(4kfNy8C@M", timeout=30)
cmd = """
echo '=== try with TCP from inside ufa-postgres ==='
docker exec ufa-postgres psql -h localhost -U ufa -d ufa_website -c 'SELECT 1;' 2>&1 | head -5 || true
echo ''
echo '=== password_encryption setting ==='
docker exec ufa-postgres psql -U ufa -d ufa_website -c 'SHOW password_encryption;' 2>&1
echo ''
echo '=== set to md5 and redo password ==='
docker exec ufa-postgres psql -U ufa -d ufa_website -c "SET password_encryption = 'md5'; ALTER USER ufa WITH PASSWORD 'Xk9mNfR2vLpQ7wTy';" 2>&1
echo ''
echo '=== pg_hba.conf ==='
docker exec ufa-postgres cat /var/lib/postgresql/data/pg_hba.conf 2>&1 | grep -v '^#' | grep -v '^$' | head -10
echo ''
echo '=== retest ==='
docker exec ufa-website sh -c 'PGPASSWORD=Xk9mNfR2vLpQ7wTy node -e "const {Client}=require(\\"pg\\");const c=new Client({host:\\"postgres\\",user:\\"ufa\\",password:\\"Xk9mNfR2vLpQ7wTy\\",database:\\"ufa_website\\"});c.connect().then(()=>{console.log(\\"OK\\");return c.end();}).catch(e=>console.log(\\"ERR\\",e.message));"'
"""
_, stdout, _ = c.exec_command(cmd, timeout=60)
print(stdout.read().decode("utf-8", errors="replace"))
c.close()
