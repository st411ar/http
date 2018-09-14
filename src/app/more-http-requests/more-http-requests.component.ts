import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

}
