import paramiko, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
c = paramiko.SSHClient()
c.set_missing_host_key_policy(paramiko.AutoAddPolicy())
c.connect("85.198.69.235", username="root", password="kJ(4kfNy8C@M", timeout=30)
cmd = """
echo '=== ufa-postgres ENV ==='
docker exec ufa-postgres sh -c 'echo POSTGRES_USER=$POSTGRES_USER; echo POSTGRES_PASSWORD=$POSTGRES_PASSWORD; echo POSTGRES_DB=$POSTGRES_DB'
echo ''
echo '=== ufa-website DATABASE_URL ==='
docker exec ufa-website sh -c 'printenv DATABASE_URL'
echo ''
echo '=== test connection from inside ufa-website ==='
docker exec ufa-website sh -c 'node -e "const {Client}=require(\\"pg\\");const c=new Client({connectionString:process.env.DATABASE_URL});c.connect().then(()=>{console.log(\\"OK\\");return c.end();}).catch(e=>console.log(\\"ERR\\",e.message));"'
"""
_, stdout, _ = c.exec_command(cmd, timeout=30)
print(stdout.read().decode("utf-8", errors="replace"))
c.close()
