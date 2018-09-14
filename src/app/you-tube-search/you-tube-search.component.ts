import { Component, OnInit } from '@angular/core';

import { SearchResult } from './search-result/search-result.model';


@Component({
	selector: 'app-you-tube-search',
	templateUrl: './you-tube-search.component.html'
})
export class YouTubeSearchComponent implements OnInit {
	isLoading: boolean;

	constructor() {}

	ngOnInit() {}


	updateResults(results: SearchResult[]): void {
		console.log(`YouTubeSearchComponent.updateResults()`);
		console.log(results);
	}

}
