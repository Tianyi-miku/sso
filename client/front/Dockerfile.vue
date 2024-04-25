# 基于官方的 Node.js 运行时作为父镜像  
FROM node:latest AS build-stage  
  
# 设置工作目录为 /app  
WORKDIR /app  
  
# 将当前目录内容复制到容器的 /app 内  
COPY . .  
  
# 安装项目依赖  
RUN npm install  
  
# 运行 npm run build 命令来构建前端  
RUN npm run build  
  
# 基于官方的 nginx 作为父镜像  
FROM nginx:latest  
  
# 复制前端构建产物到 nginx 的默认目录  
COPY --from=build-stage /app/dist /usr/share/nginx/html  
  
# 暴露端口  
EXPOSE 80  
  
# 设置容器启动时执行 nginx  
CMD ["nginx", "-g", "daemon off;"]