
export class AppConstants {
    public userEndPont : string = 'https://fabric8.sematree.io/dc-cust-portal-service.demo-sandbox.sematree.f8/customerportal/customerusers/';
    public apiEndPointOrig : string = 'https://f8.intertek.com/gateway/trutesta/sprig-service/1.0/sprig/admin/';
    public apiEndPoint : string = 'http://localhost:8096/devops';
	public getApiEndPoint() {
		return this.apiEndPoint;
	}
}


