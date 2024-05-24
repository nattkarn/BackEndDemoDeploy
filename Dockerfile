# ทำการเลือก base image (จาก docker hub) มาเป็นตัว runtime เริ่มต้น เพื่อให้สามารถ run project ได้
# ในทีนี้เราทำการเลือก node image version 20 ออกมา
FROM node:20.12.2

# กำหนด directory เริ่มต้นใน container (ตอน run ขึ้นมา)
WORKDIR /app

# ทำการ copy file package.json จากเครื่อง local เข้ามาใน container 
COPY package*.json ./

# ทำการลง dependency node
RUN npm install

# copy file index.js เข้ามาใน container
COPY main.js nosql.js sql.js ./

# ทำการปล่อย port 8000 ออกมาให้ access ได้
EXPOSE 3000

# กำหนด command สำหรับเริ่มต้น run application (ตอน run container)
CMD ["npm", "start"]


#docker run -d -p 8000:8000 --name my-container node-server