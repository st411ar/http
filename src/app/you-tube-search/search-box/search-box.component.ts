import {
	Component,
	ElementRef,
	EventEmitter,
	OnInit,
	Output
} from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, filter, flatMap, map } from 'rxjs/operators';
import { Response } from '@angular/http';

import { SearchResult } from '../search-result/search-result.model';
import { YouTubeSearchService } from '../../services/you-tube-search.service';


@Component({
	selector: 'app-search-box',
	templateUrl: './search-box.component.html'
})
export class SearchBoxComponent implements OnInit {
	@Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output() results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();

	constructor(
			private youtube: YouTubeSearchService,
			private el: ElementRef
	) {}

	ngOnInit() {
		fromEvent(this.el.nativeElement, 'keyup')
			.pipe(
				map((event: any) => event.target.value),
				filter((text: string) => text.length > 1),
				debounceTime(250),
				flatMap((query: string) => this.youtube.search(query))
			).subscribe(
				(results: SearchResult[]) => {
					console.log(results);
				}
			);
		;
				
	}


	search(): void {
		let query: string = this.el.nativeElement.value;
		console.log(query);
	}

}
