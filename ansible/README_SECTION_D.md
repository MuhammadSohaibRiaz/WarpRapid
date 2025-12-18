# SECTION D: ANSIBLE CONFIGURATION MANAGEMENT

## 📋 Overview
This section demonstrates Infrastructure as Code (IaC) using Ansible to automate server configuration for the RapidXTech application.

---

## 📁 Files Included

1. **`hosts.ini`** - Ansible inventory file defining target servers
2. **`playbook.yml`** - Main playbook automating server setup
3. **`README_SECTION_D.md`** - This documentation file

---

## 🎯 What the Playbook Does

The playbook automates the following on **2 web servers**:

### Software Installation:
- ✅ **Docker Engine** (latest) with Docker Compose
- ✅ **Node.js 20.x** (for running Node applications)
- ✅ **Nginx** (configured as reverse proxy)
- ✅ **Python 3** with pip (for additional scripting)
- ✅ **Git, Vim, Wget** (development tools)

### Configuration:
- ✅ UFW Firewall setup (ports 22, 80, 443)
- ✅ Nginx reverse proxy for frontend (port 3000) and backend (port 4000)
- ✅ Application directory creation (`/opt/rapidxtech`)
- ✅ Docker Compose file with RapidXTech services
- ✅ User added to docker group

---

## 🚀 SETUP INSTRUCTIONS

### Prerequisites

1. **Install Ansible on your local machine**:
   ```bash
   # Windows (via WSL or Git Bash)
   pip install ansible

   # Or use Ubuntu/Linux
   sudo apt update
   sudo apt install ansible -y
   ```

2. **Prepare Target Servers**:
   - 2 Ubuntu servers (Azure VMs, AWS EC2, or local VMs)
   - SSH access configured
   - Sudo privileges available

3. **Configure SSH Keys** (Recommended):
   ```bash
   # Generate SSH key if you don't have one
   ssh-keygen -t rsa -b 4096

   # Copy SSH key to servers
   ssh-copy-id azureuser@YOUR_SERVER_1_IP
   ssh-copy-id azureuser@YOUR_SERVER_2_IP
   ```

---

## 📝 CONFIGURATION STEPS

### Step 1: Update Inventory File

Edit `hosts.ini` and replace with your actual server IPs:

```ini
[webservers]
server1 ansible_host=20.219.203.100 ansible_user=azureuser
server2 ansible_host=20.219.203.101 ansible_user=azureuser
```

**For Azure VMs**:
- Use the public IP addresses from Azure Portal
- Default user is usually `azureuser`
- Ensure SSH port (22) is open in Network Security Group

### Step 2: Test Connectivity

```bash
# Navigate to ansible directory
cd "c:\Users\pnp\Desktop\LRapidXT - Copy - Copy\ansible"

# Test connection to all servers
ansible all -i hosts.ini -m ping

# Expected output:
# server1 | SUCCESS => {
#     "changed": false,
#     "ping": "pong"
# }
# server2 | SUCCESS => {
#     "changed": false,
#     "ping": "pong"
# }
```

### Step 3: Run the Playbook

```bash
# Execute the playbook
ansible-playbook -i hosts.ini playbook.yml

# If using password authentication instead of SSH keys:
ansible-playbook -i hosts.ini playbook.yml --ask-pass --ask-become-pass
```

### Step 4: Monitor Execution

The playbook will:
1. Update system packages
2. Install Docker, Node.js, Nginx, Python
3. Configure Nginx as reverse proxy
4. Set up firewall rules
5. Create application directory
6. Generate Docker Compose file

**Execution time**: ~5-10 minutes per server

---

## 📸 SCREENSHOTS FOR SUBMISSION

### Screenshot 1: Ansible Inventory
```bash
cat hosts.ini
```
**Capture**: Your configured inventory file

### Screenshot 2: Connectivity Test
```bash
ansible all -i hosts.ini -m ping
```
**Capture**: Successful ping response from both servers

### Screenshot 3: Playbook Execution
```bash
ansible-playbook -i hosts.ini playbook.yml
```
**Capture**: Full playbook run showing all tasks completed successfully

### Screenshot 4: Verify Installation on Server
```bash
# SSH into one of the servers
ssh azureuser@YOUR_SERVER_IP

# Check installed software
docker --version
node --version
nginx -v
python3 --version

# Check Docker Compose file
cat /opt/rapidxtech/docker-compose.yml
```
**Capture**: Version outputs and Docker Compose file content

---

## 🔍 VERIFICATION COMMANDS

### On Your Local Machine:

```bash
# Check playbook syntax
ansible-playbook -i hosts.ini playbook.yml --syntax-check

# Dry run (check mode)
ansible-playbook -i hosts.ini playbook.yml --check

# Run specific tasks only
ansible-playbook -i hosts.ini playbook.yml --tags "docker"

# List all hosts
ansible all -i hosts.ini --list-hosts
```

### On Target Servers:

```bash
# SSH into server
ssh azureuser@YOUR_SERVER_IP

# Verify Docker is running
sudo systemctl status docker

# Verify Nginx is running
sudo systemctl status nginx

# Check if user is in docker group
groups $USER

# Test Docker without sudo
docker ps

# Check firewall status
sudo ufw status

# View Nginx configuration
cat /etc/nginx/sites-available/rapidxtech

# Start the application
cd /opt/rapidxtech
docker compose up -d
docker compose ps
```

---

## 🎓 FOR YOUR REPORT

### Inventory Details:
- **Number of servers**: 2
- **Server roles**: Web servers
- **Operating System**: Ubuntu 20.04/22.04 LTS
- **Connection method**: SSH with key-based authentication

### Playbook Tasks Summary:
1. **System Update** - Update apt cache and install prerequisites
2. **Docker Installation** - Install Docker Engine and Docker Compose
3. **Node.js Installation** - Install Node.js 20.x from NodeSource
4. **Nginx Installation** - Install and configure Nginx as reverse proxy
5. **Python Installation** - Install Python 3 with pip
6. **Firewall Configuration** - Configure UFW with necessary ports
7. **Application Setup** - Create directory and Docker Compose file

### Software Versions Installed:
- Docker: Latest stable
- Node.js: 20.x
- Nginx: Latest from Ubuntu repos
- Python: 3.x
- PostgreSQL: 15 (via Docker)

---

## 🆘 TROUBLESHOOTING

### Issue: "Permission denied" error
**Solution**: Ensure you have SSH access and sudo privileges
```bash
ansible-playbook -i hosts.ini playbook.yml --ask-become-pass
```

### Issue: "Host key verification failed"
**Solution**: Disable strict host key checking
```bash
export ANSIBLE_HOST_KEY_CHECKING=False
# Or add to hosts.ini: ansible_ssh_common_args='-o StrictHostKeyChecking=no'
```

### Issue: Playbook fails on Docker installation
**Solution**: Manually update the server first
```bash
ssh azureuser@YOUR_SERVER_IP
sudo apt update && sudo apt upgrade -y
```

### Issue: Can't connect to servers
**Solution**: Check Azure Network Security Group rules
- Ensure port 22 (SSH) is open
- Verify public IP addresses are correct
- Test SSH manually: `ssh azureuser@YOUR_SERVER_IP`

---

## 📋 SECTION D CHECKLIST

- [ ] Ansible installed on local machine
- [ ] 2 target servers prepared (Azure VMs)
- [ ] SSH access configured to both servers
- [ ] `hosts.ini` updated with actual server IPs
- [ ] Connectivity test successful (`ansible all -m ping`)
- [ ] Playbook executed successfully
- [ ] All tasks completed without errors
- [ ] Software verified on target servers
- [ ] Screenshots captured for submission

---

## 🎯 QUICK EXECUTION (Copy-Paste)

```bash
# Complete Section D execution
cd "c:\Users\pnp\Desktop\LRapidXT - Copy - Copy\ansible"
ansible all -i hosts.ini -m ping
ansible-playbook -i hosts.ini playbook.yml
```

---

**✅ Section D Complete!** Your servers are now configured and ready to run the RapidXTech application.
