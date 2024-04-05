#!/bin/bash

# IPFS Kubo_go
IPFS_CLUSTER_SERVICE="ipfs-cluster-service_v1.0.8_linux-amd64.tar.gz"
IPFS_CLUSTER_CTL="ipfs-cluster-ctl_v1.0.8_linux-amd64.tar.gz"
VOID="/dev/null"

IPFS_CLUSTER_SECRET_KEY="e93803b5826213508114b8a25f0edc6a959211dda070ad6c4e28363409d874e5"

# path of the ipfs cluster service file with the file name as 'ipfsc'
ipfs_cluste_service_path="/usr/lib/systemd/system/ipfsc.service"

# Extract the ipfs-cluster-service file
tar -xvzf $IPFS_CLUSTER_SERVICE
echo "Extracted IPFS Cluster Service files."
sudo mv ipfs-cluster-service/ipfs-cluster-service /usr/local/bin/
echo "ipfs-cluster-service binary moved to /usr/local/bin/"

# show ipfs cluster service version
ipfs-cluster-service --version

# Extract ipfs-cluster-ctl file
tar -xvzf $IPFS_CLUSTER_CTL
echo "Extracted IPFS Cluster ctl files."
sudo mv ipfs-cluster-ctl/ipfs-cluster-ctl /usr/local/bin/
echo "ipfs-cluster-ctl binary moved to /usr/local/bin/"

# show ipfs cluster ctl version
ipfs-cluster-ctl --version  

# set the path for the ipfs cluster folder
export IPFS_CLUSTER_PATH=/home/$USER/.ipfs-cluster/

# initiate ipfs cluster service
ipfs-cluster-service init

# configure the ipfs daemon service file
echo """
[Unit]
Description=IPFS CLUSTER DAEMON
After=network.target

[Service]
ExecStart=/bin/ipfs-cluster-service daemon
ExecReload=/bin/ipfs-cluster-service daemon
Restart=on-failure
User=$USER
Group=$USER

[Install]
WantedBy=multi-user.target
""" | sudo tee $ipfs_cluster_service_path > $VOID

echo "ipfsc service file is configured."

#reload daemon
systemctl daemon-reload

# Start ipds-cluster-service daemon
systemctl start ipfsc

echo """
---------Installation is done!---------

IPFS cluster service daemon is running...
 	Try:
	 - systemctl restart ipfsc 	: To restart the ipfs-cluster-server daemon.
	 - systemctl stop ipfsc 	: To stop the ipfs-cluster-server daemon. 
"""
