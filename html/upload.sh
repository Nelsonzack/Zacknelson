#!/bin/bash

#EC2 Server
echo Uploading to EC2 Server
echo =======================
ssh-add ~/.ssh/EC2-Prog270-Key.pem
ssh ubuntu@35.160.84.213 'rm -r /var/www/html/*'
scp -r * ubuntu@35.160.84.213:/var/www/html/.
echo 
echo Done!
echo 

#Lubuntu
echo Uploading to Lubuntu
echo =======================
ssh-add ~/.ssh/id_ras
ssh bcuser@168.156.47.104 'rm -r /var/www/html/*'
scp -r * bcuser@168.156.47.104:/var/www/html/.
echo 
echo Done!
