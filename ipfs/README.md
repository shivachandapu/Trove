# IPFS Kubo-Go Installation Guide

This Bash script automates the installation and configuration of IPFS (InterPlanetary File System) using Kubo-Go on Linux systems.

## Installation Steps:

### Clone the Repository:

> git clone <repository_url>

> cd <repository_name>

### Set Up IPFS Kubo-Go:

Ensure that kubo_v0.22.0_linux-amd64.tar.gz is available in the repository directory.
Customize variables such as VOID, GATEWAY, API, and IPFS_BOOTSTRAP_ADDRESS in the Bash script according to your requirements.
Run the Installation Script:

> bash install_ipfs_kubo_go.sh

### Verify Installation:
Once the installation completes, you can verify the installation by checking the IPFS version:

> ipfs --version
 
### Usage:

Starting the IPFS Daemon:
> systemctl start ipfsd

Restarting the IPFS Daemon:
> systemctl restart ipfsd

Stopping the IPFS Daemon:
> systemctl stop ipfsd

Viewing Swarm Peers:
> ipfs swarm peers

## Additional Information:

### Configuration File Location:
The IPFS daemon service file is located at _/usr/lib/systemd/system/ipfsd.service_.

### Customization:
Modify the service file or script as needed to tailor the IPFS configuration to your environment.

### Important Notes:
Ensure necessary permissions for running the script and accessing system directories.
Review and update firewall settings if required to allow IPFS traffic.

### Disclaimer:
This script is provided as-is, without any warranty. Use it at your own risk.

### Acknowledgments:
Special thanks to the IPFS community and Kubo-Go developers for their contributions to decentralized file sharing technology.
