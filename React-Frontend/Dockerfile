FROM node:8.16.0-stretch

RUN apt update

RUN cd home

RUN git clone https://github.com/purigot/todolist-job-quest.git

RUN cd todolist-job-quest/React-Frontend

RUN npm install

WORKDIR /home/todolist-job-quest/React-Frontend

# RUN npm run build

# RUN npm start