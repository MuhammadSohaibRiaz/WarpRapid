# 🚀 COMPLETE IMPLEMENTATION ORDER - DEVOPS LAB EXAM

## ⚠️ IMPORTANT: Credentials Management
All sensitive credentials are now stored in:
- **Kubernetes**: `k8s/secrets.yml` (Secret + ConfigMap)
- **Ansible**: `.env` file (created by playbook)
- **Docker Compose**: Uses `.env` file

**Never commit secrets.yml or .env files to Git!**

---

## 📋 IMPLEMENTATION ORDER

Follow these sections **in this exact order**:

### ✅ **SECTION A: CONTAINERIZATION** (Already Done)
**Status**: Complete  
**Files**: `Dockerfile.frontend`, `Dockerfile.backend`, `docker-compose.yml`

**Verification**:
```bash
cd "c:\Users\pnp\Desktop\LRapidXT - Copy - Copy"
docker-compose up -d
docker-compose ps
```

**Screenshots Needed**:
1. `docker-compose.yml` content
2. `docker-compose ps` showing all 3 containers running
3. Browser at http://localhost:3000

---

### ✅ **SECTION B: CI/CD AUTOMATION** (Already Done)
**Status**: Complete  
**Files**: `.github/workflows/ci-cd.yml`

**Verification**:
1. Push code to GitHub
2. Check Actions tab for pipeline run
3. Verify images pushed to Docker Hub

**Screenshots Needed**:
1. `.github/workflows/ci-cd.yml` content
2. GitHub Actions pipeline (all stages green)
3. Docker Hub showing images

---

### 🔧 **SECTION C: KUBERNETES ON AZURE (AKS)** (Fix Applied)
**Status**: Ready to deploy with Secrets  
**Files**: `k8s/secrets.yml`, `k8s/frontend-deployment.yml`, `k8s/backend-deployment.yml`, `k8s/postgres-deployment.yml`

#### **Step 1: Create Kubernetes Secret & ConfigMap**
```bash
cd "c:\Users\pnp\Desktop\LRapidXT - Copy - Copy"

# Apply secrets FIRST (before deployments)
kubectl apply -f k8s/secrets.yml

# Verify secret created
kubectl get secrets rapidx-secrets
kubectl get configmap rapidx-config
```

#### **Step 2: Deploy Applications**
```bash
# Deploy in order (database → backend → frontend)
kubectl apply -f k8s/postgres-deployment.yml
kubectl apply -f k8s/backend-deployment.yml
kubectl apply -f k8s/frontend-deployment.yml

# Wait for all pods to be Running
kubectl get pods -w
# Press Ctrl+C when all show Running
```

#### **Step 3: Verify Deployment**
```bash
# Check pods
kubectl get pods

# Check services
kubectl get svc

# Get external IP (wait if <pending>)
kubectl get svc rapidx-frontend

# Check logs
kubectl logs -l app=rapidx-frontend --tail=50
kubectl logs -l app=rapidx-backend --tail=50

# Verify environment variables are loaded from Secret
kubectl describe pod -l app=rapidx-frontend | findstr "Environment: NEXT_PUBLIC"
```

#### **Step 4: Access Application**
Open browser: **http://20.219.203.205** (or your external IP)

**Screenshots Needed**:
1. `kubectl get pods` - All Running
2. `kubectl get svc` - With external IP
3. `kubectl describe pod` - Showing env vars from Secret
4. Browser showing working application

---

### 🔧 **SECTION D: ANSIBLE CONFIGURATION MANAGEMENT**
**Status**: Ready to execute  
**Files**: `ansible/hosts.ini`, `ansible/playbook.yml`

#### **Prerequisites**
- 2 Ubuntu servers (Azure VMs or any cloud VMs)
- SSH access configured
- Ansible installed on your local machine

#### **Step 1: Install Ansible (if not installed)**
```bash
# Windows (via WSL or Git Bash)
pip install ansible

# Or Ubuntu/Linux
sudo apt update
sudo apt install ansible -y

# Verify
ansible --version
```

#### **Step 2: Configure Inventory**
Edit `ansible/hosts.ini`:
```ini
[webservers]
server1 ansible_host=YOUR_SERVER_1_IP ansible_user=azureuser
server2 ansible_host=YOUR_SERVER_2_IP ansible_user=azureuser
```

#### **Step 3: Test Connectivity**
```bash
cd "c:\Users\pnp\Desktop\LRapidXT - Copy - Copy\ansible"

# Test SSH connection
ansible all -i hosts.ini -m ping

# Expected: SUCCESS with "pong" response
```

#### **Step 4: Run Playbook**
```bash
# Execute playbook
ansible-playbook -i hosts.ini playbook.yml

# If using password auth:
ansible-playbook -i hosts.ini playbook.yml --ask-pass --ask-become-pass

# Wait ~5-10 minutes for completion
```

#### **Step 5: Verify Installation**
```bash
# SSH into one server
ssh azureuser@YOUR_SERVER_IP

# Check installed software
docker --version
node --version
nginx -v
python3 --version

# Check .env file (credentials stored securely)
cat /opt/rapidxtech/.env

# Check Docker Compose
cat /opt/rapidxtech/docker-compose.yml

# Start application
cd /opt/rapidxtech
docker compose up -d
docker compose ps
```

**Screenshots Needed**:
1. `ansible/hosts.ini` content
2. `ansible all -m ping` success
3. Playbook execution (all tasks completed)
4. SSH into server showing installed versions
5. `.env` file content (showing secure credential storage)

---

### 🧪 **SECTION E: SELENIUM AUTOMATED TESTING**
**Status**: Ready to execute  
**Files**: `selenium/test_rapidxtech.py`, `selenium/requirements.txt`

#### **Prerequisites**
- Python 3.8+ installed
- Google Chrome browser installed
- AKS frontend accessible (Section C completed)

#### **Step 1: Install Dependencies**
```bash
cd "c:\Users\pnp\Desktop\LRapidXT - Copy - Copy\selenium"

# Install Python packages
pip install -r requirements.txt

# Verify installation
pip list | findstr selenium
```

#### **Step 2: Update Test Configuration**
Edit `test_rapidxtech.py` line 22:
```python
BASE_URL = "http://20.219.203.205"  # Your AKS external IP
```

#### **Step 3: Run Tests**
```bash
# Execute all 6 test cases
python test_rapidxtech.py

# Expected output:
# ✅ Test 1: Homepage Loads Successfully: PASS
# ✅ Test 2: Navigation Menu Functionality: PASS
# ✅ Test 3: Page Navigation and Routing: PASS
# ✅ Test 4: Theme Switcher Functionality: PASS
# ✅ Test 5: Backend API Connectivity: PASS
# ✅ Test 6: Responsive Design: PASS
#
# Success Rate: 100.0%
```

**Screenshots Needed**:
1. Test execution start
2. Tests running (individual test outputs)
3. Test summary (pass/fail statistics)
4. Chrome browser during test
5. Portion of test code

---

## 🎯 COMPLETE EXECUTION SEQUENCE

### **Quick Command Reference**

```bash
# ========================================
# SECTION C: Kubernetes Deployment
# ========================================
cd "c:\Users\pnp\Desktop\LRapidXT - Copy - Copy"

# 1. Apply secrets FIRST
kubectl apply -f k8s/secrets.yml

# 2. Deploy applications
kubectl apply -f k8s/postgres-deployment.yml
kubectl apply -f k8s/backend-deployment.yml
kubectl apply -f k8s/frontend-deployment.yml

# 3. Verify
kubectl get pods
kubectl get svc
# Access: http://20.219.203.205

# ========================================
# SECTION D: Ansible Configuration
# ========================================
cd ansible

# 1. Update hosts.ini with server IPs
# 2. Test connectivity
ansible all -i hosts.ini -m ping

# 3. Run playbook
ansible-playbook -i hosts.ini playbook.yml

# 4. Verify on server
ssh azureuser@YOUR_SERVER_IP
docker --version
cat /opt/rapidxtech/.env

# ========================================
# SECTION E: Selenium Testing
# ========================================
cd selenium

# 1. Install dependencies
pip install -r requirements.txt

# 2. Run tests
python test_rapidxtech.py
```

---

## 📸 SCREENSHOTS SUMMARY

### **Section A** (3 screenshots)
1. docker-compose.yml
2. docker-compose ps
3. Browser at localhost:3000

### **Section B** (3 screenshots)
1. ci-cd.yml file
2. GitHub Actions pipeline
3. Docker Hub images

### **Section C** (4 screenshots)
1. kubectl get pods
2. kubectl get svc
3. kubectl describe pod (env vars from Secret)
4. Browser at AKS external IP

### **Section D** (5 screenshots)
1. hosts.ini
2. ansible ping
3. Playbook execution
4. Server software versions
5. .env file content

### **Section E** (5 screenshots)
1. Test start
2. Tests running
3. Test summary
4. Browser during test
5. Test code

**Total**: 20 screenshots

---

## 🔒 SECURITY BEST PRACTICES IMPLEMENTED

### **Kubernetes**
✅ Credentials in Secret (base64 encoded)  
✅ Non-sensitive config in ConfigMap  
✅ Pods reference Secret via `secretKeyRef`  
✅ Secret not committed to Git (add to .gitignore)

### **Ansible**
✅ Credentials in separate `.env` file  
✅ `.env` file has restricted permissions (0600)  
✅ Docker Compose uses `env_file` directive  
✅ No hardcoded credentials in playbook

### **Git Repository**
Add to `.gitignore`:
```
# Secrets
k8s/secrets.yml
ansible/.env
.env
.env.local
*.env
```

---

## ⚠️ IMPORTANT NOTES

1. **Section Order**: Must follow C → D → E (D and E depend on C being deployed)

2. **Secrets Management**:
   - Never commit `secrets.yml` to Git
   - Keep `.env` files secure (chmod 600)
   - Use different credentials for production

3. **AKS External IP**:
   - May take 2-3 minutes to assign
   - Use `kubectl get svc -w` to watch
   - Update Selenium tests with actual IP

4. **Ansible Servers**:
   - Need 2 separate servers
   - Ubuntu 20.04/22.04 recommended
   - Ensure SSH port 22 is open

5. **Selenium Tests**:
   - Chrome browser must be installed
   - Tests run against live AKS deployment
   - May need to adjust timeouts for slow connections

---

## 🆘 TROUBLESHOOTING

### **Kubernetes Secret Issues**
```bash
# Check if secret exists
kubectl get secrets

# View secret (base64 encoded)
kubectl get secret rapidx-secrets -o yaml

# Delete and recreate if needed
kubectl delete secret rapidx-secrets
kubectl apply -f k8s/secrets.yml
```

### **Pod Not Starting**
```bash
# Check pod events
kubectl describe pod <pod-name>

# Check logs
kubectl logs <pod-name>

# Restart deployment
kubectl rollout restart deployment rapidx-frontend
```

### **Ansible Connection Failed**
```bash
# Test SSH manually
ssh azureuser@YOUR_SERVER_IP

# Check inventory
ansible-inventory -i hosts.ini --list

# Use verbose mode
ansible-playbook -i hosts.ini playbook.yml -vvv
```

---

## ✅ FINAL CHECKLIST

- [ ] Section A: Docker Compose running locally
- [ ] Section B: CI/CD pipeline passing
- [ ] Section C: Secret created in Kubernetes
- [ ] Section C: All pods Running on AKS
- [ ] Section C: Frontend accessible via external IP
- [ ] Section D: 2 servers configured with Ansible
- [ ] Section D: .env file created on servers
- [ ] Section E: Selenium tests passing
- [ ] All 20 screenshots captured
- [ ] secrets.yml added to .gitignore
- [ ] Documentation complete

---

**🎉 You're now ready to submit your DevOps Lab Exam!**

All credentials are securely managed using Kubernetes Secrets and .env files.
No hardcoded values in deployment files.
