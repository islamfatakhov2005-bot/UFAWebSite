import paramiko, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect("85.198.69.235", username="root", password="kJ(4kfNy8C@M", timeout=30)
cmd = """
echo '=== existing users ==='
docker exec ufa-postgres psql -U postgres -d postgres -c '\\du' 2>&1
echo ''
echo '=== reset password for ufa ==='
docker exec ufa-postgres psql -U postgres -d postgres -c "ALTER USER ufa WITH PASSWORD 'Xk9mNfR2vLpQ7wTy';" 2>&1
echo ''
echo '=== grant on db ==='
docker exec ufa-postgres psql -U postgres -d ufa_website -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO ufa; GRANT ALL ON SCHEMA public TO ufa;" 2>&1
echo ''
echo '=== retest ==='
docker exec ufa-website sh -c 'node -e "const {Client}=require(\\"pg\\");const c=new Client({connectionString:process.env.DATABASE_URL});c.connect().then(()=>{console.log(\\"OK CONNECTED\\");return c.end();}).catch(e=>console.log(\\"ERR\\",e.message));"'
"""
_, stdout, _ = c.exec_command(cmd, timeout=60)
print(stdout.read().decode("utf-8", errors="replace"))
c.close()
