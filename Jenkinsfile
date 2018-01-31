
def appName = "devops-ui";
def url = "https://github.com/Intigna/devops-ui.git"; // github or bitbucket url
def creds = "github_creds"; // or github_creds
def branchName = "master";
def secretName = "secret"

def deployApp = true;
def deployClusterName =  "gbstt" ; //  Test Cluster.
def healthUrl = "/devops-ui/healtcheck.html";  // Prints this URL after deploy 


// ----------- SNIP -------------------
def gceJenkinsProject = "${env.INTIGNA_JENKINS_GCEPROJECT}"; // Where the jenkins repos are pushed to.
def gceClusterZone = "${env.INTIGNA_ZONE}"; // us-central1-f;

def imageRepo = "us.gcr.io";

def vers = "";  // will calculate via parsing pom.xml
def imageName = "${appName}";
def imageVers = "NONE";
def imageVersTest = "TEST";
def imageVersStage = "STAGE";
def isSnapshotVersion = true;

def imageTagRoot = "${imageRepo}/adam-devops/${appName}";
def logicalImageTag = "";
def imageTag =  "";

def BUILD_NUMBER = "${env.BUILD_NUMBER}";
def BUILD_ID = "${env.BUILD_ID}";
def BUILD_MAVEN_SETTINGS = "MyGlobalSettings";
 
node {
    stage("CloneRepo") { 
	git credentialsId: creds, url: url, branch: branchName;
	sh "git checkout ${branchName}";
	
    }
    stage('build_publish_docker') {
	dir ( '.') {
	    sh ("cp tooling/docker/* .");
	    sh ("docker build --rm  -t ${imageTag} .");
	    sh ("gcloud docker -- push ${imageTag}");
	    sh ('echo Finished  : `pwd`');

	    if (isSnapshotVersion == true) {
		logicalImageTag = "${imageTagRoot}:${imageVersTest}";
	    } else {
		logicalImageTag = "${imageTagRoot}:${imageVersStage}";
	    }
	    sh ("docker tag ${imageTag} ${logicalImageTag}");
	    sh ("gcloud docker -- push ${logicalImageTag}");
	}
    }
    stage('updateImage') {

	if (deployApp == false) {
	    sh ("echo  Not deploying ${imageTag} - ${logicalImageTag}  ");
	} else {
	// TODO : secrets
	// TODO : set canary-srevices to be a private git repo
	
	def namespace = "";
	def envName = "";
	def gceClusterName = "";
	def deployFileRoot = "";
	if (imageVers.indexOf('SNAPSHOT') != -1) {
	    envName = "test";
	} else {
	    envName = "stage"; // The env name is used for canary releases
	}
	// Use the KC toolset to deploy 
	def clusterName = deployClusterName;
	sh "echo $PATH"
	def cmd = "~/git/ops_tools/kc/kc imagedeploy -p ${appName} --cluster ${clusterName} --env ${envName} ";
	sh (cmd);

	cmd = "~/git/ops_tools/kc/kc service -p ${appName} --cluster ${clusterName} --env ${envName}  ";
	sh (cmd);

	cmd = "~/git/ops_tools/kc/kc url -p ${appName} --cluster ${clusterName} --env ${envName}  ";
	sh (cmd);
	

	}
    }

}



