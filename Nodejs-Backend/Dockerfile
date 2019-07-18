FROM node:8.16.0-stretch

RUN apt update

RUN cd home

RUN git clone https://github.com/purigot/todolist-job-quest.git

RUN cd todolist-job-quest/Nodejs-Backend

RUN npm install

WORKDIR /home/todolist-job-quest/Nodejs-Backend
