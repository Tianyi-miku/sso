
# sso 认证中心
 

# back文件夹后端
back后端，需要MYSQL Redis，mysql默认配置.env 

mysql表创建在back init-db.sql

# 运行

yarn install  或则 npm install

yarn start 


# front文件夹前端

# 运行

yarn install  或则 npm install

yarn run serve 


# client 为示例子系统，认证中心地址

# back文件夹后端
back后端，需要MYSQL Redis，mysql默认配置.env 

mysql表创建在back init-db.sql

# 运行

yarn install  或则 npm install

yarn start 


启动SSO前后端后，将client的登录地址http:127.0.0.1:8001/#/login配置到子系统地址中，实现单点登录。