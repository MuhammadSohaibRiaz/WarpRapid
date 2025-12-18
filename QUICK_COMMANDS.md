# 🚀 QUICK COMMANDS REFERENCE - DEVOPS LAB EXAM

## ✅ CREDENTIALS NOW SECURE
- **Kubernetes**: Uses Secret + ConfigMap (no hardcoded values)
- **Ansible**: Uses .env file (chmod 600)
- **Git**: secrets.yml added to .gitignore

---

## 📋 SECTION C: KUBERNETES DEPLOYMENT

### Step 1: Apply Secret & ConfigMap (REQUIRED FIRST)
```bash
cd "c:\Users\pnp\Desktop\LRapidXT - Copy - Copy"

kubectl apply -f k8s/secrets.yml
```

### Step 2: Deploy Applications
```bash
# Deploy in order
kubectl apply -f k8s/postgres-deployment.yml
kubectl apply -f k8s/backend-deployment.yml
kubectl apply -f k8s/frontend-deployment.yml
```

### Step 3: Verify
```bash
# Check pods
kubectl get pods

# Check services
kubectl get svc

# Check logs
kubectl logs -l app=rapidx-frontend --tail=50

# Verify env vars loaded from Secret (Windows)
kubectl describe pod -l app=rapidx-frontend | findstr "Environment: NEXT_PUBLIC"
```

### Step 4: Access Application
```
http://20.219.203.205
```

### If You Need to Redeploy:
```bash
# Delete old deployments
kubectl delete -f k8s/frontend-deployment.yml
kubectl delete -f k8s/backend-deployment.yml

# Wait 5 seconds
timeout /t 5

# Reapply
kubectl apply -f k8s/backend-deployment.yml
kubectl apply -f k8s/frontend-deployment.yml

# Watch until Running
kubectl get pods -w
```

---

## 🔧 SECTION D: ANSIBLE CONFIGURATION

### Step 1: Update Inventory
Edit `ansible/hosts.ini`:
```ini
[webservers]
server1 ansible_host=YOUR_SERVER_1_IP ansible_user=azureuser
server2 ansible_host=YOUR_SERVER_2_IP ansible_user=azureuser
```

### Step 2: Test Connectivity
```bash
cd ansible
ansible all -i hosts.ini -m ping
```

### Step 3: Run Playbook
```bash
ansible-playbook -i hosts.ini playbook.yml
```

### Step 4: Verify on Server
```bash
ssh azureuser@YOUR_SERVER_IP

# Check installations
docker --version
node --version
nginx -v

# Check .env file (credentials stored securely)
cat /opt/rapidxtech/.env

# Start application
cd /opt/rapidxtech
docker compose up -d
```

---

## 🧪 SECTION E: SELENIUM TESTING

### Step 1: Install Dependencies
```bash
cd selenium
pip install -r requirements.txt
```

### Step 2: Update Test URL
Edit `test_rapidxtech.py` line 22:
```python
BASE_URL = "http://20.219.203.205"
```

### Step 3: Run Tests
```bash
python test_rapidxtech.py
```

---

## 🔍 VERIFICATION COMMANDS

### Check Kubernetes Secret
```bash
kubectl get secrets rapidx-secrets
kubectl get configmap rapidx-config
kubectl describe secret rapidx-secrets
```

### Check Pod Environment Variables
```bash
kubectl exec -it <pod-name> -- env | findstr SUPABASE
```

### View Secret Content (base64 encoded)
```bash
kubectl get secret rapidx-secrets -o yaml
```

### Check Ansible .env File
```bash
ssh azureuser@YOUR_SERVER_IP
cat /opt/rapidxtech/.env
ls -la /opt/rapidxtech/.env  # Should show -rw------- (600 permissions)
```

---

## 📸 SCREENSHOTS NEEDED

### Section C (4 screenshots)
1. `kubectl get pods` - All Running
2. `kubectl get svc` - With external IP
3. `kubectl describe pod -l app=rapidx-frontend` - Showing env from Secret
4. Browser at http://20.219.203.205

### Section D (5 screenshots)
1. `ansible/hosts.ini` content
2. `ansible all -m ping` success
3. Playbook execution complete
4. `ssh` showing software versions
5. `cat /opt/rapidxtech/.env` showing secure storage

### Section E (5 screenshots)
1. Test execution start
2. Tests running
3. Test summary (pass/fail)
4. Browser during test
5. Test code snippet

---

## 🆘 TROUBLESHOOTING

### Secret Not Found Error
```bash
# Verify secret exists
kubectl get secrets

# If missing, apply it
kubectl apply -f k8s/secrets.yml
```

### Pod CrashLoopBackOff
```bash
# Check logs
kubectl logs <pod-name>

# Check events
kubectl describe pod <pod-name>

# Restart
kubectl rollout restart deployment rapidx-frontend
```

### Ansible Connection Failed
```bash
# Test SSH manually
ssh azureuser@YOUR_SERVER_IP

# Use verbose mode
ansible-playbook -i hosts.ini playbook.yml -vvv
```

---

## ⚡ ONE-LINE COMMANDS

### Complete Section C Deployment
```bash
kubectl apply -f k8s/secrets.yml && kubectl apply -f k8s/postgres-deployment.yml && kubectl apply -f k8s/backend-deployment.yml && kubectl apply -f k8s/frontend-deployment.yml && kubectl get pods
```

### Redeploy Frontend Only
```bash
kubectl delete -f k8s/frontend-deployment.yml && timeout /t 3 && kubectl apply -f k8s/frontend-deployment.yml && kubectl get pods -w
```

### Check All Resources
```bash
kubectl get secrets,configmap,pods,svc
```

---

## 📋 IMPLEMENTATION ORDER

1. **Section C** - Kubernetes (30 min)
   - Apply secrets.yml
   - Deploy applications
   - Verify and screenshot

2. **Section D** - Ansible (20 min)
   - Update hosts.ini
   - Run playbook
   - Verify and screenshot

3. **Section E** - Selenium (15 min)
   - Install dependencies
   - Run tests
   - Screenshot results

**Total Time**: ~65 minutes

---

## ✅ FINAL CHECKLIST

- [ ] `k8s/secrets.yml` applied
- [ ] All pods Running
- [ ] Frontend accessible at external IP
- [ ] No hardcoded credentials in YAML files
- [ ] `.env` file created by Ansible (chmod 600)
- [ ] Selenium tests passing
- [ ] All screenshots captured
- [ ] `secrets.yml` in .gitignore

---

**🎉 All credentials are now securely managed!**
