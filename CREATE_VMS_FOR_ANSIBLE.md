# 🚀 CREATE AZURE VMs FOR SECTION D - ANSIBLE

## 📋 What You Need to Know

**Your AKS cluster IP (20.219.203.205) is for your Kubernetes frontend - NOT for Ansible.**

For Section D, you need **2 separate Ubuntu VMs** to demonstrate Ansible configuration management.

---

## ⚡ STEP-BY-STEP: CREATE 2 AZURE VMs

### **Step 1: Create First VM**

```bash
# Create VM 1 (using Standard_B1s - available in Central India)
az vm create \
  --resource-group rg-rapidx-aks-lab \
  --name vm-ansible-server1 \
  --image Ubuntu2204 \
  --size Standard_B1s \
  --admin-username azureuser \
  --generate-ssh-keys \
  --public-ip-sku Standard

# Get VM 1 IP address
az vm show -d --resource-group rg-rapidx-aks-lab --name vm-ansible-server1 --query publicIps -o tsv
```

**Save this IP address!** This is your **Server 1 IP**.

---

### **Step 2: Create Second VM**

```bash
# Create VM 2 (using Standard_B1s - available in Central India)
az vm create \
  --resource-group rg-rapidx-aks-lab \
  --name vm-ansible-server2 \
  --image Ubuntu2204 \
  --size Standard_B1s \
  --admin-username azureuser \
  --generate-ssh-keys \
  --public-ip-sku Standard

# Get VM 2 IP address
az vm show -d --resource-group rg-rapidx-aks-lab --name vm-ansible-server2 --query publicIps -o tsv
```

**Save this IP address!** This is your **Server 2 IP**.

---

### **Step 3: Open SSH Port (Port 22)**

```bash
# Open SSH port on VM 1
az vm open-port \
  --resource-group rg-rapidx-aks-lab \
  --name vm-ansible-server1 \
  --port 22 \
  --priority 1000

# Open SSH port on VM 2
az vm open-port \
  --resource-group rg-rapidx-aks-lab \
  --name vm-ansible-server2 \
  --port 22 \
  --priority 1000
```

---

### **Step 4: Test SSH Connection**

```bash
# Test connection to VM 1 (replace with your actual IP)
ssh azureuser@YOUR_VM1_IP

# If it works, type 'exit' to disconnect
exit

# Test connection to VM 2 (replace with your actual IP)
ssh azureuser@YOUR_VM2_IP

# If it works, type 'exit' to disconnect
exit
```

---

## 📝 AFTER CREATING VMs - UPDATE ANSIBLE INVENTORY

Once you have both IPs, I'll update your `ansible/hosts.ini` file with the exact values.

**Tell me:**
- VM 1 IP: `_____________`
- VM 2 IP: `_____________`

---

## 💰 COST CONSIDERATION

**Standard_B1s VMs cost approximately $0.01/hour (~$7.50/month)**

For this lab exam:
- Create VMs → Run Ansible → Take screenshots → **Delete VMs**
- Total time: ~30 minutes
- Cost: Less than $0.05

**To delete VMs after exam:**
```bash
az vm delete --resource-group rg-rapidx-aks-lab --name vm-ansible-server1 --yes
az vm delete --resource-group rg-rapidx-aks-lab --name vm-ansible-server2 --yes
```

---

## 🎯 COMPLETE COMMAND SEQUENCE (COPY-PASTE)

```bash
# ========================================
# CREATE VM 1
# ========================================
az vm create \
  --resource-group rg-rapidx-aks-lab \
  --name vm-ansible-server1 \
  --image Ubuntu2204 \
  --size Standard_B1s \
  --admin-username azureuser \
  --generate-ssh-keys \
  --public-ip-sku Standard

# Get VM 1 IP
az vm show -d --resource-group rg-rapidx-aks-lab --name vm-ansible-server1 --query publicIps -o tsv

# Open SSH port
az vm open-port --resource-group rg-rapidx-aks-lab --name vm-ansible-server1 --port 22 --priority 1000

# ========================================
# CREATE VM 2
# ========================================
az vm create \
  --resource-group rg-rapidx-aks-lab \
  --name vm-ansible-server2 \
  --image Ubuntu2204 \
  --size Standard_B1s \
  --admin-username azureuser \
  --generate-ssh-keys \
  --public-ip-sku Standard

# Get VM 2 IP
az vm show -d --resource-group rg-rapidx-aks-lab --name vm-ansible-server2 --query publicIps -o tsv

# Open SSH port
az vm open-port --resource-group rg-rapidx-aks-lab --name vm-ansible-server2 --port 22 --priority 1000
```

---

## ⏱️ EXPECTED TIME

- VM 1 creation: ~2-3 minutes
- VM 2 creation: ~2-3 minutes
- SSH port opening: ~30 seconds each
- **Total: ~6 minutes**

---

## ✅ WHAT TO DO NEXT

1. **Run the commands above** to create 2 VMs
2. **Copy the 2 IP addresses** you get
3. **Tell me the IPs** - I'll update your Ansible files with exact values
4. **Run Ansible playbook** - I'll give you the exact command
5. **Take screenshots** for submission
6. **Delete VMs** to save costs

---

## 🆘 TROUBLESHOOTING

### Issue: "az: command not found"
**Solution**: Azure CLI not installed. Install it:
```bash
# Windows (PowerShell as Admin)
Invoke-WebRequest -Uri https://aka.ms/installazurecliwindows -OutFile .\AzureCLI.msi
Start-Process msiexec.exe -Wait -ArgumentList '/I AzureCLI.msi /quiet'
```

### Issue: "Resource group not found"
**Solution**: Check your resource group name:
```bash
az group list --output table
```
Use the correct resource group name in the commands.

### Issue: "SSH connection refused"
**Solution**: Wait 1-2 minutes after VM creation, then try again. VMs need time to fully boot.

### Issue: "Permission denied (publickey)"
**Solution**: SSH keys might not be in default location. Specify key:
```bash
ssh -i ~/.ssh/id_rsa azureuser@YOUR_VM_IP
```

---

**Run the commands above and give me the 2 IP addresses!** 🚀
