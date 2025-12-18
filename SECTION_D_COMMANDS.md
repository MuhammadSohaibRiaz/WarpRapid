# 🚀 SECTION D - ANSIBLE COMMANDS (READY TO RUN)

## ✅ YOUR VMs ARE READY

**VM1 (Public):**
- Public IP: `74.225.181.44`
- Private IP: `10.0.0.4`
- Access: Direct SSH

**VM2 (Private):**
- Private IP: `10.0.0.5`
- Access: Via VM1 as jump host

---

## 📋 STEP 1: Test SSH Connection to VM1

```bash
ssh azureuser@74.225.181.44
```

Type `yes` when prompted, then `exit` to disconnect.

---

## 📋 STEP 2: Test Ansible Connectivity

```bash
cd ansible
ansible all -i hosts.ini -m ping
```

**Expected output:**
```
server1 | SUCCESS => {
    "changed": false,
    "ping": "pong"
}
server2 | SUCCESS => {
    "changed": false,
    "ping": "pong"
}
```

---

## 📋 STEP 3: Run Ansible Playbook

```bash
ansible-playbook -i hosts.ini playbook.yml
```

This will:
- Install Docker on both VMs
- Install Node.js on both VMs
- Install Nginx on both VMs
- Install Python on both VMs
- Deploy Docker Compose with your RapidXTech app

**Expected time:** 5-10 minutes

---

## 📋 STEP 4: Verify Installation on VM1

```bash
# SSH into VM1
ssh azureuser@74.225.181.44

# Check Docker
docker --version

# Check Node.js
node --version

# Check Nginx
nginx -v

# Check running containers
cd /opt/rapidxtech
docker-compose ps

# Exit
exit
```

---

## 📋 STEP 5: Verify Installation on VM2 (via VM1)

```bash
# SSH into VM1 first
ssh azureuser@74.225.181.44

# From VM1, SSH into VM2
ssh azureuser@10.0.0.5

# Check Docker
docker --version

# Check Node.js
node --version

# Check Nginx
nginx -v

# Check running containers
cd /opt/rapidxtech
docker-compose ps

# Exit VM2
exit

# Exit VM1
exit
```

---

## 📸 SCREENSHOTS NEEDED FOR SECTION D

1. **Ansible Inventory:** `cat ansible/hosts.ini`
2. **Ansible Ping Test:** `ansible all -i hosts.ini -m ping`
3. **Playbook Execution:** `ansible-playbook -i hosts.ini playbook.yml` (show output)
4. **VM1 Verification:** SSH into VM1 and show `docker --version`, `node --version`, `nginx -v`
5. **VM2 Verification:** SSH into VM2 and show `docker --version`, `node --version`, `nginx -v`
6. **Docker Compose Running:** `docker-compose ps` on both VMs

---

## 🆘 TROUBLESHOOTING

### Issue: "Permission denied (publickey)"
**Solution:** Make sure SSH keys are in the right location:
```bash
ls ~/.ssh/id_rsa
```

### Issue: "server2 | UNREACHABLE"
**Solution:** VM2 uses VM1 as jump host. Make sure you can SSH to VM1 first:
```bash
ssh azureuser@74.225.181.44
```

### Issue: Ansible playbook fails
**Solution:** Check the error message. Common issues:
- Sudo password required: Add `-K` flag: `ansible-playbook -i hosts.ini playbook.yml -K`
- Connection timeout: Check VM firewall rules

---

## 🎯 QUICK REFERENCE

**Test connectivity:**
```bash
cd ansible
ansible all -i hosts.ini -m ping
```

**Run playbook:**
```bash
ansible-playbook -i hosts.ini playbook.yml
```

**SSH to VM1:**
```bash
ssh azureuser@74.225.181.44
```

**SSH to VM2 (from VM1):**
```bash
ssh azureuser@10.0.0.5
```

---

## ✅ AFTER COMPLETION

Once you've taken all screenshots and completed Section D, you can proceed to **Section E - Selenium Testing**.

**To save costs, delete VMs after exam:**
```bash
az vm delete --resource-group rg-rapidx-aks-lab --name vm-ansible-server1 --yes
az vm delete --resource-group rg-rapidx-aks-lab --name vm-ansible-server2 --yes
```
