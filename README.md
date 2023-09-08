# Making Kubernetes more secure
# Vulnerable K8s Deployment

Example code for blog post


## Setup

- Install [eksctl](https://eksctl.io/introduction/#installation)
- Run: `eksctl create cluster -f setup/cluster.yaml`

### Install Calico


```
kubectl create namespace tigera-operator
helm repo add projectcalico https://docs.tigera.io/calico/charts
helm install calico projectcalico/tigera-operator --version v3.25.2 --namespace tigera-operator
kubectl apply -f <(cat <(kubectl get clusterrole aws-node -o yaml) setup/append.yaml)
kubectl set env daemonset aws-node -n kube-system ANNOTATE_POD_IP=true
kubectl delete pod -n calico-system $(kubectl get pods --template="{{range .items}}{{.metadata.name}}{{\"\n\"}}{{end}}" -n calico-system --selector=k8s-app=calico-kube-controllers)
```

### Install applications


```
kubectl apply -f k8s/rbac.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/operator.yaml
kubectl apply -f k8s/grafana.yaml
```
