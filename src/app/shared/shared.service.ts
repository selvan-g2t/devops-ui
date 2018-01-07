
import { Injectable, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions, Jsonp, URLSearchParams, BrowserXhr } from '@angular/http';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes } from 'ngx-uploader';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AppConstants } from '../api-constants.provider';
export interface BlobFile extends Blob {
    name: string;
}


@Injectable()

export class SharedService {

    constructor(
        public toastr: ToastsManager,
        private _http: Http,
        private appConstants: AppConstants,
    ) {
    }

    search(term: string) {
        return this._http.get("https://fabric8.sematree.io/sprig-document-services.sematree.f8/sprig/admin/9b058f3c-3bd0-4c62-bff7-c3babe4f71c3/documents?userName=sean.smyth@sematree.com&searchParameters=" + term)
            .map(response => response.json());
    }
    uploadFile(files, file: UploadFile, event: UploadInput): Observable<UploadOutput> {

        return new Observable(observer => {
            console.log(file)
            const url = event.url || '';
            const method = event.method || 'POST';
            const data = event.data || {};
            const headers = event.headers || {};

            const reader = new FileReader();
            const xhr = new XMLHttpRequest();
            let time: number = new Date().getTime();
            let progressStartTime: number = (file.progress.data && file.progress.data.startTime) || time;
            let speed = 0;
            let eta: number | null = null;


            xhr.upload.addEventListener('error', (e: Event) => {
                observer.error(e);
                observer.complete();
            });

            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    const speedAverage = Math.round(file.size / (new Date().getTime() - progressStartTime) * 1000);
                    file.responseStatus = xhr.status;
                    try {
                        file.response = JSON.parse(xhr.response);
                    } catch (e) {
                        file.response = xhr.response;
                    }
                    observer.next({ type: 'done', file: file });
                    observer.complete();
                }
            };

            xhr.open(method, url, true);
            xhr.withCredentials = event.withCredentials ? true : false;

            try {
                const uploadFile = <BlobFile>file.nativeFile;
                const uploadIndex = files.findIndex(file => file.nativeFile === uploadFile);

                /*  if (this.files[uploadIndex].progress.status === UploadStatus.Canceled) {
                   observer.complete();
                 } */

                file.form.append(event.fieldName || 'file', uploadFile, uploadFile.name);

                Object.keys(data).forEach(key => file.form.append(key, data[key]));
                Object.keys(headers).forEach(key => xhr.setRequestHeader(key, headers[key]));

                // this.serviceEvents.emit({ type: 'start', file: file });
                xhr.send(file.form);
            } catch (e) {
                observer.complete();
            }

            return () => {
                xhr.abort();
                reader.abort();
            };
        });
    }

    // Fetch all existing comments
    getObservable(url, param): Observable<any> {
        let params: URLSearchParams = new URLSearchParams();
        for (let key in param) {
            params.set(key, param[key]);
        }
        // ...using get request
        return this._http.get(url, { search: params })
            // ...and calling .json() on the response to return data
            .map(this.extractObseData)
        //...errors if any
        /*   .catch((error: any) => Observable.throw(error.json().error || 'Server error')); */

    }

    query(url, param): Promise<any> {
        let params: URLSearchParams = new URLSearchParams();
        for (let key in param) {
            params.set(key, param[key]);
        }
        return this._http
            .get(url, { search: params })
            .toPromise()
            .then(this.extractData)
            .catch((error) => { return this.handleError(error) });
    }

    get(url, param): Promise<any> {
        let params: URLSearchParams = new URLSearchParams();
        for (let key in param) {
            params.set(key, param[key]);
        }
        return this._http
            .get(url, { search: params })
            .toPromise()
            .then(this.extractData)
            .catch((error) => { return this.handleError(error) });
    }

    post(url, data): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.post(url, data, options).toPromise()
            .then((this.extractData))
            .catch((error) => { return this.handleError(error) });
        // .catch(this.handleError);
    }


    put(url, data, param?): Promise<any> {

        let params: URLSearchParams = new URLSearchParams();
        for (let key in param) {
            params.set(key, param[key]);
        }

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers, params });
        return this._http.put(url, data, options).toPromise()
            .then(this.extractData)
            .catch((error) => { return this.handleError(error) });
    }

    delete(url): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http.delete(url, options)
            .toPromise()
            .then(this.extractDeleteData)
            .catch((error) => { return this.handleError(error) });
    }


    private extractData(res: Response) {
        let body = res.json();
        return body;
    }
    private extractDeleteData(res: Response) {
        if (res.status == 202)
            return null;
    }

    private extractObseData(res: Response) {
        console.log(res)
        let body = res.json().searchResults;
        body = body.map(template => {
            return { display: template.name, value: template.id };
        })
        return body;
    }
    display() {
        this.toastr.error("display");
        return Promise.reject({});
    }

    private handleError(error: Response | any) {
        let obj = {};
        obj["headers"] = error.headers;
        obj["ok"] = error.ok;
        obj["status"] = error.status;
        obj["statusText"] = error.statusText;
        obj["type"] = error.type;
        obj["url"] = error.url;
       
        if (error.status == 503){
            this.toastr.error(`The current operation could not be completed. 
            We are unable to communicate with the server at the moment. 
            Please wait until the application health icon is green again 
            before re-trying your operation.`);
        }               
        return Promise.reject({response:obj,error:error.json()});
    }
}
