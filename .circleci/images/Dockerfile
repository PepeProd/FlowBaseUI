#Use the base node images from circleci
FROM circleci/node:8.4.0-browsers

USER root

#install python + deps
RUN sudo apt-get -y -qq update
RUN sudo apt-get -y -qq install python2.7-dev
RUN sudo apt-get install python-pip

USER node 

RUN pip install awscli --upgrade --user

#update path
ENV PATH="/home/node/.local/bin:${PATH}"
