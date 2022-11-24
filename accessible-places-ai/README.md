# run it with docker

# install docker

go into  the root dir

to create the docker image run following commands : 

docker build -t accessibility .

docker run -d -p 5001:5000 accessibility

now you can make requests to localhost:
127.0.0.1:5001/predict

in body content send a file with field named "image"


