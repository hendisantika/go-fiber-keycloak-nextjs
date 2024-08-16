#
create
databases
CREATE
DATABASE IF NOT EXISTS `keycloak`;

# create
root user and grant rights
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';

CREATE
USER 'yuji'@'%' IDENTIFIED BY 'S3cret';
GRANT ALL PRIVILEGES ON keycloak.* TO
'yuji'@'%' WITH GRANT OPTION;