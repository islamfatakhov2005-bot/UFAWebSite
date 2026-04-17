import paramiko, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect("85.198.69.235", username="root", password="kJ(4kfNy8C@M", timeout=30)
cmd = """
echo '=== set scram and redo password fully ==='
docker exec ufa-postgres psql -U ufa -d ufa_website -c "SET password_encryption = 'scram-sha-256'; ALTER USER ufa WITH PASSWORD 'Xk9mNfR2vLpQ7wTy';" 2>&1
echo ''
echo '=== rolpassword type ==='
docker exec ufa-postgres psql -U ufa -d ufa_website -c "SELECT rolname, substring(rolpassword, 1, 15) FROM pg_authid;" 2>&1
echo ''
echo '=== retest with pg client ==='
docker exec ufa-website sh -c 'node -e "const {Client}=require(\\"pg\\");const c=new Client({host:\\"postgres\\",user:\\"ufa\\",password:\\"Xk9mNfR2vLpQ7wTy\\",database:\\"ufa_website\\"});c.connect().then(()=>{console.log(\\"OK\\");return c.end();}).catch(e=>console.log(\\"ERR\\",e.message));"'
"""
_, stdout, _ = c.exec_command(cmd, timeout=60)
print(stdout.read().decode("utf-8", errors="replace"))
c.close()
