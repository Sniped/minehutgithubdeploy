# Minehut Github Deploy
Seamlessly deploy files from a Github repository

## Setting Up
You can pull the project directly from GitHub's docker registry at `docker pull docker.pkg.github.com/sniped/minehutgithubdeploy/minehut-github-deploy:latest`. 

The configuration folder is in the form of a json file and should be linked as a volume when the Docker container starts up. More information about that is shown below.

Docker exposes port 3000 for the web server and as of right now that cannot be changed unless you edit the code itself. In the future, however, this might be changed. 

### Configuration

The server looks for a file called `config.json` in the root directory, the values for it are shown below:

(TODO): add configuration values in the form of a table. 