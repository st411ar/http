import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Response } from '@angular/http';

@Component({
	selector: 'app-simple-http',
	templateUrl: './simple-http.component.html'
})
export class SimpleHttpComponent implements OnInit {
	data: Object;
	isLoading: boolean;

	constructor(private http: HttpClient) {}

	ngOnInit() {}


	makeRequest(): void {
		this.isLoading = true;
		this.http.get('https://jsonplaceholder.typicode.com/posts/1')
				.subscribe((data: Response) => {
					this.data = data;
					this.isLoading = false;
				});
	}

}
