import paramiko, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect("85.198.69.235", username="root", password="kJ(4kfNy8C@M", timeout=30)
cmd = """
echo '=== try psql -U ufa via socket ==='
docker exec ufa-postgres psql -U ufa -d ufa_website -c '\\du' 2>&1 | head -20
echo ''
echo '=== reset password via local socket (no pwd needed for local) ==='
docker exec ufa-postgres psql -U ufa -d ufa_website -c "ALTER USER ufa WITH PASSWORD 'Xk9mNfR2vLpQ7wTy';" 2>&1
echo ''
echo '=== retest network connection ==='
docker exec ufa-website sh -c 'node -e "const {Client}=require(\\"pg\\");const c=new Client({connectionString:process.env.DATABASE_URL});c.connect().then(()=>{console.log(\\"OK\\");return c.end();}).catch(e=>console.log(\\"ERR\\",e.message));"'
"""
_, stdout, _ = c.exec_command(cmd, timeout=60)
print(stdout.read().decode("utf-8", errors="replace"))
c.close()
