#!/usr/bin/env bash


tag=$1
my_dir=`basename ~+`
deployname=${my_dir//_/-}

if [ -z "$1" ]
then
ver="git.`git log | head -n 1 | awk '{print $2}'`"
else
        ver=$1
fi


set -x
rm build.tar.gz || echo 'remove build tar'
rm -rf build || echo 'remove build dir'
unset http_proxy
unset https_proxy
unset all_proxy
yarn && yarn build && git add yarn.lock && git stash

if [ $? -ne 0 ];then
    echo "执行yarn build 失败"
    exit -1
fi
tar zcvf build.tar.gz build
mv build.tar.gz docker/
cd docker

docker build -t registry.cn-hangzhou.aliyuncs.com/xuelang_algo/${deployname}:$ver -f Dockerfile .
if [ $? -ne 0 ];then
    echo "执行docker build 失败"
    exit -1
fi

rm build.tar.gz

set +x

docker push registry.cn-hangzhou.aliyuncs.com/xuelang_algo/${deployname}:$ver
if [ $? -ne 0 ];then
    echo "执行docker push 失败"
    exit -1
fi

echo docker run --rm -p 8080:80 registry.cn-hangzhou.aliyuncs.com/xuelang_algo/${deployname}:$ver
#docker run --rm -p 8080:8080 registry.cn-hangzhou.aliyuncs.com/xuelang_algo/${deployname}:$ver

