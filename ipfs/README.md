# IPFS Kubo-Go Installation Guide

This Bash script automates the installation and configuration of IPFS (InterPlanetary File System) using Kubo-Go on Linux systems.

## Installation Steps:

### Clone the Repository:
```bash
git clone https://github.com/shivachandapu/Trove.git
cd Trove
```

### Set Up IPFS Kubo-Go:

Click on this [link](https://dist.ipfs.tech/kubo/v0.22.0/kubo_v0.22.0_linux-amd64.tar.gz) to download `kubo_v0.22.0`. 
Ensure that `kubo_v0.22.0_linux-amd64.tar.gz` is moved to the working directory.
Customize variables such as `VOID`, `GATEWAY`, `API`, and `IPFS_BOOTSTRAP_ADDRESS` in the Bash script according to your requirements.

Run the Installation Script:
```bash
bash ipfs_install.sh
```

### Verify Installation:
Once the installation completes, you can verify the installation by checking the IPFS version:
```bash
ipfs --version
```
### Usage:

Starting the IPFS Daemon:
```bash
systemctl start ipfsd
```

Restarting the IPFS Daemon:
```bash
systemctl restart ipfsd
```

Stopping the IPFS Daemon:
```bash
systemctl stop ipfsd
```
Viewing Swarm Peers:
```bash
ipfs swarm peers
```

## Additional Information:

### Configuration File Location:
The IPFS daemon service file is located at `/usr/lib/systemd/system/ipfsd.service`.

### Customization:
Modify the service file or script as needed to tailor the IPFS configuration to your environment.

### Important Notes:
Ensure necessary permissions for running the script and accessing system directories.
Review and update firewall settings if required to allow IPFS traffic.

### Disclaimer:
This script is provided as-is, without any warranty. Use it at your own risk.

### Acknowledgments:
Special thanks to the IPFS community and Kubo-Go developers for their contributions to decentralized file sharing technology.
