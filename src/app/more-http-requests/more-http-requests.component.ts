import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Response } from '@angular/http';

@Component({
	selector: 'app-more-http-requests',
	templateUrl: './more-http-requests.component.html'
})
export class MoreHttpRequestsComponent implements OnInit {
	isLoading: boolean;
	data: any;

	constructor(private http: HttpClient) {}

	ngOnInit() {}


	makePost(): void {
		this.isLoading = true;
		this.http.post(
			'https://jsonplaceholder.typicode.com/posts',
			JSON.stringify({
				body: 'bar',
				title: 'foo',
				userId: 1
			})
		).subscribe(
			(data: Response) => {
				this.data = data;
				this.isLoading = false;
			}
		);
	}

	makeDelete(): void {
		this.isLoading = true;
		this.http.delete(
			'https://jsonplaceholder.typicode.com/posts/1'
		).subscribe(
			(data: Response) => {
				this.data = data;
				this.isLoading = false;
			}
		);
	}

	makeHeaders(): void {
		const headers: HttpHeaders = new HttpHeaders({
			'X-API-TOKEN': 'ng-book'
		});

		const request: HttpRequest<any> = new HttpRequest<any>(
			'GET',
			'https://jsonplaceholder.typicode.com/posts/1',
			{
				headers: headers
			}
		);

		this.http.request(request).subscribe(
			(data: any) => {
				this.data = data['body'];
			}
		);

	}

}
