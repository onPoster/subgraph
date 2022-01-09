#!/bin/sh
pwd
ls
sed "\$i $(cat cors.sh)" /usr/local/bin/start_ipfs > start_ipfs2.sh
cat start_ipfs2.sh
chmod +x ./start_ipfs2.sh
/sbin/tini -- ./start_ipfs2.sh daemon --migrate=true